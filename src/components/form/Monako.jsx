import React, { useEffect, useState } from 'react'

import Editor, { useMonaco } from '@monaco-editor/react'
import File from './File'
// https://www.npmjs.com/package/@monaco-editor/react
const Monako = ({ mref }) => {
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
            // import('monaco-themes/themes/Monokai.json').then((data) => {
            //     monaco.editor.defineTheme('monokai', data)
            //     monaco.editor.setTheme('monokai')
            //     console.log(data)
            // })

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
            // import('monaco-themes/themes/Sunburst.json').then((data) => {
            //     monaco.editor.defineTheme('Sunburst', data)
            //     monaco.editor.setTheme('Sunburst')
            //     console.log(data)
            // })
        }
    }, [monaco])

    return (
        <div className='editor' ref={mref}>
            <div className='files'>
                <File file='script.js' fileName={fileName} setFileName={setFileName} />
                <File file='style.css' fileName={fileName} setFileName={setFileName} />
                <File file='index.html' fileName={fileName} setFileName={setFileName} />
            </div>

            <Editor
                // height='0vh'
                theme='vs-dark'
                path={file.name}
                defaultLanguage={file.language}
                defaultValue={file.value}
                options={{
                    inherit: true,
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
