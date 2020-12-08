import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, checkoutThunk, deleteThunk, deleteThunkGuest} from '../store'
import {Container, Row, Col, Div, Icon, Image, Text, Button} from 'atomize'
import {loadStripe} from '@stripe/stripe-js'
const stripePromise = loadStripe(
  'pk_test_51HvwjSA1LtAlN3NJCwJBKxZD2dQNnbwaKg0gLnEQVFw9AZ6I1Z5R6eejLVaI4inKCxjZVyJXOhMtFuyZZagk51Q200XdsJJn0g'
)

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 0
    }
    this.checkoutHandler = this.checkoutHandler.bind(this)
    this.deleteHandler = this.deleteHandler.bind(this)
  }
  async componentDidMount() {
    const {data} = await axios.get(`api/cart`)
    await this.setState({total: data.orderTotal})
  }

  async checkoutHandler() {
    await this.props.checkout()
    const stripe = await stripePromise
    const response = await fetch('/api/cart/checkout', {method: 'PUT'})
    console.log(response)
    const session = await response.json()
    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    })
    if (result.error) {
      console.log('error at checkout')
    }
    console.log(session)
    // window.location.replace('/checkoutconf')
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
      <Container>
        {this.props.cart.products && this.props.cart.products.length ? (
          <Div>
            <Row textAlign="center">
              <Col size="4">
                <Text textSize="subheader">Name</Text>
              </Col>
              <Col size="4">
                <Text textSize="subheader">Price</Text>
              </Col>
              <Col size="3">
                <Text textSize="subheader">Qty</Text>
              </Col>
            </Row>
            <Div>
              {this.props.cart.products &&
                this.props.cart.products.map(product => (
                  <Row textAlign="center" key={product.id}>
                    <Col size="4">
                      <Link to={`/products/${product.id}`}>
                        <Text textColor="black">{product.name}</Text>
                        <Image h="120px" w="auto" src={product.imageUrl} />
                      </Link>
                    </Col>
                    <Col size="4">
                      <Text>${product.price}</Text>
                    </Col>
                    <Col size="3" d="flex" flexDir="row" justify="center">
                      <Text>{product.quantity}</Text>
                    </Col>
                    <Col d="flex" align="flex-start" size="1">
                      {' '}
                      <Button
                        m={{t: '4.2rem'}}
                        bg="white"
                        onClick={() => {
                          this.deleteHandler(product.id)
                        }}
                        type="button"
                        className="delete-checkout"
                      >
                        <Icon name="Delete" size="20px" />
                      </Button>
                    </Col>
                  </Row>
                ))}
              <Row textAlign="center">Order Total: ${this.state.total}</Row>
              <Div d="flex" justify="center">
                {this.props.isLoggedIn ? (
                  <Button
                    role="link"
                    m={{r: '1rem'}}
                    type="button"
                    onClick={() => this.checkoutHandler()}
                  >
                    Checkout
                  </Button>
                ) : (
                  <Text m={{t: '0.5rem', r: '1rem'}}>
                    Log in or register to checkout
                  </Text>
                )}
                <Link to="/products">
                  <Button type="button">Continue shopping</Button>
                </Link>
              </Div>
            </Div>
          </Div>
        ) : (
          <Text textSize="subheader" textAlign="center">
            There are no items in your cart.
          </Text>
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
