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
	}

	const dragLeave = (e: any) => {
		e.preventDefault()
	}

	const validateFile = (file: any) => {
		const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon']
		if (validTypes.indexOf(file.type) === -1) {
			return false
		}
		return true
	}

	const handleFiles = (_files: FileList) => {
		if (!_files) return // TODO bug: does not toast after two tries
		if (_files.length > 1) {
			const dummy: File[] = []
			for (let i = 0; i < _files.length; i++) {
				if (_files[i]?.name && _files[i]?.type) {
					dummy.push(_files[i])
				} else {
					setToastMessage('one of your files does not have a valid name or type')
				}
			}
			setFiles((c) => c.concat(dummy))
			return
		}
		if (_files[0]?.name && _files[0].type) {
			setFiles((c) => c.concat(_files[0]))
		} else {
			setToastMessage('your file does not have a valid name or type')
		}
	}

	const fileDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		const _files = e.dataTransfer?.files
		if (_files.length) {
			handleFiles(_files)
		}
	}

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const _files = event.target?.files
		if (!_files) return
		handleFiles(_files)
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
			<h3>Click or drop your files here</h3>
		</div>
	)
}

export default Dropzone
