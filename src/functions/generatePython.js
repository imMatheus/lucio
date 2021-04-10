export default function generatePython(name, args) {
    const val = `
#!/bin/python3

import math
import os
import random
import re
import sys
    
# Complete the ${name} function below.
def ${name}(${args}):

if __name__ == '__main__': 
    # Please only edit the ${name} function above 
`

    return val
}
