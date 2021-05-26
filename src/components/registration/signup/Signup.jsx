import React, { useRef, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import useBadWordsFilter from '../../../hooks/useBadWordsFilter'

const Signup = () => {
    const emailRef = useRef(null)
    const displayNameRef = useRef(null)
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const filter = useBadWordsFilter()
    const { signup } = useAuth()
    const [profileImage, setProfileImage] = useState(null)
    const history = useHistory()
    const [showPassword, setShowPassword] = useState(false)

    const generateHashedPassword = () => {
        // Math.random() will return a random double, eg: 0.13562
        // then toString(36) converts it to base-36: "0.4fzyo82mvyr"
        // then slice(-4) only keeps the last 4 from the string : "mvyr"
        var psw = Math.random().toString(36).slice(-4)

        for (let i = 0; i < 3; i++) {
            // appending 4 random numbers/letters
            psw += '-' + Math.random().toString(36).slice(-4)
        }
        passwordRef.current.value = psw // sett psw to the psw fields
        confirmPasswordRef.current.value = psw

        return psw

        // I should probably swap to use uuidv4
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (displayNameRef.current?.value.trim().length < 6) {
                return setError('Display name must be 6 or more characters long')
            }
            const cleaned = filter.clean(displayNameRef.current?.value.trim())
            if (displayNameRef.current?.value.trim() !== cleaned) {
                return setError('Please do not use bad words :)')
            }

            if (!profileImage) {
                return setError('Please pick a profile image.')
            }
            if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
                return setError('Passwords do not match')
            }
            if (passwordRef.current?.value.length < 6) {
                return setError('Password has to be 6 or more characters ')
            }
        } catch (e) {
            setError('Oops, something went wrong :)')
        }
        try {
            setError('')
            setLoading(true)
            const response = await signup(
                emailRef.current.value.trim(),
                passwordRef.current.value,
                displayNameRef.current.value,
                profileImage
            )

            // if we didn't get a response back that means it was successful
            // so we send user back to '/'
            setLoading(false)
            if (!response) {
                history.push('/')
            } else {
                // else, something went wrong so we set an error
                setError(response.message)
            }
        } catch (error) {
            setError('failed to create an account, ' + error.message)
        }
    }

    const imageUploadImgHandler = async (e) => {
        const reader = new FileReader()

        reader.onload = () => {
            if (reader.readyState === 2) {
                setProfileImage(reader.result)
            }
        }
        if (e.target.files[0]) {
            reader.readAsDataURL(e?.target?.files[0])
        }
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
                    <div className='input-container'>
                        <input
                            type='text'
                            className='input-btn'
                            placeholder='Display name'
                            ref={displayNameRef}
                            max='10'
                            maxLength='25'
                        />
                    </div>
                    <div className='content-box'>
                        <div className='profileImage-container'>
                            <div
                                className='image'
                                style={{ backgroundImage: `url(${profileImage})` }}
                            ></div>
                            <input
                                type='file'
                                id='modelPic'
                                accept='image/*'
                                style={{ display: ' none' }}
                                onChange={imageUploadImgHandler}
                            />
                            <label htmlFor='modelPic'>
                                <div className='text'>Choose Profile Image</div>
                            </label>
                        </div>
                        <div className='inputs'>
                            <p onClick={generateHashedPassword}>Generate secure password</p>
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
                        </div>
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
