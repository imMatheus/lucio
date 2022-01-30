import React, { useState } from 'react'
import type { NextPage } from 'next'
import Sidebar from '@/components/messages/Sidebar'
import Chat from '@/components/messages/Chat'
import styles from 'styles/Messages.module.scss'
import { useRouter } from 'next/router'
import Message from 'types/Message'

const MessagePage: NextPage = () => {
	const router = useRouter()
	const [messages, setMessages] = useState<Message[]>([])
	const { messageId } = router.query

	return (
		<div className={styles.wrapper}>
			<Sidebar />
			<Chat messages={messages} />
		</div>
	)
}

export default MessagePage
