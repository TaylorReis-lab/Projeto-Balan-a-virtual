import express from 'express'
import {
  getAllWeights,
  createWeight,
  getWeightById,
  updateWeight,
  deleteWeight,
} from '../app/controllers/weight-controller.mjs'

const weightRoutes = express.Router()

// Definindo as rotas e associando aos métodos do controlador
weightRoutes.get('/weights', getAllWeights)
weightRoutes.post('/weights', createWeight)
weightRoutes.get('/weights/:id', getWeightById)
weightRoutes.put('/weights/:id', updateWeight)
weightRoutes.delete('/weights/:id', deleteWeight)

export default weightRoutes
