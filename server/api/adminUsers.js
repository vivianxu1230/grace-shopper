const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router


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
      // attributes: {exclude: ['password', 'email', 'firstName', 'lastName', 'isAdmin']}
    })
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
      }
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})


router.put('/:userId', adminsOnly, async (req, res, next) => {

  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId
      }
    })
  } catch (err) {
    next(err)
  }
})


router.delete('/:userid', adminsOnly, async (req, res, next) => {
  try {
    const user = await User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

