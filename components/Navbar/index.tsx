import React, { ReactElement, useRef, useState, useEffect } from 'react'
import styles from './navbar.module.scss'
import { Bell, Plus, ChevronDown, Icon } from 'react-feather'
import Link from 'next/link'
import SVG from 'react-inlinesvg'
import useClickOutside from '@/hooks/useClickOutside'
import Button from '@/components/button'
import useDarkMode from '@/hooks/useDarkMode'
import Spinner from '@/components/Spinner'
import { useModal } from '@/context/ModalContext'
import SignInModal from '@/components/modals/SignInModal'

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
						<Link href="/api/auth/login" passHref={true}>
							<p className={styles.tab}>login</p>
						</Link>

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
		</nav>
	)
}
