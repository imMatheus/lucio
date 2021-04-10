import React from 'react'
import ThumbUpSharpIcon from '@material-ui/icons/ThumbUpSharp'
import FavoriteBorderSharpIcon from '@material-ui/icons/FavoriteBorderSharp'
import ShareSharpIcon from '@material-ui/icons/ShareSharp'
import { v4 as uuidv4 } from 'uuid'
import parse, { domToReact } from 'html-react-parser'

const Question = ({ qref, problem }) => {
    let description = problem.problemDescription
    let constrains = problem.constrains
    let difficulty = problem.difficulty
    let problemName = problem.problemName
    let inputFormat = problem.inputFormat
    let testCases = problem.sampleCases
    // console.log(testCases)

    return (
        <div className='question' ref={qref}>
            <div className='header'>
                {problemName && <div className='title'>{problemName}</div>}
                <div className='info'>
                    {difficulty && <div className='info-div easy'>{difficulty}</div>}
                    <div className='info-div'>
                        <ThumbUpSharpIcon /> 20678
                    </div>
                    <div className='info-div'>
                        <FavoriteBorderSharpIcon />
                        Add to list
                    </div>
                    <div className='info-div'>
                        <ShareSharpIcon />
                        Share
                    </div>
                </div>
            </div>
            <div className='content'>
                {description && (
                    <div className='content-subpart'>
                        <>
                            <div className='bold'>Problem descripsion</div>
                            <p>{parse(description)}</p>
                        </>
                    </div>
                )}
                {inputFormat && (
                    <div className='content-subpart'>
                        <>
                            <div className='bold'>Input format</div>
                            <p>{parse(inputFormat)}</p>
                        </>
                    </div>
                )}

                {constrains && (
                    <div className='content-subpart'>
                        <>
                            <div className='bold'>Constrains</div>
                            <div>
                                {constrains.map((constrain) => (
                                    <p key={uuidv4()} className='bulletpoint'>
                                        {parse(constrain)}
                                    </p>
                                ))}
                            </div>
                        </>
                    </div>
                )}

                {/* do we have testCase? */}
                {testCases &&
                    // render it
                    testCases.map(
                        (testCase) => (
                            <>
                                {testCase.input && (
                                    <div key={uuidv4()} className='content-subpart'>
                                        <div className='bold'>Sample inputs</div>
                                        <div className='inputs'>
                                            {testCase.input.map((input) => (
                                                <div key={uuidv4()}>{parse(input.toString())}</div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {testCase.output && (
                                    <div key={uuidv4()} className='content-subpart'>
                                        <div className='bold'>Sample output</div>
                                        <div className='inputs'>
                                            {testCase.output.map((output) => (
                                                <div key={uuidv4()}>{parse(output.toString())}</div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {testCase.explanation && (
                                    <div className='content-subpart'>
                                        {testCase.explanation.text && (
                                            <>
                                                <div className='bold'>Explanation</div>

                                                <p>{parse(testCase.explanation.text.toString())}</p>

                                                {testCase.explanation.explanationOutput && (
                                                    <div className='inputs'>
                                                        {testCase.explanation.explanationOutput.map((output) => (
                                                            <div className='short-line-height' key={uuidv4()}>
                                                                {parse(output.toString())}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                )}
                            </>
                        )
                        // do we have an input for it?
                        // testCase.input && (
                        //     // render it

                        //     <div className='content-subpart'>
                        //         <div className='bold'>hallo inputs</div>
                        //         <div className='inputs'>
                        //             {console.log(testCase.input)}
                        //             {testCase.input.map((input) => (
                        //                 <div>{input}</div>
                        //             ))}
                        //         </div>
                        //     </div>
                        // )
                    )}
            </div>
        </div>
    )
}

export default Question
