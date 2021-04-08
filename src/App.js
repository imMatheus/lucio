import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Form from './components/Form'
import HomePage from './components/HomePage'
import ProblemsPage from './components/problemspage/ProblemsPage'
import Page404 from './components/Page_404'
import './global.css'
import Navbar from './components/navbar/Navbar'
import { problems } from './problems/problems'
function App() {
    console.log(problems)
    return (
        <div className='App'>
            {/* Lucio to the moon 🚀🌙 */}
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path='/'>
                        <HomePage />
                    </Route>
                    <Route exact path='/problems' component={ProblemsPage} />
                    <Route exact path='/form'>
                        <Form problem={problems[0]} />
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
