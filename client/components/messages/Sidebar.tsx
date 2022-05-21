import React from 'react'
import { Edit, Search } from 'react-feather'
import SidebarRow from './SidebarRow'

interface SidebarProps {}

//https://dribbble.com/shots/17564412-Dashboard-messaging-Untitled-UI/attachments/12710285?mode=media

const Sidebar: React.FC<SidebarProps> = ({}) => {
	return (
		<div className="hidden w-80 flex-shrink-0 border-r border-r-clr-border lg:block">
			<div className="border-b border-b-clr-border p-4">
				<div className="flex justify-between">
					<div className="flex items-center justify-start gap-2">
						<h2 className="text-lg font-bold">Messages</h2>
						<span className="rounded-md bg-clr-accent-100 px-1 text-xs text-clr-accent-600">40</span>
					</div>
					<div className="cursor-pointer rounded-md border border-clr-border p-1 transition-colors hover:border-clr-text-grayed">
						<Edit className="h-4 w-4 text-clr-text-grayed" />
					</div>
				</div>

				{/* <div className="mt-4 rounded-md border-4 border-clr-border"> */}
				<label
					htmlFor="search-chats"
					className="mt-4 flex items-center gap-1 overflow-hidden rounded-md border border-clr-border pl-2 text-clr-text-grayed focus-within:border-clr-accent-500 focus-within:text-clr-text focus-within:ring-clr-accent-500 sm:text-sm"
				>
					<Search className="h-5 w-5" />
					<input
						type="text"
						name="search-chats"
						placeholder={'search...'}
						id={'search-chats'}
						className="block w-full !border-none bg-transparent pl-0 focus:ring-0"
					/>
				</label>
				{/* </div> */}
			</div>
			<SidebarRow
				name="Adam leveine"
				text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam nobis voluptate amet. Ipsum incidunt ratione quo dolore, facere ut error!"
				id="123"
			/>
			<SidebarRow
				name="Justing Bieber"
				text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat consectetur voluptates non?"
				id="222"
			/>
			<SidebarRow name="Post Malone" text="Lorem ipsum dolor sit amet." id="6543f" />
		</div>
	)
}

export default Sidebar
