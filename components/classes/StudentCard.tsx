import React, { ReactElement } from 'react'
import styles from '../../styles/studentstable.module.scss'
import Image from 'next/image'
import SVG from 'react-inlinesvg'
import { UserInterface } from '@models/User'
import { capitalizeFirstLetter, convertDate } from '@/utils/index'
import StatusChip from './statuschip'

interface Props {
	user: UserInterface
	role: 'student' | 'admin'
	joinedAt: Date
	loading: boolean
	edit: boolean
}

const SkeletonText = ({ className, min, max }: { className?: string; min?: number; max?: number }) => {
	const whiteSpace = '&nbsp;'
	const _max = max || 14
	const _min = min || 6
	const width = Math.floor(Math.random() * (_max - _min + 1)) + _min
	let str = '#'.repeat(width)
	const _class = styles.skeletonText + (className ? ' ' + className : '')
	return <div className={_class}>{str}</div>
}

export default function StudentCard({ user, role, joinedAt, edit, loading }: Props): ReactElement {
	return (
		<tbody className="divide-y m-none divide-gray-200">
			<tr>
				{edit && (
					<td className="px-6 py-4">
						<input type="checkbox" className="w-5 h-5 rounded focus:ring-theme-800" />
					</td>
				)}
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="flex items-center">
						<div className="flex-shrink-0 h-10 w-10">
							{/* {true ? ( */}
							<div className={styles.skeletonImage}></div>
							{/* // ) : (
							// 	// <SVG className="h-full w-full rounded-full" src={image} />
							// 	// <Image className="h-full w-full rounded-full" layout="fill" src="/rock.jpeg" alt="" />
							// )} */}
						</div>
						<div className="ml-4">
							<div className="text-sm font-medium text-gray-900 dark:text-ketchup">
								{loading ? <SkeletonText className="mb-1" min={9} max={13} /> : user.username}
							</div>
							<div className="text-sm text-gray-500">
								{loading ? <SkeletonText min={9} max={15} /> : user.email}
							</div>
						</div>
					</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					{/* <div className="text-sm text-gray-900">Regional Paradigm Technician</div> */}
					<div className="text-sm text-gray-500">{convertDate(joinedAt)}</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-sm text-gray-500">{convertDate(joinedAt)}</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap items-center">
					<StatusChip status="dnd" />
				</td>
				<td className="px-6 py-4 whitespace-nowrap text-sm">
					{loading ? <SkeletonText min={4} max={8} /> : capitalizeFirstLetter(role)}
				</td>
				<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
					<a href="#" className="text-theme hover:text-theme-800">
						Edit
					</a>
				</td>
			</tr>
		</tbody>
	)
}
