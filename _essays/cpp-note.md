---
layout: essay_single
title: C++ language note
date: 2023-09-12
tags:
  - c++ language
 
categories:
- Notes
feature_text: |
  ## C++ language note
  Post by ailswan Sep. 12, 2023
feature_image: "https://picsum.photos/2560/600?image=865"
---

### Summary
This document provides a list of common C++ methods, functions, and features spanning categories like string manipulation, vector operations, and more.

### **String Methods**:
- `s.substr(pos, len)`: Get a substring.
- `s.find(sub)`: Find a substring.
- `s.replace(pos, len, new_sub)`: Replace substring.
- `s.c_str()`: Convert to C-style string.
- `s.size()`: Get string size.

### **Vector Methods**:
- `vec.push_back(item)`: Add item to vector.
- `vec.insert(pos, item)`: Insert item at position.
- `vec.erase(pos)`: Remove item at position.
- `vec.size()`: Return vector size.
- `vec.begin()`, `vec.end()`: Return iterators.
- `vec.front()`: Access first element.
- `vec.back()`: Access last element.

### **Set Methods**:
- `set.insert(item)`: Add item to set.
- `set.erase(item)`: Remove item from set.
- `set.find(item)`: Find item in set.
- `set.size()`: Return set size.

### **Map Methods**:
- `map[key]`: Access value associated with the key.
- `map.insert(pair)`: Insert key-value pair.
- `map.erase(key)`: Remove key-value pair.
- `map.find(key)`: Find value by key.

### **Looping Techniques**:
- `for(auto &item : container)`: Range-based for loop.

### **I/O Streams**:
- `cin >> variable`: Read from standard input.
- `cout << "text" << variable`: Write to standard output.
- `cerr << "error message"`: Write to standard error.

### **Memory Management**:
- `new Type`: Allocate memory.
- `delete pointer`: Deallocate memory.
- `new Type[]`: Allocate array.
- `delete[] pointer`: Deallocate array.

### **Lambda Functions**:
- `[capture](parameters) -> return_type { body }`: Define a lambda function.

### **STL Algorithms**:
- `std::sort(begin, end)`: Sort elements.
- `std::find(begin, end, value)`: Find element.
- `std::count(begin, end, value)`: Count occurrences.

### **Noteworthy Differences**:

### **In-Place vs. Return Value**:
- In C++, most operations on containers like vectors or strings are in-place.

### **String Operations**:
Strings in C++ (`std::string`) are mutable. This is unlike strings in languages like Python or Java.

### **Memory Management**:
In C++, developers have control over memory allocation and deallocation using `new` and `delete`. This requires extra care to prevent memory leaks.

### **Lambda Functions in Different Scenarios**:

1. **Sort with custom comparator**:
    - ```cpp
      std::sort(vec.begin(), vec.end(), [](int a, int b) { return a > b; });
      ```

2. **Find first odd number in a vector**:
    - ```cpp
      auto it = std::find_if(vec.begin(), vec.end(), [](int n) { return n % 2 != 0; });
      ```
 