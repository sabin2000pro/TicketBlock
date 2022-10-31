import React from 'react'
import PropTypes from 'prop-types'

type CartProps = { // Props for the cart
  isCartOpen: boolean
}

const Cart: React.FC<CartProps> = ({isCartOpen}: CartProps) => {
    
  return (

    <>
  
    </>


  )


}

Cart.propTypes = {
  isCartOpen: PropTypes.bool.isRequired
}

export default Cart