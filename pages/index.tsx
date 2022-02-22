import type { NextPage } from 'next'

const Home: NextPage = () => {
	return (
		<div className="bg-red-500">
			<header className="bg-white p-5 dark:bg-[#020207] xl:p-16">
				<div className="mx-auto max-w-7xl">
					<h1 className="mb-3 text-center font-grotesk text-6xl font-extrabold text-gray-800 dark:text-gray-100 xl:text-8xl">
						LucioCode
					</h1>
				</div>
				<p className="text-center text-gray-700 dark:text-gray-300">
					Teaching code made easier, faster and more enjoyable
				</p>
			</header>
		</div>
	)
}

export default Home

// <div className={styles.blob}>
// <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
//     <path
//         fill="var(--theme)"
//         d="M44,-72.1C58.1,-68.2,71.2,-58.4,74.1,-45.4C77,-32.4,69.9,-16.2,65.8,-2.3C61.8,11.6,61,23.2,57.2,34.7C53.5,46.2,46.7,57.7,36.7,68.4C26.6,79.1,13.3,88.9,-0.2,89.3C-13.7,89.6,-27.4,80.4,-38.6,70.4C-49.8,60.4,-58.4,49.6,-66,37.7C-73.5,25.8,-79.9,12.9,-78.2,1C-76.6,-11,-66.8,-21.9,-59.2,-33.7C-51.6,-45.5,-46.2,-58.2,-36.7,-64.7C-27.2,-71.2,-13.6,-71.7,0.7,-72.8C15,-74,30,-76,44,-72.1Z"
//         transform="translate(100 100)"
//     />
// </svg>
// </div>
