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
							<div className="text-sm font-medium text-gray-900 dark:text-gray-100">
								{loading ? <SkeletonText className="mb-1" min={8} max={15} /> : user.username}
							</div>
							<div className="text-sm text-gray-500">
								{loading ? <SkeletonText min={12} max={22} /> : user.email}
							</div>
						</div>
					</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-sm text-gray-500">
						{loading ? <SkeletonText min={6} max={10} /> : convertDate(joinedAt)}
					</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-sm text-gray-500">
						{loading ? <SkeletonText min={6} max={10} /> : convertDate(joinedAt)}
					</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap items-center">
					<StatusChip status="dnd" loading={true} />
				</td>
				<td className="px-6 py-4 whitespace-nowrap text-sm">
					{loading ? (
						<SkeletonText min={4} max={8} />
					) : role.toLowerCase() === 'admin' ? (
						<div className="bg-theme-50 text-black w-max p-1 rounded-md">{capitalizeFirstLetter(role)}</div>
					) : (
						capitalizeFirstLetter(role)
					)}
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
