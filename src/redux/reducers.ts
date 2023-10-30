// reducers.js
import { combineReducers } from 'redux';
import CartReducer from './cartReducer';
import UserReducer from './userReducer';

const rootReducer = combineReducers({
  cart: CartReducer,
  user: UserReducer,
})

export default rootReducer
