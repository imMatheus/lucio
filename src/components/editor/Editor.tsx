import React, { useEffect, useRef } from 'react'

import Editor from '@monaco-editor/react'

interface Props {
    setCurrentCode: React.Dispatch<React.SetStateAction<string>>
}

const EditorComponent: React.FC<Props> = ({ setCurrentCode }: Props) => {
    const editorRef = useRef<any>(null)

    const wrapperRef = useRef<HTMLDivElement>(null)

    function handleEditorDidMount(editor: any) {
        editorRef.current = editor
    }

    const handleEditorChange = (code: any) => {
        setCurrentCode(code)
    }

    return (
        <div className='editor-wrapper' ref={wrapperRef}>
            <Editor
                theme='vs-light'
                language={'javascript'}
                onChange={(value) => handleEditorChange(value)}
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
