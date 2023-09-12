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

