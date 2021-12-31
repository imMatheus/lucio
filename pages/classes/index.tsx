import React, { useEffect, ReactElement } from 'react'
import styles from 'styles/Classes.module.scss'
import ClassCard from '@/components/classes/ClassCard'
import { useToast } from '@/context/ToastContext'
import Button from '@/components/button'

export default function Classes(): ReactElement {
	const { setToastMessage } = useToast()

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
				</div>
				<div className={styles.classesWrapper}></div>
			</section>
		</section>
	)
}
