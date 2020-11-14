import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct, addItemThunk} from '../store'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id)
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
        <p>{finalProduct.description}</p>
        <p>Price - {finalProduct.price}</p>

        <button
          type="submit"
          className="addToCart"
          onClick={() => {
            this.props.addItemThunk(finalProduct.id)
          }}
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
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id)),
    addItemThunk: id => dispatch(addItemThunk(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
