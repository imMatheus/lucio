import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import ProblemsTable from '@/components/problems/ProblemsTable'
import { GetServerSideProps } from 'next'
import AlgorithmProblem, { Difficulty } from '@/types/AlgorithmProblem'
import { problems as _problems } from '../../problems/Algorithms'
import getConfig from 'next/config'
import Dropdown from '@/components/problems/Dropdown'
import { useRouter } from 'next/router'
import { X } from 'react-feather'

interface Props {
	problems: AlgorithmProblem[]
	// difficulty?: any
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const url = context.resolvedUrl

	const response = await fetch('http://localhost:3000/api' + url)
	const data = await response.json()
	const problems: AlgorithmProblem[] = data.map((prob: any) => prob as AlgorithmProblem)

	return {
		props: {
			problems: problems
		}
	}
}

const Problems: NextPage<Props> = ({ problems, ...props }) => {
	const router = useRouter()
	const { difficulty: _difficulty, status: _status } = router.query
	const qDifficulty: Difficulty | '' =
		(Array.isArray(_difficulty) ? (_difficulty[0] as Difficulty) : (_difficulty as Difficulty)) || ''
	type Status = 'done' | 'tried' | ''
	const qStatus: Status = (Array.isArray(_status) ? (_status[0] as Status) : (_status as Status)) || ''
	const [difficulty, setDifficulty] = useState<Difficulty | ''>(qDifficulty)
	const [status, setStatus] = useState<Status>(qStatus)

	useEffect(() => {
		const baseURL = '/problems'
		type Params = 'difficulty' | 'status'
		const props: Params[] = ['difficulty', 'status']
		const values: { [key in Params]: string } = {
			difficulty: difficulty,
			status: status
		}
		const res = props
			.map((prop) => {
				if (values[prop]) {
					return `${prop}=${values[prop]}`
				}
				return ''
			})
			.filter((str) => str !== '')
		console.log('res', res)
		if (res.length > 0) {
			const params = res.join('&')
			router.push(`${baseURL}?${params}`)
		} else {
			router.push(baseURL)
		}
	}, [difficulty, status])

	// setDifficulty(Difficulty.easy)
	return (
		<div className="w-maxed w-full mx-auto border border-red-500 p-2 sm:p-5">
			problems
			<div className="my-2 flex gap-2">
				<Dropdown title="Difficulty">
					<div className="mb-1 text-olive dark:text-oliveDark" onClick={() => setDifficulty(Difficulty.easy)}>
						Easy
					</div>
					<div
						className="mb-1 text-mustard dark:text-mustardDark"
						onClick={() => setDifficulty(Difficulty.medium)}
					>
						Medium
					</div>
					<div className="text-ketchup dark:text-ketchupDark" onClick={() => setDifficulty(Difficulty.hard)}>
						Hard
					</div>
				</Dropdown>
				<Dropdown title="Status">
					<div className="mb-1" onClick={() => setStatus('done')}>
						Done
					</div>
					<div className="mb-1" onClick={() => setStatus('tried')}>
						tried
					</div>
				</Dropdown>
			</div>
			<div className="flex gap-2 my-3">
				{difficulty && (
					<div className="px-2 py-1.5 text-xs bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-100 rounded-md flex items-center">
						<span>{difficulty}</span>
						<div
							className="cursor-pointer rounded-full bg-neutral-400/70 hover:bg-neutral-400 dark:bg-neutral-500/70 dark:hover:bg-neutral-500 w-4 h-4 ml-1.5 flex justify-center items-center transition-colors"
							onClick={() => {
								setDifficulty('')
							}}
						>
							<X className="w-3" />
						</div>
					</div>
				)}
				{status && (
					<div className="px-2 py-1.5 text-xs bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-100 rounded-md flex items-center">
						<span>{status}</span>
						<div
							className="cursor-pointer rounded-full bg-neutral-400/70 hover:bg-neutral-400 dark:bg-neutral-500/70 dark:hover:bg-neutral-500 w-4 h-4 ml-1.5 flex justify-center items-center transition-colors"
							onClick={() => {
								setStatus('')
							}}
						>
							<X className="w-3" />
						</div>
					</div>
				)}
			</div>
			<ProblemsTable problems={problems} loading={false} />
		</div>
	)
}

export default Problems
