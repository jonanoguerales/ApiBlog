import express from "express"; // Iniciar servidor backend
const app = express(); // Iniciar aplicacion de servidor
import dotenv from "dotenv"; // Para ocultar credenciales
import mongoose from "mongoose"; // Para conectar con base de datos
import path from "path";
import cors from "cors";

// Routes
import usersRoute from "./routes/users.js"; // Para conectar con base de datos
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js"; // Para conectar con base de datos
import postRoute from "./routes/post.js"; // Para conectar con base de datos
import postsRoute from "./routes/posts.js";
import commentsRoute from "./routes/comments.js";
import visitasRoute from "./routes/visitas.js";
import usersNuevosRoute from "./routes/usersNuevos.js";
import categoryRoute from "./routes/categories.js"; // Para conectar con base de datos

const corsOptions = {
  origin: "https://blog-cook.vercel.app",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

import { MongoClient, ServerApiVersion } from "mongodb";
const uri =
  "mongodb+srv://Ordenador12:Ordenador12@nvo.7shohhw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Conectado a mongo");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

dotenv.config();
app.use(express.json());
app.use(
  "/images",
  express.static(path.join(new URL(".", import.meta.url).pathname, "images"))
);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Conectado a mongo"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/user", userRoute);
app.use("/api/posts", postsRoute);
app.use("/api/post", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/visitas", visitasRoute);
app.use("/api/usersNuevos", usersNuevosRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto " + PORT);
});
