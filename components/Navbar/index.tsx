import React, { ReactElement, useRef, useState, useEffect } from 'react'
import styles from './Navbar.module.scss'
import { Bell, Plus, ChevronDown, Icon } from 'react-feather'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import SVG from 'react-inlinesvg'
import useClickOutside from '@/hooks/useClickOutside'
import Button from '@/components/button'
import useDarkMode from '@/hooks/useDarkMode'
import Spinner from '@/components/Spinner'
import { useModal } from '@/context/ModalContext'

export default function Navbar(): ReactElement {
	const { currentUser, fetchingUser, logout } = useAuth()
	const navbarRef = useRef<HTMLElement>(null)
	const { setShowModal } = useModal()
	useEffect(() => {
		if (navbarRef.current?.clientHeight) {
			document.documentElement.style.setProperty('--navbar-height', navbarRef.current.clientHeight + 'px')
		}
	}, [navbarRef])
	// const [darkMode, setDarkMode] = useDarkMode()

	return (
		<nav className="border-b border-b-textDimmed bg-bg px-8 py-4" ref={navbarRef}>
			<div className={styles.nav}>
				<section className="flex flex-1 items-center">
					<Link href="/" passHref={true}>
						<h4 className={styles.logo}>
							<span>L</span>
							<span>u</span>
							<span>c</span>
							<span>i</span>
							<span>o</span>
							<span>C</span>
							<span>o</span>
							<span>d</span>
							<span>e</span>
						</h4>
					</Link>
					{/* <div className={styles.searchWrapper}>
						<form action=""></form>
					</div> */}
					<div className="hidden md:flex items-center gap-3">
						<Link href="/classes" passHref={true}>
							<p className={styles.tab}>Classes</p>
						</Link>

						<Link href="/messages" passHref={true}>
							<p className={styles.tab}>Messages</p>
						</Link>
						<Link href="/problems" passHref={true}>
							<p className={styles.tab}>Problems</p>
						</Link>
						<div className="flex items-center border-l border-l-textDimmed">
							{fetchingUser ? (
								<div className="w-8 h-8 mx-2">
									<Spinner />
								</div>
							) : currentUser ? (
								<div className="flex items-center ml-3 cursor-pointer">
									<p className="text-base font-semibold text-text mr-1">@{currentUser.displayName}</p>
									<span className="rounded-full w-5 h-5 mr-1 overflow-hidden">
										<SVG src={currentUser.profileImage} />
									</span>
									{/* <Button onClick={logout} variant="error">
										Sign out
									</Button> */}
								</div>
							) : (
								<>
									<div
										className="mx-2"
										onClick={() => {
											setShowModal(true)
										}}
									>
										<Button variant="dimmed">Sign in</Button>
									</div>

									<Link href="/register" passHref={true}>
										<Button>Sign up</Button>
									</Link>
								</>
							)}
						</div>
					</div>
				</section>
			</div>
		</nav>
	)
}
