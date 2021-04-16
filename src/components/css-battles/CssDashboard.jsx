import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CssBattle from './CssBattle'
import CssProblems from './CssProblems'
import { cssProblems } from '../../css-problems/cssProblems.js'

const CssDashboard = () => {
    return (
        <div className='cssdashboard'>
            <Switch>
                {cssProblems?.map((problem) => {
                    return (
                        <Route exact path={`/css/play/${problem.target}`}>
                            <CssBattle problem={problem} />
                        </Route>
                    )
                })}
                {/* <Route exact path='/css/play'>
                    <CssBattle />
                </Route> */}
                <Route exact path='/css/problems'>
                    <CssProblems />
                </Route>
            </Switch>
        </div>
    )
}

export default CssDashboard
