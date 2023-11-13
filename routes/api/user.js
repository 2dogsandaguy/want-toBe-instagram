const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/userController');

// Create a new user
router.post('/', UserController.createUser);

// Get a list of all users
router.get('/', UserController.getAllUsers);

// Get a specific user by ID
router.get('/:userId', UserController.getUserById);

// Update a user by ID
router.put('/:userId', UserController.updateUser);

// Create a new friend connection
router.post('/add-friend', UserController.addFriend);

// Delete a friend from a user
router.delete('/delete-friend', UserController.deleteFriend);
// Delete a user by ID
router.delete('/:userId', UserController.deleteUser);

module.exports = router;