import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts, removeProduct} from '../store/products'
import NewProduct from './newProduct'

class AdminProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  handleDelete(id) {
    this.props.removeProduct(id)
  }

  render() {
    const {products} = this.props
    return (
      <div>
        <NewProduct />
        {products.map(product => {
          return (
            <div className="products" key={product.id}>
              <Link to={`/products/${product.id}`}>{product.name} </Link>
              <img
                style={{width: '500px', height: '500px'}}
                src={product.imageUrl}
              />
              <p>{product.description}</p>
              <p>{product.price}</p>
              <button
                type="button"
                onClick={() => this.handleDelete(product.id)}
              >
                {' '}
                DELETE ME - X
              </button>
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
  fetchProducts: () => dispatch(fetchProducts()),
  removeProduct: id => dispatch(removeProduct(id))
})

export default connect(mapState, mapDispatch)(AdminProducts)
