/* // seed.js
const User = require('../models/User'); // Import your User model
const Thought = require('../models/Thought'); // Import your Thought model
const db = require('../config/connect')








db.once("open",async () =>{
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
        { reactionBody: 'Wow, this is great!' },
        { reactionBody: 'I agree with this.' },
      ],
    },
    {
      thoughtText: 'Another thought by user1.',
    },
    {
      thoughtText: 'A thought by user2.',
      reactions: [{ reactionBody: 'I like this!' }],
    },
  ];
  
  const seedData = async () => {
    try {
      console.log('Creating users...');
      const users = await User.create(sampleUsers);
      console.log('Users created:', users);
  
      console.log('Creating thoughts...');
      for (let i = 0; i < sampleThoughts.length; i++) {
        sampleThoughts[i].username = users[i % users.length]._id;
      }
      const thoughts = await Thought.create(sampleThoughts);
  
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
  
  
})

 */

// Import your models
const User = require('../models/User');
const Thought = require('../models/Thought');

// Define sample data
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
      { reactionBody: 'Wow, this is great!' },
      { reactionBody: 'I agree with this.' },
    ],
  },
  {
    thoughtText: 'Another thought by user1.',
  },
  {
    thoughtText: 'A thought by user2.',
    reactions: [{ reactionBody: 'I like this!' }],
  },
];

// Create a function to seed the data
const seedData = async () => {
  try {
    console.log('Creating users...');
    
    // Use insertMany to create multiple users at once
    const users = await User.insertMany(sampleUsers);
    console.log('Users created:', users);

    console.log('Creating thoughts...');
    
    // Map thoughts to users in a round-robin fashion
    const thoughtsToCreate = sampleThoughts.map((thought, index) => ({
      ...thought,
      username: users[index % users.length]._id,
    }));

    // Use insertMany to create multiple thoughts at once
    const thoughts = await Thought.insertMany(thoughtsToCreate);
    console.log('Thoughts created:', thoughts);

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

// Call the seedData function to start the seeding process
seedData();

