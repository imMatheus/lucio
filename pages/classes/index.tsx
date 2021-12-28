import React, { useEffect, ReactElement } from 'react'
import getUser from '../../firebase/querys/getUser'
import { useAuth } from '@/context/AuthContext'
import styles from 'styles/Classes.module.scss'
import ClassCard from '@/components/classes/ClassCard'
import getUsersClasses, { useUsersClasses } from '@/firebase/querys/getUsersClasses'
import useCreateClass from '@/firebase/handlers/useCreateClass'
import { useToast } from '@/context/ToastContext'
import Button from '@/components/button'

export default function Classes(): ReactElement {
	const usersClasses = useUsersClasses()
	const { setToastMessage } = useToast()
	const createClass = useCreateClass()
	getUsersClasses().then((b) => console.log(b))
	const images = ['/basket.jpeg', '/rock.jpeg', '/juan.jpeg']

	return (
		<section className="py-8 px-6">
			{/* <section className="py-8 px-6 bg-red-200"> */}
			<section className="w-maxed mx-auto">
				<div className="flex mb-3 gap-2">
					<Button
						variant="dimmed"
						onClick={() => {
							setToastMessage(Math.random() + '')
							throw new Error('hej klarade jag det')
						}}
					>
						Join class
					</Button>
					<Button onClick={createClass}>Create class</Button>
				</div>
				<div className={styles.classesWrapper}>
					{usersClasses?.map((data, i) => {
						return <ClassCard data={data} key={data.id} img={images[i]} />
					})}
				</div>
			</section>
		</section>
	)
}
