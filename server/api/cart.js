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
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

//create order if order doesn't exist (price, item.id)
//set order status to cart

router.put(`/add/:productId`, async (req, res, next) => {
  try {
    const item = await Product.findOne({
      where: {
        id: req.params.productId
      }
    })
    const order = await Order.findOrCreate({
      where: {
        userId: req.session.passport.user,
        orderStatus: 'Cart'
      }
    })
    await OrderItem.create({
      productId: item.id,
      price: item.price,
      orderId: order[0].id
    })
    res.sendStatus(204)
  } catch (err) {
    console.log('ERRORRRRR')
    next(err)
  }
})

router.put('/delete/:productId', async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findOne({
      where: {
        productId: req.params.productId
      }
    })

    await orderItem.update({productId: null})
    await orderItem.update({orderId: null})

    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
