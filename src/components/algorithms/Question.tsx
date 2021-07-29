import React from 'react'
import AlgorithmProblem from '../../types/AlgorithmProblem'
import parse from 'html-react-parser'

interface Props {
    problem: AlgorithmProblem
}

const Question = React.forwardRef<HTMLInputElement, Props>(({ problem }, ref) => {
    return (
        <div className='question' ref={ref}>
            <div className='header'>
                <div className='title'>{problem.problemName}</div>
                <div className='info'>
                    <div className={`info-div ${'hard'}`}>
                        {/* changing the first letter to uppercase */}
                        {'hard'.charAt(0).toUpperCase() + 'hard'.slice(1)}
                    </div>
                </div>
            </div>
            <div className='content'>
                {problem.description && (
                    <div className='content-subpart'>
                        <div className='bold'>Description</div>
                        <p>{parse(problem.description)}</p>
                    </div>
                )}
                {problem.inputFormat && (
                    <div className='content-subpart'>
                        <div className='bold'>Input format</div>
                        <p>{parse(problem.inputFormat)}</p>
                    </div>
                )}
                {problem.inputFormat && (
                    <div className='content-subpart'>
                        <div className='bold'>Input format</div>
                        <p>{parse(problem.inputFormat)}</p>
                    </div>
                )}
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
                            {problem.constrains.map((constrain, index) => (
                                //  TODO change to uuid
                                <p className='bulletpoint' key={index}>
                                    {parse(constrain)}
                                </p>
                            ))}
                        </div>
                    </div>
                )}
                {/* do we have testCase? */}
                {problem.sampleCases &&
                    // render it
                    problem.sampleCases.map((sampleCase, index) => (
                        // TODO change to uuid
                        <div key={index}>
                            {sampleCase.input && (
                                <div className='content-subpart'>
                                    <div className='bold'>Sample inputs</div>
                                    <div className='inputs'>
                                        {sampleCase.input.map((input, index) => (
                                            // TODO change to uid
                                            <div key={index}>{parse(input.input.toString())}</div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {sampleCase.output && (
                                <div className='content-subpart'>
                                    <div className='bold'>Sample output</div>
                                    <div className='inputs'>
                                        {sampleCase.output.map((output, index) => (
                                            <div key={index}>{parse(output.toString())}</div>
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
                                                        (output, index) => (
                                                            <div
                                                                className='short-line-height'
                                                                key={index}
                                                            >
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
                        </div>
                    ))}
            </div>
        </div>
    )
})
export default Question
