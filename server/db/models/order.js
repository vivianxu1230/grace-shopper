const {adminsOnly, adminsAndusers} = require('./index')
const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['Cart', 'Shipped', 'Processing', 'Received']]
    }
  },
  orderTotal: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0.0
  },
  paymentInfo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Order
