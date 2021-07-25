import React, { ReactElement } from 'react'
import EditorComponent from '../editor/Editor'
import Question from './Question'
import { problems } from '../../problems/AlgorithmProblems'
interface Props {
    type?: string
}

export default function Algorithms({ type }: Props): ReactElement {
    return (
        <div className='form'>
            <Question problem={problems['SimpleAddition']} />

            <div className='resizebar'>
                <div className='dots'>
                    {/* spans that get styled to be circles */}
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <EditorComponent />
        </div>
    )
}
