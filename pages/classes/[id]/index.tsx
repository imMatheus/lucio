import React, { ReactElement, useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import getClass from '@/firebase/querys/getClass'
import { useAuth } from '@/context/AuthContext'
import styles from 'styles/Classes.module.scss'
import ClassType from '@/types/ClassType'
import { useRouter } from 'next/router'
import ClassNavbar from '@/components/classes/ClassNavbar'

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.params?.id
    let data: ClassType | null = null
    if (id) {
        data = await getClass(Array.isArray(id) ? id[0] : id)
    }

    return { props: { classData: data, id } }
}

interface Props {
    classData: ClassType | null
    id: string
}

export default function ClassScreen(props: Props): ReactElement {
    const { classData, id } = props
    const router = useRouter()
    const { id: classId } = router.query
    console.log('router: ', router)

    const { currentUser } = useAuth()
    const [classState, setClassState] = useState(classData)
    useEffect(() => {
        setClassState(classData)
    }, [classData])

    return (
        <div className='px-6 py-3'>
            im class
            {classId && <ClassNavbar />}
        </div>
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
