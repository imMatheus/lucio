import React from 'react'
import Link from 'next/link'

interface NavLinkProps {
	href: string
	children: React.ReactNode
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
	return (
		<Link href={href} passHref={true}>
			<a className="relative block cursor-pointer text-sm font-medium text-clr-text transition-colors">
				{children}
			</a>
		</Link>
	)
}

export default NavLink
