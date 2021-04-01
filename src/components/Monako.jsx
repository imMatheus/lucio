import React, { useEffect, useRef } from 'react'

import Editor, { useMonaco } from '@monaco-editor/react'

const Monako = () => {
    let x = 2

    console.log(x++)
    const monaco = useMonaco()
    const editorRef = useRef(null)
    const defaultValue = 'hell \nksk \nuaha \n'
    const initialEditorValue = `\nfunction solveMeFirst(a, b) {
    // Hint: Type return a+b below 
}`

    console.log(initialEditorValue)
    function handleEditorChange(value, event) {
        console.log('here is the current model value:', value, 'event:', event)
    }
    useEffect(() => {
        if (monaco) {
            console.log('here is the monaco isntance:', monaco)
        }
    }, [monaco])
    return (
        <div>
            <Editor
                onChange={handleEditorChange}
                height='90vh'
                defaultLanguage='javascript'
                defaultValue={initialEditorValue}
            />
        </div>
    )
}

export default Monako
