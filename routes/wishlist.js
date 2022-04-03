const express = require('express')
const router = express.Router()

const {
  getAllWishlist,
  addWishlist,
  deleteWishlist
} = require('../controllers/wishlist')

router.get('/', getAllWishlist)
router.post('/', addWishlist)
router.delete('/:id', deleteWishlist)

module.exports = router
