import React, { useState, useRef, useEffect } from 'react'
import styles from '../../styles/messages.module.scss'
import { useRouter } from 'next/router'
import { useToast } from '@/context/ToastContext'
import Message from 'types/Message'

interface InputAreaProps {}

const InputArea: React.FC<InputAreaProps> = ({}) => {
	const [message, setMessage] = useState('')
	const [loading, setLoading] = useState(false)
	const inputRef = useRef<HTMLTextAreaElement>(null)
	const router = useRouter()
	const { messageId } = router.query
	const { setToast } = useToast()

	async function sendMessage() {
		setLoading(false)
		setToast({ message: 'Sent message', type: 'success' })
		// setMessage('')
		inputRef.current!.value = ''
		if (inputRef.current) {
			inputRef.current.style.height = '1px'
			inputRef.current.style.height = inputRef.current.scrollHeight + 'px'
		}
		inputRef.current!.focus()
	}

	useEffect(() => {
		inputRef.current!.addEventListener('keydown', (e) => {
			if (e.key === 'Enter' && !e.shiftKey) {
				sendMessage()
			} else {
				// setMessage(e.target.value)

				if (inputRef.current) {
					inputRef.current.style.height = '1px'
					inputRef.current.style.height = inputRef.current.scrollHeight + 'px'
				}
			}
		})

		return () => {
			inputRef.current?.removeEventListener('keydown', (e) => {})
		}
	}, [inputRef.current])
	// }, [inputRef])

	return (
		<div className={styles.inputArea}>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					sendMessage()
				}}
				className={styles.form}
			>
				<textarea
					// rows={}
					// type="text"
					ref={inputRef}
					// value={message}
					onChange={(e) => {
						// setMessage(e.target.value)
						// if (inputRef.current) {
						// 	inputRef.current.style.height = '1px'
						// 	inputRef.current.style.height = inputRef.current.scrollHeight + 'px'
						// }
					}}
					rows={1}
					className={styles.inputField}
					placeholder="Write a new message..."
				>
					{/* <span className="bg-pink-500">{message}</span> */}
				</textarea>
				{/* <div className={styles.inputField} contentEditable={true}>
					start
				</div> */}
				{/* <button className={styles.sendButton}>Send{loading ? 'true' : 'false'}</button> */}
			</form>
		</div>
	)
}

export default InputArea