import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, fetchCart, fetchGuestCart} from '../store'
import {AllProducts} from './allProducts'
import {Text, Div, Icon, Anchor} from 'atomize'

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
      <Div>
        <Text textSize="display1" textAlign="center">
          Persephone Archive
        </Text>
        <nav>
          {this.props && this.props.user.id ? (
            <Div d="flex" flexDir="row" justify="space-evenly">
              <Link to="/home">
                <Text textColor="black">Home</Text>
              </Link>
              <Link to="/products" component={AllProducts}>
                <Text textColor="black">All Products</Text>
              </Link>
              <Link
                onClick={() => window.location.replace('/myorders')}
                to="/myorders"
              >
                <Text textColor="black">Order History</Text>
              </Link>

              {this.props.isAdmin ? (
                <Link to="/adminview">Admin View</Link>
              ) : (
                <></>
              )}
              <Anchor
                textColor="black"
                href="#"
                onClick={this.props.handleClick}
              >
                Logout
              </Anchor>
              <Link className="cart-link" to="/cart">
                <Icon name="Bag" size="20px" right="20px" />
              </Link>
            </Div>
          ) : (
            <Div d="flex" flexDir="row" justify="space-evenly">
              <Link to="/home">
                <Text textColor="black">Home</Text>
              </Link>
              <Link to="/products">
                <Text textColor="black">All Products</Text>
              </Link>
              <Link to="/login">
                <Text textColor="black">Login</Text>
              </Link>
              <Link to="/signup">
                <Text textColor="black">Sign Up</Text>
              </Link>
              <Link className="cart-link" to="/cart">
                <Icon name="Bag" size="20px" right="20px" />
              </Link>
            </Div>
          )}
        </nav>
        <hr />
      </Div>
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
    async handleClick() {
      await dispatch(logout())
      window.location.replace('/')
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
