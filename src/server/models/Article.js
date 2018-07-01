const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  subReddit: {
    type: String,
    required: true,
  },
  note: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note'
  },
  created: {
    type: Number,
    required: true,
    default: () => new Date().getTime(),
  },
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
