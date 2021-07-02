import React, { useEffect, useState } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { auth, db } from '../../firebase'
import Page404 from '../404page/Page_404'
import Form from '../form/Form'

const ProblemsPage = ({ match }) => {
    const algoRef = db.ref('algorithms')
    const user = auth.currentUser // get user
    const userUID = user?.uid // get user uid
    const [problemsArray, setProblemsArray] = useState(null)

    useEffect(() => {
        algoRef.on('value', (snapshot) => {
            // get all the problems from database
            const problems = snapshot.val()
            let problemsList = []
            for (let id in problems) {
                problemsList.push(problems[id])
            }
            setProblemsArray(problemsList)
        })
    }, [])

    return (
        <>
            <Switch>
                <Route exact path='/algorithms/problems'>
                    <div className='problems'>
                        {problemsArray?.map((problem) => {
                            const submissions = problem.submissions
                            let amountOfSubmissions = 0
                            let amountOfSuccessSubmissions = 0
                            if (submissions) {
                                amountOfSubmissions = Object.keys(submissions).length
                                for (const submission in submissions) {
                                    if (submissions[submission].score !== 0)
                                        amountOfSuccessSubmissions++
                                }
                                if (submissions[userUID]) {
                                    // checking if the user has completed problem or should try again
                                    // both can not be true
                                    var completed = submissions[userUID].score > 0
                                    var tryAgain = submissions[userUID].score === 0
                                }
                            }

                            return (
                                <ProblemCard
                                    key={uuidv4()}
                                    completed={completed}
                                    tryAgain={tryAgain}
                                    diff={problem.difficulty}
                                    name={problem.problemName}
                                    category={problem.category}
                                    amountOfSubmissions={amountOfSubmissions}
                                    amountOfSuccessSubmissions={amountOfSuccessSubmissions}
                                />
                            )
                        })}
                    </div>
                </Route>

                {/* creating routes for all my problems */}
                {problemsArray?.map((problem) => {
                    // turn for example 'Number of letters' into 'NumberOfLetters'
                    let path = problem.problemName
                        ?.split(' ')
                        .filter((word) => word !== '')
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join('')
                    return (
                        <Route key={uuidv4()} exact path={`/algorithms/play/${path}`}>
                            <Form problem={problem} />
                        </Route>
                    )
                })}
                <Route>
                    <Page404 />
                </Route>
            </Switch>
        </>
    )
}

const ProblemCard = ({
    name,
    diff,
    category,
    completed,
    tryAgain,
    amountOfSubmissions,
    amountOfSuccessSubmissions,
}) => {
    // taking the name then making into one word and changing the first letter
    // of each word to uppercase
    let dummy = name
        ?.split(' ')
        .filter((word) => word !== '')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // turning every word into uppercase
        .join('')

    let path = dummy || 'noMatch'

    let successPercentage = ((100 * amountOfSuccessSubmissions) / amountOfSubmissions || 0) + '%'

    return (
        // changing to path to path appended to the currentPath
        <Link to={`/algorithms/play/${path}`}>
            <div className='problemcard'>
                <div className='header'>{name}</div>
                <div className='metadata'>
                    <span>{successPercentage}</span>
                    {completed ? (
                        <span className='completed'>Completed</span>
                    ) : tryAgain ? (
                        <span className='tryAgain'>Try again</span>
                    ) : null}

                    {category && <span>{category}</span>}
                    <div
                        className={
                            diff === 'easy'
                                ? 'difficulty easy'
                                : diff === 'medium'
                                ? 'difficulty medium'
                                : 'difficulty hard'
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
