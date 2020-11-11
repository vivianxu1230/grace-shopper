import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, fetchCart} from '../store'

const Cart = ({userCart, isLoggedIn, loadCart}) => {
  React.useEffect(() => {
    async function fetchData() {
      await loadCart()
    }
    fetchData()
  }, [])
  return (
    <div>
      {userCart.map((product) => (
        <img key={product.id} src={product.imageUrl}></img>
      ))}
      {isLoggedIn ? (
        <div>
          <button type="button">Checkout</button>
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
const mapState = (state) => {
  // console.log(state.cart)
  return {
    isLoggedIn: !!state.user.id,
    userCart: state.cart,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
    loadCart() {
      dispatch(fetchCart())
    },
  }
}

export default connect(mapState, mapDispatch)(Cart)

/**
 * PROP TYPES
 */
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired,
// }
