import React, { ReactElement, useRef } from 'react'
import EditorComponent from '../editor/Editor'
import Question from './Question'
import { problems } from '../../problems/AlgorithmProblems'
import CompileView from '../compiler/CompileView'
interface Props {
    type?: string
}

export default function Algorithms({ type }: Props): ReactElement {
    const questionRef = useRef<HTMLInputElement>(null)
    const resizeBarRef = useRef<HTMLInputElement>(null)
    let isDragging = false

    const mouseDownHandler = () => {
        isDragging = true
    }
    document.addEventListener('mousemove', function (e) {
        // Don't do anything if dragging flag is false
        if (!isDragging || !questionRef.current) {
            return false
        }
        // bar width is hard coded as 12 px in scss
        let barWidth = 12
        //setting width to the mouse x cord or to a min or max value specified in the css
        var pointerRelativeXpos = e.clientX
        questionRef.current.style.width = pointerRelativeXpos - barWidth + 'px'
    })

    document.addEventListener('mouseup', () => {
        // Turn off dragging flag when user mouse is up
        isDragging = false
    })
    return (
        <div className='form'>
            <Question problem={problems['SimpleAddition']} ref={questionRef} />

            <div className='resizebar' ref={resizeBarRef} onMouseDown={mouseDownHandler}>
                <div className='dots'>
                    {/* spans that get styled to be circles */}
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div className='editor-container'>
                <div style={{ height: '100vh', display: 'grid', gridTemplateRows: '1fr auto' }}>
                    <EditorComponent />
                    <div className='buttons-wrapper'>
                        <button className='testrun-btn'>Run Code</button>
                        <button className='submit-btn' disabled={false}>
                            Submit Code
                        </button>
                    </div>
                </div>
                <CompileView testCases='hej' />
            </div>
        </div>
    )
}
