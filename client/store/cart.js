import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_USER_CART = 'GET_USER_CART'
const CHECKOUT = 'CHECKOUT'
const DELETE_CART_PRODUCT = 'DELETE_CART_PRODUCT'

/**
 * INITIAL STATE
 */
const cart = []

/**
 * ACTION CREATORS
 */
const getUserCart = userCart => ({type: GET_USER_CART, userCart})

const checkout = () => ({type: CHECKOUT})

const deleteCartProduct = productId => ({
  type: DELETE_CART_PRODUCT,
  productId
})

/**
 * THUNK CREATORS
 */
export const fetchCart = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    const productIdArray = res.data.cart
    let userCartArray = []
    for (let i = 0; i < productIdArray.length; i++) {
      const {data} = await axios.get(`/api/products/${productIdArray[i]}`)
      userCartArray.push(data[0])
    }
    dispatch(getUserCart(userCartArray))
  } catch (err) {
    console.error(err)
  }
}

export const checkoutThunk = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    const userId = res.data.id
    await axios.put(`/api//users/${userId}`)
    dispatch(checkout())
  } catch (err) {
    console.error(err)
  }
}

export const deleteThunk = productId => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    const userCartArray = res.data.cart
    const userId = res.data.id
    const newCart = userCartArray.filter(product => product.id !== productId)
    await axios.patch(`/api//users/${userId}`, newCart)
    dispatch(deleteCartProduct(productId))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = cart, action) {
  switch (action.type) {
    case GET_USER_CART:
      return action.userCart
    case CHECKOUT:
      return []
    case DELETE_CART_PRODUCT:
      return [...state].filter(product => product.id !== action.productId)
    default:
      return state
  }
}
