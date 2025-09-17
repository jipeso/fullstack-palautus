import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'
import { setNotification } from './notificationReducer'

const slice = createSlice({
	name: 'user',
	initialState: {
		loggedUser: null,
		allUsers: [],
	},
	reducers: {
		setLoggedUser(state, action) {
			state.loggedUser = action.payload
		},
		clearLoggedUser(state, action) {
			state.loggedUser = null
		},
		setAllUsers(state, action) {
			state.allUsers = action.payload
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
			dispatch(setLoggedUser(user))
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
			dispatch(setLoggedUser(user))
		} catch (exception) {
			dispatch(setNotification('wrong username or password'))
		}
	}
}

export const logoutUser = () => {
	return dispatch => {
		window.localStorage.removeItem('loggedBlogappUser')
		blogService.setToken(null)
		dispatch(clearLoggedUser())
	}
}

export const initilizeAllUsers = () => {
	return async dispatch => {
		const users = await userService.getAll()
		dispatch(setAllUsers(users))
	}
}

export const { setLoggedUser, clearLoggedUser, setAllUsers } = slice.actions
export default slice.reducer
