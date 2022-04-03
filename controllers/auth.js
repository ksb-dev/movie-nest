const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

const register = async (req, res) => {
  // Check for name, email and password
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Please fill all above fields' })
    return
  }

  // Check for email already exists
  const isEmailExists = await User.findOne({ email })

  if (isEmailExists) {
    res.status(StatusCodes.CONFLICT).json({ message: 'Email already exists' })
    return
  }

  // Create User
  const user = await User.create({ ...req.body })

  // Create Token
  const token = user.createJWT()

  // Send Response
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Please fill all above fields' })
    return
  }

  const user = await User.findOne({ email })

  if (!user) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'This email does not exist' })
    return
  }

  const isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Incorrect Password' })
    return
  }

  const token = user.createJWT()

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = {
  register,
  login
}
