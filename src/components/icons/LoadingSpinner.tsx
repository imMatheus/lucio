import React, { ReactElement } from 'react'

export default function LoadingSpinner(): ReactElement {
    return (
        <div className='loadingspinner'>
            <div className='loadingspinner-spinner'>
                <div className='circle-line'></div>
                <div className='circle-line'></div>
                <div className='circle-line'></div>
                <div className='circle-line'></div>
                <div className='circle-line'></div>
            </div>
        </div>
    )
}
