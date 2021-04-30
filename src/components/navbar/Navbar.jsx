import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useHistory } from 'react-router-dom'
import LogoIcon from '../LogoIcon'
import NightsStayIcon from '@material-ui/icons/NightsStay'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import avatarWhite from '../../avatars/avatar-black.png'
const Navbar = ({ isDarkMode, setIsDarkMode }) => {
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const logoutHandler = async () => {
        try {
            await logout()
            history.push('/login')
        } catch (error) {
            console.log(error)
        }
    }
    const toogleThemeHandler = () => {
        setIsDarkMode(!isDarkMode)
    }
    return (
        <div className='navbar'>
            <Link exact to='/'>
                <div className='logo'>
                    <h2>LucioCode</h2>
                    {/* setting spin to true so it spins */}
                    <div className='logo-icon-container'>
                        <LogoIcon spin={true} loader={false} />
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
                <Link exact to='/css/problems'>
                    Css
                </Link>
                {currentUser && <p>Email: {currentUser.email}</p>}
            </div>
            <div className='navbar-right'>
                <div
                    className={isDarkMode ? 'dark-theme-toogler dark' : 'dark-theme-toogler light'}
                    onClick={toogleThemeHandler}
                >
                    <NightsStayIcon /> <WbSunnyIcon />
                    <div className='theme-btn'></div>
                </div>
                {currentUser && (
                    <div className='outline-btn' onClick={logoutHandler}>
                        Log Out
                    </div>
                )}
                <Link exact to='/login'>
                    <div
                        className='account'
                        style={{ backgroundImage: `url(${avatarWhite})` }}
                    ></div>
                </Link>
            </div>
        </div>
    )
}

export default Navbar
