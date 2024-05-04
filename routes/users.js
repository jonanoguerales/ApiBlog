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

// UPDATE usuarios tablas
router.put("/:id", async (req, res) => {
  console.log(req.body);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } // para que actualice también en la base de datos
    );
    console.log(updatedUser);
    res.status(200).json({ updatedUser });
  } catch (err) {
    res.status(500).json("Error al actualizar el usuario");
  }
});
export default router;
