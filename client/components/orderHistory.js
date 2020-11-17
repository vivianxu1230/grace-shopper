import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, fetchCart, fetchGuestCart} from '../store'
import axios from 'axios'

class orderHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      selectedOrder: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id) {
      const userId = this.props && this.props.user.id
      const {data} = await axios.get(`/api/orders/${userId}`)
      await this.setState({
        orders: data
      })
    }
  }
  async handleClick(event) {
    await this.setState({
      selectedOrder: event.target.parentNode.parentNode.getAttribute('value')
    })
  }
  render() {
    return (
      <div>
        <h2>Order History</h2>
        {this.state.orders.length ? (
          this.state.orders.map(order => {
            return (
              <div
                onClick={this.handleClick}
                className="orders-container"
                value={order.id}
                key={order.id}
              >
                <div className="order-header">
                  <p>Order #{order.id}</p>
                  <p>{order.status}</p>
                  <p>{order.updatedAt}</p>
                </div>
                {this.state.selectedOrder ? (
                  order.products.map(product => {
                    return (
                      <div key={product.id} className="order-details">
                        <img style={{height: '50px'}} src={product.imageUrl} />
                        <p>{product.name}</p>
                        <p>1</p>
                        <p>${product.price}</p>
                      </div>
                    )
                  })
                ) : (
                  <div />
                )}
              </div>
            )
          })
        ) : (
          <p>There are no past orders to show. </p>
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
    user: state.user
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

export default connect(mapState, mapDispatch)(orderHistory)
