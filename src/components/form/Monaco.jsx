import React, { useEffect, useState, useRef } from 'react'

import Editor, { useMonaco } from '@monaco-editor/react'
import File from './File'
import CodeCompileView from './CodeCompileView'
import { generateJavascript, javascriptPrint } from '../../functions/generateJavascript'
import { generatePython, pythonPrint } from '../../functions/generatePython'
import { db } from '../../firebase'
import { auth } from '../../firebase'
// https://www.npmjs.com/package/@monaco-editor/react
const Monaco = ({ mref, setCurrentCode, currentCode, problem }) => {
    const monaco = useMonaco()
    const editorRef = useRef(null)
    const [fetchingData, setFetchingData] = useState(false)
    const problemName = problem.problemName
    const problemInputs = problem.inputs
    const displayProblemName = problemName
        ?.split(' ')
        .filter((word) => word !== '')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
    const dbSubmissionsRef = db
        .ref()
        .child('algorithms')
        .child(displayProblemName)
        .child('submissions')
    const files = {
        'script.js': {
            name: 'script.js',
            language: 'javascript',
            value: generateJavascript(displayProblemName, problemInputs),
        },
        'script.py': {
            name: 'script.py',
            language: 'python',
            value: generatePython(displayProblemName, problemInputs),
        },
    }

    const sampleCases = problem.sampleCases
    const [testCases, setTestCases] = useState([])
    const [fileName, setFileName] = useState('script.js')
    const file = files[fileName]

    useEffect(() => {
        if (monaco) {
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

    const handleEditorDidMount = (editor) => {
        editorRef.current = editor
        setCurrentCode(editorRef?.current?.getValue())
    }

    const runCodeHandler = async () => {
        // returning early if we are fetching data
        // otherwise the run button can be spammed causing errors
        if (fetchingData) return
        // if don't have a file for what ever reason we don't want to precede
        if (!file) return
        setCurrentCode(editorRef?.current?.getValue())
        // a sleep function that blocks code from running for 'ms' millisecs
        function sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms))
        }
        setFetchingData(true)

        let dummyArray = []

        for (let i = 0; i < sampleCases.length; i++) {
            const currentCase = sampleCases[i]
            const args = currentCase.input
            const expected = currentCase.output

            // the request that we send to the piston api
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    language: file.language,
                    source: `${currentCode} ${
                        file.language === 'javascript'
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
                .then((data) =>
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
                )

            // sleeping for 530ms cuz the api only allows 2 reqs per sec, and 530 just to be on the safe side
            await sleep(530)
        }
        setTestCases(dummyArray)
        setFetchingData(false)
        return dummyArray
    }
    const submitCodeHandler = async () => {
        const user = auth.currentUser
        console.log(user)
        if (!user) return //  @todo prompt the user to login if they are not
        const userUID = user.uid
        let cases = await runCodeHandler()
        console.log(cases)

        for (let i = 0; i < cases.length; i++) {
            // loop thru all cases and if one of them we early return
            if (!cases[i].correctAnswer) return
        }
        const difficulty = problem.difficulty
        const score = difficulty === 'hard' ? 600 : difficulty === 'medium' ? 400 : 200

        // update database if user gets new high score
        dbSubmissionsRef.child(userUID).set({
            email: user.email,
            score: score,
            displayName: user.displayName,
            userId: userUID,
        })
        // else user completed the challenge so we push it to db
        console.log('noice')
    }
    return (
        <div className='editorial'>
            <div className='editor' ref={mref}>
                <div className='files'>
                    <File file='script.js' fileName={fileName} setFileName={setFileName} />
                    <File file='script.py' fileName={fileName} setFileName={setFileName} />
                </div>

                <Editor
                    onMount={handleEditorDidMount}
                    theme='myCustomTheme'
                    path={file.name}
                    defaultLanguage={file.language}
                    defaultValue={file.value}
                    onChange={() => setCurrentCode(editorRef.current.getValue())}
                    options={{
                        inherit: true,
                        minimap: {
                            enabled: false,
                        },
                        fontSize: 16,
                        // cursorStyle: 'block',
                        // wordWrap: 'on',
                        wordWrap: 'wordWrapColumn',
                        wordWrapColumn: 90,

                        // Set this to false to not auto word wrap minified files
                        wordWrapMinified: true,

                        // try "same", "indent" or "none"
                        wrappingIndent: 'same',
                    }}
                />
            </div>

            <div className='submit'>
                {/* submiting code and testing it*/}
                <button className='testrun-btn' onClick={runCodeHandler}>
                    Run Code
                </button>
                <button className='submit-btn' onClick={submitCodeHandler}>
                    Submit Code
                </button>
            </div>
            <CodeCompileView testcases={testCases} fetchingData={fetchingData} />
        </div>
    )
}

export default Monaco

// { token: '', foreground: '61afef' }, //everything
//                     { token: 'invalid', foreground: '00ff00' },
//                     { token: 'emphasis', fontStyle: 'italic' },
//                     { token: 'strong', fontStyle: 'bold' },
//                     { token: 'variable', foreground: '00ff00' },
//                     { token: 'variable.predefined', foreground: '00ff00' },
//                     { token: 'constant', foreground: '00ff00' },
//                     { token: 'comment', foreground: '7f848e', fontStyle: 'italic' },
//                     { token: 'number', foreground: 'd19a66' }, //number
//                     { token: 'number.hex', foreground: 'd19a66' },
//                     { token: 'regexp', foreground: '56b6c2' }, //rexexp
//                     { token: 'annotation', foreground: 'ff00ff' },
//                     { token: 'type', foreground: 'E5C07B' }, // promise och math
//                     { token: 'delimiter', foreground: 'abb2bf' }, //stuff
//                     { token: 'delimiter.html', foreground: 'abb2bf' },
//                     { token: 'delimiter.xml', foreground: 'abb2bf' },
//                     { token: 'tag', foreground: 'E06C75' },
//                     { token: 'tag.id.jade', foreground: 'E06C75' },
//                     { token: 'tag.class.jade', foreground: 'E06C75' },
//                     { token: 'meta.scss', foreground: 'e7c547' },
//                     { token: 'metatag', foreground: 'ff00ff' },
//                     { token: 'metatag.content.html', foreground: 'd19a66' },
//                     { token: 'metatag.html', foreground: 'E06C75' },
//                     { token: 'metatag.xml', foreground: '86b300' },
//                     { token: 'metatag.php', fontStyle: 'bold' },
//                     { token: 'key', foreground: '00ff00' },
//                     { token: 'string.key.json', foreground: '41a6d9' },
//                     { token: 'string.value.json', foreground: '86b300' },
//                     { token: 'attribute.name', foreground: 'd19a66' },
//                     { token: 'attribute.value', foreground: '98c379' },
//                     { token: 'attribute.value.number', foreground: '98c379' },
//                     { token: 'attribute.value.unit', foreground: '98c379' },
//                     { token: 'attribute.value.html', foreground: '98c379' },
//                     { token: 'attribute.value.xml', foreground: '98c379' },
//                     { token: 'string', foreground: '98c379' }, //strings
//                     { token: 'string.html', foreground: 'ff0000' },
//                     { token: 'string.sql', foreground: '98c379' },
//                     { token: 'string.yaml', foreground: '98c379' },
//                     { token: 'keyword', foreground: 'C678DD' },
//                     { token: 'keyword.json', foreground: 'C678DD' },
//                     { token: 'keyword.flow', foreground: 'C678DD' },
//                     { token: 'keyword.flow.scss', foreground: 'C678DD' },
//                     { token: 'operator.scss', foreground: '666666' },
//                     { token: 'operator.sql', foreground: '778899' },
//                     { token: 'operator.swift', foreground: '666666' },
//                     { token: 'predefined.sql', foreground: 'FF00FF' },

// ---------------- newest -------------- //
// rules: [
//     // { token: '', foreground: '569dc6' }, //everything
//     { token: '', foreground: '9cdcfe' }, //everything
//     { token: 'string.html', foreground: 'ffff00' },
//     { token: 'invalid', foreground: '00ff00' },
//     { token: 'emphasis', fontStyle: 'italic', foreground: '00fff0' },
//     { token: 'strong', fontStyle: 'bold' },
//     { token: 'variable', foreground: 'ff0000' },
//     { token: 'variable.predefined', foreground: 'ff0000' },
//     { token: 'constant', foreground: 'ff0000' },
//     { token: 'constant.language.null.js', foreground: 'ff0000' },
//     { token: 'comment', foreground: '637777', fontStyle: 'italic' }, //comment
//     { token: 'number', foreground: 'f78c6c' }, //number
//     { token: 'number.hex', foreground: 'b5cea8' },
//     { token: 'regexp', foreground: 'd16969' }, //rexexp
//     { token: 'annotation', foreground: 'ff0000' },
//     { token: 'type', foreground: '7fdbca' }, // promise och math
//     { token: 'delimiter', foreground: 'c792ea' }, //stuff
//     { token: 'delimiter.html', foreground: 'd4d4d4' },
//     { token: 'delimiter.xml', foreground: 'd4d4d4' },
//     { token: 'tag', foreground: 'ff0000' },
//     { token: 'tag.id.jade', foreground: '0000ff' },
//     { token: 'tag.class.jade', foreground: '00ff00' },
//     { token: 'meta.scss', foreground: 'e7c547' },
//     { token: 'metatag', foreground: '00fff0' },
//     { token: 'metatag.content.html', foreground: '00fff0' },
//     { token: 'metatag.html', foreground: '00fff0' },
//     { token: 'metatag.xml', foreground: '00fff0' },
//     { token: 'metatag.php', fontStyle: '00fff0' },
//     { token: 'key', foreground: 'f0f0f0' },
//     { token: 'string.key.json', foreground: '0f0f0f' },
//     { token: 'string.value.json', foreground: '00fff0' },
//     { token: 'attribute.name', foreground: '9cdcfe' }, // css tag
//     { token: 'attribute.value', foreground: 'ce9178' }, // typ solid i css
//     { token: 'attribute.value.number', foreground: 'ce9178' },
//     { token: 'attribute.value.unit', foreground: 'ce9178' },
//     { token: 'attribute.value.html', foreground: 'ce9178' },
//     { token: 'attribute.value.xml', foreground: 'ce9178' },
//     { token: 'string', foreground: 'ecc48d' }, //strings
//     { token: 'string.html', foreground: 'ce9178' },
//     { token: 'string.sql', foreground: 'ce9178' },
//     { token: 'string.yaml', foreground: 'ce9178' },
//     { token: 'keyword', foreground: '82aaff' },
//     { token: 'keyword.json', foreground: 'C678DD' },
//     { token: 'keyword.flow', foreground: 'ff0000' },
//     { token: 'keyword.flow.scss', foreground: 'C678DD' },
//     { token: 'operator', foreground: 'ff0000' },
//     { token: 'operator.scss', foreground: '666666' },
//     { token: 'operator.sql', foreground: '778899' },
//     { token: 'operator.swift', foreground: '666666' },
//     { token: 'predefined.sql', foreground: 'FF00FF' },
// ],
// colors: {
//     'editor.background': '#011627',
//     // 'editor.foreground': '#ff0000',
//     // 'editorIndentGuide.background': '#ABB2BF',
//     // 'editorIndentGuide.activeBackground': '#282C34',
// },
