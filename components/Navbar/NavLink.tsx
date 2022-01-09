import React from 'react'
import Link from 'next/link'

interface NavLinkProps {
	href: string
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
	return (
		<Link href={href} passHref={true}>
			<p className="font-medium text-sm text-neutral-800/80 hover:text-neutral-900 dark:text-neutral-200/80 dark:hover:text-neutral-50 transition-colors cursor-pointer">
				{children}
			</p>
		</Link>
	)
}

export default NavLink
