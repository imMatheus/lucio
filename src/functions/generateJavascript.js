const javascriptPrint = (name, args) => {
    if (!name) return

    return `console.log(${name}(${args}))`
}

function generateJavascript(name, args) {
    if (!name || !args) return

    const val = `//complete the ${name} function below
const ${name} = (${args})=>{
    
}
    `
    return val
}

export { generateJavascript, javascriptPrint }
