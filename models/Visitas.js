const mongoose = require('mongoose')

const VisitasSchema = new mongoose.Schema( // schema clase para generar la estructura de los documentos que vamos extrayendo de la base de datos
  {
    total: { // objeto y sus tipos propios de mongoose para dar formato
      type: Number,
      required: false
    },
    totalDia: {
      type: Number,
      required: false
    },
    totalMes: {
      type: Number,
      required: false
    },
    totalAño: {
      type: Number,
      required: false
    }

  },
  { timestamps: true }
)

module.exports = mongoose.model('Visitas', VisitasSchema)
