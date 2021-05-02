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
        const userRef = db.ref('css')
        userRef.on('value', (snapshot) => {
            let leaderBoard = {}
            let data = snapshot.val()
            console.log(data)
            data?.forEach((problem) => {
                const submissions = problem.submissions
                if (submissions) {
                    for (const uid in submissions) {
                        if (leaderBoard[uid] > 0) {
                            leaderBoard[uid] += submissions[uid].score
                        } else {
                            leaderBoard[uid] = submissions[uid].score
                        }
                    }
                }
            })
            // quickSort algorithm
            function quickSortBasic(array) {
                if (array.length < 2) {
                    return array
                }

                var pivot = array[0]
                var lesserArray = []
                var greaterArray = []

                for (var i = 1; i < array.length; i++) {
                    if (array[i].score > pivot.score) {
                        greaterArray.push(array[i])
                    } else {
                        lesserArray.push(array[i])
                    }
                }

                return quickSortBasic(lesserArray).concat(pivot, quickSortBasic(greaterArray))
            }

            console.log(leaderBoard)
            let arr1 = []
            for (const uid in leaderBoard) {
                console.log(leaderBoard[uid])
                // if the user does not have a score we don't push it to leader-board
                if (leaderBoard[uid]) {
                    arr1.push({ uid: uid, score: leaderBoard[uid] })
                }
            }
            console.log(arr1)

            // basic implementation, where pivot is the first element

            // quickSortBasic(arr1, 0, arr1.length - 1)
            arr1 = quickSortBasic(arr1)
            console.log('Sorted array: ')
            console.log(arr1)
        })
    }, [currentUser])

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
