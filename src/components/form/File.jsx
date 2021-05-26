import React from 'react'

import { ReactComponent as PythonSvg } from '../../icons/python-5.svg'
import { ReactComponent as JavascriptSvg } from '../../icons/logo-javascript.svg'

const File = ({ file, fileName, setFileName, setLanguage }) => {
    // finding the prefix of the file, so .js or .html.
    // so i can put the right icon
    let prefix = file.split('.')

    let Icon
    if (prefix[prefix.length - 1] === 'js') {
        Icon = JavascriptSvg
    } else if (prefix[prefix.length - 1] === 'py') {
        Icon = PythonSvg
    }
    const changeLanguageHandler = () => {
        setFileName(file)

        if (prefix[prefix.length - 1] === 'js') {
            setLanguage('javascript')
        } else if (prefix[prefix.length - 1] === 'py') {
            setLanguage('python')
        }
    }

    return (
        <button className='file-btn' disabled={fileName === file} onClick={changeLanguageHandler}>
            {Icon && (
                <div className='icon'>
                    <Icon />
                </div>
            )}
            {file}
        </button>
    )
}

export default File
