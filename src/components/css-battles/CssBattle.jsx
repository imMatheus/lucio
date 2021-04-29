import React, { useEffect, useState, useRef } from 'react'
import * as htmlToImage from 'html-to-image'
import pixelmatch from 'pixelmatch'
import { useLocalStorage } from '../../hooks/useLocalStorage'
// import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image'
import { generateHtmlStarterFile } from './_generateHtmlStarterFile.js'
import { generateCssStarterFile } from './_generateCssStarterFile.js'
import { v4 as uuidv4 } from 'uuid'

import EditorComponent from './EditorComponent'
import { db, auth } from '../../firebase'

const CssBattle = ({ problem }) => {
    const cssEditorRef = useRef(null)
    const htmlEditorRef = useRef(null)
    const canvasRef = useRef(null)
    const [cssCode, setCssCode] = useLocalStorage('cssCode', generateCssStarterFile())
    const [htmlCode, setHtmlCode] = useLocalStorage('htmlCode', generateHtmlStarterFile())
    const iframeContainerRef = useRef(null)
    const iframeRef = useRef(null)
    const solutionRef = useRef(null)
    const ugaRef = useRef(null)
    const [isHoveringOverIframe, setIsHoveringOverIframe] = useState(false)
    const [submissions, setSubmissions] = useState(null)
    const dbRef = db
        .ref()
        .child('css')
        .child(problem.target - 1)
        .child('submissions')
    useEffect(() => {
        dbRef.on('value', (snapshot) => {
            const css = snapshot.val()
            console.log(css)
            setSubmissions(css)
        })
        // dbRef.child('submissions').push({ testing: '45990' })
    }, [])
    let uy = 0
    const addSubmission = () => {
        const user = auth.currentUser
        const userUID = user.uid
        // dbRef.child('testing').set(Math.floor(Math.random() * 30))
        dbRef.child(userUID).child('score').set({ email: user.email, score: 456 })
        // dbRef.child(userUID).once('value', (snapshot) => {
        //     if (snapshot.exists()) {
        //         uy += 1
        //         const userData = snapshot.val()
        //         console.log('exists!', userData)
        //         dbRef.child(userUID).child('score').set(uy)
        //         // .set(Math.floor(Math.random() * 30))
        //     } else {
        //         console.log('did not exist')
        //         dbRef.child(userUID).set({
        //             email: user.email,
        //             score: Math.floor(Math.random() * 30),
        //             userId: userUID,
        //         })
        //     }
        // })
        console.log(auth.currentUser)
        // console.log(userUID)
    }

    // dbRef.child('submissions').push({ testing: 'cool' })
    let characterCount
    let currentCode = '<style>' + cssCode + '</style>' + htmlCode

    // creating a the variable that will keep track of if we
    // are dragging the resizer or not
    // and initialing it to false as we are not dragging at first
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

    // trimming all white space and line breaks from our code
    // then setting it to the 'characterCount' variable that gets displayed
    // in the UI
    characterCount =
        currentCode
            ?.replace(/\s/g, '') // regex is... nice :\
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
        // else just take the inner text of the span
        else {
            navigator.clipboard.writeText(e.target.innerText)
        }
    }

    /*
    @todo fix this 
    */
    const submitClickedHandler = async () => {
        function getBase64Image(img) {
            // Create an empty canvas element
            var canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            var ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0)
            var dataURL = canvas.toDataURL('image/png')

            return dataURL.replace(/^data:image\/(png|jpg);base64,/, '')
        }

        function _base64ToArrayBuffer(base64) {
            var raw = window.atob(base64)
            var rawLength = raw.length
            var array = new Uint8Array(new ArrayBuffer(rawLength))

            for (let i = 0; i < rawLength; i++) {
                array[i] = raw.charCodeAt(i)
            }
            console.log(array)
            return array
            // let e = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))
            // console.log(e)
            // var binary_string = window.atob(base64)
            // console.log(binary_string)
            // var len = binary_string.length
            // var bytes = new Uint8ClampedArray(len)
            // for (var i = 0; i < len; i++) {
            //     bytes[i] = binary_string.charCodeAt(i)
            // }
            // console.log(bytes)
            // return bytes.buffer
        }

        if (!iframeRef.current) return

        const html = iframeRef.current.contentWindow.document.querySelector('html')
        iframeRef.current.contentWindow.margin = '0px'
        iframeRef.current.contentWindow.padding = '0px'
        html.style.margin = '0px'
        html.style.padding = '0px'
        html.style.width = '400px'
        html.style.height = '300px'
        if (!html.style.background) html.style.background = 'blue'
        html.querySelector('body').style.width = '400px'
        html.querySelector('body').style.height = '300px'

        htmlToImage
            .toPng(ugaRef.current)
            .then(function (dataUrl) {
                var img = new Image()
                console.log(dataUrl)
                img.src = dataUrl
                img.width = 400
                img.height = 300
                // getBase64Image(img)
                let x = _base64ToArrayBuffer(getBase64Image(img))
                console.log(x)
                let canvas = canvasRef.current
                let ctx = canvas.getContext('2d')
                ctx.drawImage(img, 0, 0)
                document.body.appendChild(img)
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error)
            })
        // htmlToImage
        //     .toPng(solutionRef.current)
        //     .then(function (dataUrl) {
        //         var img = new Image()
        //         img.src = dataUrl
        //         img.width = 400
        //         img.height = 300
        //         let x = _base64ToArrayBuffer(getBase64Image(img))
        //         console.log(x)
        //         document.body.appendChild(img)
        //     })
        //     .catch(function (error) {
        //         console.error('oops, something went wrong!', error)
        //     })
    }

    return (
        <div className='cssbattle'>
            <div className='editor'>
                <div className='column-header'>
                    Editor <span>{characterCount} characters</span>
                </div>
                <div className='editors-container'>
                    <div className='editor-fraction' ref={cssEditorRef}>
                        <EditorComponent
                            language='css'
                            starterCode={generateCssStarterFile()}
                            setter={setCssCode}
                        />
                    </div>
                    <div
                        className='editor-resizebar'
                        onMouseDown={() => (isDragingEditorResizer = true)}
                    >
                        <div className='dots-container'>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div className='editor-fraction' ref={htmlEditorRef}>
                        <EditorComponent
                            language='html'
                            starterCode={generateHtmlStarterFile()}
                            setter={setHtmlCode}
                        />
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
                    ref={ugaRef}
                >
                    {/* needs the scrolling='no' to stop overflow in the iframe */}
                    <div className='iframe-container' ref={iframeContainerRef}>
                        <iframe title='Web Frame' ref={iframeRef} id='webframeId' scrolling='no'>
                            <p>your browser does not support iframes</p>
                        </iframe>
                        {/* <div className='testing' ref={testRef} scrolling='no'></div> */}
                    </div>
                </div>
                <div className='submit-wrapper'>
                    <div className='submit-btn' onClick={submitClickedHandler}>
                        Submit
                    </div>
                    <div className='submit-btn' onClick={addSubmission}>
                        Add submission
                    </div>
                </div>

                {submissions && JSON.stringify(submissions)}
            </div>
            <div className='column-container'>
                <div className='column-header'>
                    Target {problem.target}
                    <span>400px x 300px </span>
                </div>
                <div
                    className='img-container'
                    ref={solutionRef}
                    style={{
                        backgroundImage: ` url(${problem.image})`,
                        width: '400px',
                        height: '300px',
                    }}
                ></div>
                <div className='colors-container'>
                    {/* rendering out all of the colors */}
                    {problem.colors?.map((color) => {
                        return (
                            <span key={uuidv4()} title='Copie' onClick={copyColorHandler}>
                                <div
                                    className='color-circle'
                                    style={{ backgroundColor: color }}
                                ></div>
                                {color}
                            </span>
                        )
                    })}
                </div>
            </div>
            <canvas
                id='dummyCanvas'
                style={{
                    display: 'none',
                    backgroundColor: 'pink',
                    width: '400px',
                    height: '300px',
                }}
                width='400px'
                height='300px'
                ref={canvasRef}
            ></canvas>
            {/* style={{ display: 'none' }} */}
        </div>
    )
}

export default CssBattle
