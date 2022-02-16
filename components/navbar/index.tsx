import React, { ReactElement, useRef, useState, useEffect, useLayoutEffect } from 'react'
import { Bell, Plus, ChevronDown, Icon } from 'react-feather'
import Link from 'next/link'
import SVG from 'react-inlinesvg'
import useClickOutside from '@/hooks/useClickOutside'
import Button from '@/components/button'
import useDarkMode from '@/hooks/useDarkMode'
import Spinner from '@/components/spinner'
import { useModal } from '@/context/ModalContext'
import SignInModal from '@/components/modals/SignInModal'
import NavLink from './NavLink'
import { useAuth } from '@/context/AuthContext'
import DisplayUser from './DisplayUser'

export default function Navbar(): ReactElement {
	const navbarRef = useRef<HTMLElement>(null)
	const { setShowModal, setModal } = useModal()
	const { fetchingUser, currentUser, logout } = useAuth()

	useLayoutEffect(() => {
		// the --navbar-height variable represents the height of the navbar
		// its used for when you want a component to take up the entire screen
		if (navbarRef.current?.clientHeight && window) {
			document.documentElement.style.setProperty('--navbar-height', navbarRef.current.clientHeight + 'px')
			window.onresize = () => {
				document.documentElement.style.setProperty('--navbar-height', navbarRef.current?.clientHeight + 'px')
			}
		}
	}, [navbarRef, navbarRef.current, navbarRef.current?.clientHeight])

	return (
		<nav
			className="px-3 sm:px-6 lg:px-8 py-4 bg-gray-100 dark:bg-gray-800 border-b border-b-gray-400 dark:border-b-gray-500 "
			ref={navbarRef}
		>
			<div className="w-maxed mx-auto">
				<div className="flex text-sm mx-auto">
					<section className="flex flex-1 items-center">
						<Link href="/" passHref={true}>
							<a className="mr-auto">
								<h4 className="text-2xl md:text-3xl font-bold 2xl:text-4xl 2xl:font-extrabold text-gray-900 dark:text-gray-50 cursor-pointer">
									Luciocode
								</h4>
							</a>
						</Link>
						<Button onClick={() => console.log(navbarRef.current?.clientHeight)}>check it </Button>
						<div className="hidden md:flex items-center gap-3">
							<NavLink href="/classes">Classes</NavLink>
							<NavLink href="/messages">Messages</NavLink>
							<NavLink href="/problems">Problems</NavLink>
							<NavLink href="/css">Css</NavLink>

							{/* <p className="text-red-800 bg-red-100 py-1 px-2 rounded-md cursor-pointer">logout</p> */}
							<Button variant="error" onClick={async () => await logout()}>
								Logout
							</Button>
							<DisplayUser />
						</div>
					</section>
				</div>
			</div>
		</nav>
	)
}
