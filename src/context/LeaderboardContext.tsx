import React, { createContext, useContext, useState, useEffect } from 'react'
import { fs, db } from '../firebase'
import { useAuth } from './AuthContext'
import Leaderboard from '../types/Leaderboard'
const LeaderboardContext = createContext<any[]>([])

/**
 * @returns leaderboardContext - the leaderboard
 */
export function useLeaderboard() {
    return useContext(LeaderboardContext)
}

// quickSort algorithm
function quickSortBasic(array: any[]): any[] {
    if (array.length < 2) {
        return array
    }

    var pivot = array[0]
    var lesserArray = []
    var greaterArray = []

    for (var i = 1; i < array.length; i++) {
        if (array[i].score < pivot.score) {
            greaterArray.push(array[i])
        } else {
            lesserArray.push(array[i])
        }
    }

    return quickSortBasic(lesserArray).concat(pivot, quickSortBasic(greaterArray))
}

export const LeaderboardProvider: React.FC = ({ children }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { currentUser }: any = useAuth()
    console.log(currentUser)

    const [leaderboard, setLeaderboard] = useState<Leaderboard[] | any[]>([])
    const [loading, setLoading] = useState<Boolean>(true)
    console.log(leaderboard)

    // this is the ejac-3000
    useEffect(() => {
        setLoading(true)
        // subscribe to the db so we can update the leaderboard when the db gets updated
        db.ref().on('value', async (snapshot) => {
            console.log('--- reload ---')
            let problems = await snapshot.val()
            const cssProblems = problems.css
            const algorithmsProblems = problems.algorithms
            let leaderBoardObj: any = {} // used to sweep thru the submissions and store all the users submissions

            for (const problem in algorithmsProblems) {
                console.log('----algo----')
                console.log(problem)
                console.log(algorithmsProblems[problem])
                const submissions = algorithmsProblems[problem]?.submissions // the submissions of that problem
                if (submissions) {
                    // then going threw every single submission in the submissions of the problem
                    for (const uid in submissions) {
                        if (leaderBoardObj[uid] && submissions[uid].score > 0) {
                            // if the uid already  exists just add to it
                            leaderBoardObj[uid].targets += 1
                            leaderBoardObj[uid].score += submissions[uid].score
                        } else {
                            // else set it uid in the object
                            if (submissions[uid].score > 0) {
                                leaderBoardObj[uid] = {
                                    score: submissions[uid].score,
                                    targets: 1,
                                }
                            }
                        }
                    }
                }
            }

            cssProblems?.forEach((problem: any) => {
                console.log('----css----')
                console.log(problem)

                // looping threw all the problems
                const submissions = problem?.submissions
                if (submissions) {
                    // then going threw every single submission in the submissions of the problem
                    for (const uid in submissions) {
                        if (leaderBoardObj[uid] && submissions[uid]?.score > 0) {
                            // if the uid already  exists just add to it
                            leaderBoardObj[uid].targets += 1
                            leaderBoardObj[uid].score += submissions[uid].score
                        } else {
                            if (submissions[uid].score > 0) {
                                // else set it uid in the object
                                leaderBoardObj[uid] = {
                                    score: submissions[uid].score,
                                    targets: 1,
                                }
                            }
                        }
                    }
                }
            })

            console.log('-------------')
            console.log(leaderBoardObj)

            let leaderBoardArr = [] // turn into an object so we can sort
            for (const uid in leaderBoardObj) {
                // if the user does not have a score we don't push it to leader-board
                if (leaderBoardObj[uid]) {
                    leaderBoardArr.push({
                        uid: uid,
                        score: Math.round(leaderBoardObj[uid].score * 100) / 100, // rounds to two decimal
                        targets: leaderBoardObj[uid].targets,
                    })
                }
            }

            // sort the array
            let dummyHolder: any[] | null = []
            leaderBoardArr = quickSortBasic(leaderBoardArr)
            for (let i = 0; i < leaderBoardArr.length; i++) {
                // getting the user from firestore and storing user details in
                const response = fs.collection('users').doc(leaderBoardArr[i].uid)
                const rawData = await response.get()
                const data = rawData.data()

                if (data && leaderBoardArr[i]) {
                    // pushing all the data we got of the user from firestore
                    // and then adding users score and targets
                    dummyHolder.push({
                        ...data,
                        score: leaderBoardArr[i].score,
                        targets: leaderBoardArr[i].targets,
                    })
                }
            }

            setLeaderboard(dummyHolder)
        })
        setLoading(false)
    }, [])

    // setting the score and target sto global variable currentUser
    if (currentUser) {
        for (let i: number = 0; i < leaderboard?.length; i++) {
            if (leaderboard[i].userUID === currentUser.uid) {
                currentUser.score = leaderboard[i].score
                currentUser.targets = leaderboard[i].targets
            }
        }
        console.log(leaderboard)
    }

    const value: any = {
        leaderboard,
    }
    return <LeaderboardContext.Provider value={value}>{children}</LeaderboardContext.Provider>
}
