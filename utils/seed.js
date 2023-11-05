//seed.js 
const User = require('../models/User'); // Import your User model
const Thought = require('../models/Thought'); // Import your Thought model

const seedData = async () => {
  let retryCount = 0;
  const maxRetries = 3; // Set a maximum number of retries

  while (retryCount < maxRetries) {
    try {
      // Sample users
      console.log('Creating users...');
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
          username: users[0]._id,
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
          username: users[1]._id,
          reactions: [{ reactionBody: 'I like this!', username: users[0]._id }],
        },
      ]);

      console.log('Sample data seeded successfully.');
      break; // If successful, break out of the loop
    } catch (error) {
      console.error('Error seeding data:', error);
      retryCount++;
      if (retryCount < maxRetries) {
        console.log('Retrying data seeding in a few seconds...');
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before retrying
      } else {
        console.error('Max retry attempts reached. Data seeding failed.');
      }
    }
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
