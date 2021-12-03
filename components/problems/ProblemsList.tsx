import React from 'react'
import styles from 'styles/Problems.module.scss'
import { ArrowDown } from 'react-feather'
import { problems } from '../../problems/Algorithms'
import { fs } from '@/firebase/index'
import { doc, setDoc, getDocs } from 'firebase/firestore'
import { GetServerSideProps, GetStaticPropsResult } from 'next'

interface ProblemsListProps {}

// interface ItemProps {}

// const Item: React.FC<ItemProps> = ({}) => {
// 	return <div>item</div>
// }

// export const getServerSideProps: GetServerSideProps<ProblemsListProps> = async () => {
// 	const response = await fetch('https://jsonplaceholder.typicode.com/users')
// 	const data = await response.json()

// 	return {
// 		props: {
// 			preview: 45,
// 			context: data
// 		}
// 	}
// }

const ProblemsList: React.FC<ProblemsListProps> = (props) => {
	console.log(problems)

	async function addToFs() {
		for (const p in problems) {
			console.log(p)
			const r = problems[p].problemName.toLowerCase().trim().split(' ').join('-')
			const docRef = doc(fs, 'problems', r)
			await setDoc(docRef, problems[p])
		}
	}

	return (
		<div className="">
			<div className="flex">
				<button className={styles.button}>
					Difficulty <ArrowDown size={14} className="ml-2" />
				</button>
				<button className={styles.button}>
					Status <ArrowDown size={14} className="ml-2" />
				</button>
				<button className={styles.button} onClick={() => addToFs()}>
					Tags <ArrowDown size={14} className="ml-2" />
				</button>
			</div>
			<h3>hej</h3>
			<h3>hej</h3>
			<h3>hej</h3>
			<h3>hej</h3>
		</div>
	)
}

export default ProblemsList
