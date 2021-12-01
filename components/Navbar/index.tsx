import React, { ReactElement, useRef, useState } from 'react'
import styles from './Navbar.module.scss'
import { Bell, Plus, ChevronDown, Icon } from 'react-feather'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import SVG from 'react-inlinesvg'
import useClickOutside from '@/hooks/useClickOutside'

const ListItem: React.FC = ({ children }) => {
	return <li className="px-3 py-2 hover:bg-blue-600">{children}</li>
}

const DropDown: React.FC = ({ children }) => {
	return (
		<section className="absolute w-max top-[130%] right-0">
			<div className="w-full h-full bg-gray-800 relative border-[1px] rounded-lg py-1">
				<div className={styles.dropdownTriangle}>
					<div className="innerTriangle"></div>
				</div>
				<ul>{children}</ul>
			</div>
		</section>
	)
}

interface OptionItemProps extends React.HTMLAttributes<HTMLSpanElement> {
	includeChevron?: boolean
	icon: Element | JSX.Element
	open?: boolean
}

const OptionItem: React.FC<OptionItemProps> = ({ icon, children, open, includeChevron, ...args }) => {
	return (
		<span className={styles.controlsSpan} {...args}>
			{icon}
			{includeChevron && <ChevronDown className="w-4" />}
			{open && children}
		</span>
	)
}

export default function Navbar(): ReactElement {
	const { currentUser } = useAuth()
	const [extraOpen, setExtraOpen] = useState(false)
	const [profileOpen, setProfileOpen] = useState(false)
	const extraRef = useRef(null)
	const profileRef = useRef(null)
	// useClickOutside(extraRef, () => setExtraOpen((c) => (c ? false:c )))
	// useClickOutside(profileRef, () => setProfileOpen((c) => (c ? false : c)))
	return (
		<nav className="flex bg-gray-900 text-white py-4 px-8 text-sm">
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
				<p className={styles.tab}>{currentUser?.uid}</p>
				<p className={styles.tab}>Fris</p>
			</section>
			<section className="flex">
				<OptionItem icon={<Bell className="w-4" />}></OptionItem>
				<OptionItem
					icon={<Plus className="w-4" />}
					includeChevron
					open={extraOpen}
					onClick={() => {
						setExtraOpen((c) => !c)
						setProfileOpen(false)
					}}
				>
					<DropDown>
						<ListItem>Lorem, ipsum.</ListItem>
						<ListItem>Asperiores, officia?</ListItem>
						<ListItem>Aperiam, esse.</ListItem>
						<ListItem>Explicabo, dolor.</ListItem>
						<ListItem>Quo, dignissimos?</ListItem>
					</DropDown>
				</OptionItem>

				{currentUser && currentUser.profileImage && (
					<OptionItem
						icon={
							<span className="rounded-full w-4 h-4 mr-1 overflow-hidden">
								<SVG src={currentUser.profileImage} />
							</span>
						}
						includeChevron
						open={profileOpen}
						onClick={() => {
							setProfileOpen((c) => !c)
							setExtraOpen(false)
						}}
					>
						<DropDown>
							<ListItem>Lorem, ipsum.</ListItem>
							<ListItem>Asperiores, officia?</ListItem>
							<ListItem>Aperiam, esse.</ListItem>
							<ListItem>Explicabo, dolor.</ListItem>
							<ListItem>Quo, dignissimos?</ListItem>
						</DropDown>
					</OptionItem>
				)}
			</section>
		</nav>
	)
}
