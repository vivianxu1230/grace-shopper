// import React from 'react'
// import {connect} from 'react-redux'
// import NewProductForm from './newProductForm'

// class CreateProduct extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       name: '',
//       description: '',
//       price: '',
//       category: '',
//       imageUrl: '',
//     }
//     this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }
//   handleChange(event) {
//     this.setState({
//       [event.target.name]: event.target.value,
//     })
//   }

//   handleSubmit(event) {
//     event.preventDefault()
//     const name = this.state.name
//     const description = this.state.description
//     const price = this.state.price
//     const category = this.state.category
//     const imageUrl = this.state.imageUrl
//     this.props.post({
//       name: name,
//       description: description,
//       price: price,
//       category: category,
//       imageUrl: imageUrl,
//     })
//     this.setState({
//       name: '',
//       description: '',
//       price: '',
//       category: '',
//       imageUrl: '',
//     })
//   }

//   render() {
//     return (
//       <div>
//         <NewProductForm
//           {...this.state}
//           handleChange={this.handleChange}
//           handleSubmit={this.handleSubmit}
//         />
//       </div>
//     )
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     post: () => dispatch(),
//   }
// }

// export default connect(null, mapDispatch)(CreateProduct)
