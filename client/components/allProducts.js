import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'

export class allProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const {products} = this.props
    return (
      <div>
        {products.map(product => {
          return (
            <div className="products" key={product.id}>
              <a className="link" href={`/products/${product.id}`}>
                {' '}
                {product.name}
              </a>
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
  proudcts: state.products
})

const mapDispatch = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(allProducts)
