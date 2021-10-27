import React from 'react'
import Navbar from '../Navbar'

const Layout: React.FC = ({ children }) => {
    return (
        <section className='bg-[#0d1117] min-h-screen flex flex-col'>
            <Navbar />
            {children}
        </section>
    )
}

export default Layout
