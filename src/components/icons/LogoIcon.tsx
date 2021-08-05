import React, { ReactElement } from 'react'

interface Props {
    spin: boolean
    loader: boolean
}

export default function LogoIcon({ spin, loader }: Props): ReactElement {
    let className = 'logo-icon '
    if (spin) className += ' spin '
    if (loader) className += ' loader '
    return (
        <div className={className}>
            <div className='circle-line'></div>
            <div className='circle-line'></div>
            <div className='circle-line'></div>
            <div className='circle-line'></div>
            <div className='circle-line'></div>
        </div>
    )
}
