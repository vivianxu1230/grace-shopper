// /* global describe beforeEach afterEach it */

// import {expect} from 'chai'
// import {fetchCart, addItemThunk, deleteThunk, checkoutThunk} from './cart'
// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
// import configureMockStore from 'redux-mock-store'
// import thunkMiddleware from 'redux-thunk'
// import history from '../history'

// const middlewares = [thunkMiddleware]
// const mockStore = configureMockStore(middlewares)

// describe('thunk creators', () => {
//   let store
//   let mockAxios

//   const initialState = {products: []}

//   beforeEach(() => {
//     mockAxios = new MockAdapter(axios)
//     store = mockStore(initialState)
//   })

//   afterEach(() => {
//     mockAxios.restore()
//     store.clearActions()
//   })

//   describe('fetchCart', () => {
//     it('eventually dispatches the GET USER CART action', async () => {
//       const fakeCart = {
//         products: [
//           {
//             id: 99,
//             name: 'Fake shirt',
//             description: 'Something to wear for test specs.',
//             price: '90.00',
//             quantity: 1,
//             onHold: true,
//             category: 'tops',
//             imageUrl:
//               'https://scene7.zumiez.com/is/image/zumiez/product_main_medium/Shaka-Wear-Max-Heavy-White-T-Shirt-_325409-front-US.jpg',
//             createdAt: '2020-11-15T23:46:03.212Z',
//             updatedAt: '2020-11-15T23:46:03.212Z',
//             orderItem: {
//               price: '10.00',
//               createdAt: '2020-11-15T23:46:03.255Z',
//               updatedAt: '2020-11-15T23:46:03.255Z',
//               productId: 1,
//               orderId: 1
//             }
//           }
//         ]
//       }
//       mockAxios.onGet('/api/cart').replyOnce(200, fakeCart)
//       await store.dispatch(fetchCart())
//       const actions = store.getActions()
//       expect(actions[0].type).to.be.equal('GET_USER_CART')
//       expect(actions[0].user).to.be.deep.equal(fakeCart)
//     })
//   })

// describe('logout', () => {
//   it('logout: eventually dispatches the REMOVE_USER action', async () => {
//     mockAxios.onPost('/auth/logout').replyOnce(204)
//     await store.dispatch(logout())
//     const actions = store.getActions()
//     expect(actions[0].type).to.be.equal('REMOVE_USER')
//     expect(history.location.pathname).to.be.equal('/login')
//   })
// })
// })
