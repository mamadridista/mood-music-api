const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Playlist name is required'],
        trim: true,
        maxlength: [100, 'Playlist name cannot exceed 100 characters']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    songs: [{
        title: { type: String, required: true },
        artist: { type: String, required: true },
        genre: { type: String },
        duration: { type: Number } // Duration in seconds
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Playlist', playlistSchema);