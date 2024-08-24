import { useState } from 'react'
import loginService from '../../services/login'

const LoginForm = ({ loginVisible, setLoginVisible, setUser, setErrorMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleUsernameChange = ({target}) => {
    setUsername(target.value)

  }

  const handlePasswordChange = ({target}) => {
    setPassword(target.value)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)}>log in</button>
      </div>  
      <div style={showWhenVisible}>
        <div>
          <h2>Login</h2>

          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div>
              password
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
        <button onClick={() => setLoginVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

export default LoginForm