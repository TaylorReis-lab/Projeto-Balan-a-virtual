import Sequelize from 'sequelize'
import dbConfig from '../config/database.mjs'

import Weight from '../app/models/weight.mjs'
import Supplier from '../app/models/supplier.mjs'

const connection = new Sequelize(dbConfig)

Weight.init(connection)
Supplier.init(connection)

Weight.associate(connection.models)
Supplier.associate(connection.models)

export default connection
