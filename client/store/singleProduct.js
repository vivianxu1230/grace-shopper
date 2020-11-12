import Axios from 'axios'

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

// const ADD_TO_CART = 'ADD_TO_CART'

export const getProduct = (product) => ({
    type: GET_SINGLE_PRODUCT,
    product
})

// export const addProduct = (id, count) => ({
//     type: ADD_TO_CART,
//     id, 
//     count
// })


export const fetchSingleProduct = (id) => {
    return async (dispatch) => {
        try{
            const {data} = await Axios.get(`/api/products/${id}`)
            dispatch(getProduct(data))
        } catch (err){
            console.log(err)
        }
    }
}

// export const addProductToCart = (id, count) => {
//     return async (dispatch) => {
//         try {
//             const {data} = await Axios.post(`/api/cart`, id, count)
//             dispatch(addProduct(data))
//         }catch (err){
//             console.log(err)
//         }
//     }
// }


export default function singleProductReducer(state = [], action){
    switch(action.type){
        case GET_SINGLE_PRODUCT: {
            return action.product
        }
        // // case ADD_TO_CART: { 
        // //     return {
        // //         id: action.id,
        // //         count: action.count
        // //     }
        // }
        default:{
            return state
        }
    }
}