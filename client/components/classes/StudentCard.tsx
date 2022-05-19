import React, { ReactElement } from 'react'
import styles from './studentstable.module.scss'
import { capitalizeFirstLetter, convertDate } from '@/utils/index'
import StatusChip from './statuschip'
import { User } from '@/types/User'
import Image from 'next/image'
interface Props {
	user: User
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
		<tbody className="m-none divide-y divide-gray-200">
			<tr>
				{edit && (
					<td className="px-6 py-4">
						<input type="checkbox" className="h-5 w-5 rounded focus:ring-clr-accent" />
					</td>
				)}
				<td className="whitespace-nowrap px-6 py-4">
					<div className="flex items-center">
						<div className="relative h-10 w-10 flex-shrink-0">
							<div className={styles.skeletonImage}></div>
							<Image
								src="/rock.jpeg"
								className="rounded-full"
								objectFit="cover"
								layout="fill"
								alt="profile img"
							/>
						</div>
						<div className="ml-4">
							<div className="text-sm font-medium text-clr-text">
								{loading ? <SkeletonText className="mb-1" min={8} max={15} /> : user.name}
							</div>
							<div className="text-sm text-clr-text-grayed">
								{loading ? <SkeletonText min={12} max={22} /> : user.email}
							</div>
						</div>
					</div>
				</td>
				<td className="whitespace-nowrap px-6 py-4">
					<div className="text-sm text-clr-text-grayed">
						{loading ? <SkeletonText min={6} max={10} /> : convertDate(joinedAt)}
					</div>
				</td>
				<td className="whitespace-nowrap px-6 py-4">
					<div className="text-sm text-clr-text-grayed">
						{loading ? <SkeletonText min={6} max={10} /> : convertDate(joinedAt)}
					</div>
				</td>
				<td className="items-center whitespace-nowrap px-6 py-4">
					<StatusChip status="active" loading={true} />
				</td>
				<td className="whitespace-nowrap px-6 py-4 text-sm text-clr-text-grayed">
					{loading ? (
						<SkeletonText min={4} max={8} />
					) : role.toLowerCase() === 'admin' ? (
						<div className="font-black text-clr-text">{capitalizeFirstLetter(role)}</div>
					) : (
						capitalizeFirstLetter(role)
					)}
				</td>
				<td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
					<a href="#" className="text-clr-accent hover:text-clr-accent-800">
						Edit
					</a>
				</td>
			</tr>
		</tbody>
	)
}
