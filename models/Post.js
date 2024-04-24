import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: "defecto.jpg",
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    id_user: {
      type: String,
      required: false,
    },
    categories: {
      type: String,
      required: true,
      enum: ["Carne", "Pescado", "Pasta", "Verduras", "Ensaladas", "Postres"], // Para definir las categorias que solo se pueden crear
    },
    numLikes: {
      type: Number,
      default: 0,
    },
    bg: {
      type: String,
      default: "bg-indigo-50",
      required: false,
    },
  },
  { timestamps: true } // Para documento se crea un campo para ver cuando se ha generado y se ha actualizado
);

export default mongoose.model("Post", PostSchema); // Post nombre de la coleccion
