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
import MyClasses from './components/MyClasses'

export default function Classes(): ReactElement {
    const { currentUser } = useAuth()
    const { path, url } = useRouteMatch()
    const location = useLocation()
    // console.log(currentUser)
    console.log('path', path)
    console.log('url', url)
    console.log('location', location)

    return (
        <Router>
            <div className='classes-wrapper'>
                <div className='content-wrapper'>
                    <Switch>
                        {!currentUser && <p>pleas log you ass in </p>}
                        <Route exact path={'/classes/'}>
                            {console.log('oooo')}
                            <MyClasses />
                        </Route>
                        <Route exact path={`${path}*`}>
                            {console.log('hello')}
                            <Class />
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
