import { v4 as uuidv4 } from 'uuid'
import parse from 'html-react-parser'

const Question = ({ problem, questionRef }) => {
    const description = problem?.problemDescription
    const constrains = problem?.constrains
    const difficulty = problem?.difficulty
    const problemName = problem?.problemName
    const inputFormat = problem?.inputFormat
    const testCases = problem?.sampleCases
    const output = problem?.output

    return (
        <div className='question' ref={questionRef}>
            <div className='header'>
                {problemName && <div className='title'>{problemName}Hej</div>}
                <div className='info'>
                    {difficulty && (
                        <div className={`info-div ${difficulty}`}>
                            {/* changing the first letter to uppercase */}
                            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                        </div>
                    )}
                </div>
            </div>
            <div className='content'>
                <div className='content-subpart'>
                    <div className='bold'>Problem description</div>
                    <p> this is a problem</p>
                </div>
                {description && (
                    <div className='content-subpart'>
                        <div className='bold'>Problem description</div>
                        <p>{parse(description)} this is a problem</p>
                    </div>
                )}
                {inputFormat && (
                    <div className='content-subpart'>
                        <div className='bold'>Input format</div>
                        <p>{parse(inputFormat)}</p>
                    </div>
                )}
                {output && (
                    <div className='content-subpart'>
                        <div className='bold'>Output</div>
                        <p>{parse(output)}</p>
                    </div>
                )}

                {constrains && (
                    <div className='content-subpart'>
                        <div className='bold'>Constrains</div>
                        <div>
                            {constrains.map((constrain) => (
                                <p key={uuidv4()} className='bulletpoint'>
                                    {parse(constrain)}
                                </p>
                            ))}
                        </div>
                    </div>
                )}

                {/* do we have testCase? */}
                {testCases &&
                    // render it
                    testCases.map((testCase) => (
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
                                                    {testCase.explanation.explanationOutput.map(
                                                        (output) => (
                                                            <div
                                                                className='short-line-height'
                                                                key={uuidv4()}
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
                        </>
                    ))}
            </div>
        </div>
    )
}

export default Question
