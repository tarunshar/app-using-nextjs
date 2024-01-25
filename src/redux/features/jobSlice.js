import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  // job
  jobData: {},
  jobIsLoading: false,
  jobIsError: false,
  jobError: '',
  jobIsSuccess: false
}

export const jobAction = createAsyncThunk('job/jobAction', async payload => {
  try {
    const response = await axios.get(`/jobs_api/?page=${payload}`, {
      headers: {
        Accept: '*/*'
      }
    })

    return response.data
  } catch (error) {
    if (error.response && error.response.status === 504) {
      throw new Error('Gateway Timeout')
    } else if (error.response && error.response.status === 404) {
      throw new Error('Resource Not Found')
    } else if (error.response && error.response.data.error) {
      throw new Error(error.response.data.error)
    } else if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message)
    } else {
      throw new Error('There was an error with the internal server. Please contact your site administrator.')
    }
  }
})

export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    resetjobAction(state) {
      // state.loginData = {}
      state.jobIsLoading = false
      state.jobIsError = false
      state.jobError = ''
      state.jobIsSuccess = false
    }
  },
  extraReducers(builder) {
    builder

      // job
      .addCase(jobAction.pending, state => {
        state.jobData = {}
        state.jobIsLoading = true
        state.jobIsError = false
        state.jobError = ''
        state.jobIsSuccess = false
      })
      .addCase(jobAction.fulfilled, (state, action) => {
        // console.log('jobAction Inside fulfilled', action)

        state.jobData = action.payload
        state.jobIsLoading = false
        state.jobIsError = false
        state.jobError = ''
        state.jobIsSuccess = true
      })
      .addCase(jobAction.rejected, (state, action) => {
        // console.log('jobAction Inside error', action)

        state.jobData = {}
        state.jobIsLoading = false
        state.jobIsError = true
        state.jobError = action.error.message
        state.jobIsSuccess = false
      })
  }
})

export const { resetjobAction } = jobSlice.actions

export default jobSlice.reducer

// job
export const jobData = state => state.job.jobData

export const jobIsLoading = state => state.job.jobIsLoading

export const jobIsError = state => state.job.jobIsError

export const jobError = state => state.job.jobError

export const jobIsSuccess = state => state.job.jobIsSuccess
