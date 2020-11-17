const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

// const adminsOnly = (req, res, next) => {
//   if (!req.user.isAdmin) {
//     const err = new Error('No access.')
//     err.status = 401
//     return next(err)
//   }
//   next()
// }

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: {exclude: ['createdAt', 'updatedAt']}
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

//try and refactor with findbypk
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.productId
      },
      include: {all: true}
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.json(product))
    .catch(next)
})

router.patch('/:productId', async (req, res, next) => {
  try {
    await Product.update(req.body.product, {
      where: {
        id: req.params.productId
      }
    })

    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId', (req, res, next) => {
  Product.destroy({
    where: {
      id: req.params.productId
    }
  })
    .then(() => res.status(204).end())
    .catch(next)
  res.status(200)
})
