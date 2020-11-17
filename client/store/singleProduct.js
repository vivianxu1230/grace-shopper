import axios from 'axios'

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'

export const getProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})

export const editProduct = (product, id) => ({
  type: EDIT_PRODUCT,
  product,
  id
})

export const fetchSingleProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(getProduct(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateProduct = (id, product) => {
  return async dispatch => {
    try {
      const {data} = await axios.patch(`/api/products/${id}`, {product})
      dispatch(editProduct(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function singleProductReducer(state = [], action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT: {
      return action.product
    }
    case EDIT_PRODUCT: {
      return [...state, action.product]
    }
    default: {
      return state
    }
  }
}
