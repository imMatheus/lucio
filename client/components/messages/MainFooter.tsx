import React, { useState } from 'react'
import { Textarea } from '@mantine/core'
import styles from './MainFooter.module.scss'
import { useRouter } from 'next/router'
import Button from '@/components/button'
import { fs } from '@/firebase'
import { addDoc, collection } from 'firebase/firestore'

interface MainFooterProps {}

const MainFooter: React.FC<MainFooterProps> = ({}) => {
	const router = useRouter()
	const [message, setMessage] = useState('')

	async function sendMessage() {
		if (!message) return

		setMessage('')
		await addDoc(collection(fs, `chats/${router.query.id}/messages`), { text: message })
	}

	return (
		<div className="flex max-h-96 flex-shrink-0 gap-2 border-t border-t-clr-border p-4">
			<div className={styles.textArea__wrapper}>
				<Textarea
					value={message}
					onChange={(event) => setMessage(event.currentTarget.value)}
					placeholder="Write a message..."
					aria-label="Write a message..."
					className="!border-none shadow-none !ring-0"
					autosize
					size="lg"
					minRows={1}
					style={{ padding: '0px', border: 'none !important', boxShadow: 'none' }}
					variant="unstyled"
				/>
			</div>
			<div className="flex h-full flex-shrink-0 items-end">
				<Button disabled={!message} onClick={sendMessage}>
					Send
				</Button>
			</div>
		</div>
	)
}

export default MainFooter
