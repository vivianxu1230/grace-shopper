import axios from 'axios'

// Action Types
const ALL_PRODUCTS = 'ALL_PRODUCTS'

// Action Creators
export const allProducts = products => ({
  type: ALL_PRODUCTS,
  products
})

// Fetch Thunk Creator
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(allProducts(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// Initial State
const initialState = []

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_PRODUCTS:
      return action.products

    default:
      return state
  }
}

export default productsReducer
