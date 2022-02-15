import React from 'react'
import { getFileSize } from '@/utils/getFileSize'
// to stop next js checking for Image tag
import { Image as ImageIcon, File, FileText, Video, Headphones } from 'react-feather'

interface FileCardProps {
	file: File
}

const FileCard: React.FC<FileCardProps> = ({ file }) => {
	const types = {
		image: ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'],
		file: ['text/html', 'text/css', 'text/javascript', 'application/json', 'text/markdown']
	}
	console.log(file)

	/**
	 *
	 * @returns the universal type from a file type
	 * @example getType('image/jpeg') // 'image'
	 * getType('video/mp4') // 'video'
	 */
	function getType(type: string): string {
		return type.split('/')[0].toLowerCase() || ''
	}

	return (
		<div className="flex items-center bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-3 rounded-md">
			<div className="mr-2 flex-shrink-0 w-5 h-5">
				{getType(file.type) === 'image' ? (
					<ImageIcon className="w-full h-full text-indigo-500" />
				) : getType(file.type) === 'text' ? (
					<File className="w-full h-full text-lime-500" />
				) : getType(file.type) === 'application' ? (
					<FileText className="w-full h-full text-sky-500" />
				) : getType(file.type) === 'video' ? (
					<Video className="w-full h-full text-rose-500" />
				) : (
					<Headphones className="w-full h-full text-amber-500" />
				)}
			</div>
			<p className="text-one-line">{file.name}</p>
			<span className="flex-shrink-0 ml-2 text-gray-500 dark:text-gray-400 text-sm">
				{getFileSize(file.size)}
			</span>
		</div>
	)
}

export default FileCard

// {types.image.some((type) => type === file.type) ? (
//     <ImageIcon className="w-full h-full text-indigo-600" />
// ) : types.file.some((type) => type === file.type) ? (
//     <File className="w-full h-full text-lime-500" />
// ) : (
//     <FileText className="w-full h-full text-sky-500" />
// )}
