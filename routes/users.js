import express from "express";
import User from "../models/User.js";
const router = express.Router();

// GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
