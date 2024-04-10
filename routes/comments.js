import express from "express";
import Comments from "../models/Comments.js";

const router = express.Router();

// POST
router.post("/", async (req, res) => {
  const newComment = new Comments(req.body);
  try {
    const savedComment = await newComment.save();
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
