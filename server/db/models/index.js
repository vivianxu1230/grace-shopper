const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')
const Product = require('./product')
const Order = require('./order')

const OrderItem = db.define('orderItem', {
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 1.0
    }
  }
})

Product.belongsToMany(Order, {through: OrderItem})
Order.belongsToMany(Product, {through: OrderItem})

User.hasMany(Order)
Order.belongsTo(User)

User.afterCreate(async user => {
  await Order.findOrCreate({
    where: {
      userId: user.id,
      status: 'Cart',
      paymentInfo: '123',
      address: '123'
    }
  })
})

module.exports = {
  User,
  Product,
  Order,
  OrderItem
}
