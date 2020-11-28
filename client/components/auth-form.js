import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, me} from '../store'
import {Div, Button, Row, Col, Anchor, Input, Icon, Container} from 'atomize'

/**
 * COMPONENT
 */
class AuthForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showPassword: false,
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  async handleChange(e) {
    await this.setState({...this.state, [e.target.name]: e.target.value})
  }

  render() {
    const {name, displayName, handleSubmit, error} = this.props
    const {showPassword} = this.state
    return (
      <Container>
        <form onSubmit={handleSubmit} name={name}>
          {name === 'signup' && (
            <Row>
              <Col>
                <label htmlFor="firstName">
                  <small>First Name</small>
                </label>
                <Input
                  onChange={e => this.handleChange(e)}
                  value={this.state.firstName}
                  placeholder="First Name"
                  name="firstName"
                  type="text"
                />
              </Col>
              <Col>
                <label htmlFor="lastName">
                  <small>Last Name</small>
                </label>
                <Input
                  onChange={e => this.handleChange(e)}
                  value="this.state.lastName"
                  placeholder="Last Name"
                  name="lastName"
                  type="text"
                />
              </Col>
            </Row>
          )}
          <Row>
            <Col>
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <Input
                value={this.state.email}
                name="email"
                onChange={e => this.handleChange(e)}
                placeholder="Email"
                p={{x: '2.5rem'}}
                prefix={
                  <Icon
                    name="Email"
                    color="warning800"
                    size="16px"
                    cursor="pointer"
                    pos="absolute"
                    top="50%"
                    left="0.75rem"
                    transform="translateY(-50%)"
                  />
                }
              />
            </Col>
            <Col>
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <Input
                value={this.state.password}
                name="password"
                onChange={e => this.handleChange(e)}
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                suffix={
                  <Button
                    pos="absolute"
                    onClick={() => this.setState({showPassword: !showPassword})}
                    bg="transparent"
                    w="3rem"
                    top="0"
                    right="0"
                    rounded={{r: 'md'}}
                  >
                    <Icon
                      name={showPassword ? 'EyeSolid' : 'Eye'}
                      color={showPassword ? 'success700' : 'success800'}
                      size="16px"
                    />
                  </Button>
                }
              />
            </Col>
          </Row>
          <Row d="flex" justify="center" m="12px">
            <Col size="2">
              <Button shadow="3" hoverShadow="4" type="submit">
                {displayName}
              </Button>
            </Col>
            <Col size="2">
              <Anchor pos="relative" top="20%" href="/auth/google">
                {displayName} with Google
              </Anchor>
            </Col>
          </Row>

          {error &&
            error.response && (
              <Div>
                <p>{error.response.data}</p>
              </Div>
            )}
        </form>
      </Container>
    )
  }
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    async handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const formInfo = {
        email: evt.target.email.value.toUpperCase(),
        password: evt.target.password.value
      }
      if (formName === 'signup') {
        formInfo.firstName = evt.target.firstName.value
        formInfo.lastName = evt.target.lastName.value
      }
      await dispatch(auth(formInfo, formName))
      window.location.replace('/')
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
