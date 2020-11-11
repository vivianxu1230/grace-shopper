import React from 'react'
import {connect} from 'react-redux'
import {getUsersThunk} from '../store'

class AdminUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }
  render() {
    return (
      <div>
        <h1>All Users</h1>
        {this.props.users.map(user => {
          return (
            <div key={user.id}>
              <h2>
                {user.firstName} {user.lastName}
              </h2>
              <h2>{user.email}</h2>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = reduxState => {
  return {
    users: reduxState.adminUsers
  }
}

const mapDispatch = dispatch => {
  return {
    getUsers: () => dispatch(getUsersThunk())
  }
}

export default connect(mapState, mapDispatch)(AdminUsers)
