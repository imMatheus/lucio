import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CssBattle from './CssBattle'
import CssProblems from './CssProblems'

const CssDashboard = () => {
    return (
        <div className='cssdashboard'>
            <Switch>
                <Route exact path='/css/play'>
                    <CssBattle />
                </Route>
                <Route exact path='/css/problems'>
                    <CssProblems />
                </Route>
            </Switch>
        </div>
    )
}

export default CssDashboard
