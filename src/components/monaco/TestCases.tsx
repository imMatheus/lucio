import React from 'react'
import TestCaseEntry from './TestCaseEntry'

interface TestCasesProps {}

const TestCases: React.FC<TestCasesProps> = ({}) => {
	return (
		<section className="bg-gray-00 w-full border-b border-clr-text bg-clr-bg p-1 dark:border-clr-bg dark:bg-clr-text">
			<h2 className="p-5 text-2xl font-semibold text-ketchup dark:text-ketchupDark">Wrong answer</h2>
			<p className="bg-gray-300 px-5 py-2 text-base text-gray-800 dark:border-y dark:border-clr-text-grayed dark:bg-clr-text dark:text-gray-400">
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
					className="dark:prose-strong:bg-clr-text-grayed/10 prose-strong:bg-clr-text/10 prose prose-gray max-w-none 
					p-5 text-gray-800 
					prose-headings:text-clr-text prose-strong:rounded-lg prose-strong:px-2 
					prose-strong:py-0.5 prose-strong:text-clr-text 
					prose-li:marker:text-clr-accent-1000 prose-img:max-w-[min(48rem,_100%)] dark:text-gray-200 
					dark:prose-headings:text-clr-bg dark:prose-strong:text-clr-text 
					dark:prose-li:marker:text-clr-bg"
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
