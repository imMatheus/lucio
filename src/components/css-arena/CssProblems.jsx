import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, db } from '../../firebase'
import { v4 as uuidv4 } from 'uuid'

const CssProblems = () => {
    const cssRef = db.ref('css')
    const user = auth.currentUser // get user
    const userUID = user?.uid // get user uid
    const [cssProblemsArray, setCssProblemsArray] = useState(null)
    // let cssId
    useEffect(() => {
        cssRef.once('value', (snapshot) => {
            const css = snapshot.val()
            let cssList = []
            for (let id in css) {
                cssList.push(css[id])
                // if (!cssId) cssId = id
            }
            console.log(cssList)

            setCssProblemsArray(cssList)
        })
        // cssRef.set({ score: 10 })
    }, [])
    // console.log(cssProblemsArray[0])

    return (
        <div className='cssproblems'>
            <div className='container'>
                {cssProblemsArray &&
                    cssProblemsArray.map((problem) => {
                        // console.log(problem)
                        const submissions = problem.submissions
                        if (submissions) {
                            if (submissions[userUID]) {
                                // checking if the user has completed problem or should try again
                                // both can not be true
                                console.log(submissions[userUID])
                                var score = submissions[userUID].score
                                var percentage = submissions[userUID].percentage
                            }
                        }
                        return (
                            <Problem
                                key={uuidv4()}
                                score={score}
                                percentage={percentage}
                                target={problem.target}
                                image={problem.image}
                                submissions={problem.submissions}
                            />
                        )
                    })}
            </div>
        </div>
    )
}

const Problem = ({ target, image, submissions, score, percentage }) => {
    let subs = 0
    if (submissions) {
        subs = Object.keys(submissions).length
    }
    return (
        <Link exact='true' to={`/css/play/${target}`}>
            <div className='problem-wrapper'>
                <div className='problem' style={{ backgroundImage: `url(${image})` }}>
                    <h2>#{target}</h2>
                </div>
                <div className='problem-metadata'>
                    {score && percentage && <span>{`${score} (${percentage}%)`}</span>}
                    <span>{subs}</span>
                </div>
            </div>
        </Link>
    )
}

export default CssProblems
