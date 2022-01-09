import React, { ReactElement, useRef, useState, useEffect } from 'react'
import { Bell, Plus, ChevronDown, Icon } from 'react-feather'
import Link from 'next/link'
import SVG from 'react-inlinesvg'
import useClickOutside from '@/hooks/useClickOutside'
import Button from '@/components/button'
import useDarkMode from '@/hooks/useDarkMode'
import Spinner from '@/components/Spinner'
import { useModal } from '@/context/ModalContext'
import SignInModal from '@/components/modals/SignInModal'
import NavLink from './NavLink'

export default function Navbar(): ReactElement {
	const navbarRef = useRef<HTMLElement>(null)
	const { setShowModal, setModal } = useModal()

	useEffect(() => {
		// the --navbar-height variable represents the height of the navbar
		// its used for when you want a component to take up the entire screen
		if (navbarRef.current?.clientHeight) {
			document.documentElement.style.setProperty('--navbar-height', navbarRef.current.clientHeight + 'px')
		}
	}, [navbarRef])
	return (
		<nav
			className="border-b border-b-neutral-400 bg-bg px-8 py-4 bg-neutral-100 dark:bg-neutral-800"
			ref={navbarRef}
		>
			<div className="w-maxed mx-auto">
				<div className="flex text-sm text-textDimmed mx-auto">
					<section className="flex flex-1 items-center">
						<Link href="/" passHref={true}>
							<h4 className="text-2xl font-bold 2xl:text-4xl 2xl:font-extrabold text-neutral-700 dark:text-neutral-50 text-text mr-auto cursor-pointer">
								Luciocode
							</h4>
						</Link>
						<div className="hidden md:flex items-center gap-3">
							<NavLink href="/classes">Classes</NavLink>
							<NavLink href="/messages">Messages</NavLink>
							<NavLink href="/problems">Problems</NavLink>
							<NavLink href="/api/auth/login">login</NavLink>

							<Link href="/api/auth/logout" passHref={true}>
								<p className="text-red-800 bg-red-100 py-1 px-2 rounded-md">logout from auth0</p>
							</Link>
							<div className="flex items-center border-l border-l-textDimmed">
								<div className="w-8 h-8 mx-2">
									<Spinner />
								</div>

								<div className="flex items-center ml-3 cursor-pointer"></div>

								<>
									<div
										className="mx-2"
										onClick={() => {
											setShowModal(true)
											setModal('sign-in')
										}}
									>
										<Button variant="dimmed">Sign in</Button>
									</div>
									<div
										className="mx-2"
										onClick={() => {
											setShowModal(true)
											setModal('markdown')
										}}
									>
										<Button variant="dimmed">Markdown</Button>
									</div>

									<Button>
										<Link href="/register" passHref={true}>
											Sign up
										</Link>
									</Button>
								</>
							</div>
						</div>
					</section>
				</div>
			</div>
		</nav>
	)
}
