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
    const {data} = await axios.get('/api/cart')
    dispatch(getUserCart(data))
  } catch (err) {
    console.error(err)
  }
}

export const checkoutThunk = () => async dispatch => {
  try {
    await axios.put('api/cart/checkout')
    dispatch(checkout())
  } catch (err) {
    console.error(err)
  }
}

export const deleteThunk = productId => async dispatch => {
  try {
    await axios.put(`/api/cart/delete/4`)
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
      return state.products.filter(product => product.id !== action.productId)
    default:
      return state
  }
}
