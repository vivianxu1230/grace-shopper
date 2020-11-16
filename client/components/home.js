import React from 'react'
import {Link} from 'react-router-dom'
import {Login, Signup} from './auth-form'

/**
 * COMPONENT
 */
export const Home = () => {
  return (
    <div>
      {/* <Login />
      <Signup /> */}

      <div className="mainContainer">
        <Link to="/products">
          <img
            className="mainImg"
            src="https://images.theconversation.com/files/293774/original/file-20190924-54793-157i3zo.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop"
          />
        </Link>
      </div>
    </div>
  )
}
