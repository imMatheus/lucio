---
name: 'Simple addition'
difficulty: 'easy'
sampleCases: [
	{
		input: [
			{ input: '9', type: 'integer' },
			{ input: '6', type: 'integer' }
		],
		output: [15],
	},
	{
		input: [
			{ input: '108', type: 'integer' },
			{ input: '12', type: 'integer' }
		],
		output: [120]
	}
]
submitCases: [
	{
		input: ['-981', '-54'],
		output: ['-1035']
	},
	{
		input: ['69', '69'],
		output: ['138']
	},
	{
		input: ['12', '12'],
		output: ['24']
	},
	{
		input: ['35', '-35'],
		output: ['0']
	}
]
inputs: [	
    { input: 'a', type: 'integer' },
	{ input: 'b', type: 'integer' }
]
---

# Simple addition

### Problem description

Given two integers, **a** and **b**, return the sum of **a** + **b**

### Input format

**a** a integer, **b** a integer

### Output

int: the sum of **a** + **b**

### Constrains

-   -1000 < **a** < 1000
-   -1000 < **b** < 1000

### Sample inputs

```bash
9
6
```

### Sample output

```bash
15
```

### Explanation

9 + 6 = 15

### Sample inputs

```bash
108
12
```

### Sample output

```bash
120
```
