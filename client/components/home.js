import React from 'react'
import {Link} from 'react-router-dom'
import {Login, Signup} from './auth-form'
import {Div, Image} from 'atomize'

/**
 * COMPONENT
 */
export const Home = () => {
  return (
    <Div>
      <Link to="/products">
        <Image src="https://resize.hswstatic.com/w_796/gif/persephone.jpg" />
      </Link>
    </Div>
  )
}
