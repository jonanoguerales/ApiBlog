import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";

const router = express.Router();

// CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  const id_user = newPost.id_user;
  try {
    const savedPost = await newPost.save();
    await User.findByIdAndUpdate(id_user, { $inc: { numPosts: +1 } });
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json("No se ha podido añadir el post", err);
  }
});

// GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const id_user = post.id_user;
    try {
      await post.delete();
      await User.findByIdAndUpdate(id_user, { $inc: { numPosts: -1 } });
      res.status(200).json("El post ha sido eliminado");
    } catch (err) {
      res.status(500).json("No se ha podido borrar el post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
