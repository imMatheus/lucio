import React from 'react'
import { Link } from 'react-router-dom'
let currentPath = ''

const ProblemsPage = ({ match }) => {
    currentPath = match.path
    console.log(match)
    return (
        <>
            <div className='problems'>
                <ProblemCard diff='easy' name=' cool' />
                <ProblemCard diff='easy' name='marre är cool' />
                <ProblemCard diff='medium' name=' uga buga luga huga' />
                <ProblemCard diff='hard' />

                <ProblemCard diff='medium' name=' uga buga luga huga' />
                <ProblemCard diff='hard' />
                <ProblemCard diff='easy' name=' cool' />
                <ProblemCard diff='easy' name='marre är cool' />
                <ProblemCard diff='medium' name=' uga buga luga huga' />
                <ProblemCard diff='hard' />

                <ProblemCard diff='easy' name='marre är cool' />
                <ProblemCard diff='medium' name=' uga buga luga huga' />
                <ProblemCard diff='hard' />
                <ProblemCard diff='easy' name=' cool' />
                <ProblemCard diff='easy' name='marre är cool' />
                <ProblemCard diff='medium' name=' uga buga luga huga' />
                <ProblemCard diff='hard' />
                <ProblemCard diff='easy' name=' cool' />
                <ProblemCard diff='easy' name='marre är cool' />
                <ProblemCard diff='medium' name=' uga buga luga huga' />
                <ProblemCard diff='hard' />
                <ProblemCard diff='easy' name=' cool' />
                <ProblemCard diff='easy' name='marre är cool' />
                <ProblemCard diff='medium' name=' uga buga luga huga' />
                <ProblemCard diff='hard' />
            </div>
        </>
    )
}

const ProblemCard = ({ name, diff }) => {
    // taking the name then making into one word and changing the first letter
    // of each word to uppercase
    let dummy = name
        ?.split(' ')
        .filter((word) => word !== '')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')

    let path = dummy || 'noMatch'
    return (
        // changing to path to path appended to the currentPath
        <Link to={`${currentPath}/${path}`}>
            <div className='problemcard'>
                <div className='header'>{name ? name : 'Two Sum'}</div>
                <div className='metadata'>
                    <span>46%</span>
                    <span>24´339</span>
                    <span>89´076</span>
                    <div
                        className={
                            diff === 'easy' ? 'difficulty easy' : diff === 'medium' ? 'difficulty medium' : 'difficulty hard'
                        }
                    >
                        {diff}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProblemsPage
