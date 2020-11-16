import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const {products} = this.props

    return (
      <div className="soloProductContainer">
        {products.map(product => {
          return (
            <div className="soloProduct" key={product.id}>
              <h1>{product.name}</h1>
              <Link to={`/products/${product.id}`}>
                <img src={product.imageUrl} />
              </Link>
              <h2>${product.price}</h2>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products
})

const mapDispatch = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(AllProducts)
