const router = require('express').Router()
const User = require('../models/User')
const Post = require('../models/Post')
const bcrypt = require('bcrypt')

// Post
router.post('/', async (req, res) => {
  const newUser = new User(req.body)
  try {
    const savedUser = await newUser.save()
    res.status(200).json(savedUser)
  } catch (err) {
    res.status(500).json(err)
  }
})

// UPDATE
router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) { // si el id del usuario == al de la url (logueado o visitante)
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10)
      req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    try {
      const updateUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, { new: true }// para que actualice tmb en la base de datos
      )
      res.status(200).json(updateUser)
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(401).json('Solo puedes modificar en tu cuenta')
  }
})
// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    try {
      await Post.deleteMany({ username: user.username }) // para tamb borrar todos sus posts
      await User.findByIdAndDelete(req.params.id) // para borrar el usuario
      res.status(200).json('El usuario ha sido eliminado')
    } catch (err) {
      res.status(500).json(err)
    }
  } catch {
    res.status(404).json('Usuario no encontrado')
  }
})

// GET USER
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, ...others } = user._doc // para que cunado devuelva el usuario no devuelva la password
    res.status(200).json(others)
  } catch (err) {
    res.status(500).json(err)
  }
})

// GET ALL USERS
router.get('/', async (req, res) => {
  try {
    const user = await User.find()
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
