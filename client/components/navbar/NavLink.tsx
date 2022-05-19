import React from 'react'
import Link from 'next/link'

interface NavLinkProps {
	href: string
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
	return (
		<Link href={href} passHref={true}>
			<a className="cursor-pointer text-sm font-medium text-gray-700 transition-colors hover:text-clr-text">
				{children}
			</a>
		</Link>
	)
}

export default NavLink
