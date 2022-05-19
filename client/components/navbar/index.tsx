import React, { ReactElement, useRef, useEffect } from 'react'
import Link from 'next/link'
import NavLink from './NavLink'
import DisplayUser from './DisplayUser'
import styles from './navbar.module.scss'

export default function Navbar(): ReactElement {
	const navbarRef = useRef<HTMLElement>(null)

	useEffect(() => {
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
		<nav className="border-b border-b-clr-border bg-clr-bg-grayed-dark px-3 py-4 sm:px-6 lg:px-8" ref={navbarRef}>
			<div className="w-maxed mx-auto">
				<div className="mx-auto flex text-sm">
					<section className="flex flex-1 items-center">
						<Link href="/" passHref={true}>
							<a className="mr-auto flex items-center">
								<div className={styles.logo}>
									<div></div>
									<div></div>
									<div></div>
									<div></div>
								</div>
								<h4 className="cursor-pointer text-2xl font-bold text-clr-text md:text-3xl 2xl:text-4xl 2xl:font-extrabold">
									Luciocode
								</h4>
							</a>
						</Link>
						<div className="hidden items-center gap-3 text-clr-text md:flex">
							<NavLink href="/classes">Classes</NavLink>
							<NavLink href="/css">CSS</NavLink>
							<NavLink href="/problems">Problems</NavLink>
							<DisplayUser />
						</div>
					</section>
				</div>
			</div>
		</nav>
	)
}
