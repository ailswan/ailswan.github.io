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
- `vec.assign(first, last)`: Assign a range of elements to the vector.

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
- `std::binary_search(begin, end, value)`: Check if a value exists in a sorted range.

### **Noteworthy Differences**:

### **In-Place vs. Return Value**:
- In C++, most operations on containers like vectors or strings are in-place.

### **String Operations**:
Strings in C++ (`std::string`) are mutable. This is unlike strings in languages like Python or Java.

### **Looping Techniques**:
- `for(auto &item : container)`: Range-based for loop.
- Accessing `it->first` in a map iteration.

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

### **Math Functions**:

### `std::max` and `std::min`:
- `std::max(a, b)`: Returns the greater of the two values `a` and `b`.
- `std::min(a, b)`: Returns the smaller of the two values `a` and `b`.

### **Algorithmic Operations**:

### `std::accumulate`:
- `std::accumulate(begin, end, initial)`: Computes the sum of a range of elements.

### `std::transform`:
- `std::transform(begin1, end1, begin2, result, binary_operation)`: Applies a binary operation to pairs of elements from two ranges and stores the result in a third range.

### `std::reverse`:
- `std::reverse(begin, end)`: Reverses the order of elements in a range.

### Example Usage:

```cpp
#include <algorithm>
#include <numeric>

// Example usage of std::max and std::min
int main() {
    int a = 5, b = 8;
    int max_result = std::max(a, b);
    int min_result = std::min(a, b);

    int arr[] = {1, 2, 3, 4, 5};
    int sum = std::accumulate(std::begin(arr), std::end(arr), 0);

    std::vector<int> input = {1, 2, 3, 4, 5};
    std::vector<int> output(input.size());
    std::transform(input.begin(), input.end(), output.begin(), [](int x) { return x * 2; });

    std::reverse(input.begin(), input.end());

    return 0;
}
