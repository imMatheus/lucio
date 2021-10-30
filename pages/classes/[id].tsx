import React, { ReactElement, useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import getClass from '@/firebase/querys/getClass'
import StudentCard from '@/components/classes/StudentCard'
import { useAuth } from '@/context/AuthContext'
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

export default function ClassScreen({ classData }: Props): ReactElement {
    console.log('classData')
    const { currentUser } = useAuth()
    const [classState, setClassState] = useState(classData)
    useEffect(() => {
        setClassState(classData)
    }, [classData])

    console.log(classState)
    console.log(currentUser)

    return (
        <div>
            im class
            <StudentCard
                image={currentUser?.profileImage || ''}
                name={currentUser?.displayName || 'asam'}
            />
            <StudentCard
                image={currentUser?.profileImage || ''}
                name={currentUser?.displayName || ''}
            />
            <StudentCard
                image={currentUser?.profileImage || ''}
                name={currentUser?.displayName || ''}
            />
            <StudentCard
                image={currentUser?.profileImage || ''}
                name={currentUser?.displayName || ''}
            />
            <StudentCard
                image={currentUser?.profileImage || ''}
                name={currentUser?.displayName || ''}
            />
        </div>
    )
}
