import Page404 from 'components/page404/Page404'
import React, { ReactElement } from 'react'
import { BrowserRouter as Router, Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'
// import Sidebar from './components/Sidebar'
// import MyClasses from './components/MyClasses'
// import { useAuth } from '../../context/AuthContext'
import { useAuth } from '../../context/AuthContext'
// import Class from './components/Class'
// import Page404 from '../404page/Page_404'
import User from '../../types/User'
import Class from './components/Class'
import MyClasses from './components/MyClasses'
import Sidebar from './components/Sidebar'

export default function Classes(): ReactElement {
    const { currentUser } = useAuth()
    const { path, url } = useRouteMatch()
    console.log(currentUser)
    console.log('path', path)
    console.log('url', url)

    return (
        <Router>
            <div className='classes-wrapper'>
                <Sidebar />
                <div className='content-wrapper'>
                    <Switch>
                        {!currentUser && <p>pleas log you ass in </p>}

                        <Route exact path={`${url}`}>
                            {console.log('oooo')}
                            <MyClasses />
                        </Route>
                        <Route exact path={`${url}/*`}>
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
