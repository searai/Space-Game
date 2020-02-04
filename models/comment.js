const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: String,
  body: String,
});

const Comment = mongoose.model('comments', commentSchema );

module.exports =  Comment