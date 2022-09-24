import React from 'react'
import { useSession } from 'next-auth/react'
import NavbarLink from './NavbarLink'
import Image from 'next/image'
import Link from 'next/link'

const Navbar: React.FC = ({}) => {
	const { data: session } = useSession()

	return (
		<nav className="flex items-center justify-between bg-clr-bg-grayed-dark p-4 sm:px-8">
			<h2 className="text-4xl font-black tracking-wider">LucioCode</h2>
			<div className="flex items-center gap-2">
				<NavbarLink href="/classes">classes</NavbarLink>
				<NavbarLink href="/problems">problems</NavbarLink>
				{session?.user && (
					<Link href="/profile" passHref={true}>
						<a className="relative block h-10 w-10">
							<Image layout="fill" src={session.user.image as string} alt="" className="rounded-full" />
						</a>
					</Link>
				)}
			</div>
		</nav>
	)
}

export default Navbar
