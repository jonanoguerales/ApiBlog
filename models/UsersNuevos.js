import mongoose from "mongoose";

const UsersNuevosSchema = new mongoose.Schema( // schema clase para generar la estructura de los documentos que vamos extrayendo de la base de datos
  {
    usersTotal: {
      // objeto y sus tipos propios de mongoose para dar formato
      type: Number,
      required: false,
    },
    totalUsersDia: {
      type: Number,
      required: false,
    },
    totalUsersMes: {
      type: Number,
      required: false,
    },
    totalUsersAño: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);
export default mongoose.model("UsersNuevos", UsersNuevosSchema);
