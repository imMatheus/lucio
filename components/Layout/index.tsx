import React from 'react'
import Navbar from '../Navbar'

const Layout: React.FC = ({ children }) => {
    return (
        <section className='bg-gray-700 min-h-screen'>
            <Navbar />
            {children}
        </section>
    )
}

export default Layout
