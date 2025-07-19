const express = require('express');
const Song = require('../models/Song');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Get song Recommendation based on mood and optional genre
router.get('/', authMiddleware, async (req, res) => {
    const { mood, genre } = req.query;
    try {
        // Validate mood
        if (!mood) {
            return res.status(400).json({ message: 'Mood is required' });
        }
        if (!['Happy', 'Sad', 'Energetic', 'Calm', 'Romantic'].includes(mood)) {
            return res.status(400).json({ message: 'Invalid mood' });
        }

        // Build query
        const query = { mood };
        if (genre) {
            query.genre = genre;
        }

        // Fetch songs
        const songs = await Song.find(query).limit(10); // Limit to 10 songs
        if (songs.length === 0) {
            return res.status(404).json({ message: 'No songs found for this mood/genre' });
        }

        res.json({ songs, message: 'Recommendation fetched successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' + err.message });
    }
});

module.exports = router;