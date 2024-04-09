const router = require('express').Router()
const Visitas = require('../models/Visitas')

router.post('/', async (req, res) => {
  const newVisita = new Visitas(req.body)
  try {
    const savedVisita = await newVisita.save()
    res.status(200).json(savedVisita)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updatedVisita = await Visitas.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    )
    res.status(200).json(updatedVisita)
  } catch (err) {
    res.status(500).json(err)
  };
})

router.get('/', async (req, res) => {
  try {
    const visitas = await Visitas.find()
    res.status(200).json(visitas)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
