import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts, removeProduct, editProduct} from '../store/products'
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
      <div className="soloProductContainer">
        <NewProduct />
        {products.map(product => {
          return (
            <div className="soloProduct" key={product.id}>
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
                {' '}
                DELETE PRODUCT
              </button>
              <button
                className="editProductAdmin"
                type="button"
                onClick={() => this.editProduct(product.id)}
              >
                {' '}
                EDIT PRODUCT
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
  removeProduct: id => dispatch(removeProduct(id)),
  editProduct: id => dispatch(editProduct(id))
})

export default connect(mapState, mapDispatch)(AdminProducts)
