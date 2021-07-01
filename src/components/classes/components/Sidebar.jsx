import React from 'react'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import { Link, useRouteMatch } from 'react-router-dom'

export default function Sidebar() {
    const { path } = useRouteMatch()
    let clearedPath = path.replace(/[*]/g, '')

    return (
        <div className='sidebar'>
            <Link className='options-row' to={`${clearedPath}myclasses`}>
                <div className='option-row'>
                    My classes <ArrowRightIcon />
                </div>
            </Link>
            <div className='option-row'>
                My classes <ArrowRightIcon />
            </div>
            <div className='option-row'>
                My classes <ArrowRightIcon />
            </div>
            <div className='option-row'>
                My classes <ArrowRightIcon />
            </div>
            <div className='option-row'>
                My classes <ArrowRightIcon />
            </div>
        </div>
    )
}
