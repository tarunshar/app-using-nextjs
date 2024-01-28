import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import authReducer from './features/authSlice'
import jobReducer from './features/jobSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: true
})

setupListeners(store.dispatch)
