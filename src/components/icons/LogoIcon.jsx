const LogoIcon = ({ spin, loader }) => {
    let className = 'logo-icon '
    if (spin) className += ' spin '
    if (loader) className += ' loader '
    return (
        <div className={className}>
            <div className='circle-line'></div>
            <div className='circle-line'></div>
            <div className='circle-line'></div>
            <div className='circle-line'></div>
            <div className='circle-line'></div>
        </div>
    )
}

export default LogoIcon
