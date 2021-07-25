import React, { useEffect, useRef } from 'react'

import Editor, { useMonaco } from '@monaco-editor/react'

const EditorComponent: React.FC = () => {
    const editorRef = useRef(null)
    console.log(1)

    function handleEditorDidMount(editor: any) {
        editorRef.current = editor
    }

    const handleEditorChange = () => console.log('change')

    return (
        <div className='editor-component'>
            <span></span>
            <Editor
                height='100vh'
                theme='myCustomTheme'
                language={'javascript'}
                onChange={handleEditorChange}
                onMount={handleEditorDidMount}
                value={'hje'}
            />
        </div>
    )
}

export default EditorComponent
