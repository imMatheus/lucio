import React, { useRef } from 'react'
import Question from './form/Question'
import Monako from './form/Monako'
const Form = () => {
    const resizebarRef = useRef(null)
    const questionRef = useRef(null)
    const editorRef = useRef(null)
    const questionBoxMinWidth = 340
    const questionBoxMaxWidth = 800
    let isDraging = false

    const mouseDownHandler = (e) => {
        isDraging = true
    }

    document.addEventListener('mousemove', function (e) {
        // Don't do anything if dragging flag is false
        if (!isDraging) {
            return false
        }
        // bar width is har coded as 12 px in scss
        let barWidth = 12
        //setting width to the mouse x cord or to a min or max value specified at the top
        var pointerRelativeXpos = e.clientX
        questionRef.current.style.width =
            Math.min(Math.max(questionBoxMinWidth, pointerRelativeXpos - barWidth), questionBoxMaxWidth) + 'px'
    })

    document.addEventListener('mouseup', function (e) {
        // Turn off dragging flag when user mouse is up
        isDraging = false
    })

    console.log(isDraging)
    return (
        <div className='form'>
            <Question qref={questionRef} />
            <div ref={resizebarRef} className='resizebar' onMouseDown={mouseDownHandler}>
                <div className='dots'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <Monako mref={editorRef} />
        </div>
    )
}

export default Form
