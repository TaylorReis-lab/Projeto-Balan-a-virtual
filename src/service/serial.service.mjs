import { SerialPort } from 'serialport'
import { ReadlineParser } from '@serialport/parser-readline'

const generateRandomData = () => {
  // Generate some random data
  return {
    id: Math.floor(Math.random() * 1000),
    weight: (Math.random() * 100).toFixed(2),
    timestamp: new Date().toISOString(),
    supplier: 'Supplier_' + Math.floor(Math.random() * 10),
    description: 'Sample description',
  }
}

const initializeSerialPorts = (io) => {
  SerialPort.list()
    .then((ports) => {
      const com1Available = ports.some((port) => port.path === 'COM1')
      const com2Available = ports.some((port) => port.path === 'COM2')

      if (!com1Available || !com2Available) {
        console.error('COM1 or COM2 not found among available ports.')
        process.exit(1)
      }

      const port1 = new SerialPort({ path: 'COM1', baudRate: 9600 })
      const port2 = new SerialPort({ path: 'COM2', baudRate: 9600 })

      const parser1 = port1.pipe(new ReadlineParser({ delimiter: '\r\n' }))
      const parser2 = port2.pipe(new ReadlineParser({ delimiter: '\r\n' }))

      setInterval(() => {
        const data = generateRandomData()
        port1.write(JSON.stringify(data) + '\n', (err) => {
          if (err) {
            console.error('Error writing to COM1:', err.message)
          }
        })
      }, 1000)

      parser1.on('data', async (data) => {
        try {
          const parsedData = JSON.parse(data)
          console.log('Data received from COM1:', parsedData)
          const { id, weight, timestamp, supplier, description } = parsedData
          await db.execute(
            'INSERT INTO weights (id, weight, timestamp, supplier, description) VALUES (?, ?, ?, ?, ?)',
            [id, weight, timestamp, supplier, description],
          )
          port2.write(JSON.stringify(parsedData) + '\n', (err) => {
            if (err) {
              console.error('Error writing to COM2:', err.message)
            }
          })
        } catch (err) {
          console.error('Error processing data from COM1:', err.message)
        }
      })

      parser2.on('data', (data) => {
        try {
          const parsedData = JSON.parse(data)
          console.log('Data received from COM2:', parsedData)
          io.emit('newData', parsedData)
        } catch (err) {
          console.error('Error processing data from COM2:', err.message)
        }
      })
    })
    .catch((err) => {
      console.error('Error listing ports:', err)
      process.exit(1)
    })
}

export default initializeSerialPorts
