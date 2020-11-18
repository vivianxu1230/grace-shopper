const router = require('express').Router()
const {Order, Product} = require('../db/models')
module.exports = router
const {Op} = require('sequelize')

const adminsOnly = (req,res,next) => {
  if (!req.user.isAdmin) {
    const err = new Error('No access.')
    err.status = 401
    return next(err)
  }
  next()
}

const adminsAndusers = (req,res,next) => {
  if (!req.user.isAdmin || req.user.userId !== req.params.userId) {
    const err = new Error('No access.')
    err.status = 401
    return next(err)
  }
  next()
}
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
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId,
        status: {
          [Op.ne]: 'Cart'
        }
      },
      include: Product
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
