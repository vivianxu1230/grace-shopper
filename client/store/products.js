import axios from 'axios'

// Action Types
const ALL_PRODUCTS = 'ALL_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const FILTER = 'FILTER'

// Action Creators
export const allProducts = products => ({
  type: ALL_PRODUCTS,
  products
})

export const deleteProduct = productId => ({
  type: 'DELETE_PRODUCT',
  productId
})

export const addProduct = product => ({
  type: 'ADD_PRODUCT',
  product
})

export const filter = category => {
  return {
    type: FILTER,
    category
  }
}

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

// Delete Thunk Creator
export const removeProduct = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${id}`)
      dispatch(deleteProduct(id))
    } catch (error) {
      console.log(error)
    }
  }
}

// Add Product
export const postProduct = product => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/products', product)
      dispatch(addProduct(data))
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
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.productId)
    case ADD_PRODUCT:
      return [...state, action.product]
    case FILTER:
      return [...state].filter(product => product.category === action.category)
    default:
      return state
  }
}
export default productsReducer
