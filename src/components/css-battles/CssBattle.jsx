import React, { useEffect, useState, useRef } from 'react'
import Editor, { useMonaco } from '@monaco-editor/react'
import { generateStarterFile } from './_GenerateStarterFile'
import { problem1 } from '../../css-problems/problem1/problem1.js'
import { problem3 } from '../../css-problems/problem3/problem3'

const CssBattle = () => {
    const editorRef = useRef(null)
    const monaco = useMonaco()
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
    let starterFile = generateStarterFile()
    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor
        console.log(monaco)
        console.log(editor)
    }
    console.log(problem1)
    return (
        <div className='cssbattle'>
            <div className='editor'>
                <div className='column-header'>
                    Editor <span>539 characters </span>
                </div>
                <Editor
                    width='100%'
                    height='90vh'
                    theme='myCustomTheme'
                    defaultLanguage='html'
                    onMount={handleEditorDidMount}
                    defaultValue={starterFile}
                    options={{
                        inherit: true,
                        scrollBeyondLastLine: false,
                        minimap: {
                            enabled: false,
                        },
                        fontSize: 17,
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
            <div className='column-container'>
                <div className='column-header'>
                    Output <span>Slide show</span>
                </div>
                <div className='img-container'>s</div>
            </div>
            <div className='column-container'>
                <div className='column-header'>
                    Target <span>400px x 300px </span>
                </div>
                <div className='img-container' style={{ backgroundImage: ` url(${problem1.image})` }}></div>
                <div className='colors-container'>
                    {/* rendering out all of the colors */}
                    {problem1.colors.map((color) => {
                        return (
                            <span>
                                <div className='color-circle' style={{ backgroundColor: color }}></div>
                                {color}
                            </span>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CssBattle
