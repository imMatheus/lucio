import { useEffect, useRef } from 'react'

import Editor, { useMonaco } from '@monaco-editor/react'

const EditorComponent = ({ language, setter, starterCode }) => {
    const monaco = useMonaco()
    const editorRef = useRef(null)
    useEffect(() => {
        if (monaco) {
            monaco.editor.defineTheme('myCustomTheme', {
                base: 'vs-dark',
                inherit: true,
                rules: [
                    { token: '', foreground: 'ffffff' }, //everything
                    { token: 'invalid', foreground: 'd19a66' },
                    { token: 'emphasis', fontStyle: 'italic' },
                    { token: 'strong', fontStyle: 'bold' },
                    { token: 'variable', foreground: 'd19a66' },
                    { token: 'variable.predefined', foreground: 'd19a66' },
                    { token: 'constant', foreground: 'd19a66' },
                    { token: 'comment', foreground: '7f848e', fontStyle: 'italic' },
                    { token: 'number', foreground: 'd19a66' }, //number
                    { token: 'number.hex', foreground: 'd19a66' },
                    { token: 'regexp', foreground: '56b6c2' }, //rexexp
                    { token: 'annotation', foreground: '98c379' },
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
                    { token: 'key', foreground: 'd19a66' },
                    { token: 'string.key.json', foreground: '41a6d9' },
                    { token: 'string.value.json', foreground: '86b300' },
                    { token: 'attribute.name', foreground: 'd19a66' },
                    { token: 'attribute.value', foreground: '98c379' },
                    { token: 'attribute.value.number', foreground: '98c379' },
                    { token: 'attribute.value.unit', foreground: '98c379' },
                    { token: 'attribute.value.html', foreground: '98c379' },
                    { token: 'attribute.value.xml', foreground: '98c379' },
                    { token: 'string', foreground: '98c379' }, //strings
                    { token: 'string.html', foreground: '98c379' },
                    { token: 'string.sql', foreground: '98c379' },
                    { token: 'string.yaml', foreground: '98c379' },
                    { token: 'keyword', foreground: 'C678DD' },
                    { token: 'keyword.json', foreground: 'C678DD' },
                    { token: 'keyword.flow', foreground: 'C678DD' },
                    { token: 'keyword.flow.scss', foreground: 'C678DD' },
                    { token: 'operator.scss', foreground: '666666' },
                    { token: 'operator.sql', foreground: '778899' },
                    { token: 'operator.swift', foreground: '666666' },
                    { token: 'predefined.sql', foreground: '98c379' },
                ],

                colors: {
                    'editor.background': '#282C34',
                },
            })
            monaco.editor.setTheme('myCustomTheme')
        }
    }, [monaco])

    function handleEditorDidMount(editor) {
        editorRef.current = editor
        setter(editorRef.current.getValue())
    }

    window.onresize = function () {
        editorRef?.current?.layout()
    }

    const handleEditorChange = (value) => {
        setter(value)
    }

    // early return if we don't have language
    if (!language) return null
    return (
        <div className='editor-component'>
            <div className='header'>{language.toUpperCase()}</div>
            <Editor
                height='100%'
                theme='myCustomTheme'
                defaultLanguage={language}
                onChange={handleEditorChange}
                onMount={handleEditorDidMount}
                defaultValue={starterCode}
                value={starterCode}
                automaticLayout={true}
                options={{
                    inherit: true,
                    automaticLayout: true,
                    scrollBeyondLastLine: true,
                    minimap: {
                        enabled: false,
                    },
                    fontSize: 17,
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
