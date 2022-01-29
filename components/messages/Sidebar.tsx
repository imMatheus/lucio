import React from 'react'
import styles from '../../styles/sidebar.module.scss'
import SidebarTab from './SidebarTab'

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
	let x: any[] = []

	return (
		<div className={styles.sidebar}>
			{x.map(({ name, image, date, id }) => {
				return <SidebarTab date={date} name={name} text="text()" key={name} image={image} route={id} />
			})}
		</div>
	)
}

export default Sidebar
