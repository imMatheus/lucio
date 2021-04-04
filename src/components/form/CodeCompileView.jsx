import React from 'react'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'

const CodeCompileView = () => {
    return (
        <div className='codecompileview'>
            <div className='title red'>Wrong answer :-3 </div>
            <p>3/3 test cases failed</p>
            <div className='compilecases-wrapper'>
                <div className='case-list'>
                    <ul>
                        <li className='red'>
                            <CloseIcon />
                            Sample test case 0
                        </li>
                        <li className='green'>
                            <CheckIcon />
                            Sample test case 1
                        </li>
                        <li className='green'>
                            <CheckIcon />
                            Sample test case 2
                        </li>
                        <li className='red'>
                            <CloseIcon />
                            Sample test case 3
                        </li>
                        <li className='green'>
                            <CheckIcon />
                            Sample test case 4
                        </li>
                    </ul>
                </div>
                <div className='case-content'>
                    <div className='subpart'>
                        <h4>Compile msg</h4>
                        <div className='output'>
                            <div>Wrong answer</div>
                        </div>
                    </div>

                    <div className='subpart'>
                        <h4>Input</h4>
                        <div className='output'>
                            <div>9</div>
                            <div>9000</div>
                            <div>9122</div>
                        </div>
                    </div>

                    <div className='subpart'>
                        <h4>Your output</h4>
                        <div className='output'>
                            <div>9</div>
                            <div>9000</div>
                            <div>9122</div>
                        </div>
                    </div>

                    <div className='subpart'>
                        <h4>Expected Output</h4>
                        <div className='output'>
                            <div>9</div>
                            <div>9000</div>
                            <div>9122</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodeCompileView
