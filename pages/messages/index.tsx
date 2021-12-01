import React from 'react'
import type { NextPage } from 'next'
import styles from 'styles/Messages.module.scss'
import Sidebar from '@/components/messages/Sidebar'

const Index: NextPage = () => {
	return (
		<div className={styles.wrapper}>
			<Sidebar />
		</div>
	)
}

export default Index
