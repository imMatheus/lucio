import React from 'react'

interface TestCasesProps {}

const TestCases: React.FC<TestCasesProps> = ({}) => {
	return (
		<section className="border-b border-black bg-gray-100 dark:bg-gray-900">
			<h2 className="px-5 py-3 text-2xl font-semibold text-ketchup dark:text-ketchupDark">Wrong answer</h2>
			<p className="bg-gray-200 px-5 py-2 text-base text-gray-700 dark:bg-gray-800 dark:text-gray-400">
				1/2 test cases failed
			</p>
			<div className="grid grid-cols-[auto_1fr] bg-gray-300">
				<ul className="bg-yellow-300">
					<li className="bg-success p-5">Hello world</li>
					<li className="bg-success p-5">Hello world</li>
					<li className="bg-success p-5">Hello world</li>
				</ul>
				<div
					className="prose prose-gray max-w-none bg-gray-900 p-5
					text-gray-800 prose-headings:text-gray-900 
					prose-strong:rounded-lg prose-strong:bg-gray-900/10 prose-strong:px-2 
					prose-strong:py-0.5 prose-strong:text-gray-900 
					prose-li:marker:text-theme-1000 prose-img:max-w-[min(48rem,_100%)] dark:text-gray-200 
					dark:prose-headings:text-gray-100 dark:prose-strong:bg-gray-600/10 
					dark:prose-strong:text-gray-50 dark:prose-li:marker:text-gray-100"
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
				</div>
			</div>
		</section>
	)
}

export default TestCases
