import React, { ReactElement, useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import getClass from '@/firebase/querys/getClass'
import StudentCard from '@/components/classes/StudentCard'
import { useAuth } from '@/context/AuthContext'
import styles from 'styles/Classes.module.scss'
import faker from 'faker'
import * as style from '@dicebear/adventurer-neutral'
import { createAvatar } from '@dicebear/avatars'

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.params?.id
    let data = null
    if (id) {
        data = await getClass(Array.isArray(id) ? id[0] : id)
    }

    return { props: { classData: data } }
}

interface Props {
    classData: any
}

interface TopBarOptionProps {
    active?: boolean
}

const TopBarOption: React.FC<TopBarOptionProps> = ({ children, active }) => {
    return <div className={styles.option}>{children}</div>
}

export default function ClassScreen({ classData }: Props): ReactElement {
    console.log('classData')
    const { currentUser } = useAuth()
    const [classState, setClassState] = useState(classData)
    useEffect(() => {
        setClassState(classData)
    }, [classData])

    console.log(classState)
    console.log(currentUser)
    let x: any[] = []
    for (let i = 0; i < 5; i++) {
        const _name = faker.name.firstName() + ' ' + faker.name.lastName()
        x.push({
            image: createAvatar(style, {
                seed: _name,
            }),
            name: _name,
        })
    }
    return (
        <div className='px-6 py-3'>
            im class
            <div className='flex border-b'>
                <TopBarOption>main</TopBarOption>
                <TopBarOption>about</TopBarOption>
                <TopBarOption>homework</TopBarOption>
                <TopBarOption>students</TopBarOption>
            </div>
        </div>
    )
}
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
