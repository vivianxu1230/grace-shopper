import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_USER_CART = 'GET_USER_CART'
const CHECKOUT = 'CHECKOUT'

/**
 * INITIAL STATE
 */
const cart = []

/**
 * ACTION CREATORS
 */
const getUserCart = (userCart) => ({type: GET_USER_CART, userCart})

const checkout = () => ({type: CHECKOUT})

/**
 * THUNK CREATORS
 */
export const fetchCart = () => async (dispatch) => {
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

export const deleteThunk = () => async (dispatch) => {
  try {
    const res = await axios.get('/auth/me')
    const userId = res.data.id
    await axios.put(`/api//users/${userId}`)
    dispatch(checkout())
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = cart, action) {
  switch (action.type) {
    case GET_USER_CART:
      return action.userCart
    case CHECKOUT:
      return []
    default:
      return state
  }
}
