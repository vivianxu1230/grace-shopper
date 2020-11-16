import React from 'react'
import {me} from './store'
import {connect} from 'react-redux'
import {Navbar} from './components'
import Routes from './routes'

class App extends React.Component {
  componentDidMount() {
    this.props.loadInitialData()
  }
  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(App)
