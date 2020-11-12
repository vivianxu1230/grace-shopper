// [] render this page if user is admin after logging in
// [] create two large buttons - one linked to all users & one linked to all products
// [x] create view for all users with info (firstName, lastName, email, orders)
// [] create view for all products with edit form & delete button
// [] create button to link to form to submit new products
// [] new products appear instantly without refreshing
// [] updates to products appear instantly without refreshing
// [] deleted products disappear instantly without refreshing
// [] new products are added to the DB
// [] updated products are updated in the DB
// [] deleted products are removed from the DB

import React from 'react'
import {Link} from 'react-router-dom'

export const adminView = () => (
  <div>
    <h1>ADMIN VIEW</h1>
    <Link to="./adminproducts">Products</Link>
    <Link to="./adminusers"> Users</Link>
  </div>
)
