import React from 'react'
import Navbar from '../navbar/Navbar'

const ProblemsPage = () => {
    return (
        <>
            {/* <Navbar /> */}
            <div className='problems'>
                <ProblemCard />
                <ProblemCard name='marre är cool' />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
                <ProblemCard />
            </div>
        </>
    )
}

const ProblemCard = ({ name }) => {
    return (
        <div className='problemcard'>
            <div className='header'>{name ? name : 'marrre '}</div>
        </div>
    )
}

export default ProblemsPage
