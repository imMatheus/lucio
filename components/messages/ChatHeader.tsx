import React from 'react'
import styles from './messages.module.scss'
import { ArrowLeft } from 'react-feather'
import { useRouter } from 'next/router'
interface ChatHeaderProps {
	name: string
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ name }) => {
	const router = useRouter()
	return (
		<div className={styles.chatHeader}>
			<div
				className="w-6 h-6 rounded-full mr-3 p-1 bg-theme cursor-pointer hover:bg-themeDimmed"
				onClick={() => router.back()}
			>
				<ArrowLeft size={'100%'} className="text-white" />
			</div>
			<h3 className="">{name}</h3>
		</div>
	)
}

export default ChatHeader
