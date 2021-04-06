import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <div className='navbar'>
            <Link exact to='/'>
                <div className='logo'>
                    <h2>LucioCode</h2>
                    <div className='logo-icon'>
                        <div className='circle-line'></div>
                        <div className='circle-line'></div>
                        <div className='circle-line'></div>
                        <div className='circle-line'></div>
                        <div className='circle-line'></div>
                    </div>
                </div>
            </Link>
            <div className='navbar-content'>
                <Link exact to='/'>
                    <div className='navbar-content-item'>Home</div>
                </Link>
                <Link exact to='/problems'>
                    <div className='navbar-content-item'>Problems</div>
                </Link>
                <Link exact to='/acrticles'>
                    <div className='navbar-content-item'>Articles</div>
                </Link>
                <Link exact to='/form'>
                    <div className='navbar-content-item'>Form</div>
                </Link>
            </div>
        </div>
    )
}

export default Navbar
