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
  }
  // {
  //   hooks: {
  //     beforeCreate(cart) {
  //       cart.total = Product.findAll({
  //         where: {
  //           cartId: cart.id
  //         }
  //       })
  //     }
  //   }
  // }
)

Product.belongsToMany(Order, {through: 'Cart', as: 'cartId'})
Order.belongsToMany(Product, {through: 'Cart', as: 'cartId'})
User.hasMany(Order)
// Cart.hasMany(Product)
User.hasOne(Cart)

module.exports = {
  User,
  Product,
  Order,
  Cart
}
