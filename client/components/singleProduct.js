import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct, addItemThunk, addItemGuest} from '../store'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.addHandler = this.addHandler.bind(this)
    this.state = {
      clicked: false
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
    this.setState({clicked: true})
  }

  render() {
    const {product} = this.props
    return (
      <div className="productContainer">
        <img className="productImage" src={product.imageUrl} />
        <div className="product">
          <h1>{product.name}</h1>
          <p className="description">{product.description}</p>
          <h2>${product.price}</h2>
          {product && product.onHold ? (
            <div>
              <button style={{opacity: '0.3'}} type="button">
                Add to cart
              </button>
              <p>Someone else has this in their cart!</p>
            </div>
          ) : product.quantity ? (
            <div>
              {this.state.clicked ? (
                <div>
                  <button type="submit" className="addToCart">
                    Added to your cart!
                  </button>
                  <button type="submit" className="like">
                    <span>❤️</span>
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    type="submit"
                    className="addToCart"
                    onClick={() => {
                      this.addHandler(product.id)
                    }}
                  >
                    Add to cart
                  </button>
                  <button type="submit" className="like">
                    <span>❤️</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p>Item is sold out</p>
          )}
        </div>
      </div>
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
