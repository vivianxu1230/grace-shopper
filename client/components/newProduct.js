import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { postProduct } from '../store/products';

export class NewProduct extends React.Component{
    constructor () {
        super()
        this.state = {
            name: '',
            description: '',
            price: '',
            category: '',
            imageUrl: ''

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault()
     await this.props.createProduct(this.state)
       await this.setState({
            name: '',
            description: '',
            price: '',
            quantity: '',
            category: '',
            imageUrl: ''
        });
    }

    render () {
        return ( //Double check route for action
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={this.state.name}
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={this.state.description}
                    onChange={this.handleChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={this.state.price}
                    onChange={this.handleChange}
                />
                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={this.state.quantity}
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    name="ImageUrl"
                    placeholder="ImageUrl"
                    value={this.state.imageUrl}
                    onChange={this.handleChange}
                />

                <button type="submit">Submit New Product</button>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      createCampus: (product) => dispatch(postProduct(product)),
    };
  };

  export default connect(null, mapDispatchToProps)(NewProduct);