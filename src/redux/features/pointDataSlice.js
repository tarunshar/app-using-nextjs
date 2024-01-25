import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { createAsyncThunkWithTokenRefresh, createAxiosConfig } from '../common/commonFunctions'
import { toast } from 'react-toastify'

const initialState = {
  //point data
  pointData: {},
  pointDataIsLoading: false,
  pointDataIsSuccess: false,
  pointDataIsError: false,
  pointDataError: ''
}

export const addPointDataAction = createAsyncThunkWithTokenRefresh(
  'pointdata/addPointDataAction',
  async (token, payload) => {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }

    return axios.post(`/addPointData/`, payload.formData, createAxiosConfig(token, headers))
  }
)

export const pointDataSlice = createSlice({
  name: 'pointData',
  initialState,
  reducers: {
    resetPointDataAction(state) {
      state.pointDataIsLoading = false
      state.pointDataIsError = false
      state.pointDataError = ''
      state.pointDataIsSuccess = false
    }
  },
  extraReducers(builder) {
    builder
      .addCase(addPointDataAction.pending, state => {
        state.pointData = ''
        state.pointDataIsLoading = true
        state.pointDataIsError = false
        state.pointDataError = ''
        state.pointDataIsSuccess = false
      })
      .addCase(addPointDataAction.fulfilled, (state, action) => {
        state.pointData = action.payload
        state.pointDataIsLoading = false
        state.pointDataIsError = false
        state.pointDataError = ''
        state.pointDataIsSuccess = true

        const { setOpen } = action.meta.arg
        setOpen(false)
        toast('request successful', { autoClose: 2000, type: 'success' })
        pointDataSlice.caseReducers.resetPointDataAction(state, action)
      })
      .addCase(addPointDataAction.rejected, (state, action) => {
        state.pointData = ''
        state.pointDataIsLoading = false
        state.pointDataIsError = true
        state.pointDataError = action.error.message
        state.pointDataIsSuccess = false

        toast(action.error.message, { autoClose: 2000, type: 'error' })
        pointDataSlice.caseReducers.resetPointDataAction(state, action)
      })
  }
})

export default pointDataSlice.reducer
