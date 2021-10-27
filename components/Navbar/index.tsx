import React, { ReactElement } from 'react'
import styles from './Navbar.module.scss'
import { Bell, Plus, ChevronDown } from 'react-feather'

export default function Navbar(): ReactElement {
    return (
        <nav className='flex bg-gray-900 text-white py-4 px-8 text-sm'>
            <section className='flex flex-1 items-center'>
                <div className={styles.searchWrapper}>
                    <form action=''></form>
                </div>
                <p className={styles.tab}>Pull request</p>
                <p className={styles.tab}>Issues</p>
                <p className={styles.tab}>Marketplace</p>
                <p className={styles.tab}>Explore</p>
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
