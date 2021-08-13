import { configureStore } from '@reduxjs/toolkit'

import userReducer from './features/user'
import userDataReducer from './features/userData'

const store = configureStore({
  reducer: {
    user: userReducer,
    userData: userDataReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export default store