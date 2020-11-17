import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, fetchCart, deleteThunk} from '../store'

const checkoutpage = ({checkout, cart, isLoggedIn, loadCart}) => {
  return (
    <div>
      <h3 style={{textAlign: 'center'}}>
        Congratulations! You have successfully checked out. Your confirmation id
        is #2789hne342bd!
      </h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart
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
