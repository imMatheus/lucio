import React from 'react'
import ThumbUpSharpIcon from '@material-ui/icons/ThumbUpSharp'
import FavoriteBorderSharpIcon from '@material-ui/icons/FavoriteBorderSharp'
import ShareSharpIcon from '@material-ui/icons/ShareSharp'
import { v4 as uuidv4 } from 'uuid'
import ReactHtmlParser from 'react-html-parser'

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
                            {console.log(description)}
                            <p>{ReactHtmlParser(description)}</p>
                        </>
                    </div>
                )}
                {inputFormat && (
                    <div className='content-subpart'>
                        <>
                            <div className='bold'>Input format</div>
                            <p>
                                {' '}
                                <p>{ReactHtmlParser(inputFormat)}</p>
                            </p>
                        </>
                        {/* <div className='bold'>Input format</div>
                    <p>
                    The first line contains number of testcases <span className='variable'>T</span>. The
                    <span className='variable'>2*T</span>subsequent lines each describe a test case over
                    <span className='variable'>2</span>lines: The first contains <span className='variable'>3</span>
                    space-separated integers, <span className='variable'>N</span> , <span className='variable'>A</span>,
                    and <span className='variable'>B</span>, respectively. The second contains{' '}
                    <span className='variable'>S</span> (the string Greg wishes to build).
                </p> */}
                    </div>
                )}

                {constrains && (
                    <div className='content-subpart'>
                        <>
                            <div className='bold'>Constrains</div>
                            <div>
                                {constrains.map((constrain) => (
                                    <p key={uuidv4()} className='bulletpoint'>
                                        <p>{ReactHtmlParser(constrain)}</p>
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
                                                <div key={uuidv4()}>{input.toString()}</div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {testCase.output && (
                                    <div key={uuidv4()} className='content-subpart'>
                                        <div className='bold'>Sample output</div>
                                        <div className='inputs'>
                                            {testCase.output.map((output) => (
                                                <div key={uuidv4()}>{output.toString()}</div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {testCase.explanation && (
                                    <div className='content-subpart'>
                                        <div className='bold'>Explanations</div>
                                        <p>{testCase.explanation.toString()}</p>
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

                {/* <div className='content-subpart'>
                    <div className='bold'>Sample inputs</div>
                    <div className='inputs'>
                        <div>9</div>
                        <div>LucioCode</div>
                    </div>
                </div>
                <div className='content-subpart'>
                    <div className='bold'>Sample output</div>
                    <div className='inputs'>
                        <div>3</div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Question
