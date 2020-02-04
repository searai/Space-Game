const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const highScoreSchema = new Schema({
  user: String,
  score: Number,
});

const highScore = mongoose.model('highscores', highScoreSchema );

module.exports =  highScore