const express = require('express');
const router = express.Router();

const usersRoutes = require('./user');
const thoughtsRoutes = require('./thoughts');
const reactionsRoutes = require('./reaction');

router.use('/user', usersRoutes);
router.use('/thoughts', thoughtsRoutes);
router.use('/reaction', reactionsRoutes);

module.exports = router;