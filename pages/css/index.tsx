import React from 'react'
import type { NextPage } from 'next'
import Circle from '@/components/loaders/Circle'

const index: NextPage = () => {
	return (
		<div className="bg-red-100 p-10">
			<Circle />
			<div className="group flex h-20 flex-wrap items-end gap-0.5 bg-black p-5">
				<div className="h-5 w-[3px] rounded-md bg-lime-500 transition-all group-hover:h-2"></div>
				<div className="h-3 w-[3px] rounded-md bg-lime-500 transition-all group-hover:h-6"></div>
				<div className="h-3 w-[3px] rounded-md bg-lime-500 transition-all group-hover:h-3"></div>
				<div className="h-6 w-[3px] rounded-md bg-lime-500 transition-all group-hover:h-3"></div>
				<div className="h-2 w-[3px] rounded-md bg-lime-500 transition-all group-hover:h-5"></div>
				<div className="m-1"></div>
				<div className="h-2 w-[3px] rounded-md bg-lime-500 transition-all group-hover:h-5"></div>
				<div className="h-6 w-[3px] rounded-md bg-lime-500 transition-all group-hover:h-3"></div>
				<div className="h-3 w-[3px] rounded-md bg-lime-500 transition-all group-hover:h-3"></div>
				<div className="h-3 w-[3px] rounded-md bg-lime-500 transition-all group-hover:h-6"></div>
				<div className="h-5 w-[3px] rounded-md bg-lime-500 transition-all group-hover:h-2"></div>
				{/* <div className="w-lg"></div>
				<div className="mt-1.5 ml-1 h-1 w-[3px]2 bg-lime-500"></div> */}
			</div>
		</div>
	)
}

export default index
