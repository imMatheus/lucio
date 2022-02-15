import React, { useState } from 'react'
import styles from 'styles/dropzone.module.scss'
import { FilePlus } from 'react-feather'
import { useToast } from '@/context/ToastContext'

export interface FileProps extends File {
	downloadUrl?: string
	subtitle?: string
}

interface DropzoneProps {
	setFiles: React.Dispatch<React.SetStateAction<Array<FileProps>>>
}

const Dropzone: React.FC<DropzoneProps> = ({ setFiles }) => {
	const { setToast } = useToast()
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
		console.log(_files)

		if (!_files) return // TODO bug: does not toast after two tries
		if (_files.length > 1) {
			const dummy: File[] = []
			for (let i = 0; i < _files.length; i++) {
				// loop thru files and check if they are valid
				if (_files[i]?.name && _files[i]?.type) {
					dummy.push(_files[i])
				} else {
					// if not show toast
					setToast({ message: 'One of your files does not have a valid name or type', type: 'error' })
				}
			}
			// so we dont cause un-necessary re-render, append the newly added files
			if (dummy.length > 1) setFiles((c) => c.concat(dummy))
			return
		}
		if (_files[0]?.name && _files[0].type) {
			setFiles((c) => c.concat(_files[0]))
		} else {
			setToast({ message: 'Your file does not have a valid name or type', type: 'error' })
		}
	}

	const fileDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		console.log('aappapaaöööööööö')

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
			<FilePlus className="w-6 h-6 lg:w-7 lg:h-7 mb-1" />
			<h3>Click or drop your files here</h3>
		</div>
	)
}

export default Dropzone
