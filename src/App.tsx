import React from 'react'

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

// Components
import Homepage from './components/homepage/Homepage'
import Algorithms from './components/algorithms/Algorithms'
import Classes from 'components/classes/Classes'
import Navbar from './components/navbar/Navbar'
import Signup from './components/registration/signup/Signup'
import Login from './components/registration/login/Login'
import ForgotPassword from './components/registration/forgotpassword/ForgotPassword'

//Contexts
import { AuthProvider, useAuth } from './context/AuthContext'
import { ClassesProvider } from './context/ClassesContext'
import { LeaderboardProvider } from './context/LeaderboardContext'

//imports
import './global.css'
import PrivateRoute from './components/routes/PrivateRoute'
import Page404 from 'components/page404/Page404'

function App() {
    const { currentUser } = useAuth()
    return (
        <AuthProvider>
            <LeaderboardProvider>
                <ClassesProvider>
                    <Router>
                        <div className='App'>
                            <Navbar />
                            <Switch>
                                {/* <Homepage /> */}
                                {/* <Algorithms />*/}

                                <Route exact path='/' component={Homepage} />
                                <Route exact path='/algorithms/*' component={Algorithms} />
                                <Route exact path='/classes/*' component={Classes} />
                                <Route exact path='/classes'>
                                    <Redirect to='/classes/' />
                                </Route>

                                <PrivateRoute
                                    exact
                                    path='/signup'
                                    condition={!currentUser}
                                    redirectPath='/'
                                    Component={Signup}
                                />
                                <PrivateRoute
                                    exact
                                    path='/login'
                                    condition={!currentUser}
                                    redirectPath='/'
                                    Component={Login}
                                />
                                <PrivateRoute
                                    exact
                                    path='/forgot-password'
                                    condition={!currentUser}
                                    redirectPath='/'
                                    Component={ForgotPassword}
                                />

                                <Route>
                                    <Page404 />
                                </Route>
                            </Switch>
                        </div>
                    </Router>
                </ClassesProvider>
            </LeaderboardProvider>
        </AuthProvider>
    )
}

export default App
