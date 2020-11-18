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
