import React, { ReactElement, useRef, useState } from 'react'
import EditorComponent from '../editor/Editor'
import Question from '../question/Question'
import { problems } from '../../problems/AlgorithmProblems'
import CompileView from '../compiler/CompileView'
interface Props {
    type?: string
}

export default function Algorithms({ type }: Props): ReactElement {
    const questionRef = useRef<HTMLInputElement>(null)
    const resizeBarRef = useRef<HTMLInputElement>(null)
    const [testCases, setTestCases] = useState<any>([])
    const [fetchingData, setFetchingData] = useState(false)
    const [currentCode, setCurrentCode] = useState('console.log("11")')
    let isDragging = false
    console.log('currentCode:', currentCode)

    const mouseDownHandler = () => (isDragging = true)

    document.addEventListener('mousemove', function (e) {
        // Don't do anything if dragging flag is false
        if (!isDragging || !questionRef.current) {
            return
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

    const runCodeHandler = async (submit?: boolean) => {
        console.log('1000')
        // setCurrentCode(editorRef?.current?.getValue())
        // a sleep function that blocks code from running for 'ms' millisecs
        function sleep(ms: number) {
            return new Promise((resolve) => setTimeout(resolve, ms))
        }
        setFetchingData(true)
        console.log(submit)

        let cases = [
            { input: ['1'], output: ['11'] },
            { input: ['2'], output: ['11'] },
            { input: ['3'], output: ['11'] },
        ]
        let dummyArray: any = []

        for (let i = 0; i < cases.length; i++) {
            const currentCase = cases[i]
            const args: Array<string> = currentCase.input
            const expected: Array<string> = currentCase.output

            // the request that we send to the piston api
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    language: 'javascript',
                    source: `${currentCode}`,
                    stdin: '',
                    args: [],
                }),
            }

            // sending the request
            await fetch('https://emkc.org/api/v1/piston/execute', requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    dummyArray.push({
                        correctAnswer: (data.output + '').trim() === (expected + '').trim(),
                        compileMessage:
                            (data.output + '').trim() === (expected + '').trim()
                                ? 'Right answer'
                                : 'Wrong answer',
                        inputs: args,
                        userOutput: [data.output],
                        expectedOutput: expected,
                        caseName: i,
                    })
                })

            // sleeping for 530ms cuz the api only allows 2 reqs per sec, and 530 just to be on the safe side
            await sleep(530)
        }

        setTestCases(dummyArray)
        setFetchingData(false)
        console.log(dummyArray)

        return dummyArray
    }
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
                <div
                    style={{
                        // height: 'calc(100vh - 94px)',
                        display: 'grid',
                        gridTemplateRows: '1fr auto',
                    }}
                >
                    <EditorComponent setCurrentCode={setCurrentCode} />
                    <div className='buttons-wrapper'>
                        <button className='testrun-btn' onClick={() => runCodeHandler()}>
                            Run Code
                        </button>
                        <button className='submit-btn' disabled={false}>
                            Submit Code
                        </button>
                    </div>
                </div>
                {testCases.length > 0 && <CompileView testCases={testCases} />}
            </div>
        </div>
    )
}
