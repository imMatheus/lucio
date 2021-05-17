import { Switch, Route } from 'react-router-dom'
import CssArena from './CssArena'
import CssProblems from './CssProblems'
import { cssProblems } from '../../css-problems/cssProblems.js'
import { v4 as uuidv4 } from 'uuid'
import Page404 from '../404page/Page_404'

const CssDashboard = () => {
    return (
        <div className='cssdashboard'>
            <Switch>
                {/* creating routes for each problem */}
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
                <Route>
                    <Page404 />
                </Route>
            </Switch>
        </div>
    )
}

export default CssDashboard
