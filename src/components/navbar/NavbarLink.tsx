import React from 'react'
import Link from 'next/link'

interface NavbarLinkProps {
	href: string
	children: React.ReactNode
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ href, children }) => {
	return (
		<Link href={href}>
			<a className="transition-colors hover:text-clr-text-grayed">{children}</a>
		</Link>
	)
}

export default NavbarLink
