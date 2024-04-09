const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    nombre: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    passwordSec: {
      type: String,
      required: true
    },
    telefono: {
      type: String,
      required: true,
      unique: true
    },
    profilePic: {
      type: String,
      default: 'usu.jpg',
      required: true
    },
    role: {
      type: String,
      default: 'user'
    },
    numPosts: {
      type: Number,
      default: '0'
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)
