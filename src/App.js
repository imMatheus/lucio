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
function App() {
    const [isDarkMode, setIsDarkMode] = useState(true)

    return (
        <div className={isDarkMode ? 'App dark' : 'App light'}>
            {/* Lucio to the moon 🚀🌙 */}
            <Router>
                <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
                <Switch>
                    <Route exact path='/'>
                        <HomePage />
                    </Route>
                    <Route exact path='/problems' component={ProblemsPage} />
                    {problems.map((problem) => {
                        let path = problem.problemName
                            ?.split(' ')
                            .filter((word) => word !== '')
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join('')
                        return (
                            <Route exact path={`/problems/${path}`}>
                                <Form problem={problem} />
                            </Route>
                        )
                    })}
                    <Route exact path='/css'>
                        <CssProblems />
                    </Route>
                    <Route>
                        <Page404 />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App
