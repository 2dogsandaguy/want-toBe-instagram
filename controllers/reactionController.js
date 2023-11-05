const Reaction = require('../models/Thought'); // Import the Reaction model

const ReactionController = {
  // Create a new reaction
// Create a new reaction
createReaction: async (req, res) => {
  try {
    // Ensure you include the thoughtId in the request
    const { thoughtId } = req.body;

    // Create a new reaction using the data sent in the request.
    const reaction = new Reaction({
      ...req.body,
      thoughtId: thoughtId,
    });

    // Save the new reaction to the database.
    await reaction.save();

    // Send a response to indicate that the reaction was created.
    res.status(201).json(reaction);
  } catch (error) {
    // If there's an error, send a response with an error message.
    res.status(400).json({ error: error.message });
  }
},


  // Get a list of all reactions
  getAllReactions: async (req, res) => {
    try {
      const reactions = await Reaction.find();
      res.status(200).json(reactions);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
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