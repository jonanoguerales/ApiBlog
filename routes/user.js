import express from "express";
import User from "../models/User.js";
import Post from "../models/Post.js";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import bcrypt from "bcrypt";

const router = express.Router();

// Post
router.post("/", async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc; // para que cunado devuelva el usuario no devuelva la password
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    // Verificar si la contraseña fue actualizada para encriptarla.
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true } // para que actualice también en la base de datos
      );
      // Borrar la cookie antigua.
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
      });

      // Generar un nuevo token con los datos actualizados del usuario.
      const accessToken = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
          id: updatedUser._id,
          role: updatedUser.role,
          username: updatedUser.username,
          picture: updatedUser.profilePic,
        },
        "secret"
      );

      // Establecer la nueva cookie.
      const serialized = serialize("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        // maxAge no está presente, por lo que será una cookie de sesión
        path: "/",
      });

      res.setHeader("Set-Cookie", serialized);

      res.status(200).json(accessToken);
    } catch (err) {
      res.status(500).json("Error al actualizar el usuario");
    }
  } else {
    res.status(401).json("Solo puedes modificar tu cuenta");
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json("Usuario no encontrado");
    }

    try {
      if (req.user.id === req.params.id || req.user.role === "admin") {
        await Post.deleteMany({ username: user.username }); // para borrar todos sus posts
        await User.findByIdAndDelete(req.params.id); // para borrar el usuario

        // Para borrar la cookie de sesión del usuario
        res.clearCookie("accessToken", {
          httpOnly: true,
          secure: true,
          sameSite: "lax",
          path: "/",
        });

        res.status(200).json("El usuario ha sido eliminado");
      } else {
        res.status(401).json("No tienes permiso para realizar esta acción");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } catch {
    res.status(500).json("Error al buscar el usuario");
  }
});
export default router;
