import React, { ReactElement, useRef, useState } from 'react'
import styles from './Navbar.module.scss'
import { Bell, Plus, ChevronDown, Icon } from 'react-feather'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import SVG from 'react-inlinesvg'
import useClickOutside from '@/hooks/useClickOutside'
import Button from '@/components/button'

export default function Navbar(): ReactElement {
	const { currentUser } = useAuth()
	const [extraOpen, setExtraOpen] = useState(false)
	const [profileOpen, setProfileOpen] = useState(false)
	const extraRef = useRef(null)
	const profileRef = useRef(null)
	// useClickOutside(extraRef, () => setExtraOpen((c) => (c ? false:c )))
	// useClickOutside(profileRef, () => setProfileOpen((c) => (c ? false : c)))
	return (
		<nav className={styles.nav}>
			<section className="flex flex-1 items-center">
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
				<div className="ml-auto flex items-center border-l border-l-textDimmed">
					<div className="mx-2">
						<Button dimmed>Sign in</Button>
					</div>
					<Button>Sign up</Button>
				</div>
			</section>
		</nav>
	)
}
