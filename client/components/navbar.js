import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, fetchCart, fetchGuestCart} from '../store'
import {AllProducts} from './allProducts'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.loadGuestCart()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id) {
      this.props.loadCart()
    }
  }
  render() {
    return (
      <div>
        <header>
          <h1>Persephone Archive</h1>
        </header>
        <nav>
          {this.props && this.props.isLoggedIn ? (
            <div>
              <Link to="/home">Home</Link>
              <Link to="/products" component={AllProducts}>
                All Products
              </Link>
              <Link
                onClick={() => window.location.replace('/myorders')}
                to="/myorders"
              >
                Order History
              </Link>
              {this.props.isAdmin ? (
                <Link to="/adminview">Admin View</Link>
              ) : (
                <></>
              )}
              <a href="#" onClick={this.props.handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              <Link to="/products">All Products</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
          <Link className="cart-link" to="/cart">
            <svg className="cart-icon" transform=" scale(0.4)">
              <g>
                <circle transform="scale(0.2)" cx="170" cy="374" r="50" />
                <path
                  transform="scale(0.2)"
                  d="M316.673,324.098L316.673,324.098c-27.711,0-50.176,22.465-50.176,50.176s22.465,50.176,50.176,50.176     c27.711,0,50.176-22.465,50.176-50.176S344.384,324.098,316.673,324.098z"
                />
                <path
                  transform="scale(0.2)"
                  d="M402.177,272.897H140.545l-5.12-29.696h215.04c6.326,0.019,12.017-3.843,14.336-9.728l51.2-129.024     c3.111-7.892-0.766-16.812-8.658-19.922c-1.808-0.713-3.735-1.076-5.678-1.07H108.801L96.513,12.801     c-1.262-7.471-7.784-12.906-15.36-12.8h-58.88c-8.483,0-15.36,6.877-15.36,15.36s6.877,15.36,15.36,15.36h46.08l44.032,260.096     c1.262,7.471,7.784,12.906,15.36,12.8h274.432c8.483,0,15.36-6.877,15.36-15.36C417.537,279.774,410.66,272.897,402.177,272.897z     "
                />
                <text transform="translate(40, 40), scale(1.5)" fill="white">
                  {this.props.cart.products && this.props.cart.products.length
                    ? this.props.cart.products.length
                    : 0}
                </text>
              </g>
            </svg>
          </Link>
        </nav>
        <hr />
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
    user: state.user,
    cart: state.cart,
    isAdmin: !!state.user.isAdmin
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
    loadGuestCart() {
      dispatch(fetchGuestCart())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
