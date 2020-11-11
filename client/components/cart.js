import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Cart = ({isLoggedIn}) => (
  <div>
    {/* {list of cart items here} */}
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

/**
 * CONTAINER
 */
const mapState = state => {
  console.log(state)
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
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
