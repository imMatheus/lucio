import React, { useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'

const CodeCompileView = ({ testcases }) => {
    console.log(testcases)
    const [currentTc, setCurrentTc] = useState(testcases[2])

    // changing the currentTc to the index of the btn that has been clicked
    const changeCompileViewHandler = (e) => {
        setCurrentTc(testcases[e.target.value])
    }

    return (
        <div className='codecompileview'>
            <div className='title red'>Wrong answer :-3 </div>
            <p>3/3 test cases failed</p>
            <div className='compilecases-wrapper'>
                <div className='case-list'>
                    <ul>
                        {testcases.map((cas, index) => {
                            // i use index to keep track of witch index we should show
                            // on the right portion
                            return (
                                <li
                                    value={index}
                                    className={cas.correctAnswer ? 'green' : 'red'}
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
                    <Subpart header='expected output' content={currentTc.expectedOutput} />
                </div>
            </div>
        </div>
    )
}

const Subpart = ({ header, content, complileMsg }) => {
    return (
        <div className='subpart'>
            <h4>{header}</h4>
            <div className='output'>
                {/* 
                checking i fwe have content so we render it else it should be the 
                compile msg so we render that
                */}
                {content ? (
                    content?.map((item) => {
                        return <div>{item}</div>
                    })
                ) : (
                    <div>{complileMsg}</div>
                )}
            </div>
        </div>
    )
}
export default CodeCompileView
