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
        <h1>{finalProduct.name}</h1>
        <img
          style={{width: '500px', height: '500px'}}
          src={finalProduct.imageUrl}
        />
        <p>{finalProduct.description}</p>
        <p>Price - {finalProduct.price}</p>
        {finalProduct.quantity ? (
          <button
            type="submit"
            className="addToCart"
            onClick={() => {
              this.addHandler(finalProduct.id)
            }}
          >
            Add To Cart
          </button>
        ) : (
          <p>Item is sold out</p>
        )}
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
