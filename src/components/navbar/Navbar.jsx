import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useHistory } from 'react-router-dom'
import LogoIcon from '../icons/LogoIcon'

import { useState, useEffect } from 'react'
import { fs } from '../../firebase'
const Navbar = ({ isDarkMode, setIsDarkMode }) => {
    const { currentUser, logout, leaderboard } = useAuth()
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
            const userUid = currentUser.uid
            console.log(userUid)
            for (const user in leaderboard) {
                if (leaderboard[user].userUID === userUid) {
                    console.log(user)
                    currentUser.score = leaderboard[user].score
                    currentUser.targets = leaderboard[user].targets
                }
                console.log(user)
            }
        } else {
            setUserData(null)
        }
    }, [currentUser, leaderboard])
    const logoutHandler = async () => {
        console.log('3')
        console.log(userData)

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
            </div>
            <div className='navbar-right'>
                {currentUser ? (
                    <>
                        <div className='account'>
                            <div className='info'>
                                <h2>{currentUser?.displayName}</h2>
                                <p>{`${currentUser?.score || 0} (${
                                    currentUser?.targets || 0
                                } targets)`}</p>
                            </div>
                            <Link exact='true' to='/login'>
                                <div
                                    className='profileImage'
                                    style={{
                                        backgroundImage: `url(${userData?.profileImage})`,
                                    }}
                                ></div>
                            </Link>
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
