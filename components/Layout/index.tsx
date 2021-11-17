import React from 'react'
import Navbar from '@/components/Navbar'
import Toast from '@/components/Toast'

const Layout: React.FC = ({ children }) => {
    return (
        <section className='bg-[#0d1117] min-h-screen flex flex-col'>
            <Toast />
            <Navbar />
            {children}
        </section>
    )
}

export default Layout
