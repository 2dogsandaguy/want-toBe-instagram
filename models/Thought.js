const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  });
  
  // Define the Reaction schema within the Thought schema
  
const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema], // Refer to Reaction schema
});

// Create a virtual called reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

function dateFormat(timestamp) {
  return new Date(timestamp).toLocaleString();
}

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;