import React from 'react'
import { Message as MessageType } from '@/types/Message'

interface Message {
	message: MessageType
}

const Message: React.FC<Message> = ({ message }) => {
	return (
		<div className="mb-6 flex max-w-2xl gap-2">
			<div className="h-10 w-10 flex-shrink-0 rounded-full bg-black"></div>
			<div className="w-max">
				<div className="mb-1 flex items-baseline justify-between">
					<h3 className="mr-4 font-medium">{message.author.name} th third</h3>
					<p className="text-sm text-clr-text-grayed">Thursday 11:44pm</p>
				</div>
				<div className="rounded-md bg-clr-bg-grayed-dark p-2">{message.text}</div>
			</div>
		</div>
	)
}

export default Message
