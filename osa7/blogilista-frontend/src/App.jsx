import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	Routes,
	Route,
	Navigate,
	useNavigate,
} from 'react-router-dom'

import UserList from './components/UserList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import User from './components/User'
import Home from './components/Home'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logoutUser, initilizeAllUsers } from './reducers/userReducer'


const App = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user.loggedUser)

	const [loginVisible, setLoginVisible] = useState(false)

	useEffect(() => {
		dispatch(initializeUser())
		dispatch(initializeBlogs())
		dispatch(initilizeAllUsers())
	}, [dispatch])

	const handleLogout = () => {
		dispatch(logoutUser())
	}

	const loginForm = () => {
		const hideWhenVisible = { display: loginVisible ? 'none' : '' }
		const showWhenVisible = { display: loginVisible ? '' : 'none' }

		return (
			<div>
				<div style={hideWhenVisible}>
					<button onClick={() => setLoginVisible(true)}>
						log in
					</button>
				</div>
				<div style={showWhenVisible}>
					<LoginForm />
					<button onClick={() => setLoginVisible(false)}>
						cancel
					</button>
				</div>
			</div>
		)
	}

	return (
		<div>
			<h2>blogs</h2>
			<Notification />
			{!user && loginForm()}
			{user && (
			<div>
				{user.name} logged in
				<button onClick={handleLogout}>logout</button>
			</div>
			)}

			<Routes>
				<Route path="/users" element={<UserList />} />
				<Route path="/users/:id" element={<User />} />	
				<Route path="/" element={<Home />} />
			</Routes>
		</div>
	)
}

export default App
