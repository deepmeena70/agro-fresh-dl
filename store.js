import { configureStore } from '@reduxjs/toolkit'

import userReducer from './features/user'
import userDataReducer from './features/userData'
import vegetableReducer from './features/vegetable'
import fruitReducer from './features/fruit'
import exoticReducer from './features/exotic'
import offersReducer from './features/offers'

import cartReducer from './features/cart'

const store = configureStore({
  reducer: {
    user: userReducer,
    userData: userDataReducer,
    vegetable: vegetableReducer,
    fruit: fruitReducer,
    exotic: exoticReducer,
    cart: cartReducer,
    offers: offersReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export default store;