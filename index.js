import express from "express"; // Iniciar servidor backend
const app = express(); // Iniciar aplicacion de servidor
import dotenv from "dotenv"; // Para ocultar credenciales
import mongoose from "mongoose"; // Para conectar con base de datos
import multer from "multer";
import path from "path";
// const http = require('http')
// const { Server } = require('socket.io')
import cors from "cors";
import cookieParser from "cookie-parser";

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
  origin: "https://blogcook.onrender.com",
  credentials: true, // para permitir el envío de cookies
  optionsSuccessStatus: 200,
};
app.use(cookieParser());
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

/*
// socket conf
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:9200',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
})
let count = 0
io.on('connection', (socket) => {
  if (socket.id) {
    socket.emit('count', { count })
    count = count + 1
  }
}) */
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("El archivo a sido subido");
});

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
