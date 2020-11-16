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
    let finalProduct = ''
    for (let i = 0; i < product.length; i++) {
      finalProduct = product[i]
    }
    return (
      <div>
        <div className="productContainer">
          <img className="productImage" src={finalProduct.imageUrl} />
          <div className="product">
            <h1>{finalProduct.name}</h1>
            <h2>${finalProduct.price}</h2>

            <p className="description">{finalProduct.description}</p>
            <button
              type="submit"
              className="addToCart"
              // onClick = {() => this.addProductToCart(product.id, 1)}
            >
              Add To Cart
            </button>
            <button type="submit" className="like">
              <span>❤️</span>
            </button>
          </div>
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
