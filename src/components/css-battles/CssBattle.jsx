import React, { useEffect, useState, useRef } from 'react'
import { generateHtmlStarterFile } from './_generateHtmlStarterFile.js'
import { generateCssStarterFile } from './_generateCssStarterFile.js'

import EditorComponent from './EditorComponent'

const CssBattle = ({ problem }) => {
    const cssEditorRef = useRef(null)
    const htmlEditorRef = useRef(null)
    const [cssCode, setCssCode] = useState(generateCssStarterFile())
    const [htmlCode, setHtmlCode] = useState(generateHtmlStarterFile())
    const iframeContainerRef = useRef(null)
    const iframeRef = useRef(null)
    const [isHoveringOverIframe, setIsHoveringOverIframe] = useState(false)
    let characterCount
    let currentCode = '<style>' + cssCode + '</style>' + htmlCode

    // cretaing a the varibel that will keep track of if we
    // are draging the resizer or not
    // and initialing it to false as we are not draging at first
    let isDragingEditorResizer = false
    document.addEventListener('mousemove', function (e) {
        // Don't do anything if we are not dragging
        if (!isDragingEditorResizer) {
            return
        }
        cssEditorRef.current.style.height = Math.max(e.clientY - 163, 40) + 'px'
    })
    document.addEventListener('mouseup', function () {
        // Turn off dragging flag when user mouse is up
        isDragingEditorResizer = false
    })

    let frame = iframeRef?.current?.contentWindow?.document
    useEffect(() => {
        if (frame) {
            // this renders the code to the iframe
            frame.open()
            frame.write(currentCode)
            frame.close()
        }
    }, [frame, currentCode])

    // triming all white space and line breaks from our code
    // then setting it to the 'characterCount' varible that gets displayed
    // in the UI
    characterCount =
        currentCode
            ?.replace(/\n|\r/g, '') // regex is... nice :\
            .split('')
            .filter((word) => word !== ' ').length - 15

    // for the resizing of the iframeContainer when hovering
    const resizeOutputHandler = (e) => {
        // setting the width to its offset
        iframeContainerRef.current.style.width = e.nativeEvent.offsetX + 'px'
    }
    // if we are not hovering over the iframeContainer then we set it back to its og width
    if (!isHoveringOverIframe && iframeRef.current) {
        iframeContainerRef.current.style.width = '100%'
    }

    const copyColorHandler = (e) => {
        // if the user pressed the circle then it will not have any text so we take its parents, the span,
        // and takes its innerText
        if (!e.target.innerText) navigator.clipboard.writeText(e.target.parentElement.innerText)
        // else just take the inner text ofthe span
        else {
            navigator.clipboard.writeText(e.target.innerText)
        }
    }
    return (
        <div className='cssbattle'>
            <div className='editor'>
                <div className='column-header'>
                    Editor <span>{characterCount} characters</span>
                </div>
                <div className='editors-container'>
                    <div className='editor-fraction' ref={cssEditorRef}>
                        <EditorComponent language='css' starterCode={generateCssStarterFile()} setter={setCssCode} />
                    </div>
                    <div className='editor-resizebar' onMouseDown={() => (isDragingEditorResizer = true)}>
                        <div className='dots-container'>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div className='editor-fraction' ref={htmlEditorRef}>
                        <EditorComponent language='html' starterCode={generateHtmlStarterFile()} setter={setHtmlCode} />
                    </div>
                </div>
            </div>
            <div className='column-container'>
                <div className='column-header'>
                    Output <span>Slide show</span>
                </div>
                <div
                    onPointerEnter={() => setIsHoveringOverIframe(true)}
                    onPointerLeave={() => setIsHoveringOverIframe(false)}
                    onPointerMove={resizeOutputHandler}
                    className='img-container output-iframe'
                    style={{ backgroundImage: ` url(${problem.image})` }}
                >
                    {/* needs the scrolling='no' to stop oveflow in the iframe */}
                    <div className='iframe-container' ref={iframeContainerRef}>
                        <iframe title='Web Frame' ref={iframeRef} id='webframeId' scrolling='no'></iframe>
                    </div>
                </div>
            </div>
            <div className='column-container'>
                <div className='column-header'>
                    Target {problem.target}
                    <span>400px x 300px </span>
                </div>
                <div className='img-container' style={{ backgroundImage: ` url(${problem.image})` }}></div>
                <div className='colors-container'>
                    {/* rendering out all of the colors */}
                    {problem.colors.map((color) => {
                        return (
                            <span title='Copie' onClick={copyColorHandler}>
                                <div className='color-circle' style={{ backgroundColor: color }}></div>
                                {color}
                            </span>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CssBattle
