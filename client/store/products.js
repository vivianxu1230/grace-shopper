import axios from 'axios'

// Action Types
const ALL_PRODUCTS = 'ALL_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'

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

export const editProduct = product => ({
  type: EDIT_PRODUCT,
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
      const {data} = await axios.post('/api/products', product)
      dispatch(addProduct(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateProduct = (id, product) => {
  return async dispatch => {
    try {
      await axios.patch(`/api/products/${id}`, {product})
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(editProduct(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = []

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_PRODUCTS:
      return action.products
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.productId)
    case ADD_PRODUCT:
      return [...state, action.product]
    case EDIT_PRODUCT:
      return state.map(product => {
        if (product.id === action.product.id) {
          return action.product
        }
        return product
      })
    default:
      return state
  }
}
export default productsReducer
