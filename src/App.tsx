import React from 'react'
import Homepage from './components/homepage/Homepage'

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
                    <Homepage />
                </div>
            </LeaderboardProvider>
        </AuthProvider>
    )
}

export default App
