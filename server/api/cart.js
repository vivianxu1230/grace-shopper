const router = require('express').Router()
const {Product, Order, OrderItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.session.passport.user,
        status: 'Cart'
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
        status: 'Cart'
      },
      include: Product
    })
    const newOrder = await Order.create({
      userId: req.session.passport.user,
      status: 'Received',
      address: cart.address,
      paymentInfo: cart.paymentInfo
    })
    //create order item that is associated with newOrder.id and productId
    const cartItems = cart.products
    for (let i = 0; i < cart.products.length; i++) {
      cartItems[i].update({quantity: 0})
      const currentProductId = cartItems[i].id
      const orderItem = await OrderItem.findOne({
        where: {productId: currentProductId}
      })
      console.log(orderItem)
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
    const item = await Product.findOne({
      where: {
        id: req.params.productId
      }
    })
    item.update({onHold: true})
    const order = await Order.findOne({
      where: {
        userId: req.session.passport.user,
        status: 'Cart'
      }
    })
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
    const item = await Product.findOne({
      where: {
        id: req.params.productId
      }
    })
    item.update({onHold: false})
    const cart = await Order.findOne({
      where: {
        userId: req.session.passport.user,
        status: 'Cart'
      },
      include: Product
    })
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
