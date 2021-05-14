import { useEffect, useRef } from 'react'

import Editor, { useMonaco } from '@monaco-editor/react'

const EditorComponent = ({ language, setter, starterCode, setJs, setPy }) => {
    const monaco = useMonaco()
    const editorRef = useRef(null)
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
        // fetch('/themes/Monokai.json')
        //     .then((data) => data.json())
        //     .then((data) => {
        //         console.log(data)
        //         monaco.editor.defineTheme('monokai', data)
        //         monaco.editor.setTheme('monokai')
        //     })
    }, [monaco])

    function handleEditorDidMount(editor) {
        editorRef.current = editor
        setter(editorRef.current?.getValue())
        if (language === 'javascript') {
            setJs(editorRef.current?.getValue())
        } else {
            setPy(editorRef.current?.getValue())
        }
        // setLanguage('css')
        console.log(language)
    }

    window.onresize = function () {
        editorRef?.current?.layout()
    }

    const handleEditorChange = (value) => {
        setter(value)
        if (language === 'javascript') {
            setJs(editorRef.current?.getValue())
        } else {
            setPy(editorRef.current?.getValue())
        }
    }

    // early return if we don't have language
    if (!language) return null
    console.log(language)
    return (
        <div className='editor-component'>
            {/* <div className='header'>{language.toUpperCase()}</div> */}
            {/* {language} */}
            <span></span>
            <Editor
                ref={editorRef}
                height='100%'
                theme='myCustomTheme'
                language={language}
                onChange={handleEditorChange}
                onMount={handleEditorDidMount}
                value={starterCode}
                automaticLayout={true}
                options={{
                    inherit: true,
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    minimap: {
                        enabled: false,
                    },
                    scrollbar: {
                        alwaysConsumeMouseWheel: true,
                    },
                    fontSize: 16,
                    // cursorStyle: 'block',
                    wordWrap: 'on',
                    // wordWrap: 'wordWrapColumn',
                    // wordWrapColumn: 90,
                    // Set this to false to not auto word wrap minified files
                    wordWrapMinified: true,
                    // try "same", "indent" or "none"
                    wrappingIndent: 'same',
                }}
            />
        </div>
    )
}

export default EditorComponent
