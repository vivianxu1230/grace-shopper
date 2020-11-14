import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_USER_CART = 'GET_USER_CART'
const CHECKOUT = 'CHECKOUT'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_CART_PRODUCT = 'DELETE_CART_PRODUCT'

/**
 * INITIAL STATE
 */
const cart = {}

/**
 * ACTION CREATORS
 */
const getUserCart = userCart => ({type: GET_USER_CART, userCart})

const checkout = () => ({type: CHECKOUT})

const addToCart = product => ({
  type: ADD_TO_CART,
  product
})

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
    await axios.put('/api/cart/checkout')
    dispatch(checkout())
  } catch (err) {
    console.error(err)
  }
}

export const addItemThunk = productId => async dispatch => {
  try {
    await axios.put(`/api/cart/add/${productId}`)
    const {data} = await axios.get(`/api/products/${productId}`)
    dispatch(addToCart(data[0]))
  } catch (err) {
    console.error(err)
  }
}

export const deleteThunk = productId => async dispatch => {
  try {
    console.log(productId)
    await axios.put(`/api/cart/delete/${productId}`)
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
      return {}
    case ADD_TO_CART:
      return {...state, products: [...state.products, action.product]}
    case DELETE_CART_PRODUCT:
      return {
        ...state,
        products: {...state}.products.filter(
          product => product.id !== action.productId
        )
      }
    default:
      return state
  }
}
