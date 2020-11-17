const router = require('express').Router()
const {Order, Product, OrderItem} = require('../db/models')
module.exports = router
const {Op} = require('sequelize')

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const orders = await Order.findAll(
      {
        where: {
          userId: req.params.userId,
          status: {
            [Op.ne]: 'Cart'
          }
        }
      },
      {order: [['createdAt', 'DESC']]}
    )
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
