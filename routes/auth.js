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

    const serialized = serialize("accessToken", accessToken, {
      httpOnly: true, // solo accesible por HTTP
      secure: true, // solo accesible por HTTPS
      sameSite: "lax", // solo accesible en localhost
      maxAge: 1000 * 60 * 60 * 24, // 1 dia
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    return res.status(200).json({ accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Perfil
router.get("/profile", async (req, res) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const validToken = jwt.verify(accessToken, "secret");
    return res.json({ validToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  const { accessToken } = req.cookies;

  console.log("Token de acceso actual:", accessToken);

  if (!accessToken) {
    console.log("No se encontró ningún token de acceso en las cookies");
    return res.status(401).json({ message: "No token" });
  }

  try {
    jwt.verify(accessToken, "secret");
    const serialized = serialize("accessToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    console.log("Token de acceso verificado, eliminando la cookie");

    res.setHeader("Set-Cookie", serialized);
    console.log("Cookie de acceso eliminada con éxito");

    return res.json({ message: "Sesión cerrada" });
  } catch (err) {
    console.log("Error al verificar el token de acceso:", err);
    return res.status(500).json(err);
  }
});
export default router;
