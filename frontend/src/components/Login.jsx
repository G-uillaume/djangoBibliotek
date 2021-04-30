import React, { useEffect, useState } from 'react'
import '../css/Login.css'
import { useCookies } from 'react-cookie'
import { Link, useHistory } from 'react-router-dom'
import APIService from '../APIService'

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useCookies(['mytoken'])

    let history = useHistory()

    useEffect(() => {
        if (token['mytoken'] && token['mytoken'] !== 'undefined') {
            history.goBack()
        }
    }, [token, history])

    const login = () => {
        if (username && password) {
            APIService.loginUser({ username, password })
            .then(res => setToken('mytoken', res.token))
            .catch(error => console.log(error))
        }
    }

    return (
        <>
            <h1 id="title">Login</h1>
            <div className="form">
                <div id="form">
                    <p>
                        <input type="text" name="username" id="username" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                    </p>
                    <p>
                        <input type="password" name="password" id="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    </p>
                    <button onClick={login}>Login</button>
                    <p> 
                        <Link to='/signup'>Register now!</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login
