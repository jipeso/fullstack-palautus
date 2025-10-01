import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client/react'
import { LOGIN } from '../queries'

const LoginForm = ({ setToken, navigate }) => {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('salasana')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log('login failed', error)
    }
  })


  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)

      navigate('/')
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div className='py-10'>
      <form className='space-y-4' onSubmit={submit}>
        <div>
          username <input
            className='border'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            className='border'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className='border px-2 bg-gray-100 hover:bg-gray-200' type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm