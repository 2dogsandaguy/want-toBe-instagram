const express = require('express');
const router = express.Router();
const ThoughtController = require('../../controllers/thoughtController');

// Create a new thought
router.post('/', ThoughtController.createThought);

// Get a list of all thoughts
router.get('/', ThoughtController.getAllThoughts);

// Get a specific thought by ID
router.get('/:thoughtId', ThoughtController.getThoughtById);

// Update a thought by ID
router.put('/:thoughtId', ThoughtController.updateThought);

// Delete a thought by ID
router.delete('/:thoughtId', ThoughtController.deleteThought);

module.exports = router;