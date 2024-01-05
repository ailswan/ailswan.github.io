---
layout: essay_single
title: Python language note
date: 2023-09-12
tags:
  - python language
 
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
- `s.isalnum()`: Check if string is alphanumeric.

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

### **Bisect Methods**:
- `bisect.bisect_left(a, x)`: Locate the insertion point for `x` in `a` to maintain sorted order. If `x` is already present in `a`, the insertion point will be before (to the left of) any existing entries.
- `bisect.bisect_right(a, x)`: Locate the insertion point for `x` in `a` to maintain sorted order. If `x` is already present in `a`, the insertion point will be after (to the right of) any existing entries. This is equivalent to `bisect.bisect()`.
- `bisect.insort_left(a, x)`: Insert `x` in `a` in sorted order. If `x` is already present in `a`, the insertion point will be before (to the left of) any existing entries.
- `bisect.insort_right(a, x)`: Insert `x` in `a` in sorted order. If `x` is already present in `a`, the insertion point will be after (to the right of) any existing entries.


**Noteworthy Differences**:

### **In-Place vs. Return Value**:
- `list.sort()` vs `sorted(list)`:
    - `list.sort()`: Modifies the list in-place and returns `None`. This means the original list is changed and you don't get a new list back.
    - `sorted(list)`: Returns a new sorted list, leaving the original list unmodified.
- `list.reverse()` vs `reversed(list)`:
    - `list.reverse()`: Modifies the list in-place.
    - `reversed(list)`: Returns a reverse iterator. To convert to a list: `list(reversed(original_list))`.

### **String Operations**:
Strings in Python are immutable. This means they cannot be changed after they are created. So, any operation on a string always produces a new string.
- For example:
    - `s.strip()`: Returns a new string with whitespace removed from both ends. The original string `s` remains unchanged.
    - `ord(char)`: Convert a single character to its corresponding ASCII value.
        * Example: `ord('A')` returns 65. 
        * Use Case: Useful for arithmetic with characters, e.g., converting spreadsheet column names ('A' to 'Z', 'AA' to 'ZZ', etc.) to numbers.


### **Set and Dictionary Operations**:
Most of the set and dictionary methods change the set or dictionary in-place. However, some operations, like union (`|`) or intersection (`&`) between two sets, return new sets.

### **Functional Programming Tools**:
- `map()` and `filter()`: Return iterators. To convert to a list: `list(map(func, iterable))` or `list(filter(func, iterable))`.
- `functools.reduce()`: Accumulates a single result. For example, using it to sum a list of numbers would return a single number.



### **Lambda Functions in Different Scenarios**:

Lambda functions offer a concise way to create simple functions. Here are several typical use cases:

1. **Filtering**:
    - Filtering out even numbers from a list:
        ```python
        nums = [1, 2, 3, 4, 5]
        evens = filter(lambda x: x % 2 == 0, nums)
        ```

2. **Mapping**:
    - Squaring all numbers in a list:
        ```python
        nums = [1, 2, 3, 4, 5]
        squares = map(lambda x: x**2, nums)
        ```

3. **Reduce**:
    - Multiplying all elements of a list:
        ```python
        from functools import reduce
        nums = [1, 2, 3, 4]
        result = reduce(lambda x, y: x * y, nums)
        ```

4. **Using with `max()` and `min()`**:
    - Finding the longest string in a list:
        ```python
        words = ["apple", "banana", "cherry"]
        longest = max(words, key=lambda s: len(s))
        ```

5. **List Comprehensions**:
    - Using lambda within list comprehensions to adjust values:
        ```python
        nums = [1, 2, 3, 4]
        squared = [lambda x: x**2 for x in nums]
        ```

6. **Event Callbacks**:
    - Used in GUIs or event-driven programming to execute an action when an event occurs.

7. **Custom Sorting**:
    - As you mentioned, for `list.sort()` or `sorted()` to provide custom sort orders.
8. **Deep copy**:
    - original_array = `[[1, 2, 3], [4, 5, 6], [7, 8, 9]]`
    - copied_array = `[row[:] for row in original_array]]`
### **Looping Through Dictionaries**:
1. **Loop through keys**:
    ```python
    for key in my_dict:
        print(key)
    ```
2. **Loop through values**:
    ```python
    for value in my_dict.values():
        print(value)
    ```
3. **Loop through both keys and values**:
    ```python
    for key, value in my_dict.items():
        print(key, value)
    ```


### **Bitwise Operations**:

Python supports the following bitwise operations:

- `&`: Bitwise AND
- `|`: Bitwise OR
- `^`: Bitwise XOR
- `~`: Bitwise NOT
- `<<`: Left shift
- `>>`: Right shift

#### **Functions and Methods**:
- `bin(x)`: Convert an integer number to a binary string. The result will be a valid Python expression.
    - Example:
        ```python
        print(bin(10))  # Output: '0b1010'
        ```

- `int(x, 2)`: Convert a binary string back to an integer.
    - Example:
        ```python
        print(int('1010', 2))  # Output: 10
        ```

- `x.bit_length()`: Return the number of bits necessary to represent an integer in binary, excluding the sign and leading zeros.
    - Example:
        ```python
        num = 5
        print(num.bit_length())  # Output: 3
        ```

#### **Usage Examples**:

1. **Bitwise AND**:
    ```python
    a, b = 12, 15
    result = a & b
    print(bin(result))  # Output: '0b1100'
    ```

2. **Bitwise OR**:
    ```python
    a, b = 12, 15
    result = a | b
    print(bin(result))  # Output: '0b1111'
    ```

3. **Bitwise XOR**:
    ```python
    a, b = 12, 15
    result = a ^ b
    print(bin(result))  # Output: '0b0011'
    ```

4. **Bitwise NOT**:
    ```python
    a = 12
    result = ~a
    print(bin(result))  # Output: '-0b1101'
    ```

5. **Left Shift**:
    ```python
    a = 5
    result = a << 1
    print(bin(result))  # Output: '0b1010'
    ```

6. **Right Shift**:
    ```python
    a = 5
    result = a >> 1
    print(bin(result))  # Output: '0b10'
    ```

## Caching with `functools.lru_cache`

In some cases, especially when dealing with recursive functions or functions with expensive computations, it's beneficial to use caching to avoid redundant calculations. Python provides the `functools.lru_cache` decorator for this purpose.

### Example: Memoizing a Recursive Function

Consider the following recursive Fibonacci function:

```python
from functools import lru_cache

@lru_cache(None)
def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n - 1) + fibonacci(n - 2)
```
## Heapq Methods

Python's `heapq` module provides an efficient implementation of heap queue algorithms. A heap is a specialized tree-based data structure that satisfies the heap property.
### **Heapq Methods**:

- `heapq.heapify(iterable)`: Transform the iterable into a heap, in-place.
- `heapq.heappop(heap)`: Pop and return the smallest item from the heap, maintaining the heap property.
- `heapq.heappush(heap, item)`: Push the value onto the heap, maintaining the heap property.
- `heapq.heappushpop(heap, item)`: Push item onto the heap, then pop and return the smallest item from the heap.
- `heapq.heapreplace(heap, item)`: Pop and return the smallest item from the heap, and then push item. The heap size remains unchanged.
- `heapq.nlargest(n, iterable, key=None)`: Return the n largest elements from the iterable.
- `heapq.nsmallest(n, iterable, key=None)`: Return the n smallest elements from the iterable.

#### **Usage Examples**:
1. **heapify** 
  ```python
  import heapq
  data = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
  heapq.heapify(data)
  ```
2. **heappop**: 
  ```python
    import heapq
    heap = [0, 1, 2, 3, 5, 9, 4, 6, 5, 3, 5]
    smallest = heapq.heappop(heap)
  ```
3. **heappush**: 
  ```python
  import heapq
  heap = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
  heapq.heappush(heap, 0)
  ```
4. **heappush**: 
  ```python
  import heapq
  heap = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
  heapq.heappush(heap, 0)
  ```
5. **heapreplace**: 
  ```python
  import heapq
  heap = [1, 3, 5, 7, 9]
  replaced = heapq.heapreplace(heap, 8)
  ```
6. **nlargest**: 
  ```python
  import heapq
  data = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
  largest_three = heapq.nlargest(3, data)
  ```
7. **nsmallest**: 
  ``` python
  import heapq
  data = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
  smallest_three = heapq.nsmallest(3, data)
  ```

### **Random Module**:

Python's `random` module offers various functions for generating random numbers and performing random selections.

- `random.random()`: Return a random floating-point number in the range [0.0, 1.0).
- `random.uniform(a, b)`: Return a random floating-point number between `a` and `b`, inclusive.
- `random.randint(a, b)`: Return a random integer between `a` and `b`, inclusive.
- `random.choice(seq)`: Return a random element from the non-empty sequence `seq`.
- `random.shuffle(lst)`: Shuffle the elements of the list `lst` in place.
- `random.sample(population, k)`: Return a k-length list of unique elements chosen from the population sequence.
- `random.seed(a=None, version=2)`: Initialize the random number generator. If `a` is omitted or `None`, the current system time is used as the seed.

#### **Usage Examples**:

1. **Random Floating-Point Number**:
   ```python
   import random
   random_float = random.random()
   ```
2. **Random Uniform Number**:
  ```python
  import random
  random_uniform = random.uniform(1, 10)
  ```
3. **Random Integer**:
  ```python
  import random
  random_integer = random.randint(1, 100)
  ```
4. **Random Choice from Sequence**:
  ```python
  import random
  options = ["apple", "banana", "cherry"]
  random_selection = random.choice(options)
  ```
5. **Shuffle a List**:
  ```python
  import random
  my_list = [1, 2, 3, 4, 5]
  random.shuffle(my_list)
  ```
6. **Random Sample from Population**:
  ```python
  import random
  population = range(1, 100)
  random_sample = random.sample(population, 5)
  ```
7. **Seed the Random Number Generator**:
  ```python
  import random
  random.seed(42)
  random_number = random.random()
  ```