import React, { ReactElement, useEffect, useState } from 'react'
import styles from '../styles/Registration.module.scss'
import useTimeout from '@/hooks/useTimeout'
import { ArrowRight, Eye, EyeOff } from 'react-feather'
import * as EmailValidator from 'email-validator'

interface Props {}

interface TypedTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    delay?: number
}

function TypedText({ delay = 0, children, ...props }: TypedTextProps) {
    const length = children?.toString().length // length of string
    const animationTime = 1000 // css animation time is 700ms, added 300ms to wait and stop when its done
    delay *= animationTime
    const [showBlinker, setShowBlinker] = useState(false)
    const [animationDone, setAnimationDone] = useState(false)

    useTimeout(() => {
        setShowBlinker(true) // show the text and blinker
    }, delay)

    useTimeout(() => {
        setShowBlinker(false) // remove the blinker
        setAnimationDone(true) // will make the text appear
    }, delay + animationTime)

    return animationDone || showBlinker ? (
        <p className={props.className + ' ' + styles.typedText}>
            <span
                className={showBlinker && !animationDone ? styles.before : ''} // stops the class from being added twice, re-starting the animation
                style={{
                    animationTimingFunction: `steps(${length})`,
                }}
            ></span>
            {showBlinker && (
                <span
                    className={styles.after}
                    style={{
                        animationTimingFunction: `steps(${length})`,
                    }}
                ></span>
            )}
            {children}
        </p>
    ) : null
}

export default function Register({}: Props): ReactElement {
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordContainer, setShowPasswordContainer] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isValidEmail, setIsValidEmail] = useState(false)

    useEffect(() => {
        setIsValidEmail(EmailValidator.validate(email))
    }, [email])

    const modalBg = '#0c162d'

    function Button({ ...props }: React.HTMLAttributes<HTMLButtonElement>) {
        return (
            <button
                {...props}
                className='bg-transparent border-[1px] rounded-md py-1 px-3 text-sm border-[#627597] text-[#627597]'
            >
                Continue
            </button>
        )
    }

    // function InputField() {
    //     return (
    //         // <div className={`flex bg-[${modalBg}] items-center mb-3`}>
    //         <div className={`flex bg-red-500 items-center mb-3`}>
    //             <ArrowRight className='text-pink-500 mr-2 w-5' />
    //             <input
    //                 value={email}
    //                 onChange={(e) => {
    //                     e.preventDefault()
    //                     setEmail(e.target.value)
    //                 }}
    //                 className='flex-1 outline-none self-stretch bg-transparent text-white bg-blue-400'
    //             />
    //             <Button />
    //         </div>
    //     )
    // }

    return (
        <section className='flex justify-center items-center font-mono'>
            <div className={styles.modal}>
                <TypedText className='text-[#627597]'>Welcome to LucioCode</TypedText>
                <TypedText className='text-[#627597]' delay={1}>
                    Let´s begin the adventure
                </TypedText>
                <TypedText className='text-[#00cfc8] text-base font-semibold mt-5' delay={2}>
                    Enter your email
                </TypedText>
                <div className={`flex items-center mb-5 text-white `}>
                    <ArrowRight className='mr-2 w-5' />
                    <input
                        value={email}
                        onChange={(e) => {
                            e.preventDefault()
                            setEmail(e.target.value)
                        }}
                        className='flex-1 outline-none self-stretch bg-transparent text-white'
                    />
                    <button
                        onClick={() => setShowPasswordContainer(true)}
                        disabled={!isValidEmail && email !== ''}
                        className='bg-transparent border-[1px] rounded-md py-1 px-3 text-sm border-[#627597] text-[#627597]'
                    >
                        Continue
                    </button>
                </div>

                {!isValidEmail && email !== '' && (
                    <p className='p-3 text-[#627597]'>The email is not valid or already in use</p>
                )}

                {isValidEmail && (
                    <>
                        <TypedText
                            className='text-[#00cfc8] text-base font-semibold mt-5'
                            delay={0}
                        >
                            Enter your email
                        </TypedText>

                        <div className='flex bg-red-400'>
                            <ArrowRight className='text-pink-300' />
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='flex-1 outline-none'
                                type={showPassword ? 'text' : 'password'}
                            />
                            {showPassword ? (
                                <Eye onClick={() => setShowPassword((c) => !c)} />
                            ) : (
                                <EyeOff onClick={() => setShowPassword((c) => !c)} />
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}
