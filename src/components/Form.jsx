import React, { useRef, useState } from 'react'
import Question from './form/Question'
import Monako from './form/Monako'
// import WebFrame from './form/WebFrame'
const Form = ({ problem }) => {
    const resizebarRef = useRef(null)
    const questionRef = useRef(null)
    const editorRef = useRef(null)
    // const frameRef = useRef(null)

    const [currentCode, setCurrentCode] = useState('')

    let isDraging = false

    const mouseDownHandler = () => {
        isDraging = true
    }

    document.addEventListener('mousemove', function (e) {
        // Don't do anything if dragging flag is false
        if (!isDraging) {
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
        isDraging = false
    })

    return (
        <div className='form '>
            <Question qref={questionRef} problem={problem} />
            {/* <WebFrame code={currentCode} fref={frameRef} /> */}
            <div ref={resizebarRef} className='resizebar' onMouseDown={mouseDownHandler}>
                <div className='dots'>
                    {/* spans that get styled to be circles */}
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <Monako mref={editorRef} setCurrentCode={setCurrentCode} currentCode={currentCode} problem={problem} />
        </div>
    )
}

export default Form
