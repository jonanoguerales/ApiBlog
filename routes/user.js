import express from "express";
import User from "../models/User.js";

const router = express.Router();

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true } // para que actualice tmb en la base de datos
    );
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
