import React, { useState, useContext } from 'react'
import { StoreContext } from '../../store/store'
import './style.scss'
import { Link, Redirect } from 'react-router-dom'
import { ICON_LOGO } from '../../Icons'

const LoginPage = () => {
    const { state, actions } = useContext(StoreContext)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const Login = (e) => {
        e.preventDefault()
        if(username.length && password.length){
            const values = {
                username,
                password
            }
            actions.login(values)
        }
    }

    return(
        <div className="login-wrapper">
            {state.loggedin && <Redirect to="/home" />}
            <ICON_LOGO/>
            <h1 className="login-header">
                Log in to Twitter
            </h1>
            {state.msg === 'Incorrect email or password' && <p className="login-error"> The username/email or password you entered is incorrect. </p>}
            <form id="loginForm" onSubmit={(e)=>Login(e)} className="login-form">
                <div className="login-input-wrap">
                    <div className="login-input-content">
                        <label>Email or username</label>
                        <input onChange={(e)=>setUsername(e.target.value)} type="text" name="username" className="login-input"/>
                    </div>
                </div>
                <div className="login-input-wrap">
                    <div className="login-input-content">
                        <label>Password</label>
                        <input onChange={(e)=>setPassword(e.target.value)} type="password" name="password" className="login-input"/>
                    </div>
                </div>
                <button type="submit" form="loginForm" className={username.length && password.length > 0 ? "login-btn-wrap button-active": "login-btn-wrap"}>
                    Log in
                </button>
            </form>
            <p className="signup-option">
                <Link to="/signup">
                    Sign up for Twitter
                </Link>
            </p>
        </div>
    )
}

export default LoginPage