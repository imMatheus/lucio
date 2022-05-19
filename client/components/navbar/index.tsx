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
		<nav
			className="border-b border-b-gray-400 bg-gray-50 px-3 py-4 dark:border-b-gray-500 dark:bg-gray-800 sm:px-6 lg:px-8 "
			ref={navbarRef}
		>
			<div className="w-maxed mx-auto">
				<div className="mx-auto flex text-sm">
					<section className="flex flex-1 items-center">
						<Link href="/" passHref={true}>
							<a className="mr-auto flex items-center">
								{/* <div className="mr-1 grid h-7 w-7 grid-cols-4 bg-gray-900">
									<div className="bg-blue-400"></div>
									<div className="bg-blue-500"></div>
									<div className="bg-blue-600"></div>
									<div className="bg-blue-700"></div>
								</div>
								<div className="mr-1 grid h-7 w-7 grid-cols-4 bg-gray-900">
									<div className="bg-indigo-400"></div>
									<div className="bg-indigo-500"></div>
									<div className="bg-indigo-600"></div>
									<div className="bg-indigo-700"></div>
								</div> */}

								<div className={styles.logo}>
									<div></div>
									<div></div>
									<div></div>
									<div></div>
								</div>
								{/* <div className="mr-1 grid h-8 w-8 rotate-45 grid-cols-4 gap-[0px] overflow-hidden rounded-full bg-[#000]">
									 <div className="bg-[#b7094c]"></div>
									<div className="bg-[#892b64]"></div>
									<div className="bg-[#5c4d7d]"></div>
									<div className="bg-[#2e6f95]"></div> 

									<div className="bg-clr-accent-300"></div>
									<div className="bg-clr-accent-500"></div>
									<div className="bg-clr-accent-700"></div>
									<div className="bg-clr-accent-900"></div>
								</div> */}
								<h4 className="cursor-pointer text-2xl font-bold text-gray-900 dark:text-gray-50 md:text-3xl 2xl:text-4xl 2xl:font-extrabold">
									Luciocode
								</h4>
							</a>
						</Link>
						<div className="hidden items-center gap-3 md:flex">
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
