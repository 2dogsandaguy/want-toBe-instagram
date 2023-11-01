const express = require('express');
const router = express.Router();

// Import and use your different route sets here
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

module.exports = router;
