import React from 'react'
import { Check, X } from 'react-feather'

interface TestCaseEntryProps {
	success: boolean
	selected?: boolean
}

const TestCaseEntry: React.FC<TestCaseEntryProps> = ({ success, selected, children }) => {
	return (
		<li
			className={`flex cursor-pointer gap-2 p-5 text-lg font-medium ${
				selected ? 'bg-gray-100 dark:bg-gray-900' : 'bg-gray-200 dark:bg-gray-800'
			} ${success ? 'text-success' : 'text-ketchup dark:text-ketchupDark'}`}
		>
			{success ? <Check className="h-6 w-6" /> : <X className="h-6 w-6" />}
			{children}
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