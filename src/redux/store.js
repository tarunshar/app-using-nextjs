import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import authReducer from './features/authSlice'
import userReducer from './features/userSlice'
import demoReducer from './features/demoSlice'
import pointDataReducer from './features/pointDataSlice'
import advSearchReducer from './features/advanceSearchSlice'
import aiSearchReducer from './features/AiSearchSlice'
import signalInterestReducer from './features/signalInterestSlice'
import manualFeedReducer from './features/manualFeedSlice'
import jobReducer from './features/jobSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
    user: userReducer,
    demo: demoReducer,
    pointData: pointDataReducer,
    advSearch: advSearchReducer,
    aiSearch: aiSearchReducer,
    signalInterest: signalInterestReducer,
    manualFeed: manualFeedReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: true
})

setupListeners(store.dispatch)
