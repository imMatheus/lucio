---
name: 'Score the name'
difficulty: 'easy'
sampleCases: [
	{
		input: [{ input: 'LUCIO', type: 'string' }],
		output: [60]
	},
	{
		input: [{ input: 'ABBA', type: 'string' }],
		output: [6]
	}
]
submitCases: [
	{
		input: ['MATHEUSMENDESBARATADEALMEIDA'],
		output: ['244']
	},
	{
		input: ['QWQWASZXDESREGG'],
		output: ['215']
	},
	{
		input: ['ZZZZZZZZA'],
		output: ['209']
	}
]
inputs: [{ input: 'n', type: 'string' }]
---

# Score the name

## Problem description

Given a single name, **n**, calculate the alphabetical value for the letters of the name. The alphabetical value of a letter is it's place in the alphabet. For example the alphabetical value of **c** is _3_ _as_ it's the third letter in the alphabet.

## Input format

**n** a single word containing lowercase letters.

## Output

-   `int`: The _alphabetical_ value of the given name.

## Constrains

-   **n** < 1000
-   **n[i]** &#8712; **[a-z]**

## _1._ Sample inputs

```bash
"lucio"
```

## _1._ Sample output

```bash
60
```

## _1._ Explanation

The `alphabetical` value of each letter in the name, **lucio**, is **12 + 21 + 3 + 9 + 15 = 60**

## _2._ Sample inputs

```bash
"abba"
```

## _2._ Sample output

```bash
6
```

## _2._ Explanation

The alphabetical _value_ of each letter in the name, **abba**, is **1 + 2 + 2 + 1 = 6**

![dunker](/basket.jpeg)
