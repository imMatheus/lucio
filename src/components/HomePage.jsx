import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fs, db } from '../firebase'
// import { cssProblems } from '../css-problems/cssProblems'
import { useAuth } from '../context/AuthContext'
import { v4 as uuidv4 } from 'uuid'

const HomePage = () => {
    const { currentUser } = useAuth()

    const [userData, setUserData] = useState()
    const [leaderBoard, setLeaderBoard] = useState()

    const fetchUser = async (user) => {
        // getting the users data from firestore
        const response = fs.collection('users').doc(user.uid)
        const data = await response.get()
        setUserData(data.data())
    }

    useEffect(() => {
        // return false
        if (currentUser) {
            fetchUser(currentUser)
        } else {
            setUserData(null)
        }
        // loading the leader-board
        const userRef = db.ref('css')
        userRef.on('value', async (snapshot) => {
            let leaderBoardObj = {}
            let problems = snapshot.val()
            problems?.forEach((problem) => {
                // looping threw all the problems
                const submissions = problem.submissions
                if (submissions) {
                    // then going threw every single submission in the submissions of the problem
                    for (const uid in submissions) {
                        if (leaderBoardObj[uid]) {
                            leaderBoardObj[uid].targets += 1
                            leaderBoardObj[uid].score += submissions[uid].score
                        } else {
                            // leaderBoardObj[uid].targets = 1
                            leaderBoardObj[uid] = { score: submissions[uid].score, targets: 1 }
                        }
                    }
                }
            })

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

            let leaderBoardArr = []
            for (const uid in leaderBoardObj) {
                // if the user does not have a score we don't push it to leader-board
                if (leaderBoardObj[uid]) {
                    leaderBoardArr.push({
                        uid: uid,
                        score: Math.round(leaderBoardObj[uid].score * 10) / 10, // rounds to one decimal
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
            console.log(dummyHolder)
            setLeaderBoard(dummyHolder)
        })
    }, [currentUser])

    return (
        <div className='homepage'>
            <div className='herobanner'>
                <div className='blobs-container'>
                    <Blob />
                </div>
                <div className='content'>
                    <h1>LucioCode</h1>
                    <div className='buttons'>
                        <Link to='/problems'>
                            <div className='outline-btn'>Algorithms</div>
                        </Link>
                        <Link to='/css/problems'>
                            <div className='outline-btn'>Css Arena</div>
                        </Link>
                    </div>
                </div>
            </div>
            {leaderBoard && (
                <div className='leaderboard-container'>
                    <div className='header'>Top #{leaderBoard.length}</div>
                    <div className='leaderboard-wrapper'>
                        {leaderBoard &&
                            leaderBoard.map((user, index) => {
                                // setting the rank for styling
                                let rank =
                                    index + 1 === 1
                                        ? 'gold'
                                        : index + 1 === 2
                                        ? 'silver'
                                        : index + 1 === 3
                                        ? 'bronze'
                                        : ''
                                return (
                                    <div key={uuidv4()} className={`row-wrapper ${rank}`}>
                                        <div className='number'>#{index + 1}</div>
                                        <div
                                            className='image'
                                            style={{
                                                backgroundImage: `url(${user.profileImage} )`,
                                            }}
                                        ></div>
                                        <div className='text-field'>
                                            {user.displayName}
                                            <div className='stats'>
                                                {user.score} {`(${user.targets} targets)`}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>
            )}
        </div>
    )
}

const Blob = () => {
    return (
        <>
            <div className={`blob b1`}>
                {/* This SVG is from https://codepen.io/Ali_Farooq_/pen/gKOJqx */}
                <svg
                    // xmlns:xlink='http://www.w3.org/1999/xlink'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 310 350'
                >
                    <path d='M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z' />
                </svg>
            </div>
            <div className={`blob b2`}>
                {/* This SVG is from https://codepen.io/Ali_Farooq_/pen/gKOJqx */}
                <svg
                    // xmlns:xlink='http://www.w3.org/1999/xlink'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 310 350'
                >
                    <path d='M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z' />
                </svg>
            </div>
            <div className={`blob b3`}>
                {/* This SVG is from https://codepen.io/Ali_Farooq_/pen/gKOJqx */}
                <svg
                    // xmlns:xlink='http://www.w3.org/1999/xlink'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 310 350'
                >
                    <path d='M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z' />
                </svg>
            </div>
        </>
    )
}

export default HomePage
