import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { createAsyncThunkWithTokenRefresh, createAxiosConfig } from '../common/commonFunctions'
import { toast } from 'react-toastify'

const initialState = {
  // advance search
  advSearchData: [],
  advSearchIsLoading: false,
  advSearchIsSuccess: false,
  advSearchIsError: false,
  advSearchError: '',

  // auto suggestion name
  autoSuggestNameData: [],
  autoSuggestNameIsLoading: false,
  autoSuggestNameIsSuccess: false,
  autoSuggestNameIsError: false,
  autoSuggestNameError: '',

  // auto suggestion UserId
  autoSuggestUserIdData: [],
  autoSuggestUserIdIsLoading: false,
  autoSuggestUserIdIsSuccess: false,
  autoSuggestUserIdIsError: false,
  autoSuggestUserIdError: ''
}

export const advSearchAction = createAsyncThunkWithTokenRefresh('advSearch/advSearchAction', async (token, payload) => {
  const headers = { 'Content-Type': 'application/json', Accept: 'application/json' } // Adjust the value as needed

  return axios.post(`/searchSus/`, payload, createAxiosConfig(token, headers))
})

export const autoSuggestNameAction = createAsyncThunkWithTokenRefresh(
  'advSearch/autoSuggestNameAction',
  async (token, payload) => {
    const headers = { name: payload.name } // Adjust the value as needed

    return axios.get(`/autoSuggestName/`, createAxiosConfig(token, headers))
  }
)

export const autoSuggestUserIdAction = createAsyncThunkWithTokenRefresh(
  'advSearch/autoSuggestUserIdAction',
  async (token, payload) => {
    const headers = { userId: payload.userId } // Adjust the value as needed

    return axios.get(`http://11.0.0.108:9090/autoSuggestUserId/`, createAxiosConfig(token, headers))
  }
)

export const advSearchSlice = createSlice({
  name: 'advSearch',
  initialState,
  reducers: {
    resetAdvSearchAction(state) {
      state.advSearchIsLoading = false
      state.advSearchIsError = false
      state.advSearchError = ''
      state.advSearchIsSuccess = false
    },
    resetAdvSearchDataAction(state) {
      state.advSearchData = []
      state.advSearchIsLoading = false
      state.advSearchIsError = false
      state.advSearchError = ''
      state.advSearchIsSuccess = false
    },

    // auto suggestion name
    resetAutoSuggestNameAction(state) {
      state.autoSuggestNameData = []
      state.autoSuggestNameIsLoading = false
      state.autoSuggestNameIsSuccess = false
      state.autoSuggestNameIsError = false
      state.autoSuggestNameError = ''
    },

    // auto suggestion UserId
    resetAutoSuggestUserIdAction(state) {
      state.autoSuggestUserIdData = []
      state.autoSuggestUserIdIsLoading = false
      state.autoSuggestUserIdIsSuccess = false
      state.autoSuggestUserIdIsError = false
      state.autoSuggestUserIdError = ''
    }
  },
  extraReducers(builder) {
    builder
      .addCase(advSearchAction.pending, state => {
        state.advSearchData = []
        state.advSearchIsLoading = true
        state.advSearchIsError = false
        state.advSearchError = ''
        state.advSearchIsSuccess = false
      })
      .addCase(advSearchAction.fulfilled, (state, action) => {
        state.advSearchData = action.payload
        state.advSearchIsLoading = false
        state.advSearchIsError = false
        state.advSearchError = ''
        state.advSearchIsSuccess = true
        if (action.payload.listData.length == 0) {
          toast('data not found', { autoClose: 2000, type: 'error' })
        }
      })
      .addCase(advSearchAction.rejected, (state, action) => {
        state.advSearchData = []
        state.advSearchIsLoading = false
        state.advSearchIsError = true
        state.advSearchError = action.error.message
        state.advSearchIsSuccess = false
      })

      // auto suggestion name
      .addCase(autoSuggestNameAction.pending, state => {
        state.autoSuggestNameData = []
        state.autoSuggestNameIsLoading = true
        state.autoSuggestNameIsSuccess = false
        state.autoSuggestNameIsError = false
        state.autoSuggestNameError = ''
      })
      .addCase(autoSuggestNameAction.fulfilled, (state, action) => {
        state.autoSuggestNameData = action.payload.listdata
        state.autoSuggestNameIsLoading = false
        state.autoSuggestNameIsSuccess = true
        state.autoSuggestNameIsError = false
        state.autoSuggestNameError = ''
      })
      .addCase(autoSuggestNameAction.rejected, (state, action) => {
        state.autoSuggestNameData = []
        state.autoSuggestNameIsLoading = false
        state.autoSuggestNameIsSuccess = false
        state.autoSuggestNameIsError = true
        state.autoSuggestNameError = action.error.message

        toast(action.error.message, { autoClose: 2000, type: 'error' })
        advSearchSlice.caseReducers.resetAutoSuggestNameAction(state, action)
      })

      // auto suggestion UserId
      .addCase(autoSuggestUserIdAction.pending, state => {
        state.autoSuggestUserIdData = []
        state.autoSuggestUserIdIsLoading = true
        state.autoSuggestUserIdIsSuccess = false
        state.autoSuggestUserIdIsError = false
        state.autoSuggestUserIdError = ''
      })
      .addCase(autoSuggestUserIdAction.fulfilled, (state, action) => {
        state.autoSuggestUserIdData = action.payload.listdata
        state.autoSuggestUserIdIsLoading = false
        state.autoSuggestUserIdIsSuccess = true
        state.autoSuggestUserIdIsError = false
        state.autoSuggestUserIdError = ''
      })
      .addCase(autoSuggestUserIdAction.rejected, (state, action) => {
        state.autoSuggestUserIdData = []
        state.autoSuggestUserIdIsLoading = false
        state.autoSuggestUserIdIsSuccess = false
        state.autoSuggestUserIdIsError = true
        state.autoSuggestUserIdError = action.error.message

        toast(action.error.message, { autoClose: 2000, type: 'error' })
        advSearchSlice.caseReducers.resetAutoSuggestUserIdAction(state, action)
      })
  }
})

export const {
  resetAdvSearchAction,
  resetAdvSearchDataAction,
  resetAutoSuggestNameAction,
  resetAutoSuggestUserIdAction
} = advSearchSlice.actions

export default advSearchSlice.reducer
