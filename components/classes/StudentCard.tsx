import React, { ReactElement } from 'react'
import styles from './studenttable.module.scss'
import Image from 'next/image'
import SVG from 'react-inlinesvg'

interface Props {
	image: string
	name: string
	email: string
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

export default function StudentCard({ image, name, email, edit, loading }: Props): ReactElement {
	loading = true
	return (
		<tbody className="bg-bg divide-y divide-gray-200">
			<tr>
				{edit && (
					<td className="px-6 py-4">
						<input type="checkbox" className="w-5 h-5 rounded focus:ring-theme-800" />
					</td>
				)}
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="flex items-center">
						<div className="flex-shrink-0 h-10 w-10 relative rounded-full">
							{loading ? (
								<div className={styles.skeletonImage}></div>
							) : (
								<SVG className="h-full w-full rounded-full" src={image} />
								// <Image className="h-full w-full rounded-full" layout="fill" src="/rock.jpeg" alt="" />
							)}
						</div>
						<div className="ml-4">
							<div className="text-sm font-medium text-text">
								{loading ? <SkeletonText className="mb-1" min={9} max={13} /> : name}
							</div>
							<div className="text-sm text-textDimmed">
								{loading ? <SkeletonText min={9} max={15} /> : email}
							</div>
						</div>
					</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-sm text-textDimmed">
						{loading ? <SkeletonText min={3} max={7} /> : '12/13'}
					</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
						Active
					</span>
				</td>
				<td className="px-6 py-4 whitespace-nowrap text-sm text-textDimmed">
					{loading ? <SkeletonText min={4} max={8} /> : 'Admin'}
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
