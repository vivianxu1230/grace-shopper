import React from 'react'
import {Link} from 'react-router-dom'

export const adminView = () => (
  <div>
    <h1>ADMIN VIEW</h1>
    <Link to="./adminproducts">Products |</Link>
    <Link to="./adminusers"> Users</Link>
  </div>
)
