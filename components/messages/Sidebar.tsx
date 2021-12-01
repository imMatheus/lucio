import React from 'react'
import styles from 'styles/Messages.module.scss'
import SidebarTab from './SidebarTab'
import faker from 'faker'

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
	let x: any[] = []
	for (let i = 0; i < 5; i++) {
		const _name = faker.name.firstName() + ' ' + faker.name.lastName()
		x.push({
			image: 'https://avatars.githubusercontent.com/u/77362975?s=400&u=f7fd1ea50dfbb2fbf358819158d09df29ca05bd0&v=4',
			name: _name,
			date: faker.date.past()
		})
	}
	const _name = faker.name.firstName() + ' ' + faker.name.lastName()
	x.push({
		image: 'https://avatars.githubusercontent.com/u/77362975?s=400&u=f7fd1ea50dfbb2fbf358819158d09df29ca05bd0&v=4',
		name: _name,
		date: new Date('18 Dec 2003')
	})
	x.push({
		image: 'https://avatars.githubusercontent.com/u/77362975?s=400&u=f7fd1ea50dfbb2fbf358819158d09df29ca05bd0&v=4',
		name: _name + 'hhh',
		date: new Date('28 November 2021')
	})

	return (
		<div className={styles.sidebar}>
			{x.map(({ name, image, date }) => {
				return <SidebarTab date={date} name={name} text={faker.lorem.text()} key={name} image={image} />
			})}
		</div>
	)
}

export default Sidebar
