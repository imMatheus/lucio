import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CssArena from './CssArena'
import CssProblems from './CssProblems'
import { cssProblems } from '../../css-problems/cssProblems.js'
import { v4 as uuidv4 } from 'uuid'

const CssDashboard = () => {
    return (
        <div className='cssdashboard'>
            <Switch>
                {cssProblems?.map((problem) => {
                    return (
                        <Route key={uuidv4()} exact path={`/css/play/${problem.target}`}>
                            <CssArena problem={problem} />
                        </Route>
                    )
                })}

                <Route exact path='/css/problems'>
                    <CssProblems />
                </Route>
            </Switch>
        </div>
    )
}

export default CssDashboard
