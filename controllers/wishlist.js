const Wishlist = require('../models/Wishlist')
const { StatusCodes } = require('http-status-codes')

const getAllWishlist = async (req, res) => {
  const wishlists = await Wishlist.find({ createdBy: req.user.userId }).sort(
    'createdAt'
  )

  res.status(StatusCodes.OK).json({ wishlists, count: wishlists.length })
}

const addWishlist = async (req, res) => {
  req.body.movie_data.createdBy = req.user.userId

  const wish = await Wishlist.create(req.body.movie_data)

  /*const wishlists = await Wishlist.find({ createdBy: req.user.userId }).sort(
    'createdAt'
  )

  res.status(StatusCodes.OK).json({ wishlists, count: wishlists.length })*/

  res.status(StatusCodes.CREATED).json({ wish })
}

const deleteWishlist = async (req, res) => {
  //console.log(req.params.id)
  const wish = await Wishlist.findOne({
    movie_id: req.params.id,
    createdBy: req.user.userId
  })
  //console.log(wish)
  const wishlist = await Wishlist.findByIdAndDelete({
    _id: wish._id,
    createdBy: req.user.userId
  })

  /*const wishlists = await Wishlist.find({ createdBy: req.user.userId }).sort(
    'createdAt'
  )

  res.status(StatusCodes.OK).json({ wishlists, count: wishlists.length })*/

  res.status(StatusCodes.OK).json({ wishlist })
}

module.exports = {
  getAllWishlist,
  addWishlist,
  deleteWishlist
}
