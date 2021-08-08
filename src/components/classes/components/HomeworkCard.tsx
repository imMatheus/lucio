import React, { ReactElement } from 'react'
import AssignmentIcon from '@material-ui/icons/Assignment'
import { Users, Calendar, Book } from 'react-feather'
import firebase from 'firebase/app'
interface Props {
    name: string
    createdAt: firebase.firestore.Timestamp
}

export default function HomeworkCard({ name, createdAt }: Props): ReactElement {
    const date = new Date()
    let y = createdAt.toDate()
    console.log('y', y)

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    let indexedNumber = date.getDate()
    // turns e.g 8 => 08 and 21 => 21
    let day = indexedNumber > 9 ? indexedNumber : '0' + indexedNumber

    return (
        <div className='homework-card'>
            <div className='homework-card-content'>
                <div className='title'>
                    <Book />
                    {name}
                </div>
                <div className='metadata'>
                    <div className='files'>
                        <Users />
                        12/16
                    </div>
                    <div className='date'>
                        <Calendar />
                        {day}, {months[date.getMonth()]}
                    </div>
                </div>
            </div>
        </div>
    )
}
