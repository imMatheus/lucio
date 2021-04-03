import React, { useRef } from 'react'

const WebFrame = ({ fref, code }) => {
    const frameWindow = useRef(null)
    let frame = frameWindow?.current?.contentWindow?.document
    if (frame) {
        frame.open()
        frame.write(code)
        frame.close()
    }
    return (
        <div className='webframe' ref={fref}>
            <iframe title='Web Frame' id='webframeId' ref={frameWindow}></iframe>
        </div>
    )
}

export default WebFrame
