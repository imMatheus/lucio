import React, { useContext, useState, useEffect } from 'react'
import { auth, fs, db } from '../firebase'
const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}
// quickSort algorithm
function quickSortBasic(array) {
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
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [leaderboard, setLeaderboard] = useState(null)
    const [loading, setLoading] = useState(true)

    async function signup(email, password, displayName, imageUrl) {
        const usersNamesRef = fs.collection('usernames').doc(displayName.toLowerCase())
        const doc = await usersNamesRef.get()
        if (doc.exists) {
            // checking if the display name already exist
            const error = { message: 'Display name already exist' }
            return error
        }
        try {
            await auth.createUserWithEmailAndPassword(email, password)

            await fs // firestore
                .collection('users')
                .doc(auth.currentUser?.uid) // adding a doc with the the id of the users uid
                .set({
                    displayName: displayName,
                    email: email,
                    userUID: auth.currentUser.uid,
                    profileImage: imageUrl,
                }) // setting its info
            await usersNamesRef.set({
                displayName: displayName.toLowerCase(),
            })
        } catch (error) {
            return error
        }
    }
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    function logout() {
        sessionStorage.clear()
        return auth.signOut()
    }
    async function resetPassword(email) {
        try {
            await auth.sendPasswordResetEmail(email)
        } catch (error) {
            return error
        }
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            const fetchUser = async (user) => {
                if (!user) return
                // getting the users data from firestore
                const response = fs.collection('users').doc(user.uid)
                const data = await response.get()
                return { ...user, ...data.data() }
            }
            const response = await fetchUser(user)

            setCurrentUser(response)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    useEffect(() => {
        // subscribe to the db so we can update the leaderboard when the db gets updated
        db.ref().on('value', async (snapshot) => {
            let problems = await snapshot.val()
            const cssProblems = problems.css
            const algorithmsProblems = problems.algorithms
            let leaderBoardObj = {} // used to sweep thru the submissions and store all the users submissions

            for (const problem in algorithmsProblems) {
                const submissions = algorithmsProblems[problem]?.submissions
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
            cssProblems?.forEach((problem) => {
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
            leaderBoardArr = quickSortBasic(leaderBoardArr)
            let dummyHolder = []
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
        for (const user in leaderboard) {
            if (leaderboard[user].userUID === currentUser.uid) {
                currentUser.score = leaderboard[user].score
                currentUser.targets = leaderboard[user].targets
            }
        }
    }

    const value = {
        currentUser,
        logout,
        leaderboard,
        login,
        signup,
        resetPassword,
    }
    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
