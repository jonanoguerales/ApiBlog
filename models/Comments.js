const mongoose = require('mongoose')

const CommentsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    id_post: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  },
  { timestamps: true } // Para documento se crea un campo para ver cuando se ha generado y se ha actualizado
)

module.exports = mongoose.model('Comments', CommentsSchema)
