import type { NextPage } from 'next'
import React, { useEffect } from 'react'
import Image from 'next/image'
import Card from '@/components/home/Card'

const Home: NextPage = () => {
	return (
		<div className="selection:bg-clr-accent-100 selection:text-clr-accent-900">
			<header className="relative px-5 py-12 lg:px-14 lg:py-24 xl:py-32">
				<div className="relative z-10 mx-auto max-w-7xl">
					<h1 className="text-gray-80 mb-3 text-center font-grotesk text-6xl font-extrabold xl:text-8xl">
						LucioCode
					</h1>
				</div>
				<p className="relative z-10 text-center text-gray-700">
					Teaching code made easier, faster and more enjoyable
				</p>
			</header>

			<section className="bg-clr-accent-200 p-12 text-clr-text md:p-24">
				<div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 md:gap-12">
					<h2 className="text-3xl font-semibold md:text-4xl">
						With the Right Software, Great Things Can Happen
					</h2>
					<p className="text-sm md:text-base">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis accusamus autem libero
						incidunt sed aliquam dolore, doloremque saepe esse officiis aperiam consequatur excepturi dolor
						porro. Test
					</p>
				</div>
			</section>

			<section className="p-12 md:p-24">
				<div className="mx-auto max-w-7xl">
					<h2 className="mb-8 text-3xl font-semibold md:mb-12 md:text-4xl">What we bring to the game</h2>
					<div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-20 lg:grid-cols-3 xl:grid-cols-4">
						<Card src="/dashboard.png" title="Analize classes" alt="juan">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, corrupti possimus placeat
							unde cumque pariatur omnis incidunt, commodi consequatur, in ab magnam.
						</Card>
						<Card src="/messages.png" title="Realtime chats" alt="juan">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut iusto et itaque perferendis
							architecto quibusdam autem!
						</Card>
						<Card src="/dashboard.png" title="Exam environment" alt="juan">
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam assumenda recusandae ex.
							Excepturi fuga, at rem commodi eos reiciendis ut blanditiis possimus!
						</Card>

						<Card src="/checklist.png" title="1000+ coding problems" alt="juan">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, corrupti possimus placeat.{' '}
						</Card>
					</div>
				</div>
			</section>

			<section className="bg-secondary-500 p-12 text-clr-bg md:p-24">
				<div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 md:gap-12">
					<h2 className="text-3xl font-semibold md:text-4xl">
						With the Right Software, Great Things Can Happen
					</h2>
					<p className="text-sm md:text-base">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis accusamus autem libero
						incidunt sed aliquam dolore, doloremque saepe esse officiis aperiam consequatur excepturi dolor
						porro.
					</p>
				</div>
			</section>
		</div>
	)
}

export default Home

// <div className={styles.blob}>
// <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
//     <path
//         fill="var(--clr-accent)"
//         d="M44,-72.1C58.1,-68.2,71.2,-58.4,74.1,-45.4C77,-32.4,69.9,-16.2,65.8,-2.3C61.8,11.6,61,23.2,57.2,34.7C53.5,46.2,46.7,57.7,36.7,68.4C26.6,79.1,13.3,88.9,-0.2,89.3C-13.7,89.6,-27.4,80.4,-38.6,70.4C-49.8,60.4,-58.4,49.6,-66,37.7C-73.5,25.8,-79.9,12.9,-78.2,1C-76.6,-11,-66.8,-21.9,-59.2,-33.7C-51.6,-45.5,-46.2,-58.2,-36.7,-64.7C-27.2,-71.2,-13.6,-71.7,0.7,-72.8C15,-74,30,-76,44,-72.1Z"
//         transform="translate(100 100)"
//     />
// </svg>
// </div>
