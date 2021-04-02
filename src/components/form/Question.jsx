import React from 'react'
import ThumbUpSharpIcon from '@material-ui/icons/ThumbUpSharp'
import FavoriteBorderSharpIcon from '@material-ui/icons/FavoriteBorderSharp'
import ShareSharpIcon from '@material-ui/icons/ShareSharp'
const Question = () => {
    return (
        <div className='question'>
            <div className='header'>
                <div className='title'>1.Two Sum</div>
                <div className='info'>
                    <div className='info-div easy'>Easy</div>
                    <div className='info-div'>
                        <ThumbUpSharpIcon /> 20678
                    </div>
                    <div className='info-div'>
                        <FavoriteBorderSharpIcon />
                        Add to list
                    </div>
                    <div className='info-div'>
                        <ShareSharpIcon />
                        Share
                    </div>
                </div>
            </div>
            <div className='content'>
                <div className='content-subpart'>
                    <div className='bold'>Problem descripsion</div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem harum hic quis cupiditate dolores
                        possimus <span className='variable'>n</span> nobis magnam nihil ab, magni vero eligendi tempora
                        distinctio doloremque? Perspiciatis eum ex odio voluptatem.
                    </p>
                </div>
                <div className='content-subpart'>
                    <div className='bold'>Input format</div>
                    <p>
                        The first line contains number of testcases <span className='variable'>T</span>. The
                        <span className='variable'> 2 x T</span>subsequent lines each describe a test case over
                        <span className='variable'> 2 </span>lines: The first contains <span className='variable'>3 </span>
                        space-separated integers, <span className='variable'>N</span> , <span className='variable'>A</span>,
                        and <span className='variable'>B</span>, respectively. The second contains{' '}
                        <span className='variable'>S</span> (the string Greg wishes to build).
                    </p>
                </div>
                <div className='content-subpart'>
                    <div className='bold'>Constrains</div>
                    <p>
                        <span></span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Question
