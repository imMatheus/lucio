import React from 'react'
import styles from 'styles/Messages.module.scss'

interface MessageProps {}

const Message: React.FC<MessageProps> = ({}) => {
	return <div className={styles.message}>hello im message</div>
}

export default Message
