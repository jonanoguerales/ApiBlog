const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    desc: {
      type: String,
      required: true
    },
    photo: {
      type: String,
      default: 'defecto.jpg',
      required: false
    },
    username: {
      type: String,
      required: true
    },
    id_user: {
      type: String,
      required: false
    },
    categories: {
      type: String,
      required: true,
      enum: ['Viajes', 'Terror', 'Interesantes', 'Música', 'Comedia', 'Misteriosos', 'Anime', 'Videojuegos', 'Romance', 'Bélica'] // Para definir las categorias que solo se pueden crear
    }
  },
  { timestamps: true } // Para documento se crea un campo para ver cuando se ha generado y se ha actualizado
)

module.exports = mongoose.model('Post', PostSchema) // Post nombre de la coleccion
