const router = require('express').Router()
const {User} = require('../db/models')

const adminsOnly = (req, res, next) => {
  if (!req.user.isAdmin) {
    const err = new Error('No access.')
    err.status = 401
    return next(err)
  }
  next()
}

router.get('/', adminsOnly, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: {exclude: ['password', 'email', 'firstName', 'lastName', 'isAdmin']
    }})
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', adminsOnly, async (req, res, next) => {
  try {
    const user = await User.findOne({
      attributes: {exclude: ['password', 'email', 'firstName', 'lastName', 'isAdmin']
      },

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

      attributes: {exclude: ['password', 'email', 'firstName', 'lastName', 'isAdmin']
      },

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

module.exports = router