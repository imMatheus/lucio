import React, { useEffect, ReactElement } from 'react'
import { number } from '@/firebase/index'
import getUser from '../../firebase/querys/getUser'

export default function Classes(): ReactElement {
    useEffect(() => {
        // getUser()
        console.log(getUser)
    }, [])
    return <div>my classes {number}</div>
}
