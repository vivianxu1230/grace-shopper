import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, fetchCart, deleteThunk} from '../store'

const checkoutpage = ({checkout, userCart, isLoggedIn, loadCart}) => {
  return (
    <div>
      <h3 style={{textAlign: 'center'}}>
        Congratulations! You have successfully checked out. Your order id is
        #23sdf82384
      </h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  // console.log(state.cart)
  return {
    isLoggedIn: !!state.user.id,
    userCart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    loadCart() {
      dispatch(fetchCart())
    },
    checkout() {
      dispatch(deleteThunk())
    }
  }
}

export default connect(mapState, mapDispatch)(checkoutpage)
