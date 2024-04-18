import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
const router = express.Router();

// router.post para crear
// router.put para actualizar
// router.delete para borrar
// router.get para obtener datas

// Registro
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10); // Genera el hash
    const hashedPass = await bcrypt.hash(req.body.password, salt); // Aplica el hash a la passwd y la encrypta
    const hashedPassSec = await bcrypt.hash(req.body.passwordSec, salt);
    const newUser = new User({
      username: req.body.username,
      nombre: req.body.nombre,
      email: req.body.email,
      password: hashedPass,
      passwordSec: hashedPassSec,
      telefono: req.body.telefono,
    });
    const user = await newUser.save(); // Guarda el usuario en la BD
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json("Usuario incorrecto");
    }

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      return res.status(400).json("Contraseña incorrecta");
    }

    if (username === user.username && password === user.password) {
      const accessToken = jwt.sign(
        {
          username: user.username,
          password: user.password,
        },
        process.env.JWT_SEC,
        { expiresIn: "1d" }
      );
      const serialized = serialize("accessToken", accessToken, {
        httpOnly: true, // para que no se pueda acceder desde el navegador
        secure: true, // para que solo se pueda acceder desde https
        sameSite: "none", // para que solo se pueda acceder desde la web en la que se ha iniciado sesión
        maxAge: 1000 * 60 * 60 * 24, // 1 dia
        path: "/",
      });

      res.setHeader("Set-Cookie", serialized);
      const { password, ...others } = user._doc;
      res.status(200).json({ ...others });
    }
    return res.status(400).json("Usuario o contraseña incorrecta");
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
