import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../firebase'
import { cssProblems } from '../css-problems/cssProblems'

const HomePage = () => {
    const cssRef = db.ref('css')
    cssRef.on('value', (snapshot) => {
        const css = snapshot.val()
        console.log(css)
    })
    console.log(cssRef)
    console.log(cssProblems)
    // cssRef.push(cssProblems)
    // console.log(cssRef)

    return (
        <div className='homepage'>
            <div className='herobanner'>
                <h1>LucioCode</h1>
                <div className='buttons'>
                    <Link to='/problems'>
                        <div className='outline-btn'>Algos</div>
                    </Link>
                    <Link to='/css/problems'>
                        <div className='outline-btn'>Css Arena</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HomePage
