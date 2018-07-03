
const mongoose = require('mongoose');

const SubRedditSchema = new mongoose.Schema({
  rid: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: () => new Date().getTime(),
  },
});

const SubReddit = mongoose.model('SubReddit', SubRedditSchema);

module.exports = SubReddit;
