const mongoose = require('mongoose')

const WishListSchema = new mongoose.Schema(
  {
    movie_id: {
      type: Number,
      required: true
    },

    movie_name: {
      type: String,
      required: true
    },

    poster_path: {
      type: String,
      required: true
    },

    movie_vote: {
      type: Number,
      required: true
    },

    release_date: {
      type: String,
      required: true
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user']
    }
  },

  { timestamps: true }
)

module.exports = mongoose.model('Wishlist', WishListSchema)
