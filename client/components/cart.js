import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {logout, fetchCart, checkoutThunk, deleteThunk} from '../store'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.clickHandler = this.clickHandler.bind(this)
    this.deleteHandler = this.deleteHandler.bind(this)
  }
  async componentDidMount() {
    try {
      await this.props.loadCart()
    } catch (err) {
      console.log(err)
    }
  }

  async clickHandler() {
    try {
      await this.props.checkout()
      window.location.replace('/checkoutconf')
    } catch (err) {
      console.log(err)
    }
  }

  async deleteHandler(productId) {
    try {
      await this.props.removeCartProduct(productId)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div>
        <div className="cart-container">
          <div className="cart-heading">
            <p>Name</p>
            <p>Price</p>
            <p>Qty</p>
          </div>
          {this.props.userCart.products &&
            this.props.userCart.products.map(product => (
              <div className="cart-item" key={product.id}>
                <button
                  onClick={() => {
                    this.deleteHandler(product.id)
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
        {this.props.isLoggedIn ? (
          <div>
            <button type="button" onClick={this.clickHandler}>
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
}

/**
 * CONTAINER
 */
const mapState = state => {
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
