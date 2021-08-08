import React, { ReactElement, useRef, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { Link } from 'react-router-dom'

const Blob = ({ blobId }: { blobId: string }) => {
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

export default function ForgotPassword(): ReactElement {
    const emailRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const { resetPassword } = useAuth()

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        try {
            setMessage('')
            setError('')
            setLoading(true)
            if (!emailRef.current) return
            const response = await resetPassword(emailRef.current.value)
            if (response) {
                setLoading(false)
                return setError('Failed to reset password, ' + response)
            }
            setMessage('Check your email to reset password')
        } catch (error) {
            setError('Failed to reset password')
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
                    <p className='title'>Password Reset</p>
                    <p className='subtitle'>
                        Or do you not already have an account? <Link to='/signup'> Sing Up</Link>
                    </p>
                    {message && <div className='userMessage success'>{message}</div>}
                    {error && <div className='userMessage error'>{error}</div>}

                    <div className='input-container'>
                        <input
                            type='text'
                            className='input-btn'
                            placeholder='Email'
                            ref={emailRef}
                        />
                    </div>

                    <Link to='login'>Login</Link>
                    <div className='outline-btn' onClick={handleSubmit}>
                        Reset password
                    </div>
                </div>
            </div>
        </div>
    )
}