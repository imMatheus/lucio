import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import ProblemsTable from '@/components/problems/ProblemsTable'
import { GetServerSideProps } from 'next'
import AlgorithmProblem, { Difficulty } from '@/types/AlgorithmProblem'
import { problems as _problems } from '../../problems/Algorithms'
import Dropdown from '@/components/problems/Dropdown'
import { useRouter } from 'next/router'
import { X } from 'react-feather'
import QueryChip from '@/components/problems/QueryChip'
import axios from 'axios'
import { Data } from '@/types/returns/api/problems'

interface Props {
	problems: AlgorithmProblem[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const url = context.resolvedUrl

	// const response: any[] = await axios.get('http://localhost:3000/api/problems')
	const { data }: { data: Data } = await axios.get('http://localhost:3000/api' + url)
	console.log('response')
	console.log(url)
	console.log(data.problems)

	// const problems: AlgorithmProblem[] = data.map((prob: any) => prob as AlgorithmProblem)

	return {
		props: {
			problems: data.problems
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
		// takes care of changing url for querying
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
		if (res.length > 0) {
			const params = res.join('&')
			router.push(`${baseURL}?${params}`)
		} else {
			router.push(baseURL)
		}
	}, [difficulty, status])

	return (
		<div className="w-maxed w-full mx-auto my-4 p-4">
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
				{difficulty && <QueryChip title={difficulty} onClick={() => setDifficulty('')} />}
				{status && <QueryChip title={status} onClick={() => setStatus('')} />}
			</div>
			<ProblemsTable problems={problems} loading={false} />
		</div>
	)
}

export default Problems
