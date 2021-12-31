import React from 'react'
import styles from 'styles/Messages.module.scss'
import MessageType from 'types/Message'

interface MessageProps {
	message: MessageType
}

const Message: React.FC<MessageProps> = ({ message }) => {
	return <div className={styles.messageSent}>{message.text}</div>
}

export default Message
