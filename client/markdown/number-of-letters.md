---
name: 'Number of letters'
difficulty: 'easy'
sampleCases: [
	{
		input: [
			{ input: 'l', type: 'string' },
			{ input: 'helloworld', type: 'string' }
		],
		output: [3]
	},
	{
		input: [
			{ input: 'n', type: 'string' },
			{ input: 'drillmasher', type: 'string' }
		],
		output: [0]
	}
]
submitCases: [
	{
		input: ['e', 'egegeahsdfyegdajebcsdfyegdajebcheavcaebuebu'],
		output: ['10']
	},
	{
		input: ['j', 'gdykajcbaksdnscnsacnkasdknnsd'],
		output: ['10']
	},
	{
		input: ['m', 'memememememememe'],
		output: ['8']
	}
]
inputs: [
	{ input: 'letter', type: 'string' },
	{ input: 's', type: 'string' }
]
---

# Number of letters

### Problem description

Given a string, **S**, and a single letter, **n**, return the number of instances that the letter **n** appears in the string **S**

### Input format

**S** a string containing lowercase letters, **n** a single lowercase letter

### Output

boolean: If the number is a palindrome or not

### Constrains

-   0 &#8804; **S** < 100000
-   **S**[i] &#8712; **a-z**
-   **n** &#8712; **a-z**

### Sample inputs

```bash
"l"
"helloworld"
```

### Sample output

```bash
3
```

### Explanation

In the string **"helloworld"** the letter **l** appears **3** times

### Sample inputs

```bash
"n"
"drillmasher"
```

### Sample output

```bash
0
```

### Explanation

In the string **"drillmasher"** the letter **n** doesn't appears, so we return 0fokus
