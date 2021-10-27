import type { NextPage } from 'next'
import Navbar from '@/components/Navbar'

import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <p>hello world</p>
        </div>
    )
}

export default Home
