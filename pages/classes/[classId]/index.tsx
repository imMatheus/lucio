import React, { ReactElement, useEffect, useState } from 'react'
import styles from 'styles/Classes.module.scss'
import ClassType from '@/types/ClassType'
import { useRouter } from 'next/router'
import ClassNavbar from '@/components/classes/ClassNavbar'
import useClassData from '@/hooks/useClassData'
import { useAuth } from '@/context/AuthContext'
import getClass from '@/firebase/querys/getClass'
import User from '@/types/User'
import Button from '@/components/button'
import Head from 'next/head'
import Alert from '@/components/Alerts'

export default function ClassScreen(): ReactElement {
	const router = useRouter()
	const { classId } = router.query
	console.log('rrr: ', router)
	console.log('rrr: ', classId)

	const { currentUser } = useAuth()
	const [classData, loading] = useClassData(classId)
	console.log('classData: ', classData)

	return (
		<section className="py-8 px-6">
			<Head>
				<title>{classData?.name}</title>
				<meta property="og:title" content="My page title" key="title" />
			</Head>
			<section className="w-maxed mx-auto">
				<div className="flex mb-3 gap-2">
					<Button variant="dimmed">Join class</Button>
					<Button>Create class</Button>
					<div className="ml-auto">
						<Button variant="error">Leave class</Button>
					</div>
				</div>
				{classId && <ClassNavbar />}
				<h2>class data</h2>
				<div>
					<h4>{classData && JSON.stringify(classData)}</h4>
					console.log({loading});
				</div>
			</section>
		</section>
	)
}

// let x: any[] = []
// for (let i = 0; i < 5; i++) {
//     const _name = faker.name.firstName() + ' ' + faker.name.lastName()
//     x.push({
//         image: createAvatar(style, {
//             seed: _name,
//         }),
//         name: _name,
//     })
// }
// <table className={styles.styledTable}>
//     <thead>
//         <tr>
//             <th>Name</th>
//             <th>Points</th>
//             <th>Random</th>
//             <th>Random</th>
//         </tr>
//     </thead>
//     <tbody>
//         {x.map(({ name, image }, index: number) => (
//             <StudentCard
//                 key={index}
//                 name={name || currentUser?.displayName}
//                 image={image || currentUser?.profileImage}
//             />
//         ))}
//     </tbody>
// </table>

// This gets called on every request
// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	const id = context.params?.id;
// 	let data: ClassType | null = null;
// 	console.log('inside server side props');
// 	console.log('gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg');
// 	console.log(auth);

// 	if (id) {
// 		data = await getClass(Array.isArray(id) ? id[0] : id);
// 	}

// 	return { props: { classData: data, id } };
// };
