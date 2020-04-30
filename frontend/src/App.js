import React, { useState } from 'react'

import './global.css'
import Header from './components/Header/Header.jsx'
import User from './components/User/User.jsx'
import ManagerMessages from './components/ManagerMessages/ManagerMessages.jsx'

export default function App() {

  const [username, setUsername] = useState('')
  const [isLogin, setIsLogin] = useState(false)

  function onChangeUsername(e) {
    setUsername(e.target.value)
  }

  function makeLogin() {
    setIsLogin(true)
  }

  return (
    <>
      {!isLogin && <div className="container-login">
        <div className="login">
          <h1>Panel de gerenciamento do chat</h1>
          <input value={username} onChange={onChangeUsername} type="text" placeholder='Informe o seu nome consultor...' />
          <button onClick={makeLogin}>Avançar</button>
        </div>
      </div>}
      {isLogin && <Header />}
      {isLogin && <User username={username}/>}
      {isLogin && <ManagerMessages />}
    </>
  )
}
