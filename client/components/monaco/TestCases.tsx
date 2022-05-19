import React from 'react'
import TestCaseEntry from './TestCaseEntry'

interface TestCasesProps {}

const TestCases: React.FC<TestCasesProps> = ({}) => {
	return (
		<section className="bg-gray-00 w-full border-b border-gray-900 bg-gray-100 p-1 dark:border-gray-100 dark:bg-gray-900">
			<h2 className="p-5 text-2xl font-semibold text-ketchup dark:text-ketchupDark">Wrong answer</h2>
			<p className="bg-gray-300 px-5 py-2 text-base text-gray-800 dark:border-y dark:border-gray-600 dark:bg-gray-900 dark:text-gray-400">
				1/2 test cases failed
			</p>
			<div className="grid grid-cols-[auto_1fr]">
				<ul className="bg-gray-200 dark:bg-gray-800">
					<TestCaseEntry success={true}>Test case 1</TestCaseEntry>
					<TestCaseEntry success={false} selected>
						Test case 2
					</TestCaseEntry>
					<TestCaseEntry success={true}>Test case 3</TestCaseEntry>
				</ul>
				<div
					className="prose prose-gray max-w-none p-5 text-gray-800 
					prose-headings:text-gray-900 prose-strong:rounded-lg 
					prose-strong:bg-gray-900/10 prose-strong:px-2 prose-strong:py-0.5 
					prose-strong:text-gray-900 prose-li:marker:text-clr-accent-1000 
					prose-img:max-w-[min(48rem,_100%)] dark:text-gray-200 dark:prose-headings:text-gray-100 
					dark:prose-strong:bg-gray-600/10 dark:prose-strong:text-gray-50 
					dark:prose-li:marker:text-gray-100"
				>
					<h4>Sample outputs</h4>
					<pre>
						<code className="language-bash">1 2 3</code>
					</pre>
					<h4>Sample outputs</h4>
					<pre>
						<code className="language-bash">
							1 2 3 <br />
							hej
						</code>
					</pre>
					<h4>Sample outputs</h4>
					<pre>
						<code className="language-bash">1 2 3</code>
					</pre>
					<h4>Sample outputs</h4>
					<pre>
						<code className="language-bash">
							1 <br />
							2 <br />
							3 <br />
						</code>
					</pre>
				</div>
			</div>
		</section>
	)
}

export default TestCases
