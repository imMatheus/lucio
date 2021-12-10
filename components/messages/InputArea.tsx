import React, { useState, useRef } from 'react'
import styles from 'styles/Messages.module.scss'
import { useRouter } from 'next/router'
import { collection, addDoc } from 'firebase/firestore'
import { useAuth } from '@/context/AuthContext'
import { fs } from '@/firebase/index'
import { useToast } from '@/context/ToastContext'
import Message from 'types/Message'

interface InputAreaProps {}

const InputArea: React.FC<InputAreaProps> = ({}) => {
	const [message, setMessage] = useState('')
	const [loading, setLoading] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const router = useRouter()
	const { messageId } = router.query
	const { currentUser } = useAuth()
	const { setToastMessage } = useToast()

	async function sendMessage() {
		if (!currentUser) return setToastMessage('Could not send message as you are not loged in')
		setLoading(true)
		await addDoc(collection(fs, `chats/${messageId}/messages`), {
			text: message,
			authorID: currentUser.uid,
			date: new Date()
		})
		setLoading(false)
		setToastMessage('sent message')
		setMessage('')
		inputRef.current!.focus()
	}

	return (
		<div className={styles.inputArea}>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					sendMessage()
				}}
			>
				<input
					type="text"
					ref={inputRef}
					value={message}
					onChange={(e) => {
						setMessage(e.target.value)
					}}
					placeholder="Write a new message..."
				/>
				<button className={styles.sendButton}>Send {loading ? 'true' : 'false'}</button>
			</form>
		</div>
	)
}

export default InputArea
