---
name: 'Multiplication'
difficulty: 'easy'
sampleCases: [
	{
		input: [
			{ input: '10', type: 'integer' },
			{ input: '10', type: 'integer' }
		],
		output: [100]
	},
	{
		input: [
			{ input: '5', type: 'integer' },
			{ input: '3', type: 'integer' }
		],
		output: ['15']
	}
]
submitCases: [
	{
		input: ['69', '69'],
		output: ['4761']
	},
	{
		input: ['7', '7'],
		output: ['0']
	},
	{
		input: ['1', '70'],
		output: ['70']
	},
	{
		input: ['-120', '3'],
		output: ['-120']
	}
]
inputs: [
	{ input: 'x', type: 'integer' },
	{ input: 'y', type: 'integer' }
]
---

# Multiplication

### Problem description

Given two numbers, **x**, **y**, return the product of **x** \* **y**

### Input format

**x** a integer, **y** a integer

### Output

int: the product of **x** \* **y**

### Constrains

-   -1000 < **x** < 1000
-   -1000 < **y** < 1000

### Sample inputs

```bash
30
3
```

### Sample output

```bash
90
```

### Explanation

30 \* 3 = 90

### Sample inputs

```bash
3
5
```

### Sample output

```bash
15
```
