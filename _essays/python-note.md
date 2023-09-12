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

### **Set and Dictionary Operations**:
Most of the set and dictionary methods change the set or dictionary in-place. However, some operations, like union (`|`) or intersection (`&`) between two sets, return new sets.

### **Functional Programming Tools**:
- `map()` and `filter()`: Return iterators. To convert to a list: `list(map(func, iterable))` or `list(filter(func, iterable))`.
- `functools.reduce()`: Accumulates a single result. For example, using it to sum a list of numbers would return a single number.
