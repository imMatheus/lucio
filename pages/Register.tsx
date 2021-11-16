import React, { ReactElement, useEffect, useState } from 'react'
import styles from '../styles/Registration.module.scss'
import { Eye, EyeOff } from 'react-feather'
import * as EmailValidator from 'email-validator'
import { passwordStrength } from 'check-password-strength'
import TypedText from '@/components/TypedText'
import InputField from '@/components/InputField'
import * as style from '@dicebear/adventurer-neutral'
import { createAvatar } from '@dicebear/avatars'
import { useAuth } from '@/context/AuthContext'
import Image from 'next/Image'

export default function Register(): ReactElement {
    const { signup } = useAuth()
    const [email, setEmail] = useState('')
    const [isValidEmail, setIsValidEmail] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordContainer, setShowPasswordContainer] = useState(false)
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [showUserNameContainer, setShowUserNameContainer] = useState(false)
    const [avatar, setAvatar] = useState('')

    useEffect(() => {
        setIsValidEmail(EmailValidator.validate(email))
        setAvatar(
            createAvatar(style, {
                seed: email,
            })
        )
    }, [email])

    async function signupHandler() {
        console.log('aaa')

        try {
            await signup(email, password, username, avatar)
        } catch (error) {
            alert(error)
        }
    }

    const buff = new Buffer(avatar)
    const base64data = buff.toString('base64')

    const modalBg = '#0d1117'

    return (
        <section className='font-mono relative  flex-1'>
            {/* <div className={styles.blob}></div> */}
            <div className={styles.modal}>
                <TypedText className='text-[#627597]'>Welcome to LucioCode</TypedText>
                <TypedText className='text-[#627597]' delay={1}>
                    Let´s begin the adventure
                </TypedText>
                <Image
                    src={`data:image/svg+xml;base64,${base64data}`}
                    alt=''
                    width={100}
                    height={100}
                />
                <TypedText className='text-[#00cfc8] text-base font-semibold mt-5' delay={2}>
                    Enter your email
                </TypedText>
                <InputField
                    state={email}
                    setState={setEmail}
                    type='email'
                    onClick={() => setShowPasswordContainer(true)}
                    success={isValidEmail}
                    buttonText='Continue'
                />
                {showPasswordContainer && (
                    <>
                        <TypedText
                            className='text-[#00cfc8] text-base font-semibold mt-5'
                            delay={0}
                        >
                            Create a password
                        </TypedText>
                        <InputField
                            state={password}
                            setState={setPassword}
                            onClick={() => setShowUserNameContainer(true)}
                            buttonText='Continue'
                            type={showPassword ? 'text' : 'password'}
                            success={
                                passwordStrength(password).value === 'Strong' ||
                                passwordStrength(password).value === 'Medium'
                            }
                            RightIcon={
                                showPassword ? (
                                    <Eye
                                        onClick={() => setShowPassword((c) => !c)}
                                        className='w-4 cursor-pointer flex-shrink-0'
                                    />
                                ) : (
                                    <EyeOff
                                        onClick={() => setShowPassword((c) => !c)}
                                        className='w-4 cursor-pointer flex-shrink-0'
                                    />
                                )
                            }
                        />

                        {showUserNameContainer && (
                            <>
                                <TypedText
                                    className='text-[#00cfc8] text-base font-semibold mt-5'
                                    delay={0}
                                >
                                    Enter a username
                                </TypedText>
                                <InputField
                                    state={username}
                                    setState={setUsername}
                                    onClick={signupHandler}
                                    type='text'
                                    buttonText='Sing up'
                                    success={username.length > 1}
                                />
                            </>
                        )}
                    </>
                )}
            </div>
            {!isValidEmail && email !== '' && (
                <p className='p-5 text-[#627597] text-center'>
                    The email is not valid or already in use
                </p>
            )}

            <p className='p-5 text-[#627597] text-center'>{passwordStrength(password).value}</p>
        </section>
    )
}
