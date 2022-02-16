import React from 'react'
import styles from '../../styles/messages.module.scss'
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
				className="hover:bg-themeDimmed mr-3 h-6 w-6 cursor-pointer rounded-full bg-theme p-1"
				onClick={() => router.back()}
			>
				<ArrowLeft size={'100%'} className="text-white" />
			</div>
			<h3 className="">{name}</h3>
		</div>
	)
}

export default ChatHeader
