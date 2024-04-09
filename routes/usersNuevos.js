const router = require('express').Router()
const UsersNuevos = require('../models/UsersNuevos')

router.post('/', async (req, res) => {
  const newUsersNuvos = new UsersNuevos(req.body)
  try {
    const savedTotal = await newUsersNuvos.save()
    res.status(200).json(savedTotal)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updatetotalUsers = await UsersNuevos.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    )
    res.status(200).json(updatetotalUsers)
  } catch (err) {
    res.status(500).json(err)
  };
})

router.get('/', async (req, res) => {
  try {
    const totalUsers = await UsersNuevos.find()
    res.status(200).json(totalUsers)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
