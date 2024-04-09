const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

// router.post para crear
// router.put para actualizar
// router.delete para borrar
// router.get para obtener data

// Registro
router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10) // Genera el hash
    const hashedPass = await bcrypt.hash(req.body.password, salt) // Aplica el hash a la passwd y la encrypta
    const hashedPassSec = await bcrypt.hash(req.body.passwordSec, salt)
    const newUser = new User({
      username: req.body.username,
      nombre: req.body.nombre,
      email: req.body.email,
      password: hashedPass,
      passwordSec: hashedPassSec,
      telefono: req.body.telefono

    })
    const user = await newUser.save() // Guarda el usuario en la BD
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) { return res.status(400).json('Usuario incorrecto') }

    const validated = await bcrypt.compare(req.body.password, user.password)
    if (!validated) { return res.status(400).json('Contraseña incorrecta') }

    const { password, ...others } = user._doc
    res.status(200).json(others)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
