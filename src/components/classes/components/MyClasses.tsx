import { useClasses } from '../../../context/ClassesContext'
import React, { ReactElement } from 'react'
import ClassCard from './ClassCard'
import Class from '../../../types/Class'
export default function MyClasses(): ReactElement {
    const { userClasses } = useClasses()
    console.log(userClasses)

    return (
        <div className='myclasses-wrapper'>
            {userClasses ? (
                userClasses.map((classItem: Class, index: number) => {
                    console.log(classItem)

                    return (
                        <ClassCard
                            key={index} //TODO change index to uuid
                            classData={classItem}
                        />
                    )
                })
            ) : (
                <p>Looks like you don't have any classes</p>
            )}
        </div>
    )
}
