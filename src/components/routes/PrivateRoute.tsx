import React, { ReactElement } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

export type Props = {
    Component: any
    redirectPath: string
    condition: boolean
} & RouteProps

export default function PrivateRoute({
    Component,
    redirectPath,
    condition,
    ...RouteProps
}: Props): ReactElement {
    return (
        <Route
            {...RouteProps}
            render={(props) =>
                condition ? <Component {...props} /> : <Redirect to={redirectPath} />
            }
        />
    )
}
