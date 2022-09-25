import React, { useId, useState } from 'react'
import Button from '@/components/button'
import { useRouter } from 'next/router'
import { trpc } from '@/utils/trpc'

const Navbar: React.FC = ({}) => {
	const id = useId()
	const router = useRouter()
	const [query, setQuery] = useState('')
	const joinClassroomMutation = trpc.useMutation('classrooms.joinClassroom')

	function joinClass() {
		console.log('hej')

		const code = prompt('Please enter class code')
		if (!code) return

		joinClassroomMutation.mutate(
			{ code },
			{
				onSuccess(res) {
					console.log('res: ', res)
				},
				onError() {
					alert('shit hit the fan, make better req')
				}
			}
		)
	}

	return (
		<div className="m-4 flex items-center justify-between gap-4 border-b pb-2 sm:mx-8">
			<label
				htmlFor={id}
				className="max-w-md flex-1 cursor-text rounded-md border bg-clr-bg-grayed p-2 focus-within:border-clr-accent focus-within:text-clr-accent"
			>
				<input
					placeholder="search for a class..."
					className="w-full bg-transparent outline-none placeholder:text-clr-text-grayed"
					type="text"
					id={id}
					name="classroom-search-input"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
			</label>
			<div className="flex gap-4">
				<Button>Create class</Button>
				<Button onClick={joinClass}>Join class</Button>
			</div>
		</div>
	)
}

export default Navbar
