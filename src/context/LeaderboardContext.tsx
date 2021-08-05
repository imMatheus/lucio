import React, { createContext, useContext, useState, useEffect } from 'react'
import { fs, db } from '../firebase'
import { useAuth } from './AuthContext'
import User from '../types/User'
import Leaderboard from '../types/Leaderboard'

interface Context {
    leaderboard: Leaderboard | []
}

const LeaderboardContext = createContext<Context>({
    leaderboard: [],
})

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
    const { currentUser } = useAuth()

    const [leaderboard, setLeaderboard] = useState<Leaderboard | []>([])

    useEffect(() => {
        // subscribe to the db so we can update the leaderboard when the db gets updated
        db.ref().on('value', async (snapshot) => {
            let problems = await snapshot.val()
            const cssProblems = problems.css
            const algorithmsProblems = problems.algorithms
            let leaderBoardObj: any = {} // used to sweep thru the submissions and store all the users submissions

            for (const problem in algorithmsProblems) {
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
    }, [])

    // setting the score and target sto global variable currentUser
    if (currentUser) {
        for (let i = 0; i < leaderboard?.length; i++) {
            if (leaderboard[i].userUID === currentUser.uid) {
                currentUser.score = leaderboard[i].score
                currentUser.targets = leaderboard[i].targets
            }
        }
    }

    const value = {
        leaderboard,
    }
    return <LeaderboardContext.Provider value={value}>{children}</LeaderboardContext.Provider>
}
