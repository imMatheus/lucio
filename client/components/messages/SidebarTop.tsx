import React from 'react'
import { Edit, Search } from 'react-feather'

interface SidebarTopProps {}

const SidebarTop: React.FC<SidebarTopProps> = ({}) => {
	return (
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
	)
}

export default SidebarTop
