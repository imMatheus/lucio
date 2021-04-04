import React from 'react'
import CloseIcon from '@material-ui/icons/Close'

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
                            <CloseIcon />
                            Sample test case 1
                        </li>
                        <li className='green'>
                            <CloseIcon />
                            Sample test case 2
                        </li>
                    </ul>
                </div>
                <div className='case-content'>f</div>
            </div>
        </div>
    )
}

export default CodeCompileView
