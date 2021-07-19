import React from 'react'
import { AuthProvider } from './context/AuthContext'
import { LeaderboardProvider } from './context/LeaderboardContext'

function App() {
    return (
        <AuthProvider>
            <LeaderboardProvider>
                <h3>adas</h3>
            </LeaderboardProvider>
        </AuthProvider>
    )
}

export default App
