import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useHistory } from 'react-router-dom'
import LogoIcon from '../LogoIcon'
import NightsStayIcon from '@material-ui/icons/NightsStay'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import avatarWhite from '../../avatars/avatar-black.png'
import { useState, useEffect } from 'react'
import { fs, db } from '../../firebase'
const Navbar = ({ isDarkMode, setIsDarkMode }) => {
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const [userData, setUserData] = useState()
    const fetchUser = async (user) => {
        // getting the users data from firestore
        const response = fs.collection('users').doc(user.uid)
        const data = await response.get()
        setUserData(data.data())
    }
    useEffect(() => {
        if (currentUser) {
            fetchUser(currentUser)
        } else {
            setUserData(null)
        }
    }, [])
    const logoutHandler = async () => {
        try {
            await logout()
            history.push('/login')
        } catch (error) {
            console.log(error)
            if (error.message) {
                alert(error.message)
            }
        }
    }
    const toogleThemeHandler = () => {
        setIsDarkMode(!isDarkMode)
    }
    return (
        <div className='navbar'>
            <Link exact='true' to='/'>
                <div className='logo'>
                    <h2>LucioCode</h2>
                    {/* setting spin to true so it spins */}
                    <div className='logo-icon-container'>
                        <LogoIcon spin={true} loader={false} />
                    </div>
                </div>
            </Link>
            <div className='navbar-content'>
                <Link exact='true' to='/'>
                    Home
                </Link>
                <Link exact='true' to='/problems'>
                    Problems
                </Link>
                <Link exact='true' to='/css/problems'>
                    Css
                </Link>
                {currentUser && <p>Email: {currentUser.email}</p>}
            </div>
            <div className='navbar-right'>
                {/* <div
                    className={isDarkMode ? 'dark-theme-toogler dark' : 'dark-theme-toogler light'}
                    onClick={toogleThemeHandler}
                >
                    <NightsStayIcon /> <WbSunnyIcon />
                    <div className='theme-btn'></div>
                </div> */}
                {currentUser && (
                    <div className='outline-btn' onClick={logoutHandler}>
                        Log Out
                    </div>
                )}
                <Link exact='true' to='/login'>
                    <div
                        className='account'
                        style={{
                            backgroundImage: `url(${
                                userData ? userData?.profileImage : avatarWhite
                            })`,
                        }}
                    ></div>
                </Link>
            </div>
        </div>
    )
}

export default Navbar
