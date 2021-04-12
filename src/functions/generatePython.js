const pythonPrint = (name, args) => {
    if (!name) return

    return `\t print(${name}(${args}))`
}

function generatePython(name, args) {
    if (!name || !args) return

    const val = `
#!/bin/python3

import math
import os
import random
import re
import sys
    
# Complete the ${name} function below.
def ${name}(${args}): 
\treturn\n
if __name__ == '__main__': 
\t# Please only edit the ${name} function above 
`

    return val
}

export { generatePython, pythonPrint }
