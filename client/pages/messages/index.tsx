import React from 'react'
import type { NextPage } from 'next'
import Sidebar from '@/components/messages/Sidebar'
import Main from '@/components/messages/Main'

const Messages: NextPage = () => {
	return (
		<div className="h-full-wo-nav flex">
			<Sidebar />
			<Main />
		</div>
	)
}

export default Messages
