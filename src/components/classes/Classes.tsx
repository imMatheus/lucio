import Page404 from 'components/page404/Page404'
import React, { ReactElement } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch,
    Redirect,
    useLocation,
} from 'react-router-dom'
// import Sidebar from './components/Sidebar'
// import MyClasses from './components/MyClasses'
// import { useAuth } from '../../context/AuthContext'
import { useAuth } from '../../context/AuthContext'
// import Class from './components/Class'
// import Page404 from '../404page/Page_404'
import User from '../../types/User'
import Class from './components/Class'
import Homework from './components/homework/Homework'
import HomeworkEditor from './components/homework/HomeworkEditor'
import MyClasses from './components/MyClasses'

export default function Classes(): ReactElement {
    const { currentUser } = useAuth()

    return (
        <Router>
            <div className='classes-wrapper'>
                <div className='content-wrapper'>
                    <Switch>
                        {!currentUser && <p>pleas log you ass in </p>}
                        <Route exact path={'/classes/'}>
                            <MyClasses />
                        </Route>
                        <Route exact path={`/classes/:classLink`}>
                            <Class />
                        </Route>
                        <Route exact path={`/classes/:classLink/homework`}>
                            <Homework />
                        </Route>
                        <Route exact path={`/classes/:classLink/homework/:homeworkLink`}>
                            <HomeworkEditor />
                        </Route>
                        <Route>
                            <Page404 />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    )
}
