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
            src="https://resize.hswstatic.com/w_796/gif/persephone.jpg"
          />
        </Link>
      </div>
    </div>
  )
}
