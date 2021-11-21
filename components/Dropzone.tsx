import React, { useState } from 'react'
import styles from 'styles/Dropzone.module.scss'
import { FilePlus } from 'react-feather'
interface DropzoneProps {
	setFiles: React.Dispatch<React.SetStateAction<any[]>>
}

const Dropzone: React.FC<DropzoneProps> = ({ setFiles }) => {
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

	const handleFiles = (_files: any) => {
		console.log(_files)
		let dummy: any[] = []
		for (let i = 0; i < _files.length; i++) {
			console.log(_files[i])
			dummy.push(_files[i])
		}
		setFiles((c) => c.concat(dummy))
	}

	const fileDrop = (e: any) => {
		e.preventDefault()
		const _files = e.dataTransfer.files
		console.log(_files)
		if (_files.length) {
			handleFiles(_files)
		}
	}

	const changeHandler = (event: any) => {
		const _files = event.target?.files
		if (_files.length > 1) {
			const dummy: any[] = []
			for (let i = 0; i < _files.length; i++) {
				console.log(_files[i])
				dummy.push(_files[i])
			}
			setFiles((c) => c.concat(dummy))
			return
		}
		setFiles((c) => c.concat(event.target?.files[0]))
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
				onChange={changeHandler}
			/>
			<label htmlFor="dropzone" className={styles.label}></label>
			<FilePlus size={28} />
			<h3>Drop your files here</h3>
		</div>
	)
}

export default Dropzone
