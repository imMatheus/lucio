import React, { useState } from 'react'
import styles from 'styles/Messages.module.scss'

interface InputAreaProps {}

const InputArea: React.FC<InputAreaProps> = ({}) => {
	const [message, setMessage] = useState('')
	return (
		<div className={styles.inputArea}>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					alert('Please enter')
				}}
			>
				<input
					type="text"
					value={message}
					onChange={(e) => {
						setMessage(e.target.value)
					}}
					placeholder="Write a new message..."
				/>
				<button className={styles.sendButton}>Send</button>
			</form>
		</div>
	)
}

export default InputArea
