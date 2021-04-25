import { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Form from './components/Form'
import HomePage from './components/HomePage'
import ProblemsPage from './components/problemspage/ProblemsPage'
import Page404 from './components/Page_404'
import './global.css'
import Navbar from './components/navbar/Navbar'
import CssProblems from './components/css-battles/CssProblems'
import { problems } from './problems/problems'
import CssDashboard from './components/css-battles/CssDashboard'
import Signup from './components/signup/Signup'
import Login from './components/login/Login'
import ForgotPassword from './components/forgotpassword/ForgotPassword'
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
                        <Route exact path='/problems' component={ProblemsPage} />
                        {/* creating routes for all my problems */}
                        {problems.map((problem) => {
                            let path = problem.problemName
                                ?.split(' ')
                                .filter((word) => word !== '')
                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                .join('')
                            return (
                                <Route key={uuidv4()} exact path={`/problems/${path}`}>
                                    <Form problem={problem} />
                                </Route>
                            )
                        })}
                        <Route exact path='/css/*'>
                            <CssDashboard />
                        </Route>
                        <Route exact path='/signup'>
                            <Signup />
                        </Route>
                        <Route exact path='/login'>
                            <Login />
                        </Route>
                        <Route exact path='/forgot-password'>
                            <ForgotPassword />
                        </Route>
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
