import axios from 'axios'

// Action Types
export const ALL_PRODUCTS = 'ALL_PRODUCTS'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'

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
      console.log('product', product)
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
    default:
      return state
  }
}
export default productsReducer
