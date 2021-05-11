import React, { useEffect, useState } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../../firebase'
import Page404 from '../404page/Page_404'
import Form from '../form/Form'

const ProblemsPage = ({ match }) => {
    const cssRef = db.ref('programing')
    const [problemsArray, setProblemsArray] = useState(null)
    // let cssId
    useEffect(() => {
        cssRef.on('value', (snapshot) => {
            const problems = snapshot.val()
            let problemsList = []
            for (let id in problems) {
                problemsList.push(problems[id])
            }
            console.log(problemsList)
            setProblemsArray(problemsList)
        })
    }, [])

    return (
        <>
            <Switch>
                <Route exact path='/algorithms/problems'>
                    <div className='problems'>
                        {problemsArray?.map((problem) => {
                            return (
                                <ProblemCard
                                    key={uuidv4()}
                                    diff={problem.difficulty}
                                    name={problem.problemName}
                                    category={problem.category}
                                />
                            )
                        })}
                    </div>
                </Route>

                {/* creating routes for all my problems */}
                {problemsArray?.map((problem) => {
                    let path = problem.problemName
                        ?.split(' ')
                        .filter((word) => word !== '')
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join('')
                    console.log(problem)
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

const ProblemCard = ({ name, diff, category }) => {
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
        <Link to={`/algorithms/play/${path}`}>
            <div className='problemcard'>
                <div className='header'>{name}</div>
                <div className='metadata'>
                    {/* <span>46%</span>
                    <span>24´339</span>
                    <span>89´076</span> */}
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
