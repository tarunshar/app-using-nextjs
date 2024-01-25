import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { createAsyncThunkWithTokenRefresh, createAxiosConfig } from '../common/commonFunctions'

const initialState = {
  // register Poi
  registerPoiData: {},
  registerPoiIsLoading: false,
  registerPoiIsError: false,
  registerPoiError: '',
  registerPoiIsSuccess: false,

  // Add Relation Form
  addRelationData: {},
  addRelationIsLoading: false,
  addRelationIsError: false,
  addRelationError: '',
  addRelationIsSuccess: false
}

export const registerPoiAction = createAsyncThunkWithTokenRefresh(
  'manualFeed/registerPoiAction',
  async (token, payload) => {
    // console.log('payload', payload)
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json', DOB: payload.DOB } // Adjust the value as needed

    return axios.post(`/registerPOI/`, payload.body, createAxiosConfig(token, headers))
  }
)

export const addRelationFormAction = createAsyncThunkWithTokenRefresh(
  'manualFeed/addRelationFormAction',
  async (token, payload) => {
    // console.log('payload', payload)
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' } // Adjust the value as needed

    return axios.post(`/addRelation/`, payload.body, createAxiosConfig(token, headers))
  }
)

export const manualFeedSlice = createSlice({
  name: 'manualFeed',
  initialState,
  reducers: {
    // registerPoi
    resetRegisterPoiAction(state) {
      state.registerPoiData = {}
      state.registerPoiIsLoading = false
      state.registerPoiIsError = false
      state.registerPoiError = ''
      state.registerPoiIsSuccess = false
    },

    // Add Relation Form
    resetAddRelationFormAction(state) {
      state.addRelationData = {}
      state.addRelationIsLoading = false
      state.addRelationIsError = false
      state.addRelationError = ''
      state.addRelationIsSuccess = false
    }
  },
  extraReducers(builder) {
    builder

      // register Poi Action
      .addCase(registerPoiAction.pending, state => {
        state.registerPoiData = {}
        state.registerPoiIsLoading = true
        state.registerPoiIsError = false
        state.registerPoiError = ''
        state.registerPoiIsSuccess = false
      })
      .addCase(registerPoiAction.fulfilled, (state, action) => {
        //  console.log('registerPoiAction Inside fulfilled', state, action)

        state.registerPoiData = action.payload
        state.registerPoiIsLoading = false
        state.registerPoiIsError = false
        state.registerPoiError = ''
        state.registerPoiIsSuccess = true

        const { setOpen, formikRef } = action.meta.arg

        setOpen(false)
        formikRef.current.resetForm()

        toast('request successful', { autoClose: 2000, type: 'success' })
        manualFeedSlice.caseReducers.resetRegisterPoiAction(state, action)
      })
      .addCase(registerPoiAction.rejected, (state, action) => {
        // console.log('registerPoiAction Inside error', action)

        state.registerPoiData = {}
        state.registerPoiIsLoading = false
        state.registerPoiIsError = true
        state.registerPoiError = action.error.message
        state.registerPoiIsSuccess = false

        toast(action.error.message, { autoClose: 2000, type: 'error' })
        manualFeedSlice.caseReducers.resetRegisterPoiAction(state, action)
      })

      // add Relation Form Action
      .addCase(addRelationFormAction.pending, state => {
        state.addRelationData = {}
        state.addRelationIsLoading = true
        state.addRelationIsError = false
        state.addRelationError = ''
        state.addRelationIsSuccess = false
      })
      .addCase(addRelationFormAction.fulfilled, (state, action) => {
        state.addRelationData = action.payload
        state.addRelationIsLoading = false
        state.addRelationIsError = false
        state.addRelationError = ''
        state.addRelationIsSuccess = true

        const { setOpen } = action.meta.arg

        setOpen(false)

        toast('request successful', { autoClose: 2000, type: 'success' })
        manualFeedSlice.caseReducers.resetAddRelationFormAction(state, action)
      })
      .addCase(addRelationFormAction.rejected, (state, action) => {
        state.addRelationData = {}
        state.addRelationIsLoading = false
        state.addRelationIsError = true
        state.addRelationError = action.error.message
        state.addRelationIsSuccess = false

        toast(action.error.message, { autoClose: 2000, type: 'error' })
        manualFeedSlice.caseReducers.resetAddRelationFormAction(state, action)
      })
  }
})

export default manualFeedSlice.reducer
