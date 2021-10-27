import { configureStore } from '@reduxjs/toolkit'

import userReducer from './features/user'
import userDataReducer from './features/userData'
import vegetableReducer from './features/vegetable'
import vegetableBlkReducer from './features/vegetableBulk'
import fruitReducer from './features/fruit'
import fruitBlkReducer from './features/fruitBulk'
import exoticReducer from './features/exotic'
import exoticBlkReducer from './features/exoticBulk'
import offersReducer from './features/offers'
import searchReducer from './features/search'

import cartReducer from './features/cart'
import cartDetailsReducer from './features/cartDetails'
import deliveryAddressReducer from './features/deliveryAddress'
import locationReducer from './features/location'

const store = configureStore({
  reducer: {
    user: userReducer,
    userData: userDataReducer,
    vegetable: vegetableReducer,
    vegetableBulk: vegetableBlkReducer,
    fruit: fruitReducer,
    fruitBulk: fruitBlkReducer,
    exotic: exoticReducer,
    exoticBulk: exoticBlkReducer,
    cart: cartReducer,
    offers: offersReducer,
    cartDetails: cartDetailsReducer,
    deliveryAddress: deliveryAddressReducer,
    location: locationReducer,
    search: searchReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export default store;