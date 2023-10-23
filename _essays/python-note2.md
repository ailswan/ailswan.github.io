---
layout: essay_single
title: Python One-Liners
date: 2023-10-10
tags:
   - python language
categories:
- Notes
feature_text: |
  ## Python One-Liners
  Post by ailswan Oct.10 , 2023
feature_image: "https://picsum.photos/2560/600?image=865"
---

### Tricky Python One-Liners

**Swap Two Variables**:
- `a, b = b, a`: Swap values of `a` and `b` in just one line.

**Flatten a List of Lists**:
- `flat_list = [item for sublist in list_of_lists for item in sublist]`: Turn a nested list into a flat list.

**Factorial Using `lambda`**:
- `factorial = lambda x: 1 if x == 0 else x * factorial(x-1)`: Calculate the factorial of a number.

**Find All Unique Values in a List**:
- `unique = list(set(my_list))`: Get unique values from a list.

**Calculate Fibonacci Sequence**:
- `fib = lambda x: x if x <= 1 else fib(x-1) + fib(x-2)`: Compute the Fibonacci number.

**Transpose a Matrix**:
- `transposed = zip(*matrix)`: Transpose a given matrix.

**One-liner If-Else Assignment**:
- `value = "even" if n % 2 == 0 else "odd"`: Assign value based on a condition.

**Multiple Assignments**:
- `a, b, c = 1, 2, 3`: Assign multiple variables in a single line.

**Check If All Items in List Are Equal**:
- `all_equal = all(x == my_list[0] for x in my_list)`: Check if all items in the list are the same.

**Check If Any Item in Matrix is Zero**:
- `zero_exists = any(matrix[i][j] == 0 for i in range(m) for j in range(n))`: Check if any item in the matrix is zero.

**Get the Mode of a List**:
- `mode = max(set(my_list), key = my_list.count)`: Get the most frequent item from a list.

**Chain Comparison**:
- `is_between = 1 < a < 10`: Check if a number is between two values.

**Remove Dictionary Keys from a Set**:
- `wordList -= set(q.keys())`: Remove keys of dictionary `q` from the set `wordList`.

**Sorting with Old-Style Comparison using `cmp_to_key`**:
- `sorted_lst = sorted(lst, key=cmp_to_key(lambda x, y: -1 if x < y else (1 if x > y else 0)))`: Sorts a list `lst` using old-style comparison via `cmp_to_key`.


**Add Neighboring Grid Positions to Stack**:
- `stack += (i, j - 1), (i, j + 1), (i - 1, j), (i + 1, j)`: Add up, down, left, and right positions of a grid cell (i, j) to a stack.

**function as numpy.prod**:
- `res = reduce(lambda x, y: x * y, nums, 1)`: Add up, down, left, and right positions of a grid cell (i, j) to a stack.