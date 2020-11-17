import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleUser} from '../store/adminUsers'

export class SingleUser extends React.Component {
  componentDidMount() {
    this.props.fetchSingleUser(this.props.match.params.id)
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1 />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchSingleUser: id => dispatch(fetchSingleUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)
