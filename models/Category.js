const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema( // schema clase para generar la estructura de los documentos que vamos extrayendo de la base de datos
  {
    name: { // objeto y sus tipos propios de mongoose para dar formato
      type: String,
      required: true,
      unique: true
    },
    total: {
      type: Number,
      required: false

    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Category', CategorySchema)
