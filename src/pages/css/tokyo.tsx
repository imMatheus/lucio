import React from 'react'
import type { NextPage } from 'next'

const Row: React.FC = ({ children }) => {
	return <div className="mb-1.5 flex min-h-[10px] gap-2">{children}</div>
}

const SideChip: React.FC = ({}) => {
	return <div className="mb-1.5 h-2.5 w-4 rounded-full bg-[#353B56]" />
}

const index: NextPage = () => {
	return (
		<div className="w-screen">
			<div className="grid aspect-video w-[400px] grid-cols-[auto_1fr]">
				<div className="flex w-12 flex-col items-end bg-[#16161F] pt-2 pr-2">
					<SideChip />
					<SideChip />
					<SideChip />
					<SideChip />
					<SideChip />
					<SideChip />
					<SideChip />
					<SideChip />
					<SideChip />
					<div className="mb-1.5 h-2.5 w-6 rounded-full bg-[#353B56]"></div>
					<div className="mb-1.5 h-2.5 w-6 rounded-full bg-[#353B56]"></div>
				</div>
				<div className="bg-[#1A1B27] pt-2 pl-2">
					<Row>
						<div className="h-2.5 w-9 rounded-full bg-[#5FD1FF]"></div>
						<div className="h-2.5 w-14 rounded-full bg-[#00BCDB]"></div>
						<div className="h-2.5 w-7 rounded-full bg-[#5FD1FF]"></div>
						{/* <div className="h-2.5 w-14 rounded-full bg-[#A479DE]"></div> */}
						{/* <div className="h-2.5 w-7 rounded-full bg-[#6FA2FE]"></div> */}
						<div className="h-2.5 w-5 rounded-full bg-[#90D15A]"></div>
					</Row>

					<Row></Row>

					<Row>
						<div className="h-2.5 w-5 rounded-full bg-[#A479DE]"></div>
						<div className="h-2.5 w-12 rounded-full bg-[#6FA2FE]"></div>
						<div className="h-2.5 w-5 rounded-full bg-[#BECAF9]"></div>
					</Row>

					<Row>
						<div className="h-2.5 w-2 rounded-full bg-transparent"></div>
						<div className="h-2.5 w-6 rounded-full bg-[#A479DE]"></div>
					</Row>

					<Row>
						<div className="h-2.5 w-2 rounded-full bg-transparent"></div>
						<div className="h-2.5 w-2 rounded-full bg-transparent"></div>
						<div className="h-2.5 w-7 rounded-full bg-[#F04C6F]"></div>
						<div className="h-2.5 w-4 rounded-full bg-[#A479DE]"></div>
						<div className="h-2.5 w-8 rounded-full bg-[#90D15A]"></div>
					</Row>

					<Row>
						<div className="h-2.5 w-2 rounded-full bg-transparent"></div>
						<div className="h-2.5 w-2 rounded-full bg-transparent"></div>
						<div className="h-2.5 w-2 rounded-full bg-transparent"></div>
						<div className="h-2.5 w-9 rounded-full bg-[#F04C6F]"></div>
						<div className="h-2.5 w-3 rounded-full bg-[#A479DE]"></div>
						<div className="h-2.5 w-6 rounded-full bg-[#90D15A]"></div>
						<div className="h-2.5 w-9 rounded-full bg-[#F04C6F]"></div>
					</Row>

					<Row>
						<div className="h-2.5 w-2 rounded-full bg-transparent"></div>
						<div className="h-2.5 w-2 rounded-full bg-transparent"></div>
						<div className="h-2.5 w-7 rounded-full bg-[#F04C6F]"></div>
					</Row>

					<Row>
						<div className="h-2.5 w-2 rounded-full bg-transparent"></div>
						<div className="h-2.5 w-4 rounded-full bg-[#A479DE]"></div>
					</Row>

					<Row>
						<div className="h-2.5 w-3 rounded-full bg-[#BECAF9]"></div>
					</Row>

					<Row></Row>

					<Row>
						<div className="h-2.5 w-6 rounded-full bg-[#5FD1FF]"></div>
						<div className="h-2.5 w-7 rounded-full bg-[#5FD1FF]"></div>
						<div className="h-2.5 w-7 rounded-full bg-[#BECAF9]"></div>
					</Row>
				</div>
			</div>
		</div>
	)
}

export default index
