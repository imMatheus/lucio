import React, { useEffect, useState, useRef } from 'react'
import Editor, { useMonaco } from '@monaco-editor/react'
import { generateStarterFile } from './_GenerateStarterFile'
import { problem1 } from '../../css-problems/problem1/problem1.js'

const CssBattle = () => {
    const editorRef = useRef(null)
    const monaco = useMonaco()
    const [currentCode, setCurrentCode] = useState(generateStarterFile())
    const iframeContainerRef = useRef(null)
    const iframeRef = useRef(null)
    const [isHoveringOverIframe, setIsHoveringOverIframe] = useState(false)
    let characterCount
    let frame = iframeRef?.current?.contentWindow?.document
    if (frame) {
        // this renders the code to the iframe
        frame.open()
        frame.write(currentCode)
        frame.close()
    }
    useEffect(() => {
        if (monaco) {
            monaco.editor.defineTheme('myCustomTheme', {
                base: 'vs-dark',
                inherit: true,
                rules: [
                    { token: '', foreground: 'ffffff' }, //everything
                    { token: 'invalid', foreground: '00ff00' },
                    { token: 'emphasis', fontStyle: 'italic' },
                    { token: 'strong', fontStyle: 'bold' },
                    { token: 'variable', foreground: '00ff00' },
                    { token: 'variable.predefined', foreground: '00ff00' },
                    { token: 'constant', foreground: '00ff00' },
                    { token: 'comment', foreground: '7f848e', fontStyle: 'italic' },
                    { token: 'number', foreground: 'd19a66' }, //number
                    { token: 'number.hex', foreground: 'd19a66' },
                    { token: 'regexp', foreground: '56b6c2' }, //rexexp
                    { token: 'annotation', foreground: 'ff00ff' },
                    { token: 'type', foreground: 'E5C07B' }, // promise och math
                    { token: 'delimiter', foreground: 'abb2bf' }, //stuff
                    { token: 'delimiter.html', foreground: 'abb2bf' },
                    { token: 'delimiter.xml', foreground: 'abb2bf' },
                    { token: 'tag', foreground: 'E06C75' },
                    { token: 'tag.id.jade', foreground: 'E06C75' },
                    { token: 'tag.class.jade', foreground: 'E06C75' },
                    { token: 'meta.scss', foreground: 'e7c547' },
                    { token: 'metatag', foreground: 'ff00ff' },
                    { token: 'metatag.content.html', foreground: 'd19a66' },
                    { token: 'metatag.html', foreground: 'E06C75' },
                    { token: 'metatag.xml', foreground: '86b300' },
                    { token: 'metatag.php', fontStyle: 'bold' },
                    { token: 'key', foreground: '00ff00' },
                    { token: 'string.key.json', foreground: '41a6d9' },
                    { token: 'string.value.json', foreground: '86b300' },
                    { token: 'attribute.name', foreground: 'd19a66' },
                    { token: 'attribute.value', foreground: '98c379' },
                    { token: 'attribute.value.number', foreground: '98c379' },
                    { token: 'attribute.value.unit', foreground: '98c379' },
                    { token: 'attribute.value.html', foreground: '98c379' },
                    { token: 'attribute.value.xml', foreground: '98c379' },
                    { token: 'string', foreground: '98c379' }, //strings
                    { token: 'string.html', foreground: 'ff0000' },
                    { token: 'string.sql', foreground: '98c379' },
                    { token: 'string.yaml', foreground: '98c379' },
                    { token: 'keyword', foreground: 'C678DD' },
                    { token: 'keyword.json', foreground: 'C678DD' },
                    { token: 'keyword.flow', foreground: 'C678DD' },
                    { token: 'keyword.flow.scss', foreground: 'C678DD' },
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

    window.onresize = function () {
        editorRef?.current?.layout()
    }

    const handleEditorChange = (value) => {
        setCurrentCode(value)
    }
    // triming all white space and line breaks from our code
    // then setting it to the 'characterCount' varible that gets displayed
    // in the UI
    characterCount = currentCode
        ?.replace(/\n|\r/g, '') // regex is... nice :\
        .split('')
        .filter((word) => word !== ' ').length

    let starterFile = generateStarterFile()
    function handleEditorDidMount(editor) {
        editorRef.current = editor
    }

    // for the resizing of the iframeContainer when hovering
    const resizeOutputHandler = (e) => {
        // setting the width to its offset
        iframeContainerRef.current.style.width = e.nativeEvent.offsetX + 'px'
    }
    // if we are not hovering over the iframeContainer then we set it back to its og width
    if (!isHoveringOverIframe && iframeRef.current) {
        iframeContainerRef.current.style.width = '100%'
    }
    return (
        <div className='cssbattle'>
            <div className='editor'>
                <div className='column-header'>
                    Editor <span>{characterCount} characters</span>
                </div>
                <div className='editor-fraction'></div>
                <div className='editor-resizebar'></div>
                <div className='editor-fraction'></div>
                {/* <Editor
                    height='90vh'
                    theme='myCustomTheme'
                    defaultLanguage='html'
                    onChange={handleEditorChange}
                    onMount={handleEditorDidMount}
                    defaultValue={starterFile}
                    automaticLayout={true}
                    options={{
                        inherit: true,
                        automaticLayout: true,
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
                /> */}
            </div>
            <div className='column-container'>
                <div className='column-header'>
                    Output <span>Slide show</span>
                </div>
                <div
                    onPointerEnter={() => setIsHoveringOverIframe(true)}
                    onPointerLeave={() => setIsHoveringOverIframe(false)}
                    onPointerMove={resizeOutputHandler}
                    className='img-container output-iframe'
                    style={{ backgroundImage: ` url(${problem1.image})` }}
                >
                    {/* needs the scrolling='no' to stop oveflow in the iframe */}
                    <div className='iframe-container' ref={iframeContainerRef}>
                        <iframe title='Web Frame' ref={iframeRef} id='webframeId' scrolling='no'></iframe>
                    </div>
                </div>
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
