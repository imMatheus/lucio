import { cssProblems } from '../../css-problems/cssProblems.js'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../firebase'
import { v4 as uuidv4 } from 'uuid'

const CssProblems = () => {
    const cssRef = db.ref('css')
    console.log(db.ref('css'))
    const [cssProblemsArray, setCssProblemsArray] = useState(null)
    let cssId
    useEffect(() => {
        cssRef.on('value', (snapshot) => {
            const css = snapshot.val()
            let cssList = []
            for (let id in css) {
                cssList.push(css[id])
                if (!cssId) cssId = id
            }
            console.log(cssList)
            setCssProblemsArray(cssList)
            // setCssProblems(css[0])
            console.log(cssId)
            console.log(cssProblemsArray)
        })
    }, [])
    // if (cssId) {
    //     const ve = db.ref('css').child(cssId)
    //     ve.on('value', (snapshot) => {
    //         const ver = snapshot.val()
    //         let cssList = []
    //         for (let id in ver) {
    //             cssList.push(ver[id])
    //         }
    //         console.log(cssList)
    //     })
    //     ve.push({ name: 'hehej', age: 9 })
    // }

    // console.log(db.ref('css').child('s'))

    // db.ref().child('css').child('0').set({ test: 'mautu', ter: 699 })

    // cssRef.push(cssProblems)
    // console.log(cssRef)
    return (
        <div className='cssproblems'>
            <div className='container'>
                {cssProblemsArray
                    ? cssProblemsArray.map((problem) => {
                          return (
                              <Problem
                                  key={uuidv4()}
                                  target={problem.target}
                                  image={problem.image}
                                  submissions={problem.submissions.length}
                              />
                          )
                      })
                    : 'hgej'}
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
