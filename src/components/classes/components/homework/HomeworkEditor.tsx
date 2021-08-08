import React, { useState } from 'react'
import EditorComponent from '../../../editor/Editor'
import Question from '../../../question/Question'
import { problems } from '../../../../problems/AlgorithmProblems'
import Algorithms from '../../../algorithms/Algorithms'
interface Props {}

export default function HomeworkEditor() {
    const [currentCode, setCurrentCode] = useState('current')
    return <Algorithms />
}
