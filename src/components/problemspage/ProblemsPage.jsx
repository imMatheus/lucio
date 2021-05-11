import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../../firebase'

let currentPath = ''

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
    currentPath = match.path
    return (
        <>
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
        <Link to={`${currentPath}/${path}`}>
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
