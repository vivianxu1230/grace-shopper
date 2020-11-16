const router = require('express').Router()
const {User} = require('../db/models')

module.exports = router

const adminsOnly = (req,res,next) => {
  if (!req.user.isAdmin) {
    const err = new Error('No access.')
    err.status = 401
    return next(err)
  }
  next()
}

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId
      },
      include: {all: true}
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId
      }
    })
    user.update({
      cart: []
    })
  } catch (err) {
    next(err)
  }
})

router.patch('/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId
      }
    })
    user.update({
      cart: req.body
    })
  } catch (err) {
    next(err)
  }
})

router.delete('/:userid', adminsOnly, (req, res, next) => { 
 req.User.destroy()
  .then(() => {
    res.status(204).end()
  })
  .catch(next) 
})

