import React, { useEffect, ReactElement } from 'react'
import getUser from '../../firebase/querys/getUser'
import { useAuth } from '@/context/AuthContext'
import styles from 'styles/Classes.module.scss'
import ClassCard from '@/components/classes/ClassCard'
import getUsersClasses, { useUsersClasses } from '@/firebase/querys/getUsersClasses'
import useCreateClass from '@/firebase/handlers/useCreateClass'
import { useToast } from '@/context/ToastContext'

export default function Classes(): ReactElement {
	const usersClasses = useUsersClasses()
	const { setToastMessage } = useToast()
	const createClass = useCreateClass()
	getUsersClasses().then((b) => console.log(b))

	return (
		<section className="py-8 px-6">
			<section className="max-w-7xl mx-auto">
				<h1 className="mb-3">My classes</h1>
				<div className="flex mb-2 gap-2">
					<button
						className={styles.chip}
						onClick={() => {
							setToastMessage(Math.random() + '')
							throw new Error('hej klarade jag det')
						}}
					>
						Join class
					</button>
					<button className={styles.chip} onClick={createClass}>
						Create class
					</button>
				</div>
				<div className={styles.classesWrapper}>
					{usersClasses?.map(({ code, name, participantsIds }, index) => {
						return <ClassCard code={code} name={name} participantsIds={participantsIds} key={index} />
					})}
				</div>
			</section>
		</section>
	)
}
