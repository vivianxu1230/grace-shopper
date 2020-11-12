const Sequelize = require('sequelize')
const db = require('../db')
// const Product = require('./product')

const Order = db.define('order', {
  orderStatus: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['Shipped', 'Processing', 'Received']]
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
