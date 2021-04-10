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
    `

    return val
}
