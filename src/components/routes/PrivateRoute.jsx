import React from 'react'
import { auth } from '../../firebase'
import { Route, Redirect, useLocation, useHistory } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        // Show the component only when the user is not logged in
        // Otherwise, redirect the user to homepage page
        <Route
            {...rest}
            render={(props) => (!auth.currentUser ? <Component {...props} /> : <Redirect to='/' />)}
        />
    )
}

export default PrivateRoute
