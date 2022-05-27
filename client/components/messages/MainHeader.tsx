import React from 'react'
import Image from 'next/image'
import Button from '@/components/button'

interface MainHeaderProps {}

const MainHeader: React.FC<MainHeaderProps> = ({}) => {
	return (
		<div className="flex flex-shrink-0 items-center justify-between border-b border-b-clr-border p-4">
			<div className="flex gap-2">
				<div className="relative mr-2 h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
					<Image src="/rock.jpeg" layout="fill" objectFit="cover" />
				</div>
				<div>
					<h2 className="text-lg font-semibold">ASdsad</h2>
					<p className="text-sm text-clr-text-grayed">asa@asd.com</p>
				</div>
			</div>
			<Button>Call</Button>
		</div>
	)
}

export default MainHeader
