import React, { useRef, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import { auth, fs } from '../../../firebase'

import firebase from 'firebase/app'

const Login = () => {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const history = useHistory()

    const [showPassword, setShowPassword] = useState(false)

    const signInWithGoogle = async (e) => {
        e.preventDefault()
        try {
            const provider = new firebase.auth.GoogleAuthProvider()
            await auth.signInWithPopup(provider).catch((error) => {
                alert(error.message)
            })
            if (auth.currentUser) {
                const user = auth.currentUser
                console.log(user)
                await fs // firestore
                    .collection('users')
                    .doc(auth.currentUser.uid) // adding a doc with the the id of the users uid
                    .set({
                        displayName: user.displayName,
                        email: user.email,
                        userUID: user.uid,
                        profileImage: user.photoURL,
                    }) // setting its info
                console.log('added: ', {
                    displayName: user.displayName,
                    email: user.email,
                    userUID: user.uid,
                    profileImage: user.photoURL,
                })
                history.push('/')
            } else {
                console.log('123456789')
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            console.log('33')
            await login(emailRef.current.value.trim(), passwordRef.current.value)
            history.push('/')
        } catch (error) {
            console.log(error.message)
            console.log('ojojojojojojoj')
            setError(`Failed to login, ${error.message}`)
        }
        setLoading(false)
    }

    return (
        <div className='signup-container'>
            <div className='card'>
                <div className={`blobs-container ${loading ? 'loading' : ''}`}>
                    <Blob blobId='b1' />
                    <Blob blobId='b2' />
                    <Blob blobId='b3' />
                </div>
                <div className='content'>
                    <p className='title'>Login</p>
                    <p className='subtitle'>
                        Or do you not already have an account? <Link to='/signup'> Sing Up</Link>
                    </p>
                    {error && <div className='userMessage error'>{error}</div>}
                    <p onClick={signInWithGoogle}>sing in with google</p>

                    <div className='input-container'>
                        <input
                            type='text'
                            className='input-btn'
                            placeholder='Email'
                            ref={emailRef}
                        />
                    </div>
                    <div className='input-container'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className='input-btn'
                            placeholder='Password'
                            ref={passwordRef}
                        />
                        <div
                            className='password-visibility-toggler'
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </div>
                    </div>

                    {/* <div className='password-visibility-toggler'></div> */}

                    <Link to='forgot-password'>Forgot password?</Link>
                    <div className='outline-btn' disabled={loading} onClick={handleSubmit}>
                        Login
                    </div>
                </div>
            </div>
        </div>
    )
}

const Blob = ({ blobId }) => {
    return (
        <div className={`blob ${blobId}`}>
            {/* This SVG is from https://codepen.io/Ali_Farooq_/pen/gKOJqx */}
            <svg
                // xmlns:xlink='http://www.w3.org/1999/xlink'
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 310 350'
            >
                <path d='M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z' />
            </svg>
        </div>
    )
}

export default Login