import React from 'react'
import { useRouter } from 'next/router'
import { useListenDocs } from '@/firebase'

interface MainMessagesProps {}

const MainMessages: React.FC<MainMessagesProps> = ({}) => {
	const router = useRouter()
	const [messages] = useListenDocs(`chats/${router.query.id}/messages`)
	console.log(messages)

	return (
		<div className="flex-1 overflow-y-scroll p-4">
			<p className="text-2xl">
				{messages.map((message: any) => (
					<p key={message.id || 'd'}>{message.text}</p>
				))}
			</p>
		</div>
	)
}

export default MainMessages
