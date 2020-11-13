const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')
const Product = require('./product')
const Order = require('./order')

const OrderItem = db.define('orderItem', {
  price: {
    type: Sequelize.DECIMAL(10, 2),
    alloNull: false,
    validate: {
      min: 1.0
    }
  }
})

Product.belongsToMany(Order, {through: 'OrderItem'})
Order.belongsToMany(Product, {through: 'OrderItem'})
User.hasMany(Order)
Order.belongsTo(User)

module.exports = {
  User,
  Product,
  Order,
  OrderItem
}
