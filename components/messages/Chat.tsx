import React from 'react'
import styles from '../../styles/messages.module.scss'
import ChatHeader from './ChatHeader'
import InputArea from './InputArea'
import Message from './Message'
import MessageType from 'types/Message'

interface ChatProps {
	messages: MessageType[]
}

const Chat: React.FC<ChatProps> = ({ messages }) => {
	return (
		<div className={styles.chat}>
			<ChatHeader name="Hello world!" />
			<div className={styles.messagesWrapper}>
				{messages.map((message) => (
					<Message key={message.id} message={message} />
				))}
			</div>
			<InputArea />
		</div>
	)
}

export default Chat
