import React from 'react'
import Sidebar from './components/Sidebar'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'
import MyClasses from './components/MyClasses'
import { useAuth } from '../../context/AuthContext'
import Class from './components/Class'
import Page404 from '../404page/Page_404'

export default function ClassesDashboard() {
    const { currentUser } = useAuth()

    const { path } = useRouteMatch()

    return (
        <div className='classes-dashboard'>
            <Sidebar />
            <div className='content-wrapper'>
                <Switch>
                    {!currentUser && <Redirect to='/' />}

                    <Route exact path={`${path}myclasses`}>
                        <MyClasses />
                    </Route>
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
                </Switch>
            </div>
        </div>
    )
}
