import React from 'react'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import { Link, useRouteMatch } from 'react-router-dom'

export default function Sidebar() {
    const { path, url } = useRouteMatch()
    let clearedPath = path.replace(/[*]/g, '')
    console.log(path)
    console.log(url.split('/')[2])

    function OptionsRow({ path, title }) {
        let selected = url.split('/')[2] === path
        console.log(selected)
        console.log(path)
        return (
            <Link to={`${clearedPath + path}`}>
                <div className={`option-row ${selected ? 'selected' : ''}`}>
                    {title} aa <ArrowRightIcon />
                </div>
            </Link>
        )
    }
    return (
        <div className='sidebar'>
            <OptionsRow title='My classes' path='myclasses' />
            <OptionsRow title='My' path='my' />
            <OptionsRow title='classes' path='classes' />
            <OptionsRow title='My classes' path='myclasses' />
        </div>
    )
}
