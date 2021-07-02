import React from 'react'
import Sidebar from './components/Sidebar'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import MyClasses from './components/MyClasses'

export default function ClassesDashboard() {
    const { path } = useRouteMatch()

    return (
        <div className='classes-dashboard'>
            <Sidebar />
            <Switch>
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
