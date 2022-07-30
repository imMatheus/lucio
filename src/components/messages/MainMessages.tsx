import React from 'react'
import { useRouter } from 'next/router'
import { useListenDocs } from '@/firebase'
import Message from './message'
import { Message as MessageType } from '@/types/Message'
import { orderBy } from 'firebase/firestore'
import Loader from '@/components/loaders/Loader'

interface MainMessagesProps {}

const MainMessages: React.FC<MainMessagesProps> = ({}) => {
	const router = useRouter()
	const [messages, loading] = useListenDocs<MessageType>(
		`chats/${router.query.id}/messages`,
		orderBy('createdAt', 'asc')
	)
	console.log(messages)

	return (
		<div className="flex-1 overflow-y-scroll p-4">
			{loading && <Loader />}
			{messages.map((message) => (
				<Message key={message.id} message={message} />
			))}
		</div>
	)
}

export default MainMessages
