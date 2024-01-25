import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { createAsyncThunkWithTokenRefresh, createAxiosConfig } from '../common/commonFunctions'

const initialState = {
  // demo
  demoData: '',
  demoDataIsLoading: false,
  demoDataIsError: false,
  demoDataError: '',
  demoDataIsSuccess: false,

  // demo with payload
  demoPayloadData: {},
  demoPayloadDataIsLoading: false,
  demoPayloadDataIsError: false,
  demoPayloadDataError: '',
  demoPayloadDataIsSuccess: false
}

export const demoAction = createAsyncThunkWithTokenRefresh('demo/demoAction', async (token, payload) => {
  const headers = {} // Adjust the value as needed

  return axios.get(`/user_service/api/version/`, createAxiosConfig(token, headers))
})

export const demoPayloadAction = createAsyncThunkWithTokenRefresh(
  'demo/demoPayload',
  async (token, payload) => {
    const headers = { isManual: 'true' } // Adjust the value as needed

    return axios.post(`/vendor/uploadInvoice/customExceptin/`, payload, createAxiosConfig(token, headers))
  },
  demoAction
)

export const demoSlice = createSlice({
  name: 'demo',
  initialState,
  reducers: {
    // demoPayloadAction
    resetDemoPayloadAction(state) {
      state.demoPayloadDataIsLoading = false
      state.demoPayloadDataIsError = false
      state.demoPayloadDataError = ''
      state.demoPayloadDataIsSuccess = false
    }
  },
  extraReducers(builder) {
    builder

      // demo
      .addCase(demoAction.pending, state => {
        state.demoData = ''
        state.demoDataIsLoading = true
        state.demoDataIsError = false
        state.demoDataError = ''
        state.demoDataIsSuccess = false
      })
      .addCase(demoAction.fulfilled, (state, action) => {
        // console.log('demoAction Inside fulfilled', action)

        state.demoData = action.payload
        state.demoDataIsLoading = false
        state.demoDataIsError = false
        state.demoDataError = ''
        state.demoDataIsSuccess = true
      })
      .addCase(demoAction.rejected, (state, action) => {
        // console.log('demoAction Inside error', action)

        state.demoData = ''
        state.demoDataIsLoading = false
        state.demoDataIsError = true
        state.demoDataError = action.error.message
        state.demoDataIsSuccess = false
      })

      // demo action payload
      .addCase(demoPayloadAction.pending, state => {
        state.demoPayloadData = {}
        state.demoPayloadDataIsLoading = true
        state.demoPayloadDataIsError = false
        state.demoPayloadDataError = ''
        state.demoPayloadDataIsSuccess = false
      })
      .addCase(demoPayloadAction.fulfilled, (state, action) => {
        //  console.log('demoPayloadAction Inside fulfilled', state, action)

        state.demoPayloadData = action.payload
        state.demoPayloadDataIsLoading = false
        state.demoPayloadDataIsError = false
        state.demoPayloadDataError = ''
        state.demoPayloadDataIsSuccess = true

        toast('request successful', { autoClose: 2000, type: 'success' })
        demoSlice.caseReducers.resetDemoPayloadAction(state, action)
      })
      .addCase(demoPayloadAction.rejected, (state, action) => {
        // console.log('demoPayloadAction Inside error', action)

        state.demoPayloadData = {}
        state.demoPayloadDataIsLoading = false
        state.demoPayloadDataIsError = true
        state.demoPayloadDataError = action.error.message
        state.demoPayloadDataIsSuccess = false

        toast(action.error.message, { autoClose: 2000, type: 'error' })
        demoSlice.caseReducers.resetDemoPayloadAction(state, action)
      })
  }
})

export default demoSlice.reducer
