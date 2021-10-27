import React, { ReactElement, useEffect, useState } from 'react'
import styles from '../styles/Registration.module.scss'
import useTimeout from '@/hooks/useTimeout'

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

                <input />
            </div>
        </section>
    )
}
