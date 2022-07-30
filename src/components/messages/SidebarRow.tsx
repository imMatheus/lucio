import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface SidebarRowProps {
	name: string
	text: string
	id: string
}

const SidebarRow: React.FC<SidebarRowProps> = ({ name, text, id }) => {
	const router = useRouter()
	const isActive = router.asPath === `/messages/${id}`

	return (
		<Link href={`/messages/${id}`} passHref>
			<a
				className={`flex border-b border-b-clr-border p-4 transition-colors hover:bg-clr-bg-grayed ${
					isActive ? 'border-l-4 border-l-clr-accent' : ''
				}`}
			>
				<div className="relative mr-2 h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
					<Image src="/rock.jpeg" layout="fill" objectFit="cover" />
				</div>
				<div className="">
					<h3 className="font-semibold">{name}</h3>
					<p className="text-two-line text-sm text-clr-text-grayed">{text}</p>
				</div>
				<div className="text-sm text-clr-text-grayed">13:45</div>
			</a>
		</Link>
	)
}

export default SidebarRow
