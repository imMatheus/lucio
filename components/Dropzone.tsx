import React, { useState } from 'react'
import styles from 'styles/Dropzone.module.scss'
import { FilePlus } from 'react-feather'
import { useToast } from '@/context/ToastContext'

interface FileProps {
	downloadUrl?: string
	subtitle?: string
}

interface DropzoneProps {
	setFiles: React.Dispatch<React.SetStateAction<Array<File & FileProps>>>
}

const Dropzone: React.FC<DropzoneProps> = ({ setFiles }) => {
	const { setToastMessage } = useToast()
	const [errorMessage, setErrorMessage] = useState('')

	const dragOver = (e: any) => {
		e.preventDefault()
	}

	const dragEnter = (e: any) => {
		e.preventDefault()
		console.log('enter: ', e)
	}

	const dragLeave = (e: any) => {
		e.preventDefault()
		console.log('leave: ', e)
	}

	const validateFile = (file: any) => {
		const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon']
		if (validTypes.indexOf(file.type) === -1) {
			return false
		}
		return true
	}

	const handleFiles = (_files: FileList) => {
		if (!_files) return
		console.log('_files: ', _files)
		if (_files.length > 1) {
			const dummy: File[] = []
			for (let i = 0; i < _files.length; i++) {
				console.log(_files[i])
				if (_files[i]?.name) {
					dummy.push(_files[i])
				}
			}
			setFiles((c) => c.concat(dummy))
			return
		}
		if (_files[0]?.name) {
			setFiles((c) => c.concat(_files[0]))
		}
	}

	const fileDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		const _files = e.dataTransfer.files
		console.log(_files)
		if (_files.length) {
			handleFiles(_files)
		}
	}

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const _files = event.target?.files
		if (!_files) return
		console.log('_files: ', _files)
		if (_files.length > 1) {
			const dummy: File[] = []
			for (let i = 0; i < _files.length; i++) {
				console.log(_files[i])
				if (_files[i]?.name) {
					dummy.push(_files[i])
				}
			}
			setFiles((c) => c.concat(dummy))
			return
		}
		if (_files[0]?.name) {
			setFiles((c) => c.concat(_files[0]))
		}
	}

	return (
		<div
			className={styles.container}
			onDragOver={dragOver}
			onDragEnter={dragEnter}
			onDragLeave={dragLeave}
			onDrop={fileDrop}
		>
			<input
				type="file"
				name="dropzone"
				id="dropzone"
				multiple
				className={styles.input}
				onChange={(e) => changeHandler(e)}
			/>
			<label htmlFor="dropzone" className={styles.label}></label>
			<FilePlus size={28} />
			<h3>Drop your files here</h3>
		</div>
	)
}

export default Dropzone
