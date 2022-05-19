import React from 'react'
import Link from 'next/link'
import styles from './tab.module.scss'
import { useRouter } from 'next/router'

interface IndexProps {
	link: string
}

const Index: React.FC<IndexProps> = ({ children, link }) => {
	const router = useRouter()
	const path = router.asPath
	const active = path === link || path.startsWith(link + '?')

	return (
		<Link href={link} passHref={true}>
			<a
				className={`border-b-2 border-b-transparent px-3 py-1 transition-colors ${
					active
						? 'border-b-clr-accent hover:border-b-clr-accent-700'
						: 'hover:border-b-gray-300 dark:hover:border-b-gray-700'
				}`}
			>
				{children}
			</a>
		</Link>
	)
}

export default Index
