interface sampleCase {
    explanation?: {
        explanationOutput: Array<number | string>
        text?: string
    }
    input: Array<number | string>
    output: Array<number | string>
}
interface submitCase {
    input: Array<number | string>
    output: Array<number | string>
}

export default interface AlgorithmProblem {
    constrains: Array<string>
    difficulty: 'easy' | 'medium' | 'hard'
    inputFormat: string
    inputs: Array<string>
    profileDescription: string
    problemName: string
    sampleCases: Array<sampleCase>
    submitCase: Array<submitCase>
}
