import { Link } from 'react-router-dom'
import LogoIcon from '../LogoIcon'
const Navbar = () => {
    return (
        <div className='navbar'>
            <Link exact to='/'>
                <div className='logo'>
                    <h2>LucioCode</h2>
                    {/* setting spinn to true so it spinns */}
                    <div className='logo-icon-container'>
                        <LogoIcon spinn={true} />
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
