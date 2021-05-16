import React, { useRef, useState } from 'react'
import Question from './Question'
import Monaco from './Monaco'

const Form = ({ problem }) => {
    const resizeBarRef = useRef(null)
    const questionRef = useRef(null)

    let isDragging = false

    const mouseDownHandler = () => {
        isDragging = true
    }

    document.addEventListener('mousemove', function (e) {
        // Don't do anything if dragging flag is false
        if (!isDragging) {
            return false
        }
        // bar width is hard coded as 12 px in scss
        let barWidth = 12
        //setting width to the mouse x cord or to a min or max value specified in the css
        var pointerRelativeXpos = e.clientX
        questionRef.current.style.width = pointerRelativeXpos - barWidth + 'px'
    })

    document.addEventListener('mouseup', function (e) {
        // Turn off dragging flag when user mouse is up
        isDragging = false
    })
    return (
        <div className='form '>
            <Question questionRef={questionRef} problem={problem} />

            <div ref={resizeBarRef} className='resizebar' onMouseDown={mouseDownHandler}>
                <div className='dots'>
                    {/* spans that get styled to be circles */}
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <Monaco problem={problem} />
        </div>
    )
}

export default Form
