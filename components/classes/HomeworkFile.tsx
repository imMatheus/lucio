import React, { useEffect, useState } from 'react'
import { useToast } from '@/context/ToastContext'
interface HomeworkFileProps {
	path: string
}

const HomeworkFile: React.FC<HomeworkFileProps> = ({ path }) => {
	const [link, setLink] = useState('')
	const { setToastMessage } = useToast()

	return (
		<a href={link}>
			<div className="p-4 bg-red-300 rounded-2xl">{path} no path i think</div>
		</a>
	)
}

export default HomeworkFile
