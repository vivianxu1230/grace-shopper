import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct, addItemThunk, addItemGuest} from '../store'
import {Container, Row, Col, Div, Image, Text, Button, Icon} from 'atomize'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.addHandler = this.addHandler.bind(this)
    this.state = {
      added: false,
      liked: false
    }
  }
  componentDidMount() {
    const id = Number(this.props.match.params.id)
    this.props.fetchSingleProduct(id)
  }

  addHandler(productId) {
    if (this.props.isLoggedIn) {
      this.props.addItemThunk(productId)
    } else {
      this.props.addItemGuest(productId)
    }
    this.setState({...this.state, added: true})
  }

  render() {
    const {product} = this.props
    return (
      <Container>
        <Row>
          <Col d="flex" justify="center" size="7">
            <Image m={{t: '4rem'}} h="450px" w="auto" src={product.imageUrl} />
          </Col>
          <Col d="flex" justify="center" size="5">
            <Div
              p="1rem"
              border="1px solid"
              borderColor="black"
              rounded="md"
              m={{t: '5rem'}}
            >
              <Text textAlign="center" textSize="subheader">
                {product.name}
              </Text>
              <Text textAlign="center">{product.description}</Text>
              <br />
              <Text textAlign="center">${product.price}</Text>
              {product && product.onHold ? (
                <Div>
                  <Button
                    m={{l: 'auto', r: 'auto', t: '0.5rem'}}
                    bg="brand400"
                    cursor="not-allowed"
                    h="2.5rem"
                  >
                    <Text>Add To Cart</Text>
                    <Icon
                      color="white"
                      name="Add"
                      m={{l: '0.5rem'}}
                      size="18px"
                    />
                  </Button>
                  <Text textSize="caption" textAlign="center" m={{t: '0.5rem'}}>
                    Someone else has this in their cart!
                  </Text>
                </Div>
              ) : product.quantity ? (
                <Div>
                  <Row d="flex" justify="center">
                    {this.state.added ? (
                      <Button m={{t: '0.5rem'}} bg="brand600" h="2.5rem">
                        <Text>Added To Your Cart!</Text>
                        <Icon
                          color="white"
                          name="Add"
                          m={{l: '0.5rem'}}
                          size="18px"
                        />
                      </Button>
                    ) : (
                      <Button
                        m={{t: '0.5rem'}}
                        bg="brand400"
                        h="2.5rem"
                        onClick={() => {
                          this.addHandler(product.id)
                        }}
                      >
                        <Text>Add To Cart</Text>
                        <Icon
                          color="white"
                          name="Add"
                          m={{l: '0.5rem'}}
                          size="18px"
                        />
                      </Button>
                    )}
                    {this.state.liked ? (
                      <Button
                        onClick={() => {
                          this.setState({
                            ...this.state,
                            liked: !this.state.liked
                          })
                        }}
                        m={{l: '1rem', t: '0.5rem'}}
                        bg="gray400"
                        w="2.5rem"
                        h="2.5rem"
                      >
                        <Icon name="HeartSolid" color="white" size="20px" />
                      </Button>
                    ) : (
                      <Button
                        m={{l: '1rem', t: '0.5rem'}}
                        bg="gray400"
                        w="2.5rem"
                        h="2.5rem"
                        onClick={() => {
                          this.setState({
                            ...this.state,
                            liked: !this.state.liked
                          })
                        }}
                      >
                        <Icon name="Heart" color="white" size="20px" />
                      </Button>
                    )}
                  </Row>
                </Div>
              ) : (
                <Text textSize="caption" textAlign="center">
                  Item is sold out
                </Text>
              )}
            </Div>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    product: state.product,
    cartProducts: state.cart.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id)),
    addItemThunk: id => dispatch(addItemThunk(id)),
    addItemGuest: id => dispatch(addItemGuest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
