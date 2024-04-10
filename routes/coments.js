import express from "express";
import Coments from "../models/Coments.js";

const router = express.Router();

// POST
router.post("/", async (req, res) => {
  const newComent = new Coments(req.body);
  try {
    const savedComent = await newComent.save();
    res.status(200).json(savedComent);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET
router.get("/", async (req, res) => {
  try {
    const coments = await Coments.find();
    res.status(200).json(coments);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
