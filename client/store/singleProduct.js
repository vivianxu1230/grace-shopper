import axios from 'axios'

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

export const getProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
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

export default function singleProductReducer(state = [], action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT: {
      return action.product
    }

    default: {
      return state
    }
  }
}
