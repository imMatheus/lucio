import React, { ReactElement, useRef, useState } from 'react'
import styles from './Navbar.module.scss'
import { Bell, Plus, ChevronDown, Icon } from 'react-feather'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import SVG from 'react-inlinesvg'
import useClickOutside from '@/hooks/useClickOutside'
import Button from '@/components/button'
import useDarkMode from '@/hooks/useDarkMode'
import Spinner from '@/components/Spinner'

export default function Navbar(): ReactElement {
	const { currentUser, fetchingUser } = useAuth()
	// const [darkMode, setDarkMode] = useDarkMode()

	return (
		<nav className="border-b border-b-textDimmed bg-bg px-8 py-4 ">
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
					<div className={styles.searchWrapper}>
						<form action=""></form>
					</div>
					<Link href="/classes" passHref={true}>
						<p className={styles.tab}>Classes</p>
					</Link>
					<Link href="/register" passHref={true}>
						<p className={styles.tab}>Sign up</p>
					</Link>
					<Link href="/messages" passHref={true}>
						<p className={styles.tab}>Messages</p>
					</Link>
					<Link href="/problems" passHref={true}>
						<p className={styles.tab}>Problems</p>
					</Link>
					<p className={styles.tab}>{currentUser?.uid}</p>
					<p className={styles.tab}>Fris</p>
					<div className="flex items-center border-l border-l-textDimmed">
						{fetchingUser ? (
							<div className="w-8 h-8 mx-2">
								<Spinner />
							</div>
						) : (
							<>
								<div className="mx-2">
									<Button dimmed>Sign in</Button>
								</div>
								<Button>Sign up</Button>
							</>
						)}
					</div>
				</section>
			</div>
		</nav>
	)
}
