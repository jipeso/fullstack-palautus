import { useDispatch } from 'react-redux'

import { loginUser } from '../reducers/userReducer'
import { useField } from '../hooks'

const LoginForm = () => {
	const dispatch = useDispatch()
	const username = useField('text')
	const password = useField('password')

	const onLogin = async event => {
		event.preventDefault()

		dispatch(
			loginUser({
				username: username.value,
				password: password.value,
			})
		)

		username.reset()
		password.reset()
	}

	const excludeReset = ({ reset, ...props }) => props

	return (
		<form onSubmit={onLogin}>
			<div>
				username
				<input
					{...excludeReset(username)}
					data-testid="username-input"
					id="username-input"
				/>
			</div>
			<div>
				password
				<input
					{...excludeReset(password)}
					data-testid="password-input"
					id="password-input"
				/>
			</div>
			<button type="submit">login</button>
		</form>
	)
}

export default LoginForm
