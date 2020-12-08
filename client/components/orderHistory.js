import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, fetchCart, fetchGuestCart} from '../store'
import axios from 'axios'
import {Text, Div, Icon, Container, Image} from 'atomize'

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
      <Container>
        <Text textAlign="center" textSize="subheader">
          Order History
        </Text>
        {this.state.orders.length ? (
          this.state.orders.map(order => {
            return (
              <Div
                onClick={this.handleClick}
                className="orders-container"
                value={order.id}
                key={order.id}
              >
                <Div textAlign="center" cursor="pointer">
                  <Text>Order #{order.id}</Text>
                  <Text>{order.status}</Text>
                  <Text>{order.updatedAt}</Text>
                </Div>
                {this.state.selectedOrder ? (
                  order.products.map(product => {
                    return (
                      <Div
                        key={product.id}
                        d="flex"
                        flexDir="row"
                        justify="space-evenly"
                      >
                        <Image h="100px" w="auto" src={product.imageUrl} />
                        <Text>{product.name}</Text>
                        <Text>1</Text>
                        <Text>${product.price}</Text>
                      </Div>
                    )
                  })
                ) : (
                  <Div />
                )}
              </Div>
            )
          })
        ) : (
          <Text textAlign="center">There are no past orders to show. </Text>
        )}
      </Container>
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
