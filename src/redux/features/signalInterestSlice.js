import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { createAsyncThunkWithTokenRefresh, createAxiosConfig } from '../common/commonFunctions'

const initialState = {
  signalData: {},
  signalIsLoading: false,
  signalIsError: false,
  signalError: '',
  signalIsSuccess: false
}

export const createSignalAction = createAsyncThunkWithTokenRefresh('signal/createSignal', async (token, payload) => {
  const headers = { submissiondate: payload.values.date }

  return axios.post(`/signal/`, payload, createAxiosConfig(token, headers))
})

export const signalSlice = createSlice({
  name: 'signalInterest',
  initialState,
  reducers: {
    resetSignalAction(state) {
      state.signalData = {}
      state.signalIsLoading = false
      state.signalIsError = false
      state.signalError = ''
      state.signalIsSuccess = false
    }
  },
  extraReducers(builder) {
    builder
      .addCase(createSignalAction.pending, state => {
        state.signalData = {}
        state.signalIsLoading = true
        state.signalIsError = false
        state.signalError = ''
        state.signalIsSuccess = false
      })
      .addCase(createSignalAction.fulfilled, (state, action) => {
        state.signalData = action.payload
        state.signalIsLoading = false
        state.signalIsError = false
        state.signalError = ''
        state.signalIsSuccess = true

        const { setOpen } = action.meta.arg
        setOpen(false)

        toast('request successful', { autoClose: 2000, type: 'success' })
        signalSlice.caseReducers.resetSignalAction(state, action)
      })
      .addCase(createSignalAction.rejected, (state, action) => {
        state.signalData = {}
        state.signalIsLoading = false
        state.signalIsError = true
        state.signalError = action.error.message
        state.signalIsSuccess = false
        toast(action.error.message, { autoClose: 2000, type: 'error' })
        signalSlice.caseReducers.resetSignalAction(state, action)
      })
  }
})

export default signalSlice.reducer
