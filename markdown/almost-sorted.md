# Almost Sorted

### Problem description

Given an array of integers, determine whether the array can be sorted in ascending order using only one of the following operations one time.

-   Swap two elements.
-   Reverse one sub-segment.

Determine whether one, both or neither of the operations will complete the task. Output is as follows.

-   If the array is already sorted, output **yes** on the first line. You do not need to output anything else.
-   If you can sort this array using one single operation (from the two permitted operations) then output **yes** on the first line and then:
    -   If elements can only be swapped, **d[p]** and **d[q]**, output **swap p q** in the second line. **p** and **q** are the indices of the elements to be swapped, assuming that the array is indexed from **1** to **n**.
    -   If elements can only be reversed, for the segment **d[p...q]**, output reverse **p q** in the second line. **p** and **q** are the indices of the first and last elements of the subarray to be reversed, assuming that the array is indexed **1** from **n** to . Here **d[p...q]** represents the subarray that begins at index **p** and ends at index **q**, both inclusive.

If an array can be sorted both ways, by using either swap or reverse, choose swap.

-   If the array cannot be sorted either way, output no on the first line.

### Input format

The first line contains a single integer **n**, the size of **arr**. The next line contains n space-separated integers **arr[i]** where **1 ≤ i ≤ n**.

### Output

int: the length of the longest subset of **S** meeting the criteria

### Constrains

-   **2 ≤ n ≤ 100000**

-   **0 ≤ arr[i] ≤ 1000000**

-   All **arr[i]** are distinct

### Sample inputs

```bash
[3, 1, 2]
```

### Sample output

```bash
no
```

### Explanation

It is impossible to sort by one single operation.

### Sample inputs

```bash
[1, 5, 4, 3, 2, 6]
```

### Sample output

```bash
yes reverse 2 5
```

### Explanation

You can reverse the sub-array **d[2...5]** = "5 4 3 2", then the array becomes sorted.

### Sample inputs

```bash
[1, 2, 5, 4, 3, 6]
```

### Sample output

```bash
yes swap 3 5
```
