const express = require('express') // Iniciar servidor backend
const app = express() // Iniciar aplicacion en el servidor
const dotenv = require('dotenv') // Para ocultar credenciales
const mongoose = require('mongoose') // Para conectar con base de datos
const multer = require('multer')
const path = require('path')
// const http = require('http')
// const { Server } = require('socket.io')
const cors = require('cors')

// Routes
const authRoute = require('./routes/auth') // Para conectar con base de datos
const usersRoute = require('./routes/users')
const userRoute = require('./routes/user') // Para conectar con base de datos
const postsRoute = require('./routes/posts')// Para conectar con base de datos
const postRoute = require('./routes/post')
const commentsRoute = require('./routes/comments')
const visitasRoute = require('./routes/visitas')
const usersNuevosRoute = require('./routes/usersNuevos')
const categoryRoute = require('./routes/categories')// Para conectar con base de datos

const corsOptions = {
  origen: 'http://localhost:3001',
  optionsSuccessStatus: 200
}

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Ordenador12:Ordenador12@nvo.7shohhw.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.use(cors(corsOptions))

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

dotenv.config()
app.use(express.json())
app.use('/images', express.static(path.join(__dirname, '/images')))

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(console.log('Conectado a mongo'))
  .catch((err) => console.log(err))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name)
  }
})

const upload = multer({ storage })
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).json('El archivo a sido subido')
})

app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/user', userRoute)
app.use('/api/posts', postsRoute)
app.use('/api/post', postRoute)
app.use('/api/categories', categoryRoute)
app.use('/api/comments', commentsRoute)
app.use('/api/visitas', visitasRoute)
app.use('/api/usersNuevos', usersNuevosRoute)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log('Server Runnig')
})
