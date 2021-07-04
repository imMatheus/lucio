import React from 'react'
import Sidebar from './components/Sidebar'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'
import MyClasses from './components/MyClasses'
import { useAuth } from '../../context/AuthContext'

export default function ClassesDashboard() {
    const { currentUser } = useAuth()

    const { path } = useRouteMatch()

    return (
        <div className='classes-dashboard'>
            <Sidebar />
            <Switch>
                {!currentUser && <Redirect to='/' />}
                {/* <PrivateRoute
                            condition={currentUser}
                            exact
                            path='/classes/*'
                            component={ClassesDashboard}
                        /> */}
                <Route exact path={`${path}myclasses`}>
                    <div className='content-wrapper'>
                        <MyClasses />
                    </div>
                </Route>
                <Route exact path={`${path}my`}>
                    <div className='content-wrapper'>my</div>
                </Route>
                <Route exact path={`${path}classes`}>
                    <div className='content-wrapper'>class</div>
                </Route>
                <Route exact path={`${path}abc`}>
                    <div className='content-wrapper'>abc</div>
                </Route>
            </Switch>
        </div>
    )
}
