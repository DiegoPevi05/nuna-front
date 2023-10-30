const initialState = {
  cart: []
}

const CartReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((_,index:any) => index !== action.payload)
      }
    default:
      return state
  }
}

export default CartReducer
