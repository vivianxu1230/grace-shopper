import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_USER_CART = 'GET_USER_CART'
const CHECKOUT = 'CHECKOUT'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_CART_PRODUCT = 'DELETE_CART_PRODUCT'
const GET_GUEST_CART = 'GET_GUEST_CART'
const ADD_TO_CART_GUEST = 'ADD_TO_CART_GUEST'
const DELETE_CART_PRODUCT_GUEST = 'DELETE_CART_PRODUCT_GUEST'

/**
 * INITIAL STATE
 */
const cart = {products: []}

/**
 * ACTION CREATORS
 */
const getUserCart = userCart => ({type: GET_USER_CART, userCart})

const addToCart = product => ({
  type: ADD_TO_CART,
  product
})

const deleteCartProduct = productId => ({
  type: DELETE_CART_PRODUCT,
  productId
})

const checkout = () => ({type: CHECKOUT})

const getGuestCart = cart => ({type: GET_GUEST_CART, cart})

const addToCartGuest = product => ({
  type: ADD_TO_CART_GUEST,
  product
})

const deleteCartGuest = productId => ({
  type: DELETE_CART_PRODUCT_GUEST,
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
    dispatch(addToCart(data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteThunk = productId => async dispatch => {
  try {
    await axios.put(`/api/cart/delete/${productId}`)
    dispatch(deleteCartProduct(productId))
  } catch (err) {
    console.error(err)
  }
}

export const fetchGuestCart = () => async dispatch => {
  try {
    const unparsedCart = localStorage.getItem('cart')
    if (unparsedCart) {
      const arrOfCartIds = unparsedCart.split(',').map(elem => Number(elem))
      const guestCart = {}
      guestCart.products = []
      for (let i = 0; i < arrOfCartIds.length; i++) {
        if (arrOfCartIds[i]) {
          const {data} = await axios.get(`/api/products/${arrOfCartIds[i]}`)
          guestCart.products.push(data)
        }
      }
      dispatch(getGuestCart(guestCart))
    }
  } catch (err) {
    console.error(err)
  }
}

export const addItemGuest = productId => async dispatch => {
  try {
    let localCart = localStorage.getItem('cart')
    if (localCart) {
      let stringifiedId = ',' + productId
      localStorage.setItem('cart', localCart + stringifiedId)
    } else {
      localStorage.setItem('cart', productId.toString())
    }
    const {data} = await axios.get(`/api/products/${productId}`)
    dispatch(addToCartGuest(data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteThunkGuest = productId => dispatch => {
  try {
    const filteredCartArr = localStorage
      .getItem('cart')
      .split(',')
      .map(elem => Number(elem))
      .filter(elem => elem !== productId && !isNaN(elem))
    const stringifiedCartArr = filteredCartArr
      .map(elem => String(elem))
      .join(',')
    localStorage.setItem('cart', stringifiedCartArr)
    dispatch(deleteCartGuest(productId))
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
      return {products: []}
    case ADD_TO_CART:
      return {...state, products: [...state.products, action.product]}
    case DELETE_CART_PRODUCT:
      return {
        ...state,
        products: {...state}.products.filter(
          product => product.id !== action.productId
        )
      }
    case GET_GUEST_CART:
      return action.cart
    case ADD_TO_CART_GUEST:
      return {...state, products: [...state.products, action.product]}
    case DELETE_CART_PRODUCT_GUEST:
      return {
        ...state,
        products: state.products.filter(elem => elem.id !== action.productId)
      }
    default:
      return state
  }
}
