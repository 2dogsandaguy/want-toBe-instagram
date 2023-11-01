const express = require('express');
const router = express.Router();
const ReactionController = require('../../controllers/reactionController');

// Create a new reaction
router.post('/', ReactionController.createReaction);

// Get a list of all reactions
router.get('/', ReactionController.getAllReactions);

// Get a specific reaction by ID
router.get('/:reactionId', ReactionController.getReactionById);

// Update a reaction by ID
router.put('/:reactionId', ReactionController.updateReaction);

// Delete a reaction by ID
router.delete('/:reactionId', ReactionController.deleteReaction);

module.exports = router;
