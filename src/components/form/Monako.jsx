import React, { useEffect, useState } from 'react'

import Editor, { useMonaco } from '@monaco-editor/react'
// https://www.npmjs.com/package/@monaco-editor/react
const Monako = () => {
    const monaco = useMonaco()

    const files = {
        'script.js': {
            name: 'script.js',
            language: 'javascript',
            value: `
for (i = 0, len = keys.length; i < len; i++) {
    var key = keys[i];
    var enumerable = key.charCodeAt(0) !== /*_*/95;
    var member = members[key];
    if (member && typeof member === 'object') {
        if (member.value !== undefined || typeof member.get === 'function' || typeof member.set === 'function') {
            if (member.enumerable === undefined) {
                member.enumerable = enumerable;
            }
            properties = properties || {};
            properties[key] = member;
            continue;
        } 
    }
    if (!enumerable) {
        properties = properties || {};
        properties[key] = { value: member, enumerable: enumerable, configurable: true, writable: true }
        continue;
    }
    target[key] = member;
}
            `,
        },
        'style.css': {
            name: 'style.css',
            language: 'css',
            value: `
            html {
                background-color: #e2e2e2;
                margin: 0;
                padding: 0;
            }
            
            body {
                background-color: #fff;
                border-top: solid 10px #000;
                color: #333;
                font-size: .85em;
                font-family: "Segoe UI","HelveticaNeue-Light", sans-serif;
                margin: 0;
                padding: 0;
            }`,
        },
        'index.html': {
            name: 'index.html',
            language: 'html',
            value: `
            <!DOCTYPE HTML>
            <!--Example of comments in HTML-->
            <html>
            <head>
                <!--This is the head section-->
                <title>HTML Sample</title>
                <meta charset="utf-8">
            
                <!--This is the style tag to set style on elements-->
                <style type="text/css">
                    h1
                    {
                        font-family: Tahoma;
                        font-size: 40px;
                        font-weight: normal;
                        margin: 50px;
                        color: #a0a0a0;
                    }
            
                    h2
                    {
                        font-family: Tahoma;
                        font-size: 30px;
                        font-weight: normal;
                        margin: 50px;
                        color: #fff;
                    }
            
                    p
                    {
                        font-family: Tahoma;
                        font-size: 17px;
                        font-weight: normal;
                        margin: 0px 200px;
                        color: #fff;
                    }
            
                    div.Center
                    {
                        text-align: center;
                    }
            
                    div.Blue
                    {
                        padding: 50px;
                        background-color: #7bd2ff;
                    }
            
                    button.Gray
                    {
                        font-family: Tahoma;
                        font-size: 17px;
                        font-weight: normal;
                        margin-top: 100px;
                        padding: 10px 50px;
                        background-color: #727272;
                        color: #fff;
                        outline: 0;
                            border: none;
                            cursor: pointer;
                    }
            
                    button.Gray:hover
                    {
                        background-color: #898888;
                    }
            
                    button.Gray:active
                    {
                        background-color: #636161;
                    }
            
                </style>
            
                <!--This is the script tag-->
                <script type="text/javascript">
                    function ButtonClick(){
                        // Example of comments in JavaScript
                        window.alert("I'm an alert sample!");
                    }
                </script>
            </head>
            <body>
                <!--This is the body section-->
                <div class="Center">
                    <h1>NAME OF SITE</h1>
                </div>
                <div class="Center Blue">
                        <h2>I'm h2 Header! Edit me in &lt;h2&gt;</h2>
                        <p>
                            I'm a paragraph! Edit me in &lt;p&gt;
                            to add your own content and make changes to the style and font.
                            It's easy! Just change the text between &lt;p&gt; ... &lt;/p&gt; and change the style in &lt;style&gt;.
                            You can make it as long as you wish. The browser will automatically wrap the lines to accommodate the
                            size of the browser window.
                        </p>
                        <button class="Gray" onclick="ButtonClick()">Click Me!</button>
                </div>
            </body>
            </html>`,
        },
    }

    const [fileName, setFileName] = useState('script.js')
    const file = files[fileName]

    useEffect(() => {
        if (monaco) {
            console.log('here is the monaco isntance:')
            import('monaco-themes/themes/Monokai.json').then((data) => {
                monaco.editor.defineTheme('monokai', data)
                monaco.editor.setTheme('monokai')
                console.log(data)
            })
            // import('monaco-themes/themes/Sunburst.json').then((data) => {
            //     monaco.editor.defineTheme('Sunburst', data)
            //     monaco.editor.setTheme('Sunburst')
            //     console.log(data)
            // })
        }
    }, [monaco])

    return (
        <div className='editor'>
            <button disabled={fileName === 'script.js'} onClick={() => setFileName('script.js')}>
                script.js
            </button>
            <button disabled={fileName === 'style.css'} onClick={() => setFileName('style.css')}>
                style.css
            </button>
            <button disabled={fileName === 'index.html'} onClick={() => setFileName('index.html')}>
                index.html
            </button>
            <Editor
                height='90vh'
                theme='monakai'
                path={file.name}
                defaultLanguage={file.language}
                defaultValue={file.value}
                options={{
                    inherit: true,
                    rules: [
                        { token: 'comment', foreground: 'f00', background: '0f0', fontStyle: 'italic underline' },
                        { token: 'comment.js', foreground: '008800', fontStyle: 'bold' },
                        {
                            token: 'comment.css',
                            foreground: '0000ff',
                            fontStyle: 'bold',
                            inherit: false,
                            background: '808080',
                        },
                    ],

                    minimap: {
                        enabled: false,
                    },
                    fontSize: 13,
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
    )
}

export default Monako
