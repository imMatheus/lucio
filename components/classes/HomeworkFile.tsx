import React, { useEffect, useState } from 'react'
import { useToast } from '@/context/ToastContext'
interface HomeworkFileProps {
	path: string
}

const HomeworkFile: React.FC<HomeworkFileProps> = ({ path }) => {
	const [link, setLink] = useState('')
	const { setToast } = useToast()

	return (
		<a href={link}>
			<div className="rounded-2xl bg-red-300 p-4">{path} no path i think</div>
		</a>
	)
}

export default HomeworkFile
