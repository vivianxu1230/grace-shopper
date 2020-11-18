/* eslint-disable react/no-unused-state */
import React from 'react'
import {connect} from 'react-redux'
import {updateProduct} from '../store/products'

export class EditProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      price: 0,
      category: '',
      imageUrl: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  async handleSubmit(event) {
    try {
      event.preventDefault()
      const id = this.props.product.id
      const body = this.state
      await this.props.updateProduct(id, body)
      await this.setState({
        name: '',
        description: '',
        price: 0,
        category: '',
        imageUrl: ''
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div className="newProduct">
        <form onSubmit={this.handleSubmit}>
          <input
            className="newProductInput"
            type="text"
            name="name"
            placeholder="Product Name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            className="newProductInput"
            type="number"
            name="price"
            placeholder="Price"
            value={this.state.price}
            onChange={this.handleChange}
          />
          <input
            className="newProductInput"
            type="text"
            name="imageUrl"
            placeholder="ImageUrl"
            value={this.state.imageUrl}
            onChange={this.handleChange}
          />
          <textarea
            className="newProductDescription"
            type="text"
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleChange}
            style={{height: '100px'}}
          />

          <select
            className="newProductInput"
            type="text"
            name="category"
            value={this.state.category}
            onChange={this.handleChange}
          >
            <option>choose category</option>
            <option name="tops">tops</option>
            <option name="bottoms">bottoms</option>
            <option name="accessories">accessories</option>
            <option name="wholebody">wholebody</option>
            <option name="shoes">shoes</option>
          </select>
          <div>
            <button className="editProductAdmin" type="submit">
              EDIT PRODUCT
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProduct: (id, body) => dispatch(updateProduct(id, body))
  }
}

export default connect(null, mapDispatchToProps)(EditProduct)
