import React from 'react'

interface InputProps {
	state: string
	setState: React.Dispatch<React.SetStateAction<string>>
}

const Input: React.FC<InputProps> = ({ state, setState }) => {
	return (
		<div className="bg-green-200 p-2">
			<h3>Title</h3>
			<input type="text" value={state} onChange={(e) => setState(e.target.value)} />
		</div>
	)
}

export default Input
