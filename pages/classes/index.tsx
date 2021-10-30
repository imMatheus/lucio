import React, { useEffect, ReactElement } from 'react'
import { number } from '@/firebase/index'
import getUser from '../../firebase/querys/getUser'
import { useAuth } from '@/context/AuthContext'
import styles from 'styles/Classes.module.scss'
import ClassCard from '@/components/classes/ClassCard'
import getUsersClasses, { useUsersClasses } from '@/firebase/querys/getUsersClasses'

export default function Classes(): ReactElement {
    const usersClasses = useUsersClasses()
    console.log(usersClasses)
    console.log('---------------------')

    getUsersClasses().then((b) => console.log(b))

    return (
        <section className='bg-blue-600 py-8 px-6'>
            <section className='bg-green-900 max-w-7xl mx-auto'>
                <h1 className='mb-3'>My classes</h1>
                <div className={styles.classesWrapper}>
                    {usersClasses?.map(({ classCode, name }) => {
                        return <ClassCard classId={classCode} key={classCode} />
                    })}
                </div>
            </section>
        </section>
    )
}
