const Reaction = require('../models/Thought'); // Import the Reaction model

const ReactionController = {
  // Create a new reaction
  createReaction: async (req, res) => {
    try {
      console.log('Request body:', req.body);
      // Ensure you include the thoughtId in the request
      const { thoughtId, reactionBody, username } = req.body;

      // Check if the thoughtId is valid
      const thought = await Reaction.findById(thoughtId); // Assuming Reaction has a field named _id
      if (!thought) {
        return res.status(400).json({ error: 'Invalid thoughtId. Thought not found.' });
      }

      // Create a new reaction using the data sent in the request.
      thought.reactions.push({
        reactionBody: reactionBody,
        username: username,
      });

      // Save the updated thought to the database.
      await thought.save();

      // Send a response to indicate that the reaction was created.
      res.status(201).json(thought.reactions[thought.reactions.length - 1]); // Return the created reaction
    } catch (error) {
      // If there's an error, send a response with an error message.
      console.error('Error saving thought:', error);
      res.status(500).json({ error: 'Error saving thought', details: error.message });
    }
  },


  // Get a list of all reactions
  getAllReactions: async (req, res) => {
    try {
      const reactions = await Reaction.find().populate("reactions");
      res.status(200).json(reactions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  },

  // Get a specific reaction by ID
  getReactionById: async (req, res) => {
    const { reactionId } = req.params;
    try {
      const reaction = await Reaction.findById(reactionId);
      if (!reaction) {
        return res.status(404).json({ error: 'Reaction not found' });
      }
      res.status(200).json(reaction);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Update a reaction by ID
  updateReaction: async (req, res) => {
    const { reactionId } = req.params;
    try {
      const reaction = await Reaction.findByIdAndUpdate(reactionId, req.body, { new: true });
      if (!reaction) {
        return res.status(404).json({ error: 'Reaction not found' });
      }
      res.status(200).json(reaction);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Delete a reaction by ID
  deleteReaction: async (req, res) => {
    const { reactionId } = req.params;
    try {
      console.log("Deleting a reaction by ID...");
      
      const reaction = await Reaction.findByIdAndRemove(reactionId);
      if (!reaction) {
        return res.status(404).json({ error: 'Reaction not found' });
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
};

module.exports = ReactionController;