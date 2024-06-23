import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import middlewares from './app/middlewares/middlewares.mjs'
import sequelize from './config/database.mjs'
import weightRoutes from './routes/weight-routes.mjs'
import initializeSerialPorts from './service/serial.service.mjs'
import { Weight, Supplier } from './app/models/index.mjs'

class App {
  constructor() {
    this.app = express()
    this.server = http.createServer(this.app)
    this.io = new Server(this.server, {
      cors: {
        origin: 'http://127.0.0.1:5500',
        methods: ['GET', 'POST'],
      },
    })

    this.middlewares()
    this.routes()
    this.sockets()
    this.database()
    this.sendRandomData()
  }

  middlewares() {
    middlewares(this.app)
  }

  routes() {
    this.app.use('/api', weightRoutes)
  }

  sockets() {
    this.io.on('connection', (socket) => {
      console.log('New client connected')
      socket.on('disconnect', () => {
        console.log('Client disconnected')
      })
    })
  }

  database() {
    sequelize
      .authenticate()
      .then(() => console.log('Database connected successfully.'))
      .catch((err) => console.error('Unable to connect to the database:', err))
  }

  async generateRandomData() {
    const suppliers = ['Supplier A', 'Supplier B', 'Supplier C']
    return {
      id: Math.floor(Math.random() * 100),
      weight: (Math.random() * 100).toFixed(2),
      timestamp: new Date(),
      supplier_id: suppliers[Math.floor(Math.random() * suppliers.length)],
      description: 'Random description ' + Math.floor(Math.random() * 100),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

  async sendRandomData() {
    setInterval(async () => {
      const data = await this.generateRandomData()
      this.io.emit('newData', data) // Emitir os dados para os clientes conectados via Socket.IO

      await Weight.create({
        weight: parseFloat(data.weight),
        timestamp: data.timestamp,
        supplier_id: data.supplier_id,
        description: data.description,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      })
    }, 1000)
  }

  start(port) {
    this.server.listen(port, () => {
      console.log(`Server is running on port ${port}.`)
    })
    initializeSerialPorts(this.io)
  }
}

export default new App()
