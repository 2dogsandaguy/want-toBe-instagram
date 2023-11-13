const Thought = require('../models/Thought'); // Import the Thought model
const User = require('../models/User'); // Import the User model
const ThoughtController = {
  // Create a new thought
createThought: async (req, res) => {
  try {
    // Create a new thought using the data sent in the request.
    const thought = new Thought(req.body);

    // Save the new thought to the database.
    await thought.save();

    /* // Populate the reactions field after saving the thought.
    await thought.populate("reactions").execPopulate();  */

    // Update the user with the new thought.
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { thoughts: thought._id } },
      { new: true }
    );

    
console.log('Found user:', user);
    if (!user) {
      return res
        .status(404)
        .json({ message: 'Post created, but found no user with that ID' });
    }

    // Send a response to indicate that the thought was created.
    res.status(201).json(thought);
  } catch (error) {
    // If there's an error, send a response with an error message.
    res.status(400).json({ error: error.message });
  }
},


  // Get a list of all thoughts
  getAllThoughts: async (req, res) => {
    try {
      // Retrieve a list of all thoughts from the database.
      const thoughts = await Thought.find().populate("reactions");

      // Send the list of thoughts as a response.
      res.status(200).json(thoughts);
    } catch (error) {
      // If there's an error, send a response with a generic error message.
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Get a specific thought by ID
  getThoughtById: async (req, res) => {
    const { thoughtId } = req.params;
    try {
      // Find a thought by its unique ID.
      const thought = await Thought.findById(thoughtId);

      // Check if the thought exists.
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }

      // Send the specific thought's information as a response.
      res.status(200).json(thought);
    } catch (error) {
      // If there's an error, send a response with a generic error message.
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Update a thought by ID
  updateThought: async (req, res) => {
    const { thoughtId } = req.params;
    try {
      // Find and update a thought's information by its unique ID.
      const thought = await Thought.findByIdAndUpdate(thoughtId, req.body, { new: true });

      // Check if the thought exists.
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }

      // Send the updated thought's information as a response.
      res.status(200).json(thought);
    } catch (error) {
      // If there's an error, send a response with a generic error message.
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Delete a thought by ID
  deleteThought: async (req, res) => {
    const { thoughtId } = req.params;
    try {
      // Find and remove a thought by its unique ID.
      const thought = await Thought.findByIdAndRemove(thoughtId);

      // Check if the thought exists.
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }

      // Send a response to indicate that the thought was deleted.
      res.status(200).json({ message: "Thought deleted you're welcome !! "});
    } catch (error) {
      // If there's an error, send a response with a generic error message.
      res.status(500).json({ error: 'Server error' });
    }
  },
  getAllReactions: async (req, res) => {
    try {
      console.log("Fetching all reactions...");

      const thoughtsWithReactions = await Thought.find({ reactions: { $exists: true, $not: { $size: 0 } } })
        .populate({
          path: 'reactions',
          select: '-thoughtId',
        });

      const allReactions = thoughtsWithReactions.reduce((reactions, thought) => {
        reactions.push(...thought.reactions);
        return reactions;
      }, []);
      console.log('All reactions:', allReactions);
      res.status(200).json(allReactions);
    } catch (error) {
      console.error('Error fetching reactions:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },
};

module.exports = ThoughtController;
