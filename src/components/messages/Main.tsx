import React from 'react'
import MainHeader from './MainHeader'
import MainMessages from './MainMessages'
import MainFooter from './MainFooter'

interface MainProps {}

const Main: React.FC<MainProps> = ({}) => {
	return (
		<div className={`flex flex-1 flex-col overflow-hidden`}>
			<MainHeader />
			<MainMessages />
			<MainFooter />
		</div>
	)
}

export default Main
