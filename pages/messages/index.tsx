import React from 'react'
import type { NextPage } from 'next'
import styles from 'styles/Messages.module.scss'
import Sidebar from '@/components/messages/Sidebar'
import Chat from '@/components/messages/Chat'

const Index: NextPage = () => {
	return (
		<div className={styles.wrapper}>
			<Sidebar />
			<Chat messages={['hej', 'abc']} />
			{/* <div className={styles.ff}></div> */}
		</div>
	)
}

export default Index
