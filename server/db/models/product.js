const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    validate: {
      notEmpty: true,
      min: 1.0
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 0,
      max: 1
    }
  },
  onHold: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  category: {
    type: Sequelize.STRING,
    defaultValue: 'tops',
    allowNull: false,
    validate: {
      isIn: [['tops', 'bottoms', 'accessories', 'wholebody', 'shoes']]
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
  }
})

/**
 * classMethods
 */
Product.findItem = function(req, res, next) {
  return this.findByPk(req.params.productId)
}

module.exports = Product
