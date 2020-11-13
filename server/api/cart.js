const router = require('express').Router()
const {Product, Order, OrderItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.session.passport.user,
        orderStatus: 'Cart'
      },
      include: Product
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.put('/checkout', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.session.passport.user,
        orderStatus: 'Cart'
      },
      include: Product
    })
    cart.update({orderStatus: 'Received'})
    for (let i = 0; i < cart.products.length; i++) {
      cart.products[i].quantity = 0
    }
    await cart.save()
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Campus.destroy({
      where: {
        id: req.params.id
      }
    })
    res.sendStatus(204)
  } catch (err) {
    console.log('Error!:', err)
  }
})
