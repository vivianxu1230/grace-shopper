const router = require('express').Router()
const {User, Product, Order, OrderItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cart = await User.findCart(req, res, next)
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.put('/checkout', async (req, res, next) => {
  try {
    const cart = await User.findCart(req, res, next)
    const newOrder = await Order.create({
      userId: req.user.id,
      status: 'Received',
      address: cart.address,
      paymentInfo: cart.paymentInfo
    })
    const cartItems = cart.products
    for (let i = 0; i < cartItems.length; i++) {
      cartItems[i].update({quantity: 0})
      const currentProductId = cartItems[i].id
      const orderItem = await OrderItem.findOne({
        where: {productId: currentProductId}
      })
      const product = await Product.findByPk(currentProductId)
      const price = product.price
      await orderItem.destroy()
      await OrderItem.create({
        productId: currentProductId,
        orderId: newOrder.id,
        price
      })
    }
    await cart.update({products: []})
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.put(`/add/:productId`, async (req, res, next) => {
  try {
    const item = await Product.findItem(req, res, next)
    item.update({onHold: true})
    const order = await User.findCart(req, res, next)
    await OrderItem.create({
      productId: item.id,
      price: item.price,
      orderId: order.id
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.put('/delete/:productId', async (req, res, next) => {
  try {
    const item = await Product.findItem(req, res, next)
    item.update({onHold: false})
    const cart = await User.findCart(req, res, next)
    cart.update({
      products: cart.products.filter(
        product => product.id !== req.params.productId
      )
    })
    const orderItem = await OrderItem.findOne({
      where: {
        productId: req.params.productId
      }
    })
    orderItem.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
