// import { cssProblems } from '../../css-problems/cssProblems.js'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../firebase'
import { v4 as uuidv4 } from 'uuid'

const CssProblems = () => {
    const cssRef = db.ref('css')
    const [cssProblems, setCssProblems] = useState(null)
    useEffect(() => {
        cssRef.on('value', (snapshot) => {
            const css = snapshot.val()
            let cssList = []
            for (let id in css) {
                cssList.push(css[id])
            }
            setCssProblems(cssList[0])
            console.log(cssProblems)
        })
    }, [])

    // cssRef.push(cssProblems)
    // console.log(cssRef)
    return (
        <div className='cssproblems'>
            <div className='container'>
                {cssProblems?.map((problem) => {
                    return (
                        <Problem
                            key={uuidv4()}
                            target={problem.target}
                            image={problem.image}
                            submissions={problem.submissions.length}
                        />
                    )
                })}
            </div>
        </div>
    )
}

const Problem = ({ target, image, submissions }) => {
    return (
        <Link exact to={`/css/play/${target}`}>
            <div className='problem' style={{ backgroundImage: `url(${image})` }}>
                <h2>
                    #{target} and {submissions}
                </h2>
            </div>
        </Link>
    )
}

export default CssProblems
