import React, { ReactElement } from 'react'
import AlgorithmProblem from '../../types/AlgorithmProblem'
import parse from 'html-react-parser'

interface Props {
    problem: AlgorithmProblem
}

export default function Question({ problem }: Props): ReactElement {
    return (
        <div className='question'>
            {JSON.stringify(problem)}

            <div className='header'>
                <div className='title'>'sas'</div>
                <div className='info'>
                    <div className={`info-div ${'hard'}`}>
                        {/* changing the first letter to uppercase */}
                        {'hard'.charAt(0).toUpperCase() + 'hard'.slice(1)}
                    </div>
                </div>
            </div>
            <div className='content'>
                {problem.inputFormat && (
                    <div className='content-subpart'>
                        <div className='bold'>Input format</div>
                        <p>{parse(problem.inputFormat)}</p>
                    </div>
                )}
                {problem.output && (
                    <div className='content-subpart'>
                        <div className='bold'>Output</div>
                        <p>{parse(problem.output)}</p>
                    </div>
                )}

                {problem.constrains && (
                    <div className='content-subpart'>
                        <div className='bold'>Constrains</div>
                        <div>
                            {problem.constrains.map((constrain) => (
                                <p className='bulletpoint'>{parse(constrain)}</p>
                            ))}
                        </div>
                    </div>
                )}

                {/* do we have testCase? */}
                {problem.sampleCases &&
                    // render it
                    problem.sampleCases.map((sampleCase) => (
                        <>
                            {sampleCase.input && (
                                <div className='content-subpart'>
                                    <div className='bold'>Sample inputs</div>
                                    <div className='inputs'>
                                        {sampleCase.input.map((input) => (
                                            <div>{parse(input.toString())}</div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {sampleCase.output && (
                                <div className='content-subpart'>
                                    <div className='bold'>Sample output</div>
                                    <div className='inputs'>
                                        {sampleCase.output.map((output) => (
                                            <div>{parse(output.toString())}</div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {sampleCase.explanation && (
                                <div className='content-subpart'>
                                    {sampleCase.explanation.text && (
                                        <>
                                            <div className='bold'>Explanation</div>

                                            <p>{parse(sampleCase.explanation.text.toString())}</p>

                                            {sampleCase.explanation.explanationOutput && (
                                                <div className='inputs'>
                                                    {sampleCase.explanation.explanationOutput.map(
                                                        (output) => (
                                                            <div className='short-line-height'>
                                                                {parse(output.toString())}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}
                        </>
                    ))}
            </div>
        </div>
    )
}
