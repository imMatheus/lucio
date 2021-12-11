import React from 'react'
import styles from 'styles/Messages.module.scss'
import MessageType from 'types/Message'
import { useAuth } from '@/context/AuthContext'

interface MessageProps {
	message: MessageType
}

const Message: React.FC<MessageProps> = ({ message }) => {
	const { currentUser } = useAuth()
	console.log('message', message.text)
	console.log('message author', message.authorId)
	console.log('user', currentUser?.uid)

	return (
		<div className={currentUser?.uid === message.authorId ? styles.messageSent : styles.messageReceived}>
			{message.text}
		</div>
	)
}

export default Message
