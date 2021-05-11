import { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Form from './components/form/Form'
import HomePage from './components/homepage/HomePage'
import ProblemsPage from './components/problemspage/ProblemsPage'
import Page404 from './components/404page/Page_404'
import './global.css'
import Navbar from './components/navbar/Navbar'

import CssDashboard from './components/css-arena/CssDashboard'
import Signup from './components/registration/signup/Signup'
import Login from './components/registration/login/Login'
import ForgotPassword from './components/registration/forgotpassword/ForgotPassword'
import PrivateRoute from './components/routes/PrivateRoute'
import { AuthProvider } from './context/AuthContext'
import { v4 as uuidv4 } from 'uuid'

function App() {
    const [isDarkMode, setIsDarkMode] = useState(true)

    return (
        <AuthProvider>
            <div className={isDarkMode ? 'App dark' : 'App light'}>
                {/* Lucio to the moon 🚀🌙 */}
                <Router>
                    <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
                    <Switch>
                        <Route exact path='/'>
                            <HomePage />
                        </Route>
                        <Route exact path='/algorithms/*' component={ProblemsPage} />

                        <Route exact path='/css/*' component={CssDashboard} />

                        <PrivateRoute exact path='/signup' component={Signup} />
                        <PrivateRoute exact path='/login' component={Login} />
                        <PrivateRoute exact path='/forgot-password' component={ForgotPassword} />

                        <Route>
                            <Page404 />
                        </Route>
                    </Switch>
                </Router>
            </div>
        </AuthProvider>
    )
}

export default App
