import React, { useEffect, useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'
import LoadingSpinner from '../LoadingSpinner'

const CodeCompileView = ({ testcases, fetchingData }) => {
    // let listPointer = 0
    const [listPointer, setListPointer] = useState(0)
    let correctAnswer = true
    let failedCases = testcases.length
    // console.log(testcases)

    testcases?.forEach((element) => {
        if (element.correctAnswer === false) {
            correctAnswer = false
            return
        } else {
            failedCases--
        }
    })
    let title = correctAnswer ? 'Noice job' : 'Wrong answer :('
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
                        <LoadingSpinner />
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
                                            // i use index to keep track of witch index we should show
                                            // on the right portion
                                            let color = cas.correctAnswer ? 'green' : 'red'
                                            let highlight = index === listPointer ? 'highlight' : ''
                                            return (
                                                <li
                                                    key={index}
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
                                    <Subpart header='Compile msg' complileMsg={currentTc?.compileMessage} />
                                    <Subpart header='Inputs' content={currentTc?.inputs} />
                                    <Subpart header='Your output' content={currentTc?.userOutput} />
                                    <Subpart header='expected output' content={currentTc?.expectedOutput} />
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
        <div key={Math.floor(Math.random() * 999999)} className='subpart'>
            <h4>{header}</h4>
            <div className='output'>
                {/* 
                checking i fwe have content so we render it else it should be the 
                compile msg so we render that
                */}
                {content ? (
                    content?.map((item) => {
                        return <div key={Math.floor(Math.random() * 9999999)}>{item}</div>
                    })
                ) : (
                    <div>{complileMsg}</div>
                )}
            </div>
        </div>
    )
}
export default CodeCompileView
