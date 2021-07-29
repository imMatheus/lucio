import React, { FC, ReactElement, useEffect, useState, MouseEvent } from 'react'

interface Props {
    testCases: string | Array<CompileTestCase>
}

interface CompileTestCase {
    compileMessage: string
    inputs: string
    userOutput: string
    expectedOutput: string
}

interface SubPartProps {
    header: string
}

function Subpart({ header }: SubPartProps): ReactElement {
    return (
        <div className='subpart'>
            <h4>{header}</h4>
            <div className='output'>
                <div>12</div>
                <div>21</div>
            </div>
        </div>
    )
}

export default function CompileView({ testCases }: Props): ReactElement {
    const [listPointer, setListPointer] = useState(0)
    let correctAnswer = true
    let failedCases = 4

    let title = correctAnswer ? 'Nice job' : 'Wrong answer :('
    const [currentTc, setCurrentTc] = useState<any>(null)
    useEffect(() => {
        setCurrentTc(listPointer)
        console.log('re-render')
    }, [listPointer])

    // changing the currentTc to the index of the btn that has been clicked
    const changeCompileViewHandler = (e: MouseEvent) => {
        setListPointer(1)
    }

    return (
        <div className='compiler-wrapper'>
            <div className='codecompileview'>
                <div className={'title red'}>{'title'}</div>
                <p>{3 + '/' + 4} test cases failed</p>
                <div className='compilecases-wrapper'>
                    <div className='case-list'>
                        <ul>
                            <li value={12} className={''} onClick={changeCompileViewHandler}>
                                '99'
                                {'Sample test case 1'}
                            </li>
                            <li value={12} className={''} onClick={changeCompileViewHandler}>
                                '99'
                                {'Sample test case 1'}
                            </li>
                        </ul>
                    </div>

                    <div className='case-content'>
                        <Subpart header='Compile message' />
                        <Subpart header='Inputs' />
                        <Subpart header='Your output' />
                        <Subpart header='Expected output' />
                    </div>
                </div>
            </div>
        </div>
    )
}
