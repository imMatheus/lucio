import React from 'react'
import { arrayEquals } from '@/utils/arrayEquals'

interface Props {
	colors: [string, string]
	currentColors: [string, string]
	setColors: React.Dispatch<React.SetStateAction<[string, string]>>
}

const Color: React.FC<Props> = ({ colors, currentColors, setColors }) => {
	return (
		<div
			className={`flex h-12 w-12 cursor-pointer overflow-hidden rounded-full border-2 border-transparent md:h-14 md:w-14 ${
				arrayEquals(colors, currentColors) ? 'border-black bg-clr-bg' : ''
			}`}
			onClick={() => setColors([...colors])}
		>
			<div className="h-full w-full" style={{ background: colors[0] }}></div>
			{colors[0] !== colors[1] && <div className="h-full w-full" style={{ background: colors[1] }}></div>}
		</div>
	)
}

export default Color
