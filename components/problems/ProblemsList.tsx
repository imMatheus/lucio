import React from 'react'
import styles from 'styles/Problems.module.scss'
import { ArrowDown } from 'react-feather'
import { problems as _problems } from '../../problems/Algorithms'
import { fs } from '@/firebase/index'
import { doc, setDoc, getDocs, query } from 'firebase/firestore'
import { GetServerSideProps, GetStaticPropsResult } from 'next'
import AlgorithmProblem from '@/types/AlgorithmProblem'
import { useRouter } from 'next/router'
import Link from 'next/link'
interface ProblemsListProps {
	problems: AlgorithmProblem[]
}

const ProblemsList: React.FC<ProblemsListProps> = ({ problems }) => {
	const router = useRouter()
	const diff = ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)]
	console.log('router: ', router)

	const next = () => {
		// router.push(`/problems/?difficulty=${diff}`, undefined, { shallow: true })
		return ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)]
	}

	async function addToFs() {
		for (const p in _problems) {
			console.log(p)
			const r = _problems[p].problemName.toLowerCase().trim().split(' ').join('-')
			const docRef = doc(fs, 'problems', r)
			await setDoc(docRef, _problems[p])
		}
	}

	return (
		<div className="">
			<div className="flex">
				<Link
					href={{ pathname: router.pathname, query: { ...router.query, difficulty: next() } }}
					passHref={true}
				>
					<button className={styles.button} onClick={next}>
						Difficulty <ArrowDown size={14} className="ml-2" />
					</button>
				</Link>
				<Link href={{ pathname: router.pathname, query: { ...router.query, status: 'hej' } }} passHref={true}>
					<button className={styles.button}>
						Status <ArrowDown size={14} className="ml-2" />
					</button>
				</Link>
				<Link
					href={{
						pathname: router.pathname,
						query: {
							...(({ status, ...o }) => o)(router.query)
						}
					}}
					passHref={true}
				>
					<button className={styles.button}>
						No Status <ArrowDown size={14} className="ml-2" />
					</button>
				</Link>

				<button className={styles.button} onClick={() => addToFs()}>
					Tags <ArrowDown size={14} className="ml-2" />
				</button>
			</div>
			<div className="bg-yellow-500 m-3">
				{problems.map((problem, i) => {
					return (
						<div className="bg-blue-500 m-3" key={i}>
							<h3>{problem.problemName}</h3>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default ProblemsList
