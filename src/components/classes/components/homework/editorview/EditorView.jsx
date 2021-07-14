import React, { useRef } from 'react'
import Question from './Question'
export default function EditorView() {
    const resizeBarRef = useRef(null)
    const questionRef = useRef(null)

    //TODO make an useEffect that returns a function to store the users latest code inte the db
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
        questionRef.current.style.width = pointerRelativeXpos - barWidth - 270 + 'px'
    })

    document.addEventListener('mouseup', function (e) {
        // Turn off dragging flag when user mouse is up
        isDragging = false
    })
    return (
        <div className='form '>
            <Question questionRef={questionRef} />

            <div ref={resizeBarRef} className='resizebar' onMouseDown={mouseDownHandler}>
                <div className='dots'>
                    {/* spans that get styled to be circles */}
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            {/* <Monaco /> */}
        </div>
    )
}
