const LogoIcon = ({ spinn, loader }) => {
    let classname = 'logo-icon '
    if (spinn) classname += ' spinn '
    if (loader) classname += ' loader '
    // if(loader) classname += ' '
    return (
        <div className={classname}>
            <div className='circle-line'></div>
            <div className='circle-line'></div>
            <div className='circle-line'></div>
            <div className='circle-line'></div>
            <div className='circle-line'></div>
        </div>
    )
}

export default LogoIcon
