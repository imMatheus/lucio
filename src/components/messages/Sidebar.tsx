import React from 'react'
import NoRooms from './NoRooms'
import SidebarRow from './SidebarRow'
import SidebarTop from './SidebarTop'

interface SidebarProps {}

//https://dribbble.com/shots/17564412-Dashboard-messaging-Untitled-UI/attachments/12710285?mode=media

const Sidebar: React.FC<SidebarProps> = ({}) => {
	return (
		<div className={`hidden w-full flex-shrink-0 border-r border-r-clr-border lg:block lg:w-80`}>
			<SidebarTop />
			{true ? (
				<NoRooms />
			) : (
				<>
					<SidebarRow
						name="Justing Bieber"
						text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat consectetur voluptates non?"
						id="222"
					/>
					<SidebarRow name="Post Malone" text="Lorem ipsum dolor sit amet." id="6543f" />
				</>
			)}
		</div>
	)
}

export default Sidebar
