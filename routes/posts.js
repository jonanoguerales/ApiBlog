import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// UPDATE POST con usuario
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true } // Guardar los datos en la base de datos directamente
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("Solo puedes modificar tu post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE POST con usuario
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("El post ha sido eliminado");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("Solo puedes eliminar tu post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all POST by category
router.get("/:category", async (req, res) => {
  try {
    const { category } = req.params;
    console.log(category);

    const posts = await Post.find({ categories: category });
    console.log(posts);
    res.json(posts);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener los posts de la categoría" });
  }
});

// GET ALL POST
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
