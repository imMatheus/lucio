import React from 'react'
// import JsSvg from '../../icons/JsSvg.svg'
import { ReactComponent as JsSvg } from '../../icons/jsSvg.svg'
import { ReactComponent as HtmlSvg } from '../../icons/htmlSvg.svg'
import { ReactComponent as CssSvg } from '../../icons/cssSvg.svg'

const File = ({ file, fileName, setFileName }) => {
    // finding the prefix of the file, so .js or .html.
    // so i can put the right icon
    let prefix = file.split('.')
    prefix.shift()
    let Icon
    let IconColor
    if (prefix[0] === 'js') {
        Icon = JsSvg
        IconColor = '#fffb00'
    } else if (prefix[0] === 'css') {
        Icon = CssSvg
        IconColor = '#2382ff'
    } else if (prefix[0] === 'html') {
        Icon = HtmlSvg
        IconColor = '#c04425'
    }

    return (
        <button className='file-btn' disabled={fileName === file} onClick={() => setFileName(file)}>
            <div className='icon'>
                <Icon style={{ fill: IconColor }} />
            </div>
            {file}
        </button>
    )
}

export default File
