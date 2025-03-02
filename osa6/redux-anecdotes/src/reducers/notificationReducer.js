import { createSlice } from "@reduxjs/toolkit"

let timeoutId

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    hideNotification(state, action) {
      return ''
    }
  }
})

export const setNotification = (message, duration = 5) => {
  return dispatch => {

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    dispatch(showNotification(message))

    timeoutId = setTimeout(() => {
      dispatch(hideNotification())
      timeoutId = null
    }, duration * 1000)
  }
}
export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer