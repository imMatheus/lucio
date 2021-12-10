import React from 'react'
import styles from 'styles/Messages.module.scss'
import MessageType from 'types/Message'
interface MessageProps {
	message: MessageType
}

const Message: React.FC<MessageProps> = ({ message }) => {
	console.log('message', message)

	return <div className={styles.message}>{message.text}</div>
}

export default Message
