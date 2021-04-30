import React, { useRef, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import { avatars } from '../../avatars/avatars.js'

const Signup = () => {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { signup } = useAuth()
    const history = useHistory()
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
            return setError('Passwords do ot match')
        }
        try {
            setError('')
            setLoading(true)
            const res = await signup(emailRef.current.value.trim(), passwordRef.current.value)

            // if we didn't get a response back that means it was successful
            // so we send user back to '/'
            if (!res) {
                history.push('/')
            } else {
                setError(res.message)
            }
        } catch (error) {
            setError('failed to create an account')
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
                    <p className='title'>Sign Up</p>
                    <p className='subtitle'>
                        Or do you already have an account? <Link to='/login'> Sing In</Link>
                    </p>

                    {error && <div className='userMessage error'>{error}</div>}

                    <div className='input-container'>
                        <input
                            type='text'
                            className='input-btn'
                            placeholder='Email'
                            ref={emailRef}
                        />
                    </div>
                    <div className='avatars-container'>
                        {avatars?.map((avatar) => {
                            return (
                                <div
                                    className='avatar-circle'
                                    style={{ backgroundImage: `url(${avatar.image})` }}
                                ></div>
                            )
                        })}
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
                    <div className='input-container'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className='input-btn'
                            placeholder='Confirm password'
                            ref={confirmPasswordRef}
                        />
                    </div>

                    <div className='outline-btn' disabled={loading} onClick={handleSubmit}>
                        Sign Up
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

export default Signup
