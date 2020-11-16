import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  SingleProduct,
  Home,
  adminView,
  AdminUsers,
  AdminProducts,
  Cart,
  CheckoutPage
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        {/* {isLoggedIn? (<Route
          path="/cart"
          render={props => <Cart {...props} isLoggedIn={isLoggedIn} />}
        />) : (<Route
          path="/cart"
          render={props => <Cart {...props} isLoggedIn={isLoggedIn} />}
        />)} */}
        <Route path="/cart" component={Cart} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" component={AllProducts} />
        <Route path="/products/:id" component={SingleProduct} />
        {isAdmin && (
          <Switch>
            <Route path="/adminview" component={adminView} />
            <Route path="/adminusers" component={AdminUsers} />
            <Route path="/adminproducts" component={AdminProducts} />
          </Switch>
        )}
        {isLoggedIn && (
          <Switch>
            <Route path="/home" component={UserHome} />
            <Route path="/checkoutconf" component={CheckoutPage} />
          </Switch>
        )}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  // console.log(state)
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
