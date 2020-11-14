import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {postProduct} from '../store/products'

export class NewProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      price: 0,
      quantity: 1,
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
      await this.props.createProduct(this.state)
      await this.setState({
        name: '',
        description: '',
        price: 0,
        quantity: 1,
        category: '',
        imageUrl: ''
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      //Double check route for action
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <textarea
          type="text"
          name="description"
          placeholder="Description"
          value={this.state.description}
          onChange={this.handleChange}
          style={{height: '100px'}}
        />
        <input
          type="integer"
          name="price"
          placeholder="Price"
          value={this.state.price}
          onChange={this.handleChange}
        />
        {/* <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={this.state.quantity}
          onChange={this.handleChange}
        /> */}
        <input
          type="text"
          name="imageUrl"
          placeholder="ImageUrl"
          value={this.state.imageUrl}
          onChange={this.handleChange}
        />
        <select
          type="text"
          name="category"
          value={this.state.category}
          onChange={this.handleChange}
        >
          <option>category</option>
          <option name="tops">tops</option>
          <option name="bottoms">bottoms</option>
          <option name="rare">rare</option>
          <option name="vintage">vintage</option>
          <option name="streetwear">streetwear</option>
          <option name="shoes">shoes</option>
        </select>
        <button type="submit">Submit New Product</button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createProduct: product => dispatch(postProduct(product))
  }
}

export default connect(null, mapDispatchToProps)(NewProduct)
