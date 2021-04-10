const LogoIcon = ({ spinn }) => {
    return (
        <div className={spinn ? 'logo-icon spinn' : 'logo-icon'}>
            <div className='circle-line'></div>
            <div className='circle-line'></div>
            <div className='circle-line'></div>
            <div className='circle-line'></div>
            <div className='circle-line'></div>
        </div>
    )
}

export default LogoIcon
