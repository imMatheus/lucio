import { Link } from 'react-router-dom'
import LogoIcon from '../LogoIcon'
import NightsStayIcon from '@material-ui/icons/NightsStay'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
const Navbar = ({ isDarkMode, setIsDarkMode }) => {
    const toogleThemeHandler = () => {
        setIsDarkMode(!isDarkMode)
    }
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
                    Home
                </Link>
                <Link exact to='/problems'>
                    Problems
                </Link>
                <Link exact to='/acrticles'>
                    Articles
                </Link>
                <Link exact to='/form'>
                    Form
                </Link>
            </div>
            <div className='navbar-right'>
                <div
                    className={isDarkMode ? 'dark-theme-toogler dark' : 'dark-theme-toogler light'}
                    onClick={toogleThemeHandler}
                >
                    <NightsStayIcon /> <WbSunnyIcon />
                    <div className='theme-btn'></div>
                </div>
                <div className='account'></div>
            </div>
        </div>
    )
}

export default Navbar
