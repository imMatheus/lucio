import React, { useState } from 'react'
import styles from 'styles/Filezone.module.scss'
import { Trash2, Edit2 } from 'react-feather'
import Dropzone from './Dropzone'

interface FilezoneProps {}

const fileSize = (size: number) => {
	if (size === 0) return '0 Bytes'
	const k = 1024
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
	const i = Math.floor(Math.log(size) / Math.log(k))
	return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function FileCard({ title, subtitle, size }: { title: string; subtitle: string; size: number }) {
	return (
		<div className={styles.card}>
			<div className={styles.top}>
				<div className={styles.icon}></div>
				<div className={styles.text}>
					<p className="text-base font-medium">{title}</p>
					<p className="text-xs text-text400">{subtitle}</p>
				</div>
			</div>
			<div className={styles.bottom}>
				<div className={styles.option + ' mr-auto hover:text-yellow-700'}>
					<p>{fileSize(size)}</p>
				</div>
				<div className={styles.option + ' hover:text-success'}>
					<Edit2 size={18} />
					<p>Edit</p>
				</div>
				<div className={styles.option + ' hover:text-error'}>
					<Trash2 size={18} />
					<p>Delete</p>
				</div>
			</div>
		</div>
	)
}

const Filezone: React.FC<FilezoneProps> = ({}) => {
	const [files, setFiles] = useState<any[]>([])

	return (
		<div>
			<h2>Files</h2>
			<div className={styles.container}>
				{files.map((file, index) => {
					console.log('file: ', file)

					return <FileCard key={index} title={file.name} subtitle={file.type} size={file.size} />
				})}

				<Dropzone setFiles={setFiles} />
			</div>
		</div>
	)
}

export default Filezone
