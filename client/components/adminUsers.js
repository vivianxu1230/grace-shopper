import React from 'react'
import {connect, useStore} from 'react-redux'

export class adminUsers extends React.Component {
  render() {
    return (
      <div>
        <h1>All Users</h1>
        {users.map(user => {
          return (
            <div key={user.id}>
              <h2>
                {user.firstName} {user.lastName}
              </h2>
              <h2>{user.email}</h2>
              {/* <h2>{user.orders}</h2> */}
            </div>
          )
        })}
      </div>
    )
  }
}
