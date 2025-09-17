import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const slice = createSlice({
	name: 'user',
	initialState: null,
	reducers: {
		set(state, action) {
			return action.payload
		},
		clear(state, action) {
			return null
		},
	},
})

export const initializeUser = () => {
	return dispatch => {
		const loggedUserJSON = window.localStorage.getItem(
			'loggedBlogappUser'
		)
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			blogService.setToken(user.token)
			dispatch(set(user))
		}
	}
}

export const loginUser = credentials => {
	return async dispatch => {
		try {
			const user = await loginService.login(credentials)
			window.localStorage.setItem(
				'loggedBlogappUser',
				JSON.stringify(user)
			)
			blogService.setToken(user.token)
			dispatch(set(user))
		} catch (exception) {
			dispatch(setNotification('wrong username or password'))
		}
	}
}

export const logoutUser = () => {
	return dispatch => {
		window.localStorage.removeItem('loggedBlogappUser')
		blogService.setToken(null)
		dispatch(clear())
	}
}

export const { set, clear } = slice.actions
export default slice.reducer
