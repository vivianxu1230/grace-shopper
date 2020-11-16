import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct, addItemThunk, addItemGuest} from '../store'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.addHandler = this.addHandler.bind(this)
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
      console.log(localStorage.getItem('cart'))
    }
  }

  render() {
    const product = this.props.product
    // let finalProduct = ''
    // for (let i = 0; i < product.length; i++) {
    //   finalProduct = product[i]
    // }
    return (
      <div className="productContainer">
        <img className="productImage" src={product.imageUrl} />
        <div className="product">
          <h1>{product.name}</h1>
          <p className="description">{product.description}</p>
          <h2>${product.price}</h2>
          {console.log(this.props.product)}
          {product && product.onHold ? (
            <div>
              <button style={{opacity: '0.3'}} type="button">
                Add to cart
              </button>
              <p>Someone else has this in their cart!</p>
            </div>
          ) : product.quantity ? (
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
    product: state.product
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
