import React from 'react'
import styles from 'styles/MessagesSidebar.module.scss'
import SidebarTab from './SidebarTab'
import faker from 'faker'

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
	let x: any[] = []
	for (let i = 0; i < 4; i++) {
		const _name = faker.name.firstName() + ' ' + faker.name.lastName()
		x.push({
			image: 'https://avatars.githubusercontent.com/u/77362975?s=400&u=f7fd1ea50dfbb2fbf358819158d09df29ca05bd0&v=4',
			name: _name,
			date: faker.date.past(),
			id: '/messages/' + _name
		})
	}
	const _name = faker.name.firstName() + ' ' + faker.name.lastName()
	x.push({
		image: 'https://avatars.githubusercontent.com/u/77362975?s=400&u=f7fd1ea50dfbb2fbf358819158d09df29ca05bd0&v=4',
		name: _name,
		date: new Date('18 Dec 2003'),
		id: '/messages/' + _name
	})
	x.push({
		image: 'https://avatars.githubusercontent.com/u/77362975?s=400&u=f7fd1ea50dfbb2fbf358819158d09df29ca05bd0&v=4',
		name: 'abba',
		date: new Date('28 November 2021'),
		id: '/messages/' + 'abba'
	})

	return (
		<div className={styles.sidebar}>
			{x.map(({ name, image, date, id }) => {
				return (
					<SidebarTab date={date} name={name} text={faker.lorem.text()} key={name} image={image} route={id} />
				)
			})}
		</div>
	)
}

export default Sidebar
