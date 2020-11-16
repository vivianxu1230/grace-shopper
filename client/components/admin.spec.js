// /* global describe beforeEach it */

// import {expect, assert} from 'chai'
// import React from 'react'
// import enzyme, {shallow, ShallowWrapper} from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
// import {Provider} from 'react-redux'
// import configureMockStore from 'redux-mock-store'

// import {AdminUsers} from './adminUsers'
// import {create} from 'react-test-renderer'

// const adapter = new Adapter()
// enzyme.configure({adapter})

// const mockStore = configureMockStore()
// const store = mockStore({})

// describe('AdminUsers', () => {
//   let adminUsers
//   beforeEach(() => {
//     adminUsers = shallow(
//       <Provider store={store}>
//         <AdminUsers firstName="Sam" lastName="Smith" email="ssmith@email.com" />
//       </Provider>
//     )
//   })

//   it('should exist', function() {
//     assert.isDefined(AdminUsers)
//   })

//   it('renders the first name and last name in an h2', () => {
//     expect(adminUsers.find('h2').text()).to.be.equal('Sam Smith')
//   })
// })
