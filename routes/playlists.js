const express = require('express');
const Playlist = require('../models/Playlist');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// creat a new playlist
router.post('/', authMiddleware, async (req, res) => {
    const { name, songs } = req.body;
    try {
        const playlist = new Playlist({
            name, 
            user: req.user,
            songs: songs || []
        });
        await playlist.save();
        res.status(201).json({ playlist, message: 'Playlist created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Sever error: ' + err.message });
    }
});

// get all playlist for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const playlist = await Playlist.find({ user: req.user }).populate('user',
            'username email'
        );
        res.json(playlist);
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});

// update a playlist
router.put('/:id', authMiddleware, async (req, res) => {
    const { name, songs } = req.body;
    try {
        const playlist = await Playlist.findById(req.params.id);
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }
        if (playlist.user.toString() !== req.user) {
            return res.status(403).json({ message: 'Not authorized to update this playlist' });
        }
        playlist.name = name || playlist.name;
        playlist.song = songs || playlist.songs;
        await playlist.save();
        res.json({ playlist, message: 'Playlist updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});

// delete a playlist
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id);
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
    }
    if (playlist.user.toString() !== req.user) {
      return res.status(403).json({ message: 'Not authorized to delete this playlist' });
    }
    await playlist.remove();
    res.json({ message: 'Playlist deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

module.exports = router;