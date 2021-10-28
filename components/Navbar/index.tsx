import React, { ReactElement } from 'react'
import styles from './Navbar.module.scss'
import { Bell, Plus, ChevronDown } from 'react-feather'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

export default function Navbar(): ReactElement {
    const { currentUser } = useAuth()
    return (
        <nav className='flex bg-gray-900 text-white py-4 px-8 text-sm'>
            <section className='flex flex-1 items-center'>
                <div className={styles.searchWrapper}>
                    <form action=''></form>
                </div>
                <Link href='/classes' passHref={true}>
                    <p className={styles.tab}>Classes</p>
                </Link>
                <Link href='/register' passHref={true}>
                    <p className={styles.tab}>Sign up</p>
                </Link>

                <p className={styles.tab}>{currentUser?.uid}</p>
                <p className={styles.tab}>Friends</p>
            </section>
            <section className='flex'>
                <span className={styles.controlsSpan}>
                    <Bell className='w-4' />
                    <ChevronDown className='w-4' />
                </span>
                <span className={styles.controlsSpan}>
                    <Plus className='w-4' />
                    <ChevronDown className='w-4' />
                </span>
            </section>
        </nav>
    )
}
