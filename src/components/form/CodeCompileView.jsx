import React, { useEffect, useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'
import { v4 as uuidv4 } from 'uuid'
import LogoIcon from '../LogoIcon'

const CodeCompileView = ({ testcases, fetchingData }) => {
    const [listPointer, setListPointer] = useState(0)
    let correctAnswer = true
    let failedCases = testcases.length

    // looping thru the tescases and cheking if one of the cases were incorrect
    testcases?.forEach((element) => {
        if (element.correctAnswer === false) {
            correctAnswer = false
            return
        } else {
            failedCases--
        }
    })
    let title = correctAnswer ? 'Nice job' : 'Wrong answer :('
    const [currentTc, setCurrentTc] = useState(testcases[listPointer])
    useEffect(() => {
        setCurrentTc(testcases[listPointer])
    }, [testcases, listPointer, fetchingData])

    // changing the currentTc to the index of the btn that has been clicked
    const changeCompileViewHandler = (e) => {
        setListPointer(e.target.value)
    }

    return (
        <>
            <div className='CodeCompileView-wrapper'>
                {fetchingData ? (
                    <div className='loadingspinner-wrapper-for-codecompile'>
                        <LogoIcon spinn={true} loader={true} />
                    </div>
                ) : (
                    testcases.length > 0 && (
                        <div className='codecompileview'>
                            <div className={correctAnswer ? 'title green' : 'title red'}>{title}</div>
                            <p>{failedCases + '/' + testcases.length} test cases failed</p>
                            <div className='compilecases-wrapper'>
                                <div className='case-list'>
                                    <ul>
                                        {testcases?.map((cas, index) => {
                                            // I use index to keep track of witch index we should show
                                            // on the right portion
                                            let color = cas.correctAnswer ? 'green' : 'red'
                                            let highlight = index === listPointer ? 'highlight' : ''
                                            return (
                                                <li
                                                    key={uuidv4()}
                                                    value={index}
                                                    className={color + ' ' + highlight}
                                                    onClick={changeCompileViewHandler}
                                                >
                                                    {cas.correctAnswer ? <CheckIcon /> : <CloseIcon />}
                                                    {'Sample test case ' + cas.caseName}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>

                                <div className='case-content'>
                                    <Subpart key={uuidv4()} header='Compile msg' complileMsg={currentTc?.compileMessage} />
                                    <Subpart key={uuidv4()} header='Inputs' content={currentTc?.inputs} />
                                    <Subpart key={uuidv4()} header='Your output' content={currentTc?.userOutput} />
                                    <Subpart key={uuidv4()} header='expected output' content={currentTc?.expectedOutput} />
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </>
    )
}

const Subpart = ({ header, content, complileMsg }) => {
    return (
        <div className='subpart'>
            <h4>{header}</h4>
            <div className='output'>
                {/* 
                checking if we have content so we render it else it should be the 
                compile msg so we render that
                */}
                {content ? (
                    content?.map((item) => {
                        return <div key={uuidv4()}>{item}</div>
                    })
                ) : (
                    <div>{complileMsg}</div>
                )}
            </div>
        </div>
    )
}
export default CodeCompileView
