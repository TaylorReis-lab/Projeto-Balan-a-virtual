import sequelize from '../../config/database.mjs'
import Supplier from './supplier.mjs'
import Weight from './weight.mjs'

const models = {
  Supplier,
  Weight,
}

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models)
  }
})

export { Supplier, Weight }
export default sequelize
