const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

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
