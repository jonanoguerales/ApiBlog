import mongoose from "mongoose";

const ComentsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    id_post: {
      type: String,
      required: true,
    },
    coment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Para documento se crea un campo para ver cuando se ha generado y se ha actualizado
);

export default mongoose.model("Coments", ComentsSchema);
