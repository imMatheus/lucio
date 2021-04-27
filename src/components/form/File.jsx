import React from 'react'

import { ReactComponent as PythonSvg } from '../../icons/python-5.svg'
import { ReactComponent as JavascriptSvg } from '../../icons/logo-javascript.svg'

const File = ({ file, fileName, setFileName }) => {
    // finding the prefix of the file, so .js or .html.
    // so i can put the right icon
    let prefix = file.split('.')

    let Icon
    if (prefix[prefix.length - 1] === 'js') {
        Icon = JavascriptSvg
    } else if (prefix[prefix.length - 1] === 'py') {
        Icon = PythonSvg
    } else if (prefix[prefix.length - 1] === 'css') {
    } else if (prefix[prefix.length - 1] === 'html') {
    }

    return (
        <button className='file-btn' disabled={fileName === file} onClick={() => setFileName(file)}>
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
