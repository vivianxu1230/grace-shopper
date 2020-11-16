import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts, filter} from '../store'

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: 'all'
    }
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.fetchProducts()
  }
  async handleClick(event) {
    await this.setState({category: event.target.getAttribute('value')})
    if (this.state.category !== 'all') {
      this.props.filter(this.state.category)
    } else {
      this.props.fetchProducts()
    }
    console.log(this.state)
  }

  render() {
    const {products} = this.props
    const categories = [
      {id: 1, text: 'Tops', value: 'tops'},
      {id: 2, text: 'Bottoms', value: 'bottoms'},
      {id: 3, text: 'Accessories', value: 'accessories'},
      {id: 4, text: 'Whole body', value: 'wholebody'},
      {id: 5, text: 'Shoes', value: 'shoes'}
    ]
    let opt = {}
    opt.onClick = this.handleClick
    opt.style = {position: 'relative'}
    opt.className = 'categories'
    return (
      <div>
        <div className="options">
          <div className="categories-container">
            <p> Categories</p>
            {categories.map(category => {
              return (
                <p {...opt} value={category.value} key={category.id}>
                  {category.text}
                </p>
              )
            })}
          </div>
        </div>
        {products.map(product => {
          return (
            <div className="products" key={product.id}>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
              <div className="img-overlay">
                {!product.quantity && (
                  <svg viewBox="50 20 500 500">
                    <g>
                      <rect
                        fill="#000000"
                        stroke="#000000"
                        strokeWidth="2"
                        x="-108.82705974578857"
                        y="42.39097976770421"
                        width="457.4586700633133"
                        height="55.71429116630995"
                        className=""
                        transform="rotate(-42.082557678222656 119.90228271484374,70.24813079833986) "
                      />
                      <text
                        fill="white"
                        transform="scale(1.1), translate(80, 100), rotate(-42.5)"
                      >
                        SOLD OUT
                      </text>
                    </g>
                  </svg>
                )}
                <img
                  style={{width: '500px', height: '500px'}}
                  src={product.imageUrl}
                />
              </div>
              <p>${product.price}</p>
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
  filter: category => dispatch(filter(category))
})

export default connect(mapState, mapDispatch)(AllProducts)
