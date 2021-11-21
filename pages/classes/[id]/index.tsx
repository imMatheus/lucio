import React, { ReactElement, useEffect, useState } from 'react';
import styles from 'styles/Classes.module.scss';
import ClassType from '@/types/ClassType';
import { useRouter } from 'next/router';
import ClassNavbar from '@/components/classes/ClassNavbar';
import useClassData from '@/hooks/useClassData';
import { useAuth } from '@/context/AuthContext';
import getClass from '@/firebase/querys/getClass';
import User from '@/types/User';

export default function ClassScreen(): ReactElement {
	const router = useRouter();
	const { id: classId } = router.query;
	const { currentUser } = useAuth();
	const classData = useClassData(currentUser, classId);

	return (
		<div className="px-6 py-3">
			{classId && <ClassNavbar />}
			im a class
			<h2>class data</h2>
			<div>
				<h4>{classData && JSON.stringify(classData)}</h4>
			</div>
		</div>
	);
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
