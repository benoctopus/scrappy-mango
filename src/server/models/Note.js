const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  created: {
    type: Number,
    required: true,
    default: () => new Date().getTime(),
  },
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
