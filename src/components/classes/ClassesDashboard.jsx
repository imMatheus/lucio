import React from 'react'
import Sidebar from './components/Sidebar'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'
import MyClasses from './components/MyClasses'
import { useAuth } from '../../context/AuthContext'
import Class from './components/Class'

export default function ClassesDashboard() {
    const { currentUser } = useAuth()

    const { path } = useRouteMatch()

    return (
        <div className='classes-dashboard'>
            <Sidebar />
            <Switch>
                {!currentUser && <Redirect to='/' />}

                <div className='content-wrapper'>
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
                        class
                    </Route>
                    <Route exact path={`${path}abc`}>
                        abc
                    </Route>
                </div>
            </Switch>
        </div>
    )
}
