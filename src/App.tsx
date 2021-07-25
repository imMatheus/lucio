import React from 'react'

// Components
import Homepage from './components/homepage/Homepage'
import Algorithms from './components/algorithms/Algorithms'

//Contexts
import { AuthProvider } from './context/AuthContext'
import { LeaderboardProvider } from './context/LeaderboardContext'

//imports
import './global.css'

function App() {
    return (
        <AuthProvider>
            <LeaderboardProvider>
                <div className='App'>
                    {/* <Homepage /> */}
                    <Algorithms />
                </div>
            </LeaderboardProvider>
        </AuthProvider>
    )
}

export default App
