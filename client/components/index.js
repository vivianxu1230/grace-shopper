/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as SingleProduct} from './singleProduct'
export {Home} from './home'
export {default as Cart} from './cart'
export {adminView} from './adminView'
export {default as AdminUsers} from './AdminUsers'
export {adminProducts} from './adminProducts'
export {default as AllProducts} from './allProducts'
export {default as CheckoutPage} from './checkoutpage'
