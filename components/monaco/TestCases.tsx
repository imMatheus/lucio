import React from 'react'

interface TestCasesProps {}

const TestCases: React.FC<TestCasesProps> = ({}) => {
	return (
		<section className="border-b border-black bg-gray-100 dark:bg-gray-900">
			<h2 className="px-5 py-3 text-2xl font-semibold text-ketchup dark:text-ketchupDark">Wrong answer</h2>
			<p className="bg-gray-200 px-5 py-2 text-base text-gray-700">1/2 test cases failed</p>
			<div className="grid grid-cols-[auto_1fr] bg-gray-300">
				<ul className="bg-yellow-300">
					<li className="bg-success">Hello world</li>
				</ul>
				<div className="bg-gray-400">
					<h3></h3>
				</div>
			</div>
		</section>
	)
}

export default TestCases
