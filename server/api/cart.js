const router = require('express').Router()
const {User, Product, Order, OrderItem} = require('../db/models')
const stripe = require('stripe')(
  'sk_test_51HvwjSA1LtAlN3NJOKoDJSfhDlrUkO8pJrHOaLoFaF82LetH5RJPyyPPGgyA1mAcl08TQP9zkZ1BC2l2x6oqIp4800ZNHZl0Kw'
)

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cart = await User.findCart(req, res, next)
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.get('/test', async (req, res, next) => {
  try {
    const item = await Product.findByPk(2)
    const order = await User.findCart(req, res, next)
    res.json(typeof Number(item.price))
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
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Stubborn Attachments',
              images: ['https://i.imgur.com/EHyR2nP.png']
            },
            unit_amount: 2000
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: 'https://google.com',
      cancel_url: 'https://google.com'
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
    res.json({id: session.id})
  } catch (err) {
    next(err)
  }
})

router.put(`/add/:productId`, async (req, res, next) => {
  try {
    const item = await Product.findItem(req, res, next)
    await item.update({onHold: true})
    const order = await User.findCart(req, res, next)
    await order.update({orderTotal: order.orderTotal + Number(item.price)})

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
    await cart.update({
      products: cart.products.filter(
        product => product.id !== req.params.productId
      ),
      orderTotal: cart.orderTotal - item.price
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
