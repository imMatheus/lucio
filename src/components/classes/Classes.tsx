import React, { ReactElement } from 'react'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'
// import Sidebar from './components/Sidebar'
// import MyClasses from './components/MyClasses'
// import { useAuth } from '../../context/AuthContext'
import { useAuth } from '../../context/AuthContext'
// import Class from './components/Class'
// import Page404 from '../404page/Page_404'
import User from '../../types/User'
import MyClasses from './components/MyClasses'

interface Props {
    re?: string
}

export default function Classes({ re }: Props): ReactElement {
    const { currentUser } = useAuth()
    const { path } = useRouteMatch()
    console.log(currentUser)

    return (
        <div>
            <div className='classes-dashboard'>
                <Route exact path={`${path}`}>
                    <MyClasses />
                </Route>
                {/* <Sidebar />
                <div className='content-wrapper'>
                    <Switch>
                        {!currentUser && <Redirect to='/' />}
    
                        <Route exact path={`${path}myclasses/*`}>
                            <Class />
                        </Route>
                        <Route exact path={`${path}my`}>
                            <div className='content-wrapper'>my</div>
                        </Route>
                        <Route exact path={`${path}classes`}>
                            {path}
                        </Route>
                        <Route exact path={`${path}abc`}>
                            abc
                        </Route>
                        <Route>
                            <Page404 />
                        </Route>
                    </Switch> */}
            </div>
        </div>
    )
}
