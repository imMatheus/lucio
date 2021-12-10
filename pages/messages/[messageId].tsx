import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Sidebar from '@/components/messages/Sidebar'
import Chat from '@/components/messages/Chat'
import styles from 'styles/Messages.module.scss'
import { useRouter } from 'next/router'
import { fs } from '@/firebase/index'
import { collection, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore'
import Message from 'types/Message'

const MessagePage: NextPage = () => {
	const router = useRouter()
	const [messages, setMessages] = useState<Message[]>([])
	const { messageId } = router.query

	useEffect(() => {
		if (!messageId) return
		const q = query(
			collection(fs, `chats/${Array.isArray(messageId) ? messageId[0] : messageId}/messages`),
			orderBy('date', 'desc')
		)
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			if (!querySnapshot.empty) {
				setMessages(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Message)))
			} else {
				setMessages([])
			}
		})
		return unsubscribe
	}, [messageId])
	return (
		<div className={styles.wrapper}>
			<Sidebar />
			<Chat messages={messages} />
		</div>
	)
}

export default MessagePage
