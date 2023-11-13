const User = require('../models/User'); // Import your User model
const Thought = require('../models/Thought'); // Import your Thought model

const seedData = async () => {
  try {
    // Sample users
    console.log('Creating users...')
    const users = await User.create([
      {
        username: 'user1',
        email: 'user1@example.com',
      },
      {
        username: 'user2',
        email: 'user2@example.com',
      },
    ]);
    console.log('Users created:', users);

    // Sample thoughts with reactions
    const thoughts = await Thought.create([
      {
        thoughtText: 'This is the first thought.',
        username: users[0]._id, // Assign the user's _id
        reactions: [
          { reactionBody: 'Wow, this is great!', username: users[0]._id },
          { reactionBody: 'I agree with this.', username: users[1]._id },
        ],
      },
      {
        thoughtText: 'Another thought by user1.',
        username: users[0]._id,
      },
      {
        thoughtText: 'A thought by user2.',
        username: users[1]._id, // Assign the user's _id
        reactions: [{ reactionBody: 'I like this!', username: users[0]._id }],
      },
    ]);

    console.log('Sample data seeded successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seedData();
