import express from "express";
import Comments from "../models/Comments.js";
import User from "../models/User.js";

const router = express.Router();

// POST
router.post("/", async (req, res) => {
  try {
    const newComment = new Comments(req.body);
    const id_user = newComment.id_user;
    const savedComment = await newComment.save();
    await User.findByIdAndUpdate(id_user, { $inc: { numComentarios: +1 } });
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET
router.get("/", async (req, res) => {
  try {
    const comments = await Comments.find();
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
