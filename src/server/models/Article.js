const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  pid: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  subReddit: {
    type: String,
    required: true,
  },
  note: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note'
  },
  timestamp: {
    type: Number,
    required: true,
  },
  created: {
    type: Date,
    required: true,
    default: () => new Date().getTime(),
  },
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
