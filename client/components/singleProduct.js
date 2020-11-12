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
        <h1>{finalProduct.name}</h1>
        <img
          style={{width: '500px', height: '500px'}}
          src={finalProduct.imageUrl}
        />
        <h2>{finalProduct.description}</h2>
        <p>Price - {finalProduct.price}</p>

        <button
          type="submit"
          className="addToCart"
          // onClick = {() => this.addProductToCart(product.id, 1)}
        >
          Add To Cart
        </button>
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
