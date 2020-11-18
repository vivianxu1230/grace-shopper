import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts, removeProduct} from '../store/products'
import NewProduct from './newProduct'
import EditProduct from './editProduct'

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
      <div className="adminProductContainer">
        <NewProduct />
        {products.map(product => {
          return (
            <div className="adminsoloProduct" key={product.id}>
              <h1>{product.name} </h1>
              <Link to={`/products/${product.id}`}>
                <img src={product.imageUrl} />
              </Link>
              <h2>{product.price}</h2>
              <button
                className="deleteProductAdmin"
                type="button"
                onClick={() => this.handleDelete(product.id)}
              >
                DELETE PRODUCT
              </button>
              <EditProduct product={product} />
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
