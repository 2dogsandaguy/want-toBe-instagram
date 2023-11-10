// seed.js
const User = require('../models/User'); // Import your User model
const Thought = require('../models/Thought'); // Import your Thought model
const db = require('../config/connect')

db.on ("error", (err) => console.error(err));

db.once("open",async () =>{
  
  console.log("datbase open");

  // Drop existing collections
  await User.collection.drop();
  await Thought.collection.drop();

  console.log('Collections dropped');

  const sampleUsers = [
    {
      username: 'user1',
      email: 'user1@example.com',
    },
    {
      username: 'user2',
      email: 'user2@example.com',
    },
  ];
  
  const sampleThoughts = [
    {
      thoughtText: 'This is the first thought.',
      reactions: [
        { username: 'user1', reactionBody: 'Wow, this is great!' },
        { username: 'user2', reactionBody: 'I agree with this.' },
      ],
    },
    {
      thoughtText: 'Another thought by user1.',
      reactions: [{ username: 'user1', reactionBody: 'Some reaction.' }],
    },
    {
      thoughtText: 'A thought by user2.',
      reactions: [{ username: 'user2', reactionBody: 'I like this!' }],
    },
  ];
  
 
  const seedData = async () => {
    try {
      console.log('Creating users...');
      const usersResult = await User.insertMany(sampleUsers);
      const users = usersResult;

      console.log('Users created:', users);
  
      console.log('Creating thoughts...');
    for (let i = 0; i < sampleThoughts.length; i++) {
    const userIndex = i % users.length;
    if (!users[userIndex]) {
    console.error('Error assigning username to thought:', 'User not found');
    continue;
  }
  sampleThoughts[i].username = users[userIndex].username;
  console.log(`Thought ${i + 1}:`, sampleThoughts[i]);
}

const thoughtsResult = await Thought.insertMany(sampleThoughts);
const thoughts = thoughtsResult;

console.log('Sample data seeded successfully.');


    } catch (error) {
      console.error('Error seeding data:', error);
      if (error.code === 11000) {
        console.error('Duplicate key error. Check for duplicate data in the database.');
      } else {
        console.error('Unknown error occurred. Check your database connection and server.');
      }
    }
  };
  await seedData ()
  console.log('end of 18')
  
  process.exit(0);
  
})



