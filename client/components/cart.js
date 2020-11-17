import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {logout, checkoutThunk, deleteThunk, deleteThunkGuest} from '../store'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.checkoutHandler = this.checkoutHandler.bind(this)
    this.deleteHandler = this.deleteHandler.bind(this)
  }
  async checkoutHandler() {
    await this.props.checkout()

    window.location.replace('/checkoutconf')
  }

  async deleteHandler(productId) {
    if (this.props.isLoggedIn) {
      await this.props.removeCartProduct(productId)
    } else {
      this.props.removeCartProductGuest(productId)
    }
  }

  render() {
    return (
      <div className="cart-container">
        {this.props.cart.products && this.props.cart.products.length ? (
          <div>
            <div className="cart-heading">
              <p>Name</p>
              <p>Price</p>
              <p>Qty</p>
            </div>
            <div>
              {this.props.cart.products &&
                this.props.cart.products.map(product => (
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
                    <Link to={`/products/${product.id}`}>
                      <p>{product.name}</p>
                    </Link>
                    <p>${product.price}</p>
                    <p>{product.quantity}</p>
                    <img src={product.imageUrl} />
                  </div>
                ))}
              {this.props.isLoggedIn ? (
                <button type="button" onClick={() => this.checkoutHandler()}>
                  Checkout
                </button>
              ) : (
                <p>Log in or register to checkout</p>
              )}
              <Link to="/products">
                <button type="button">Continue shopping</button>
              </Link>
            </div>
          </div>
        ) : (
          <p>There are no items in your cart.</p>
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
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    checkout() {
      dispatch(checkoutThunk())
    },
    removeCartProduct(productId) {
      dispatch(deleteThunk(productId))
    },
    removeCartProductGuest(productId) {
      dispatch(deleteThunkGuest(productId))
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
