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
      orders: []
    }
  }
  async componentDidMount() {
    // const userId = this.props && this.props.user.id
    // console.log(this.props.user)
    // const {data} = await axios.get(`/api/orders/${userId}`)
    // await this.setState({
    //   orders: data,
    // })
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
  render() {
    return (
      <div>
        <h2>Order History</h2>
        {this.state.orders.map(order => {
          return (
            <div className="orders-container" key={order.id}>
              <p>{order.id}</p>
              <p>{order.status}</p>
              <p>{order.updateAt}</p>
            </div>
          )
        })}
        <p>hii</p>
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
