import React, { ReactElement } from 'react'
import LogoIcon from 'components/icons/LogoIcon'
import { Link } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import { useHistory } from 'react-router-dom'

export default function Navbar(): ReactElement {
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    console.log(currentUser?.score)

    const logoutHandler = async () => {
        try {
            await logout()
            history.push('/login')
        } catch (error) {
            alert('Oops, something went wrong')
        }
    }
    return (
        <div className='navbar'>
            <Link to='/'>
                <div className='logo'>
                    <h2>LucioCode</h2>
                    <div className='logo-icon-container'>
                        {/* setting spin to true so it spins */}
                        <LogoIcon spin={true} loader={false} />
                    </div>
                </div>
            </Link>
            <div className='navbar-content'>
                <Link to='/'>Home</Link>
                <Link to='/algorithms/problems'>Algorithms</Link>
                <Link to='/css/problems'>Css</Link>
                <Link to='/classes'>Classes</Link>
            </div>
            <div className='navbar-right'>
                {currentUser ? (
                    <>
                        {console.log(currentUser?.score)}

                        <div className='account'>
                            <div className='info'>
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
                    <Link className='outline-btn' to='/login'>
                        Login
                    </Link>
                )}
            </div>
        </div>
    )
}
