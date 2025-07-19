const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Song title is required'],
        trim: true
    },
    artist: {
        type: String,
        required: [true, 'Artist is required'],
        trim: true
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        enum: ['Pop', 'Rock', 'Jazz', 'Classical', 'Hip-Hop', 'Electronic'],
    },
    mood: {
        type: String,
        required: [true, 'Mood is required'],
        enum: ['Happy', 'Sad', 'Energetic', 'Calm', 'Romantic'],
    },
    duration: {
        type: Number,
        required: [true, 'Duration is required'], //Duration in seconds
    },
    createdAt: {
        type: Date,
        default: Date.Now
    }
});

module.exports = mongoose.model('Song', songSchema);