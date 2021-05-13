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
        const usersNamesRef = fs.collection('usernames').doc(displayName)
        const doc = await usersNamesRef.get()
        if (doc.exists) {
            // checking if the display name already exist
            const error = { message: 'Display name already exist' }
            return error
        }
        await usersNamesRef.set({
            displayName: displayName,
        })
        try {
            await auth.createUserWithEmailAndPassword(email, password)

            await fs // firestore
                .collection('users')
                .doc(auth.currentUser.uid) // adding a doc with the the id of the users uid
                .set({
                    displayName: displayName,
                    email: email,
                    userUID: auth.currentUser.uid,
                    profileImage: imageUrl,
                }) // setting its info
        } catch (error) {
            return error
        }
    }
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    function logout() {
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
        const cssRef = db.ref('css')
        const algoRef = db.ref('algorithms')
        let leaderBoardObj = {} // used to sweep thru the submissions and store all the users submissions
        algoRef.on('value', async (snapshot) => {
            let problems = snapshot.val()
            console.log(problems)
            for (const problem in problems) {
                const submissions = problems[problem].submissions
                // console.log(submissions)
                if (submissions) {
                    // then going threw every single submission in the submissions of the problem
                    for (const uid in submissions) {
                        if (leaderBoardObj[uid] && submissions[uid].score > 0) {
                            leaderBoardObj[uid].targets += 1
                            leaderBoardObj[uid].score += submissions[uid].score
                        } else {
                            // leaderBoardObj[uid].targets = 1
                            leaderBoardObj[uid] = { score: submissions[uid].score, targets: 1 }
                        }
                    }
                }
                // looping threw all the problems
                // console.log(submissions)
            }
        })
        cssRef.on('value', async (snapshot) => {
            let problems = snapshot.val()
            problems?.forEach((problem) => {
                // looping threw all the problems
                const submissions = problem.submissions
                if (submissions) {
                    // then going threw every single submission in the submissions of the problem
                    for (const uid in submissions) {
                        if (leaderBoardObj[uid] && submissions[uid].score > 0) {
                            leaderBoardObj[uid].targets += 1
                            leaderBoardObj[uid].score += submissions[uid].score
                        } else {
                            // leaderBoardObj[uid].targets = 1
                            leaderBoardObj[uid] = { score: submissions[uid].score, targets: 1 }
                        }
                    }
                }
            })

            let leaderBoardArr = []
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
            // sorting the leader-board
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
