import React from 'react'
import {connect} from 'react-redux'
import { fetchSingleProduct, addProductToCart } from '../store/singleProduct'

export class SingleProduct extends React.Component {

  componentDidMount(){
    this.props.fetchSingleProduct(this.props.match.params.id)
    this.props.addProductToCart(this.props.match.params.id)
  }
 
  
  


 render(){

  const product = this.props.product
  


   return (
     <div>
       
       <h1>{product.name}</h1>
       <img src = {product.imageUrl} />
       <h2>{product.description}</h2>
        <p>{product.price}</p>
        
        <button 
        type = 'submit'
        className = 'addToCart'
        onClick = {() => this.addProductToCart(product.id, 1)}
        >
          Add To Cart
        </button>

     </div>
   )
 }

 
}

const mapStateToProps = (state) => ({
  product: state.product
})


const mapDispatchToProps = (dispatch) => {
  return  {
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    addProductToCart: (id, count) => dispatch(addProductToCart(id, count))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)