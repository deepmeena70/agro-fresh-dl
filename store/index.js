import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../store/user'

const store = configureStore({
  reducer: {
    todos: userReducer,
  }
})

export default store