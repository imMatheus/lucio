import type { NextPage } from 'next'
import Navbar from '@/components/Navbar'

import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.div}></div>
                <div className={styles.div}></div>
                <div className={styles.div}></div>
            </div>
        </div>
    )
}

export default Home
