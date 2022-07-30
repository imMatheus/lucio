---
name: 'Palindrome number'
difficulty: 'easy'
sampleCases: [
	{
		input: [{ input: '121', type: 'integer' }],
		output: ['true']
	},
	{
		input: [{ input: '69', type: 'integer' }],
		output: ['false']
	},
	{
		input: [{ input: '-919', type: 'integer' }],
		output: ['false']
	}
]
submitCases: [
	{
		input: ['987'],
		output: ['false']
	},
	{
		input: ['111'],
		output: ['true']
	},
	{
		input: ['1001'],
		output: ['true']
	},
	{
		input: ['9'],
		output: ['true']
	},
	{
		input: ['123456789'],
		output: ['false']
	}
]
inputs: [{ input: 'x', type: 'integer' }]
---

# Palindrome number

### Problem description

Given an integer **x**, return true if **x** is palindrome integer. An integer is a palindrome when it reads the same backward as forward. For example, **121** is palindrome while **123** is not.

### Input format

**x** a integer

### Output

boolean: If the number is a palindrome or not

### Constrains

-   -10000 < **x** < 10000

### Sample inputs

```bash
121
```

### Sample output

```bash
true
```

### Sample inputs

```bash
69
```

### Sample output

```bash
false
```

### Sample inputs

```bash
-22
```

### Sample output

```bash
false
```
