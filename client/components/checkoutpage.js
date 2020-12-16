import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, fetchCart, deleteThunk} from '../store'
import {Container, Row, Col, Div, Image, Text, Collapse} from 'atomize'

const checkoutpage = ({checkout, cart, isLoggedIn, loadCart}) => {
  return (
    <Container>
      <Text textSize="subheader" textAlign="center">
        Congratulations! You have successfully checked out. Your confirmation id
        is #2789hne342bd!
      </Text>
    </Container>
  )
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
    loadCart() {
      dispatch(fetchCart())
    },
    checkout() {
      dispatch(deleteThunk())
    }
  }
}

export default connect(mapState, mapDispatch)(checkoutpage)
