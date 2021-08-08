import React from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useLeaderboard } from '../../context/LeaderboardContext'
import User from '../../types/User'

export default function Homepage() {
    const { leaderboard } = useLeaderboard()

    return (
        <div className='homepage'>
            <div className='herobanner'>
                <div className='blobs-container'>
                    <Blob />
                </div>
                <div className='content'>
                    <h1>LucioCode</h1>
                    <div className='buttons'>
                        <Link to='/algorithms/problems'>
                            <div className='outline-btn'>Algorithms</div>
                        </Link>
                        <Link to='/css/problems'>
                            <div className='outline-btn'>Css Arena</div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className='leaderboard-container'>
                {leaderboard.length > 0 ? (
                    <>
                        <div className='header'>Top #{leaderboard.length}</div>
                        <div className='leaderboard-wrapper'>
                            {leaderboard.map((user: User, index: number) => {
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
                    </>
                ) : (
                    // loader if we don't have leaderboard
                    <LoadingLeaderBoard />
                )}
                hej
            </div>
        </div>
    )
}

const LoadingLeaderBoard = () => {
    return <div className='loading-leaderboard-wrapper'>loading...</div>
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
                <svg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 310 350'>
                    <path d='M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z' />
                </svg>
            </div>
            <div className={`blob b3`}>
                <svg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 310 350'>
                    <path d='M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z' />
                </svg>
            </div>
        </>
    )
}
