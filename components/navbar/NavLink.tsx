import React from 'react'
import Link from 'next/link'

interface NavLinkProps {
	href: string
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
	return (
		<Link href={href} passHref={true}>
			<a className="font-medium text-sm text-gray-800/80 hover:text-gray-900 dark:text-gray-200/80 dark:hover:text-gray-50 transition-colors cursor-pointer">
				{children}
			</a>
		</Link>
	)
}

export default NavLink
