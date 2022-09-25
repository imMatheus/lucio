import React from 'react'
import type { NextPage } from 'next'
import { trpc } from '@/utils/trpc'

const Problems: NextPage = () => {
	const { data: problems } = trpc.useQuery(['problems.getAll'])
	return (
		<>
			<div className="relative min-w-0 !overflow-y-visible overflow-x-scroll rounded-md border border-clr-border">
				<table className="my-0 min-w-full divide-y divide-clr-border rounded-md text-center text-xs md:text-sm">
					<thead className="h-9">
						<tr className="divide-x divide-clr-border">
							<th className="h-full px-2">Kompetens</th>
							<th className="h-full px-2">Fråga</th>
							<th className="h-full px-2">Svar</th>
							<th className="h-full px-2">Nivå (0-3)</th>
							<th className="h-full px-2">Video</th>
						</tr>
					</thead>
					<tbody className="divide-y">
						<tr className="h-9 divide-x divide-clr-border">
							<td className="relative h-full">
								<div className="peer flex h-full min-w-[16rem] max-w-lg items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
									hej
								</div>
							</td>
							<td className="relative h-full">
								<div className="peer flex h-full min-w-[16rem] max-w-lg items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
									hej
								</div>
							</td>
							<td className="relative h-full">
								<div className="peer flex h-full min-w-[16rem] max-w-lg items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
									hej
								</div>
							</td>
							<td className="relative h-full">
								<div className="peer flex h-full min-w-[16rem] max-w-lg items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
									hej
								</div>
							</td>
							<td className="relative h-full">
								<div className="peer flex h-full min-w-[16rem] max-w-lg items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
									hej
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<pre className="mx-auto w-96 bg-green-100 text-sm">{JSON.stringify(problems, null, 2)}</pre>
		</>
	)
}

export default Problems
