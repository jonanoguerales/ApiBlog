const router = require('express').Router()
const Post = require('../models/Post')

// UPDATE POST
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    )
    res.status(200).json(updatedPost)
  } catch (err) {
    res.status(500).json(err)
  };
})

// DELETE POST
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    try {
      await post.delete()
      res.status(200).json('El post ha sido eliminado')
    } catch (err) {
      res.status(500).json(err)
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
