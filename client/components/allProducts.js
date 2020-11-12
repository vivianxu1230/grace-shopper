import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const { products } = this.props
    
    return (
      <div>
        {products.map(product => {
          return (
            <div className="products" key={product.id}>
              < Link to={`/products/${product.id}`}>
                {product.name}
              </Link>
              <img
                style={{width: '500px', height: '500px'}}
                src={product.imageUrl}
              />
              <p>{product.price}</p>
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
