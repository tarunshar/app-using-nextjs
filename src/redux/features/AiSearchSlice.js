import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { createAsyncThunkWithTokenRefresh, createAxiosConfig } from '../common/commonFunctions'

const initialState = {
  // image search
  imageSearchData: {},
  imageIsLoading: false,
  imageIsSuccess: false,
  imageIsError: false,
  imageError: '',

  // associates Incident
  associatesIncidentData: {},
  associatesIncidentIsLoading: false,
  associatesIncidentIsSuccess: false,
  associatesIncidentIsError: false,
  associatesIncidentError: ''
}

export const imageSearchAction = createAsyncThunkWithTokenRefresh(
  'aiSearch/imageSearchAction',
  async (token, payload) => {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }

    return axios.post(`/claros/facerec/imgprocess/`, payload.formData, createAxiosConfig(token, headers))
  }
)

export const associatesIncidentAction = createAsyncThunkWithTokenRefresh(
  'aiSearch/associatesIncident',
  async (token, payload) => {
    const headers = { id: payload.id }

    return axios.get(`/associates/incident/`, createAxiosConfig(token, headers))
  }
)

export const aiSearchSlice = createSlice({
  name: 'aiSearch',
  initialState,
  reducers: {
    // imageSearchAction
    resetImageSearchAction(state) {
      state.imageIsLoading = false
      state.imageIsSuccess = false
      state.imageIsError = false
      state.imageError = ''
    },
    resetImageSearchData(state) {
      state.imageSearchData = {}
    },
    resetAssociatesIncidentAction(state) {
      state.associatesIncidentData = {}
      state.associatesIncidentIsLoading = false
      state.associatesIncidentIsSuccess = false
      state.associatesIncidentIsError = false
      state.associatesIncidentError = ''
    }
  },
  extraReducers(builder) {
    builder

      // image search action payload
      .addCase(imageSearchAction.pending, state => {
        state.imageSearchData = {}
        state.imageIsLoading = true
        state.imageIsSuccess = false
        state.imageIsError = false
        state.imageError = ''
      })
      .addCase(imageSearchAction.fulfilled, (state, action) => {
        //  console.log('imageSearchAction Inside fulfilled', state, action)

        state.imageSearchData = action.payload
        state.imageIsSuccess = true
        state.imageIsLoading = false
        state.imageIsError = false
        state.imageError = ''

        const { handleClose, setImageFile } = action.meta.arg
        setImageFile(null)
        handleClose()
        toast('request successful', { autoClose: 2000, type: 'success' })
        aiSearchSlice.caseReducers.resetImageSearchAction(state, action)
      })
      .addCase(imageSearchAction.rejected, (state, action) => {
        // console.log('imageSearchAction Inside error', action)

        state.imageSearchData = {}
        state.imageIsLoading = false
        state.imageIsSuccess = false
        state.imageIsError = true
        state.imageError = action.error.message

        const { handleClose, setImageFile } = action.meta.arg
        setImageFile(null)
        handleClose()
        toast(action.error.message, { autoClose: 2000, type: 'error' })
        aiSearchSlice.caseReducers.resetImageSearchAction(state, action)
      })

      // associates incident payload
      .addCase(associatesIncidentAction.pending, state => {
        state.associatesIncidentData = {}
        state.associatesIncidentIsLoading = true
        state.associatesIncidentIsSuccess = false
        state.associatesIncidentIsError = false
        state.associatesIncidentError = ''
      })
      .addCase(associatesIncidentAction.fulfilled, (state, action) => {
        state.associatesIncidentData = action.payload
        state.associatesIncidentIsLoading = false
        state.associatesIncidentIsSuccess = true
        state.associatesIncidentIsError = false
        state.associatesIncidentError = ''

        const { setShowTable, setSuspect, setFriendsList, setPersonName, formik } = action.meta.arg
        setShowTable && setShowTable(false)
        setSuspect && setSuspect(action.payload.suspect)
        setFriendsList && setFriendsList(action.payload.suspect.friends)
        setPersonName && setPersonName(action.payload.suspect.name)

        formik && formik.setFieldValue('name', action.payload.suspect.name)
      })
      .addCase(associatesIncidentAction.rejected, (state, action) => {
        state.associatesIncidentData = {}
        state.associatesIncidentIsLoading = false
        state.associatesIncidentIsSuccess = false
        state.associatesIncidentIsError = true
        state.associatesIncidentError = action.error.message

        toast(action.error.message, { autoClose: 2000, type: 'error' })
        aiSearchSlice.caseReducers.resetAssociatesIncidentAction(state, action)
      })
  }
})

export const { resetImageSearchData, resetAssociatesIncidentAction } = aiSearchSlice.actions

export default aiSearchSlice.reducer
