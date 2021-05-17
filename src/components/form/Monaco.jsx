import React, { useEffect, useState } from 'react'

import { useMonaco } from '@monaco-editor/react'
import File from './File'
import CodeCompileView from './CodeCompileView'
import { generateJavascript, javascriptPrint } from '../../functions/generateJavascript'
import { generatePython, pythonPrint } from '../../functions/generatePython'
import { db } from '../../firebase'
import { useAuth } from '../../context/AuthContext'
import useSessionStorage from '../../hooks/useSessionStorage'
import EditorComponent from './EditorComponent'

// https://www.npmjs.com/package/@monaco-editor/react
const Monaco = ({ mref, problem, setPrompUser }) => {
    // console.log(problem)
    const monaco = useMonaco()
    const { currentUser } = useAuth()
    const [fetchingData, setFetchingData] = useState(false)
    const problemName = problem.problemName
    const problemInputs = problem.inputs
    const sampleCases = problem.sampleCases
    const submitCases = problem.submitCases
    const displayProblemName = problemName
        ?.split(' ')
        .filter((word) => word !== '')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
    const [scriptJs, setScriptJs] = useSessionStorage(
        `${displayProblemName}-script.js`,
        generateJavascript(displayProblemName, problemInputs)
    )
    const [scriptPy, setScriptPy] = useSessionStorage(
        `${displayProblemName}-script.py`,
        generatePython(displayProblemName, problemInputs)
    )
    // console.log(scriptJs)
    const [currentCode, setCurrentCode] = useSessionStorage(
        `${displayProblemName}-currentCode`,
        scriptJs
    )
    // console.log(currentCode)
    const dbSubmissionsRef = db
        .ref()
        .child('algorithms')
        .child(displayProblemName)
        .child('submissions')
    const [files, setFiles] = useSessionStorage(`${displayProblemName}-files`, {
        'script.js': scriptJs,
        'script.py': scriptPy,
    })

    const [testCases, setTestCases] = useSessionStorage(`${displayProblemName}-testCases`, [])
    const [fileName, setFileName] = useSessionStorage('fileName', 'script.js')
    const file = files[fileName]
    const [language, setLanguage] = useSessionStorage(
        'language',
        file === scriptJs ? 'javascript' : 'python'
    )

    useEffect(() => {
        if (monaco) {
            setFiles({
                'script.js': scriptJs,
                'script.py': scriptPy,
            })

            monaco.editor.defineTheme('myCustomTheme', {
                base: 'vs-dark',
                inherit: true,
                rules: [
                    // { token: '', foreground: '569dc6' }, //everything
                    { token: '', foreground: '9cdcfe' }, //everything
                    { token: 'string.html', foreground: 'ffff00' },
                    { token: 'invalid', foreground: '00ff00' },
                    { token: 'emphasis', fontStyle: 'italic' },
                    { token: 'strong', fontStyle: 'bold' },
                    { token: 'variable', foreground: 'ff0000' },
                    { token: 'variable.predefined', foreground: 'ff0000' },
                    { token: 'constant', foreground: 'ff0000' },
                    { token: 'comment', foreground: '6a9955', fontStyle: 'italic' }, //comment
                    { token: 'number', foreground: 'b5cea8' }, //number
                    { token: 'number.hex', foreground: 'b5cea8' },
                    { token: 'regexp', foreground: 'd16969' }, //rexexp
                    { token: 'annotation', foreground: 'ff0000' },
                    { token: 'type', foreground: '4ec9b0' }, // promise och math
                    { token: 'delimiter', foreground: 'd4d4d4' }, //stuff
                    { token: 'delimiter.html', foreground: 'd4d4d4' },
                    { token: 'delimiter.xml', foreground: 'd4d4d4' },
                    { token: 'tag', foreground: '569cd6' },
                    { token: 'tag.id.jade', foreground: '569cd6' },
                    { token: 'tag.class.jade', foreground: '569cd6' },
                    { token: 'meta.scss', foreground: 'e7c547' },
                    { token: 'metatag', foreground: '569cd6' },
                    { token: 'metatag.content.html', foreground: 'd19a66' },
                    { token: 'metatag.html', foreground: '569cd6' },
                    { token: 'metatag.xml', foreground: '569cd6' },
                    { token: 'metatag.php', fontStyle: '569cd6' },
                    { token: 'key', foreground: '569cd6' },
                    { token: 'string.key.json', foreground: '569cd6' },
                    { token: 'string.value.json', foreground: '9cdcfe' },
                    { token: 'attribute.name', foreground: '9cdcfe' }, // css tag
                    { token: 'attribute.value', foreground: 'ce9178' }, // typ solid i css
                    { token: 'attribute.value.number', foreground: 'ce9178' },
                    { token: 'attribute.value.unit', foreground: 'ce9178' },
                    { token: 'attribute.value.html', foreground: 'ce9178' },
                    { token: 'attribute.value.xml', foreground: 'ce9178' },
                    { token: 'string', foreground: 'ce9178' }, //strings
                    { token: 'string.html', foreground: 'ce9178' },
                    { token: 'string.sql', foreground: 'ce9178' },
                    { token: 'string.yaml', foreground: 'ce9178' },
                    { token: 'keyword', foreground: 'c586c0' },
                    { token: 'keyword.json', foreground: 'C678DD' },
                    { token: 'keyword.flow', foreground: 'ff0000' },
                    { token: 'keyword.flow.scss', foreground: 'C678DD' },
                    { token: 'operator', foreground: 'ff0000' },
                    { token: 'operator.scss', foreground: '666666' },
                    { token: 'operator.sql', foreground: '778899' },
                    { token: 'operator.swift', foreground: '666666' },
                    { token: 'predefined.sql', foreground: 'FF00FF' },
                ],
                colors: {
                    'editor.background': '#282C34',
                    // 'editor.foreground': '#ff0000',
                    // 'editorIndentGuide.background': '#ABB2BF',
                    // 'editorIndentGuide.activeBackground': '#282C34',
                },
            })

            monaco.editor.setTheme('myCustomTheme')
        }
    }, [monaco])

    useEffect(() => {
        if (language === 'javascript') {
            setCurrentCode(scriptJs)
        } else {
            setCurrentCode(scriptPy)
        }
    }, [fileName, file, language, scriptJs, scriptPy])
    const runCodeHandler = async (submit) => {
        // returning early if we are fetching data
        // otherwise the run button can be spammed causing errors
        if (fetchingData) return
        // if don't have a file for what ever reason we don't want to precede
        if (!file) return
        // setCurrentCode(editorRef?.current?.getValue())
        // a sleep function that blocks code from running for 'ms' millisecs
        function sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms))
        }
        setFetchingData(true)
        const l = language

        const cases = submit === true ? sampleCases.concat(submitCases) : sampleCases
        let dummyArray = []

        for (let i = 0; i < cases.length; i++) {
            const currentCase = cases[i]
            const args = currentCase.input
            const expected = currentCase.output

            // the request that we send to the piston api
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    language: language,
                    source: `${currentCode} ${
                        language === 'javascript'
                            ? javascriptPrint(displayProblemName, args)
                            : pythonPrint(displayProblemName, args)
                    }`,
                    stdin: '',
                    args: [],
                }),
            }

            // sending the request
            await fetch('https://emkc.org/api/v1/piston/execute', requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    dummyArray.push({
                        correctAnswer: (data.output + '').trim() === (expected + '').trim(),
                        compileMessage:
                            (data.output + '').trim() === (expected + '').trim()
                                ? 'Right answer'
                                : 'Wrong answer',
                        inputs: args,
                        userOutput: [data.output],
                        expectedOutput: expected,
                        caseName: i,
                    })
                })

            // sleeping for 530ms cuz the api only allows 2 reqs per sec, and 530 just to be on the safe side
            await sleep(530)
        }

        setTestCases(dummyArray)
        setFetchingData(false)
        setLanguage(l)
        return dummyArray
    }
    const submitCodeHandler = async () => {
        if (!currentUser) return setPrompUser(true)
        const userUID = currentUser.uid
        const l = language
        let cases = await runCodeHandler(true)
        let firstTime = true

        await dbSubmissionsRef.child(userUID).once('value', async (snapshot) => {
            const response = await snapshot.val()
            if (response) {
                firstTime = response.score > 0 ? false : true
            }
        })
        let correctAnswer = true
        for (let i = 0; i < cases?.length; i++) {
            // loop thru all cases and if one of them we early return
            if (!cases[i].correctAnswer && firstTime) correctAnswer = false
        }
        const difficulty = problem.difficulty
        // if the difficulty is hard then score is 600 if it is medium then score is 400
        // and if it is easy score is 200
        const score = difficulty === 'hard' ? 600 : difficulty === 'medium' ? 400 : 200

        dbSubmissionsRef.child(userUID).set({
            email: currentUser.email,
            score: correctAnswer ? score : 0,
            displayName: currentUser.displayName,
            userId: userUID,
            profileImage: currentUser.photoURL,
        })
        setLanguage(l)
    }

    return (
        <div className='editorial'>
            <div className='editor'>
                <div className='files'>
                    <File
                        file='script.js'
                        fileName={fileName}
                        setFileName={setFileName}
                        setLanguage={setLanguage}
                    />
                    <File
                        file='script.py'
                        fileName={fileName}
                        setFileName={setFileName}
                        setLanguage={setLanguage}
                    />
                </div>
                {language === 'javascript' ? (
                    <EditorComponent
                        language='javascript'
                        starterCode={currentCode}
                        setter={setCurrentCode}
                        setJs={setScriptJs}
                    />
                ) : (
                    <EditorComponent
                        language='python'
                        starterCode={currentCode}
                        setter={setCurrentCode}
                        setPy={setScriptPy}
                    />
                )}
            </div>

            <div className='submit'>
                {/* submiting code and testing it*/}
                <button className='testrun-btn' onClick={runCodeHandler} disabled={fetchingData}>
                    Run Code
                </button>
                <button className='submit-btn' onClick={submitCodeHandler} disabled={fetchingData}>
                    Submit Code
                </button>
            </div>
            <CodeCompileView testcases={testCases} fetchingData={fetchingData} />
        </div>
    )
}

export default Monaco
