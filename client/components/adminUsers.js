import React from 'react'
import {connect} from 'react-redux'
import {getUsersThunk} from '../store'
import {Link} from 'react-router-dom'

export class AdminUsers extends React.Component {
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
                <Link to={`/adminusers/${user.id}`}>
                  {user.firstName} {user.lastName}
                </Link>
              </h2>
              <h4>{user.email}</h4>
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
