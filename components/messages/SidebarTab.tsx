import React from 'react'
import styles from './sidebar.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
interface SidebarTabProps {
	date: Date
	name: string
	text: string
	image: string
	route: string
}

const SidebarTab: React.FC<SidebarTabProps> = ({ date, name, text, image, route }) => {
	const router = useRouter()

	function getDate(): string {
		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
		const dateNow = new Date()
		const timeDiff = (dateNow.getTime() - date.getTime()) / 1000
		const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()

		// one year
		if (timeDiff > 60 * 60 * 24 * 356) {
			return day + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()
		}

		// one week
		if (timeDiff > 60 * 60 * 24 * 7) {
			return day + ' ' + months[date.getMonth()]
		}

		return days[date.getDay()]
	}
	return (
		<Link passHref={true} href={route}>
			<div className={styles.tab + (router.asPath === route ? ' ' + styles.active : '')}>
				<div className={styles.tabAvatar}>
					<Image
						src={image}
						className="rounded-full"
						alt="me"
						layout="intrinsic"
						width="100%"
						height="100%"
					/>
					<div className={styles.status} />
				</div>
				<div className="flex-1">
					<div className="flex justify-between">
						<p className={styles.name}>{name}</p>
						<p className="text-textDimmed flex-shrink-0">{getDate()}</p>
					</div>
					<div className={styles.message}>
						<p>{text}</p>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default SidebarTab
