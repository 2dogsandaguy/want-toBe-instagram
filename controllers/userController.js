const User = require('../models/User'); // Import the User model

const UserController = {
  // Create a new user
  createUser: async (req, res) => {
    try {
      console.log("Creating a new user..."); // Added console.log

      // Create a new user using the data sent in the request.
      const user = new User(req.body);

      // Save the new user to the database.
      await user.save();
      console.log("New user created successfully."); // Added console.log

      // Send a response to indicate that the user was created.
      res.status(201).json(user);
    } catch (error) {
      // If there's an error, send a response with an error message.
      res.status(400).json({ error: error.message });
    }
  },

  // Get a list of all users
  getAllUsers: async (req, res) => {
    try {
      console.log("Fetching a list of all users..."); // Added console.log

      // Retrieve a list of all users from the database.
      const users = await User.find();

      // Send the list of users as a response.
      res.status(200).json(users);
    } catch (error) {
      // If there's an error, send a response with a generic error message.
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Get a specific user by ID
  getUserById: async (req, res) => {
    const { userId } = req.params;
    try {
      console.log("Fetching a specific user by ID..."); // Added console.log

      // Find a user by their unique ID.
      const user = await User.findById(userId).populate("thoughts");

      // Check if the user exists.
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Send the specific user's information as a response.
      res.status(200).json(user);
    } catch (error) {
      // If there's an error, send a response with a generic error message.
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Update a user by ID
  updateUser: async (req, res) => {
    const { userId } = req.params;
    try {
      console.log("Updating a user by ID..."); // Added console.log

      // Find and update a user's information by their unique ID.
      const user = await User.findByIdAndUpdate(userId, req.body, { new: true });

      // Check if the user exists.
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Send the updated user's information as a response.
      res.status(200).json(user);
    } catch (error) {
      // If there's an error, send a response with a generic error message.
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Delete a user by ID
  deleteUser: async (req, res) => {
    const { userId } = req.params;
    try {
      console.log("Deleting a user by ID..."); // Added console.log

      // Find and remove a user by their unique ID.
      const user = await User.findByIdAndRemove(userId);

      // Check if the user exists.
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Send a response to indicate that the user was deleted.
      res.status(204).end();
    } catch (error) {
      // If there's an error, send a response with a generic error message.
      res.status(500).json({ error: 'Server error' });
    }
  },
};

module.exports = UserController;
