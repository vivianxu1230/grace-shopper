import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {logout, fetchCart, checkoutThunk, deleteThunk} from '../store'

const Cart = ({
  removeCartProduct,
  checkout,
  userCart,
  isLoggedIn,
  loadCart
}) => {
  React.useEffect(() => {
    async function fetchData() {
      await loadCart()
    }
    fetchData()
  }, [])

  async function clickHandler() {
    await checkout()
    window.location.replace('/checkoutconf')
  }

  return (
    <div>
      <div className="cart-container">
        <div className="cart-heading">
          <p>Name</p>
          <p>Price</p>
          <p>Qty</p>
        </div>
        {console.log(userCart)}
        {userCart.map(product => (
          <div className="cart-item" key={product.id}>
            <button
              onClick={() => {
                window.location.reload(true)
                removeCartProduct()
              }}
              type="button"
              className="delete-checkout"
            >
              x
            </button>
            <p>{product.name}</p>
            <p>${product.price}</p>
            <p>{product.quantity}</p>
            <img src={product.imageUrl} />
          </div>
        ))}
      </div>
      {isLoggedIn ? (
        <div>
          <button type="button" onClick={() => clickHandler()}>
            Checkout
          </button>
        </div>
      ) : (
        <div>
          <p>Log in or sign up to check out</p>
        </div>
      )}
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
      dispatch(checkoutThunk())
    },
    removeCartProduct() {
      dispatch(deleteThunk())
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
