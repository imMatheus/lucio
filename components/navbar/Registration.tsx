import React from 'react'
import Button from '@/components/button'
import { useModal } from '@/context/ModalContext'
import Link from 'next/link'

const Registration: React.FC = ({}) => {
	const { setShowModal, setModal } = useModal()

	return (
		<div className="flex gap-2">
			<Button
				onClick={() => {
					setShowModal(true)
					setModal('sign-in')
				}}
				variant="dimmed"
			>
				Sign in
			</Button>
			<Button
				onClick={() => {
					setShowModal(true)
					setModal('markdown')
				}}
				variant="dimmed"
			>
				Markdown
			</Button>

			<Button>
				<Link href="/register" passHref={true}>
					Sign up
				</Link>
			</Button>
		</div>
	)
}

export default Registration
