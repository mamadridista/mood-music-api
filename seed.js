const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Song = require('./models/Song');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const songs = [
  {
    title: 'Happy Song',
    artist: 'Artist One',
    genre: 'Pop',
    mood: 'Happy',
    duration: 180
  },
  {
    title: 'Sad Melody',
    artist: 'Artist Two',
    genre: 'Classical',
    mood: 'Sad',
    duration: 200
  },
  {
    title: 'Energetic Beat',
    artist: 'Artist Three',
    genre: 'Electronic',
    mood: 'Energetic',
    duration: 220
  },
  {
    title: 'Calm Vibes',
    artist: 'Artist Four',
    genre: 'Jazz',
    mood: 'Calm',
    duration: 190
  },
  {
    title: 'Romantic Tune',
    artist: 'Artist Five',
    genre: 'Pop',
    mood: 'Romantic',
    duration: 210
  }
];

const seedDB = async () => {
  try {
    await Song.deleteMany({});
    console.log('Cleared existing songs');
    await Song.insertMany(songs);
    console.log('Seeded songs successfully');
    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();