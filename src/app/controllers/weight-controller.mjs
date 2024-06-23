import { Weight } from '../models/index.mjs'

// Função para obter todos os pesos
export const getAllWeights = async (req, res) => {
  try {
    const weights = await Weight.findAll()
    res.json(weights)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weights' })
  }
}

// Função para criar um novo peso
export const createWeight = async (req, res) => {
  try {
    const weight = await Weight.create(req.body)
    res.status(201).json(weight)
  } catch (error) {
    res.status(500).json({ error: 'Error creating weight' })
  }
}

// Função para obter um peso por ID
export const getWeightById = async (req, res) => {
  try {
    const weight = await Weight.findByPk(req.params.id)
    if (weight) {
      res.json(weight)
    } else {
      res.status(404).json({ error: 'Weight not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weight' })
  }
}

// Função para atualizar um peso
export const updateWeight = async (req, res) => {
  try {
    const weight = await Weight.findByPk(req.params.id)
    if (weight) {
      await weight.update(req.body)
      res.json(weight)
    } else {
      res.status(404).json({ error: 'Weight not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating weight' })
  }
}

// Função para deletar um peso
export const deleteWeight = async (req, res) => {
  try {
    const weight = await Weight.findByPk(req.params.id)
    if (weight) {
      await weight.destroy()
      res.json({ message: 'Weight deleted' })
    } else {
      res.status(404).json({ error: 'Weight not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting weight' })
  }
}
