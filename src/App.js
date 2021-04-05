import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Form from './components/Form'
import HomePage from './components/HomePage'
import ProblemsPage from './components/problemspage/ProblemsPage'
import './global.css'

function App() {
    return (
        <div className='App'>
            {/* Lucio to the moon 🚀🌙 */}
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <HomePage />
                    </Route>
                    <Route exact path='/problems'>
                        <ProblemsPage />
                    </Route>
                    <Route exact path='/form'>
                        <Form />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App
