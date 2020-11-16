import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id)
    // this.props.addProductToCart(this.props.match.params.id)
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
    product: state.product
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id))
    // addProductToCart: (id, count) => dispatch(addProductToCart(id, count))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
