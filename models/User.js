import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "El nombre de usuario es obligatorio"],
      unique: true,
    },
    nombre: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordSec: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
      required: false,
    },
    profilePic: {
      type: String,
      default: "/usu.webp",
    },
    role: {
      type: String,
      default: "user",
    },
    numPosts: {
      type: Number,
      default: "0",
    },
    numComentarios: {
      type: Number,
      default: "0",
    },
    numLikes: {
      type: Number,
      default: "0",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
