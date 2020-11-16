import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const {products} = this.props

    return (
      <div>
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
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(AllProducts)
