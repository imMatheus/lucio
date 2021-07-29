import React, { useEffect, useRef } from 'react'

import Editor from '@monaco-editor/react'

const EditorComponent: React.FC = () => {
    const editorRef = useRef<any>(null)

    const wrapperRef = useRef<HTMLDivElement>(null)
    console.log(1)

    function handleEditorDidMount(editor: any) {
        editorRef.current = editor
    }

    window.onresize = function () {
        console.log('123')
    }

    if (wrapperRef.current) {
        wrapperRef.current.addEventListener('resize', () => console.log('gg go next'))
        console.log('hej')
        window.onresize = function () {
            editorRef.current!.layout()
            console.log('aaa')
        }
        wrapperRef.current.onresize = function () {
            console.log('ooooo')
        }
    }

    const handleEditorChange = () => console.log('change')

    return (
        <div className='editor-wrapper' ref={wrapperRef}>
            <Editor
                height='100%'
                width='100%'
                theme='vs-dark'
                language={'typescript'}
                onChange={handleEditorChange}
                onMount={handleEditorDidMount}
                options={{
                    automaticLayout: true,
                    minimap: {
                        enabled: false,
                    },
                    wordWrap: 'on',
                    wrappingIndent: 'same',
                    scrollBeyondLastLine: false,
                    scrollbar: {
                        alwaysConsumeMouseWheel: false,
                        horizontal: 'visible',
                        vertical: 'visible',
                    },
                    // scrolling: true,
                    fontSize: 16,
                    // cursorStyle: 'block',
                    // wordWrap: 'wordWrapColumn',
                    // wordWrapColumn: 90,
                    // Set this to false to not auto word wrap minified files
                    // try "same", "indent" or "none"
                }}
                value={'hde'}
            />
        </div>
    )
}

export default EditorComponent
