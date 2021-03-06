import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts} from '../store'
import {Container, Row, Col, Div, Image, Text, Collapse} from 'atomize'

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showCollapse: false,
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
    await this.setState({category: event.target.getAttribute('value')})
    const filteringProducts = this.props.products.filter(
      product => product.category === this.state.category
    )
    await this.setState({
      filteredProducts: filteringProducts
    })
  }

  render() {
    const {selectedCode, showCollapse} = this.state
    const products =
      this.state.category === 'all'
        ? this.props.products
        : this.state.filteredProducts
    return (
      <Container>
        <Row>
          <Col>
            <Text
              textSize="subheader"
              textAlign="center"
              cursor="pointer"
              onClick={() => this.setState({showCollapse: !showCollapse})}
            >
              Categories
            </Text>
            <Collapse isOpen={showCollapse}>
              <Div>
                {this.state.categories.map(category => {
                  return (
                    <Text
                      textAlign="center"
                      cursor="pointer"
                      className="categories"
                      onClick={this.handleClick}
                      value={category.value}
                      key={category.id}
                    >
                      {category.text}
                    </Text>
                  )
                })}
              </Div>
            </Collapse>
          </Col>
        </Row>
        <Row>
          {products.map(product => {
            return (
              <Col size="3" key={product.id}>
                <Div
                  hoverShadow="blue-shadow"
                  d="flex"
                  flexDir="column"
                  textAlign="center"
                  rounded="md"
                  m="5px"
                  border="1px solid"
                  borderColor="black"
                  className="soloProduct"
                >
                  <Link to={`/products/${product.id}`}>
                    <Text textColor="black">{product.name}</Text>
                  </Link>
                  <div className="img-overlay">
                    {/* {!product.quantity && (
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
                      )} */}
                  </div>
                  <Link to={`/products/${product.id}`}>
                    <Image h="250px" w="auto" src={product.imageUrl} />
                  </Link>
                  <Text textSize="caption">${product.price}</Text>
                </Div>
              </Col>
            )
          })}
        </Row>
      </Container>
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
