import React, { ReactElement } from 'react'
import styles from '../../styles/studentstable.module.scss'
import Image from 'next/image'
import SVG from 'react-inlinesvg'
import { UserInterface } from '@models/User'

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
		<tbody className="divide-y m-none divide-neutral-200">
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
							<div className="text-sm font-medium text-neutral-900 dark:text-ketchup">
								{loading ? <SkeletonText className="mb-1" min={9} max={13} /> : user.username}
							</div>
							<div className="text-sm text-neutral-600">
								{loading ? <SkeletonText min={9} max={15} /> : user.email}
							</div>
						</div>
					</div>
				</td>
				<td className="px-6 whitespace-nowrap">
					hej
					{/* <div className="text-sm">{loading ? <SkeletonText min={3} max={7} /> : '12/13'}</div> */}
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-sm">{loading ? <SkeletonText min={3} max={7} /> : joinedAt}</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
						Active
					</span>
				</td>
				<td className="px-6 py-4 whitespace-nowrap text-sm">
					{loading ? <SkeletonText min={4} max={8} /> : role}
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
