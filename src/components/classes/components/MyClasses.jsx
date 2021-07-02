import React from 'react'

export default function MyClasses() {
    function ClassCard() {
        return (
            <div className='class-card'>
                <div className='img-wrapper'></div>
                <h3>It intro asjdsajd ajsdjasd masdmm</h3>
                <p>23 students</p>
            </div>
        )
    }
    return (
        <div className='myclasses-wrapper'>
            <div className='class-card'>
                <div className='img-wrapper'></div>
                <h3>It intro</h3>
                <p>23 students</p>
            </div>
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
        </div>
    )
}
