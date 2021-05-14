import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useHistory } from 'react-router-dom'
import LogoIcon from '../icons/LogoIcon'

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    const logoutHandler = async () => {
        try {
            await logout()
            history.push('/login')
        } catch (error) {
            if (error.message) {
                alert(error.message)
            }
        }
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
                <Link exact='true' to='/algorithms/problems'>
                    Algorithms
                </Link>
                <Link exact='true' to='/css/problems'>
                    Css
                </Link>
            </div>
            <div className='navbar-right'>
                {currentUser ? (
                    <>
                        <div className='account'>
                            <div className='info'>
                                {/* {console.log(currentUser)} */}
                                <h2>{currentUser?.displayName}</h2>
                                <p>{`${currentUser?.score || 0} (${
                                    currentUser?.targets || 0
                                } targets)`}</p>
                            </div>

                            <div
                                className='profileImage'
                                style={{
                                    backgroundImage: `url(${currentUser?.profileImage})`,
                                }}
                            ></div>
                        </div>

                        <div className='outline-btn' onClick={logoutHandler}>
                            Log Out
                        </div>
                    </>
                ) : (
                    <Link className='outline-btn' exact='true' to='/login'>
                        Login
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Navbar
