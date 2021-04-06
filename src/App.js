import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Form from './components/Form'
import HomePage from './components/HomePage'
import ProblemsPage from './components/problemspage/ProblemsPage'
import './global.css'
import Navbar from './components/navbar/Navbar'

function App() {
    return (
        <div className='App'>
            {/* Lucio to the moon 🚀🌙 */}
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <div className='comp-nav'>
                            <Navbar />
                            <HomePage />
                        </div>
                    </Route>
                    <Route exact path='/problems'>
                        <div className='comp-nav'>
                            <Navbar />
                            <ProblemsPage />
                        </div>
                    </Route>
                    <Route exact path='/form'>
                        <div className='comp-nav'>
                            <Navbar />
                            <Form />
                        </div>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App
