import React, { useState } from 'react'
import useTimeout from '@/hooks/useTimeout'
import styles from '../../styles/typedtext.module.scss'

interface TypedTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
	delay?: number
}

export default function TypedText({ delay = 0, children, ...props }: TypedTextProps) {
	const length = children?.toString().length // length of string
	const animationTime = 750 // css animation time is 500ms, added 250ms to wait and stop when its done
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
					animationTimingFunction: `steps(${length})`
				}}
			></span>
			{showBlinker && (
				<span
					className={styles.after}
					style={{
						animationTimingFunction: `steps(${length})`
					}}
				></span>
			)}
			{children}
		</p>
	) : null
}
