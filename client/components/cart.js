import React from 'react'
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
    if (this.props.isLoggedIn) await this.props.loadCart()
  }

  async clickHandler() {
    await this.props.checkout()
    window.location.replace('/checkoutconf')
  }

  async deleteHandler(productId) {
    await this.props.removeCartProduct(productId)
  }

  render() {
    return (
      <div className="cart-container">
        {this.props.userCart.products &&
        this.props.userCart &&
        this.props.userCart.products.length ? (
          <div>
            <div className="cart-heading">
              <p>Name</p>
              <p>Price</p>
              <p>Qty</p>
            </div>
            <div>
              {this.props.userCart.products.map(product => (
                <div className="cart-item" key={product.id}>
                  <button
                    onClick={() => {
                      this.props.removeCartProduct(product.id)
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
              <button type="button" onClick={() => this.clickHandler()}>
                Checkout
              </button>
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
    removeCartProduct(productId) {
      dispatch(deleteThunk(productId))
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
