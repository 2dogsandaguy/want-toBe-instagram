//seed.js 
const User = require('../models/User'); // Import your User model
const Thought = require('../models/Thought'); // Import your Thought model

const seedData = async () => {
    console.log('Creating users...')
  try {
    // Sample users
    
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
 
/* // seed.js
const connection = require('../config/connect');
const { User } = require('../models'); // Import your User model
const { userData } = require('./seedData'); // Import the sample data

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Delete the collections if they exist (if needed)

  // Loop through the sample user data and insert it into the database
  for (const user of userData) {
    const newUser = new User(user);
    await newUser.save();
  } */

  // Other seeding logic for other data (if needed)

/*   console.info('Seeding complete! 🌱');
  process.exit(0);
}); */
