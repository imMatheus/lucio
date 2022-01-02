---
name: 'Counting valleys'
difficulty: 'medium'
sampleCases: [
	{
		input: [
			{ input: '8', type: 'integer' },
			{ input: '"UDDDUDUU"', type: 'string' }
		],
		output: [1]
	},
	{
		input: [
			{ input: '6', type: 'integer' },
			{ input: '"DUDUDU"', type: 'string' }
		],
		output: ['3']
	}
]
submitCases: [
	{
		input: ['26', '"DDUDUUUUDDUUDDUDUDUDUDUDDU"'],
		output: ['2']
	},
	{
		input: ['28', '"DUDUDUDUDUDUDUDUDDUDUDUDDUUU"'],
		output: ['9']
	},
	{
		input: ['48','"DUDUDUDUDUDUDUDUDUDUDUDUDUDUDUDUDDUDDUDUDUDUDUUU"'],
		output: ['17']
	},
	{
		input: ['16', '"UUUUUUUUDDDDDDDD"'],
		output: ['0']
	}
]
inputs: [
	{ input: 'steps', type: 'integer' },
	{ input: 'path', type: 'string' }
]
---

# Counting valleys

### Problem description

An avid hiker keeps meticulous records of their hikes. During the last hike that took exactly **steps** steps, for every step it was noted if it was an uphill, **U**, or a downhill, **D** step. Hikes always start and end at sea level, and each step up or down represents a **1** unit change in altitude.

-   A level
-   A valley is a sequence of consecutive steps below sea level, starting with a step down from sea level and ending with a step up to sea level.
    Given the sequence of up and down steps during a hike, find and print the number of valleys walked through.

### Input format

The first line contains an integer **steps**, the number of steps in the hike. The second line contains a single string **path**, of **steps** characters that describe the path.

### Output

int: The number of valleys traveled.

### Constrains

-   **2** < _steps_ < _10000_
-   **path[i]** = **"U"** or **path[i]** = **"D"**

### Counting Valleys

```bash
8
"UDDDUDUU"
```

### Sample output

```bash
1
```

### Explanation

If we represent **\_** as sea level, a step up as **&#47;**, and a step down as **&#92;**, the hike can be drawn as:

```bash
 _/\      _
    \    /
     \/\/
```

we can se that there is only one valley that our hikers travel thru as they enter a valley once and never come up until the last step

### Sample inputs

```bash
6
"DUDUDU"
```

### Sample output

```bash
3
```
