import bodyParser from 'body-parser'
import cors from 'cors'

export default (app) => {
  app.use(cors({ origin: 'http://127.0.0.1:5500' }))
  app.use(bodyParser.json())
}
