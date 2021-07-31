import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Components
import Homepage from './components/homepage/Homepage'
import Algorithms from './components/algorithms/Algorithms'
import Classes from 'components/classes/Classes'

//Contexts
import { AuthProvider } from './context/AuthContext'
import { ClassesProvider } from './context/ClassesContext'
import { LeaderboardProvider } from './context/LeaderboardContext'

//imports
import './global.css'

function App() {
    return (
        <AuthProvider>
            <LeaderboardProvider>
                <ClassesProvider>
                    <Router>
                        <Switch>
                            <div className='App'>
                                {/* <Homepage /> */}
                                {/* <Algorithms />*/}

                                <Route exact path='/' component={Homepage} />
                                <Route exact path='/classes' component={Classes} />
                            </div>
                        </Switch>
                    </Router>
                </ClassesProvider>
            </LeaderboardProvider>
        </AuthProvider>
    )
}

export default App
