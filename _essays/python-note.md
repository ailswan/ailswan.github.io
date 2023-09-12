---
layout: essay_single
title: Python language note
date: 2023-09-12
tags:
  - language
 
categories:
- Notes
feature_text: |
  ## Python language note
  Post by ailswan Sep. 12, 2023
feature_image: "https://picsum.photos/2560/600?image=865"
---

### Summary
This document provides a list of common Python methods and functions spanning various categories like string manipulation, list operations, and more.

### **String Methods**:
- `s.split()`: Split string into list.
- `s.strip()`: Remove whitespace.
- `s.startswith(prefix)`: Check if starts with prefix.
- `s.endswith(suffix)`: Check if ends with suffix.
- `s.find(sub)`: Find substring.
- `s.replace(old, new)`: Replace substring.
- `s.upper()`: Convert to uppercase.
- `s.lower()`: Convert to lowercase.

### **List Methods**:
- `lst.append(item)`: Add item to list.
- `lst.extend(iterable)`: Extend list with iterable.
- `lst.insert(index, item)`: Insert item at index.
- `lst.remove(item)`: Remove first occurrence of item.
- `lst.pop(index)`: Remove item at index.
- `lst.index(item)`: Return index of item.
- `lst.sort()`: Sort list.
- `lst.reverse()`: Reverse list.

### **Set Methods**:
- `set.add(item)`: Add item to set.
- `set.remove(item)`: Remove item from set.
- `set.discard(item)`: Remove item if exists.
- `set.pop()`: Remove and return an item.
- `set.intersection(other_set)`: Return intersection.
- `set.union(other_set)`: Return union.

### **Dictionary Methods**:
- `dict.keys()`: Get keys.
- `dict.values()`: Get values.
- `dict.items()`: Get key-value pairs.
- `dict.get(key, default)`: Get value for key with default.
- `dict.setdefault(key, default)`: Get value or set default.
- `dict.pop(key)`: Remove key-value pair.
- `dict.update(other_dict)`: Update dictionary.

### **collections**:
- `collections.Counter(iterable)`: Count elements.
- `collections.namedtuple(typename, field_names)`: Create tuple subclass.
- `collections.OrderedDict()`: Maintain order.
- `collections.defaultdict(default_type)`: Dictionary with default value.
- `collections.deque()`: Double-ended queue.

### **Looping Techniques**:
- `enumerate(iterable)`: Loop with index.
- `zip(iterable1, iterable2,...)`: Loop over multiple iterables.
- `reversed(iterable)`: Loop in reverse.
- `sorted(iterable, key=..., reverse=...)`: Sort iterable.

### **Functional Programming Tools**:
- `lambda`: Anonymous function.
- `map(func, iterable)`: Apply function.
- `filter(func, iterable)`: Filter by function.
- `functools.reduce(func, iterable)`: Accumulate values.

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
