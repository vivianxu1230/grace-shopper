import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts} from '../store'

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: 'all',
      filteredProducts: [],
      categories: [
        {id: 1, text: 'All', value: 'all'},
        {id: 2, text: 'Tops', value: 'tops'},
        {id: 3, text: 'Bottoms', value: 'bottoms'},
        {id: 4, text: 'Accessories', value: 'accessories'},
        {id: 5, text: 'Whole Body', value: 'wholebody'},
        {id: 6, text: 'Shoes', value: 'shoes'}
      ]
    }
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.fetchProducts()
  }
  async handleClick(event) {
    console.log(this.state)
    await this.setState({category: event.target.getAttribute('value')})
    const filteringProducts = this.props.products.filter(
      product => product.category === this.state.category
    )
    await this.setState({
      filteredProducts: filteringProducts
    })
  }

  render() {
    console.log(this.state)
    const products =
      this.state.category === 'all'
        ? this.props.products
        : this.state.filteredProducts
    return (
      <div>
        <div className="options">
          {this.state.categories.map(category => {
            return (
              <p
                className="categories"
                onClick={this.handleClick}
                value={category.value}
                key={category.id}
              >
                {category.text}
              </p>
            )
          })}
        </div>
        <div className="soloProductContainer">
          {products.map(product => {
            return (
              <div className="soloProduct" key={product.id}>
                <h1>{product.name}</h1>
                <div className="img-overlay">
                  {!product.quantity && (
                    <Link to={`/products/${product.id}`}>
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
                    </Link>
                  )}
                </div>
                <Link to={`/products/${product.id}`}>
                  <img src={product.imageUrl} />
                </Link>
                <h2>${product.price}</h2>
              </div>
            )
          })}
        </div>
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
