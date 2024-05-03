import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
    const username = req.body.username.trim(); // Eliminar espacios al principio y al final
    const password = req.body.password.trim(); // Eliminar espacios al principio y al final

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json("Usuario incorrecto");
    }

    const validated = await bcrypt.compare(password, user.password);
    if (!validated) {
      return res.status(400).json("Contraseña incorrecta");
    }

    const accessToken = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
        id: user._id,
        role: user.role,
        username: user.username,
        picture: user.profilePic,
      },
      "secret"
    );

    return res.status(200).json({ accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Perfil
router.get("/profile", async (req, res) => {
  try {
    const { authorization } = req.headers;
    const accessToken = authorization.split(" ")[1];
    const accessToken1 = JSON.parse(accessToken).accessToken;

    if (!accessToken1) {
      return res.status(401).json({ message: "No token" });
    }
    const decodedToken = jwt.verify(accessToken1, "secret");
    console.log("Token válido:", decodedToken);
    return res.json({ validToken: decodedToken });
  } catch (err) {
    console.error("Error al verificar el token:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
});
export default router;
