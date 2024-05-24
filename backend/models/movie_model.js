const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema ({
  title: String,
  overview: String,
  poster_url: String,
  rating: Number
})

module.exports = mongoose.model('Movie', movieSchema)
