import React from 'react'
import { Check, X } from 'react-feather'

interface TestCaseEntryProps {
	success: boolean
	selected?: boolean
	children: React.ReactNode
}

const TestCaseEntry: React.FC<TestCaseEntryProps> = ({ success, selected, children }) => {
	return (
		<li
			className={`flex max-w-xs cursor-pointer items-center gap-2 p-5 ${selected ? 'bg-clr-bg' : 'bg-gray-200'} ${
				success ? 'text-clr-success' : 'text-ketchup'
			}`}
		>
			{success ? <Check className="h-6 w-6" /> : <X className="h-6 w-6" />}
			<p className="text-one-line text-lg font-medium">{children}</p>
		</li>
	)
}

export default TestCaseEntry

// selected
// 	? success
// 		? styles.selected_success
// 	: styles.selected_fail
// 	success
// 	? styles.success
// 	: styles.fail
