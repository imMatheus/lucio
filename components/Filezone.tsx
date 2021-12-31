import React, { useEffect, useState } from 'react'
import styles from 'styles/Filezone.module.scss'
import { Trash2, Edit2 } from 'react-feather'
import Dropzone from './Dropzone'
import Link from 'next/link'
interface FilezoneProps {
	path: string
}

interface FileProps {
	downloadUrl?: string
	subtitle?: string
}

const fileSize = (size: number) => {
	if (size === 0) return '0 Bytes'
	const k = 1024
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
	const i = Math.floor(Math.log(size) / Math.log(k))
	return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function FileCard({ file }: { file: File & FileProps }) {
	const { name, subtitle, size, downloadUrl, type } = file
	const card = (
		<div className={styles.card}>
			<div className={styles.top}>
				<div className={styles.icon}></div>
				<div className={styles.text}>
					<p className="text-base font-medium">{name}</p>
					<p className="text-xs text-text400">{type}</p>
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
	if (downloadUrl)
		return (
			<a href={downloadUrl} target="_blank">
				{card}
			</a>
		)
	return card
}
// File & { downloadUrl?: string; title?: string; subtitle?: string }

const Filezone: React.FC<FilezoneProps> = ({ path }) => {
	const [files, setFiles] = useState<Array<File & FileProps>>([])
	const [loading, setLoading] = useState(false)

	const uploadFiles = async (files: Array<File & FileProps>) => {
		if (loading) return
		setLoading(true)
		for (let i = 0; i < files.length; i++) {
			const file: File & FileProps = files[i]
			// const storageRef = ref(storage, `${path}/${Math.random().toString(36)}_${file.name}`)
		}

		setLoading(false)
	}

	// const
	useEffect(() => {
		uploadFiles(files)
	}, [files])

	return (
		<div>
			<h2>Files</h2>
			<div className={styles.container}>
				{files &&
					Array.from(files).map((file, index) => {
						return <FileCard key={index} file={file} />
					})}

				{loading && <h2>Loading...</h2>}
				<Dropzone setFiles={setFiles} />
			</div>
		</div>
	)
}

export default Filezone
