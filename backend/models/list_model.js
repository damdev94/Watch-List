const mongoose = require("mongoose")

const listSchema = new mongoose.Schema({
  name: String,
  image: String,
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie"}]
})

module.exports = mongoose.model('List', listSchema);
