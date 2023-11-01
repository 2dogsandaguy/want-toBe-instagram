// Import a library called 'express' that helps create a web server.
const express = require('express');

// Create a web server using the 'express' library.
const app = express();

// Load configuration settings from a file called '.env'.
require('dotenv').config();

// Connect to a database using a configuration called 'db'.
const db = require('./config/connect');

// Import the routes for our website.
const routes = require("./routes");

// Set up the server to understand and handle JSON data.
app.use(express.json());

// Set up the server to understand and handle form data.
app.use(express.urlencoded({ extended: true }));

// Use the routes we imported to handle different web pages.
app.use("/", routes);

// Decide which 'door' or port the server will use, either from an environment variable or 3001 by default.
const PORT = process.env.PORT || 3001;

// Handling 404 Not Found errors: If a web page is not found, show an error message.
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Handling errors gracefully: If there is an error, show an error message and status.
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

// Once the database is open, start the server on the chosen port.
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server is running on port ${PORT}!`);
    });
});
