import React, { useEffect, useState, useRef } from 'react'
import * as htmlToImage from 'html-to-image'
import { generateHtmlStarterFile } from './_generateHtmlStarterFile.js'
import { generateCssStarterFile } from './_generateCssStarterFile.js'
import { v4 as uuidv4 } from 'uuid'
import html2canvas from 'html2canvas'
import EditorComponent from './EditorComponent'
import { db, auth } from '../../firebase'
import Pixelmatch from 'pixelmatch'
import useSessionStorage from '../../hooks/useSessionStorage'

const CssArena = ({ problem }) => {
    const cssEditorRef = useRef(null)
    const htmlEditorRef = useRef(null)
    const [cssCode, setCssCode] = useSessionStorage(
        `${problem.target}-cssCode`,
        generateCssStarterFile()
    )
    const [htmlCode, setHtmlCode] = useSessionStorage(
        `${problem.target}-htmlCode`,
        generateHtmlStarterFile()
    )
    const iframeContainerRef = useRef(null)
    const iframeRef = useRef(null)
    const solutionRef = useRef(null)
    const outputContainerRef = useRef(null)
    const [isHoveringOverIframe, setIsHoveringOverIframe] = useState(false)
    const [loading, setLoading] = useState(false)
    let currentCode = '<style>' + cssCode + '</style>' + htmlCode
    const [highScore, setHighScore] = useState({ score: 0, percentage: 0, characters: 0 })
    const [lastScore, setLastScore] = useSessionStorage(`${problem.target}-lastScore`, {
        score: 0,
        percentage: 0,
        characters: 0,
    })
    const dbSubmissionsRef = db
        .ref()
        .child('css')
        .child(problem.target - 1)
        .child('submissions')

    useEffect(() => {
        const user = auth.currentUser // get user
        if (!user) return // return if we don't have a user

        const userUID = user.uid // get UID for the user

        dbSubmissionsRef.child(userUID).once('value', (snapshot) => {
            const userData = snapshot.val()
            console.log('exists!', userData)
            if (userData) {
                // check if the user has a submission
                setHighScore({
                    score: userData.score,
                    percentage: userData.percentage,
                    characters: userData.characters,
                    cssCode: userData.cssCode,
                    htmlCode: userData.htmlCode,
                })
            }
        })
    }, [])

    // dbSubmissionsRef.child('submissions').push({ testing: 'cool' })
    let characterCount

    // creating a the variable that will keep track of if we
    // are dragging the resizer or not
    // and initialing it to false as we are not dragging at first
    let isDraggingEditorResizer = false
    document.addEventListener('mousemove', function (e) {
        // Don't do anything if we are not dragging
        if (!isDraggingEditorResizer) {
            return
        }
        cssEditorRef.current.style.height = Math.max(e.clientY - 163, 40) + 'px'
    })
    document.addEventListener('mouseup', function () {
        // Turn off dragging flag when user mouse is up
        isDraggingEditorResizer = false
    })

    let frame = iframeRef?.current?.contentWindow?.document
    useEffect(() => {
        if (frame) {
            // this renders the code to the iframe
            frame.open()
            frame.write('<style>' + cssCode + '</style>' + htmlCode)
            frame.close()
        }
    }, [frame, cssCode, htmlCode])

    // trimming all white space and line breaks from our code
    // then setting it to the 'characterCount' variable that gets displayed
    // in the UI
    characterCount =
        currentCode
            ?.replace(/\s/g, '') // regex is... nice :\
            .split('')
            .filter((word) => word !== ' ').length - 15 // -15 cuz i had the style tags and it is 15 characters long

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

    const getScore = (charCount, per) => {
        // const PER_MODIFIER = 1
        const PER_MODIFIER = 0.16
        const changeFactor = (per / 100) ** 2
        per = 600 * changeFactor * (per / 100)
        const scoreAddOn = Math.max(changeFactor * PER_MODIFIER * (650 - charCount), 0)
        const score = per + scoreAddOn
        return Math.round(score * 100) / 100 // round down to two decimal
    }
    const compareIframeAndImage = async () => {
        if (!iframeRef.current) return

        const html = iframeRef.current.contentWindow.document.querySelector('html')

        html.style.width = '400px'
        html.style.height = '300px'
        html.style.display = 'block'
        html.style.overflow = 'hidden'

        var img1
        await html2canvas(html).then(async function (canvas) {
            canvas.style.width = '400px'
            canvas.style.height = '300px'
            var target = new Image()
            target.width = '400'
            // target.intrinsicsize = '400 x 300'
            target.height = '300'
            target.style.width = '400px'
            target.style.height = '300px'
            target.src = canvas.toDataURL()
            const childNodes = outputContainerRef.current.childNodes
            while (childNodes.length > 1) {
                // removing previous nodes
                outputContainerRef.current.removeChild(childNodes[1])
            }
            outputContainerRef.current.appendChild(target)
            await htmlToImage.toPixelData(target).then(function (pixels) {
                img1 = pixels
            })
        })

        var img2
        await htmlToImage.toPixelData(solutionRef.current).then(function (pixels) {
            img2 = pixels
            console.log(pixels)
        })

        const width = 400
        const height = 300
        let diff = Pixelmatch(img1, img2, null, width, height, {
            threshold: 0.02,
            /* options */
        })
        let characters = characterCount
        let percentage = 100 * (1 - diff / (width * height))
        let score = getScore(characters, percentage)
        percentage = Math.round(percentage * 100) / 100 // rounding percentage to two decimal
        return { score, percentage, characters }
    }
    const submitClickedHandler = async () => {
        const user = auth.currentUser
        if (!user) return //  @todo prompt the user to login if they are not
        setLoading(true)

        let { score, percentage, characters } = await compareIframeAndImage()

        setLastScore({ score: score, percentage: percentage, characters: characters })

        const userUID = user.uid

        if (score > highScore.score) {
            setHighScore({ score: score, percentage: percentage, characters: characters })
            // update database if user gets new high score
            dbSubmissionsRef.child(userUID).set({
                email: user.email,
                score: score,
                percentage: percentage,
                characters: characters,
                userId: userUID,
                cssCode: cssCode,
                htmlCode: htmlCode,
            })
        }
        console.log(auth.currentUser)

        setLoading(false)
    }

    const loadHighScoreCode = () => {
        setLoading(true)
        const user = auth.currentUser
        const userUID = user.uid
        const dbRef = dbSubmissionsRef.child(userUID)
        dbRef
            .get()
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const response = snapshot.val()
                    console.log(response)
                    setCssCode(response.cssCode)
                    setHtmlCode(response.htmlCode)
                }
            })
            .catch((error) => {
                console.error(error)
            })
        setLoading(false)
    }

    return (
        <div className='cssarena'>
            <div className='editor'>
                <div className='column-header'>
                    Editor <span>{characterCount} characters</span>
                </div>
                <div className='editors-container'>
                    <div className='editor-fraction' ref={cssEditorRef}>
                        <EditorComponent language='css' starterCode={cssCode} setter={setCssCode} />
                    </div>
                    <div
                        className='editor-resizebar'
                        onMouseDown={() => (isDraggingEditorResizer = true)}
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
                            starterCode={htmlCode}
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
                    ref={outputContainerRef}
                >
                    <div className='iframe-container' ref={iframeContainerRef}>
                        {/* needs the scrolling='no' to stop overflow in the iframe */}
                        <iframe title='Web Frame' ref={iframeRef} id='webframeId' scrolling='no'>
                            <p>your browser does not support iframes</p>
                        </iframe>
                    </div>
                </div>
                <div className='submit-wrapper'>
                    <button
                        className='submit-btn'
                        // disabled={true}
                        disabled={loading}
                        onClick={submitClickedHandler}
                    >
                        Submit <span></span>
                    </button>
                    <button className='submit-btn' onClick={loadHighScoreCode}>
                        Load HS Code<span></span>
                    </button>
                </div>
                <div className='userScoreBoard-wrapper'>
                    <div className='scoreBoard-row'>
                        Last Score:{' '}
                        <span>
                            {lastScore.score} ({lastScore.percentage}%)
                        </span>
                    </div>
                    <div className='scoreBoard-row'>
                        High Score:{' '}
                        <span>
                            {highScore.score ? highScore.score : 0} (
                            {highScore.percentage === 100
                                ? `${highScore.characters} characters`
                                : `${highScore.percentage}%`}
                            )
                        </span>
                    </div>
                </div>

                {/* {submissions && JSON.stringify(submissions)} */}
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
        </div>
    )
}

export default CssArena
