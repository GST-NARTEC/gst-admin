import { createSlice } from '@reduxjs/toolkit'

// Define initial state
const initialState = {
  language: 'ar' ,// Default language is English ('en' for English, 'ar' for Arabic)
  direction:'directionltr'
}

// Create the slice
const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload
    },
    setdirection: (state, action) => {
      state.direction = action.payload
    },
  },
})

// Export actions
export const { setLanguage,setdirection } = languageSlice.actions
export const seleclanguage = state => state.language.language
export const selecdirection = state => state.language.direction


// Export reducer
export default languageSlice.reducer
