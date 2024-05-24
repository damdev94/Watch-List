const mongoose = require("mongoose")

const bookmarkSchema = new mongoose.Schema({
  comment: String,
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true},
  listId: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true}
})

module.exports = mongoose.model('Bookmark', bookmarkSchema);
