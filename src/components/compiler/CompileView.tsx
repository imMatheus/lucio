import React, { ReactElement, useEffect, useState, MouseEvent } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'
import { v4 as uuidv4 } from 'uuid'
interface Props {
    testCases: Array<CompileTestCase>
}

interface CompileTestCase {
    compileMessage: string
    inputs: Array<string>
    userOutput: Array<string>
    expectedOutput: Array<string>
    correctAnswer: boolean
}

interface SubPartProps {
    header: string
    content?: string[]
    compileMessage?: string
}

function Subpart({ header, content, compileMessage }: SubPartProps): ReactElement {
    console.log(content)

    return (
        <div className='subpart'>
            <h4>{header}</h4>
            <div className='output'>
                {/* 
                checking if we have content so we render it else it should be the 
                compile msg so we render that
                */}
                {content && content.length > 0 ? (
                    content?.map((item) => {
                        return <div key={uuidv4()}>{item}</div>
                    })
                ) : (
                    <>
                        <div>{compileMessage}</div>
                        <div>{content}</div>
                    </>
                )}
            </div>
        </div>
    )
}

export default function CompileView({ testCases }: Props): ReactElement {
    const [listPointer, setListPointer] = useState(0)
    const [currentTestCase, setCurrentTestCase] = useState(testCases[listPointer])
    let correctAnswer = true
    let succeededCases = testCases.length

    // looping thru the tescases and cheking if one of the cases were incorrect
    testCases?.forEach((element) => {
        if (element.correctAnswer === false) {
            correctAnswer = false
            return
        } else {
            succeededCases--
        }
    })
    console.log('ppppp')

    console.log(testCases)

    let title = correctAnswer ? 'Nice job' : 'Wrong answer :('
    const [currentTc, setCurrentTc] = useState<any>(null)
    useEffect(() => {
        setCurrentTc(listPointer)
        console.log('re-render')
    }, [listPointer])

    // changing the currentTc to the index of the btn that has been clicked
    const changeCompileViewHandler = (index: number) => {
        setListPointer(index)
    }

    return (
        <div className='compiler-wrapper'>
            <div className='codecompileview'>
                <div className={'title red'}>{'title'}</div>
                <p>{succeededCases + '/' + testCases.length} test cases succeeded</p>
                <div className='compilecases-wrapper'>
                    <div className='case-list'>
                        <ul>
                            {testCases?.map((item, index) => {
                                console.log(item)

                                // I use index to keep track of witch index we should show
                                // on the right portion
                                let color = item.correctAnswer ? 'green' : 'red'
                                let highlight = index === listPointer ? 'highlight' : ''
                                return (
                                    <li
                                        key={index}
                                        className={color + ' ' + highlight}
                                        onClick={() => changeCompileViewHandler(index)}
                                    >
                                        {item.correctAnswer ? <CheckIcon /> : <CloseIcon />}
                                        {'Sample test case ' + index}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    <div className='case-content'>
                        <Subpart
                            key={uuidv4()}
                            header='Compile msg'
                            compileMessage={currentTestCase.compileMessage}
                        />
                        <Subpart key={uuidv4()} header='Inputs' content={currentTestCase.inputs} />
                        <Subpart
                            key={uuidv4()}
                            header='Your output'
                            content={currentTestCase.userOutput}
                        />
                        <Subpart
                            key={uuidv4()}
                            header='expected output'
                            content={currentTestCase.expectedOutput}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
