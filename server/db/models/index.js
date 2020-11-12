const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')
const Product = require('./product')
const Order = require('./order')

const Cart = db.define(
  'Cart',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    total: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 1.0
    }
  },
  {
    hooks: {
      beforeCreate(cart) {
        cart.total = Product.findAll({
          where: {
            cartId: cart.id
          }
        })
      }
    }
  }
)

Product.belongsToMany(Order, {through: 'Cart'})
Order.belongsToMany(Product, {through: 'Cart'})
User.hasMany(Order)

module.exports = {
  User,
  Product,
  Order,
  Cart
}
