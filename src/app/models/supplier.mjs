import { DataTypes } from 'sequelize'
import sequelize from '../../config/database.mjs'

const Supplier = sequelize.define(
  'Supplier',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
)

export default Supplier
