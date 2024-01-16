---
layout: essay_single
title: C++ One-Liners
date: 2024-01-16
tags:
   - c++ language
categories:
- Notes
feature_text: |
  ## C++ One-Liners
  Post by ailswan Jan 16, 2024
feature_image: "https://picsum.photos/2560/600?image=865"
---

### Tricky C++ One-Liners

**Swap Two Variables**:
```cpp
int a = 5, b = 10; a ^= b ^= a ^= b;
```

**Flatten a List of Lists**:
```cpp
std::vector<int> flat_list; for (const auto& sublist : list_of_lists) flat_list.insert(flat_list.end(), sublist.begin(), sublist.end());
```

**Factorial Using Lambda**:
```cpp
auto factorial = [](int x) { return (x == 0) ? 1 : x * factorial(x-1); };
```

**Find All Unique Values in a List**:
```cpp
std::vector<int> unique(my_list.begin(), std::unique(my_list.begin(), my_list.end()));
```

**Calculate Fibonacci Sequence**:
```cpp
auto fib = [](int x) { return (x <= 1) ? x : fib(x-1) + fib(x-2); };
```
**Transpose a Matrix**:
```cpp
std::vector<std::vector<int>> transposed(n, std::vector<int>(m)); for (int i = 0; i < n; ++i) for (int j = 0; j < m; ++j) transposed[j][i] = matrix[i][j];
```

**One-liner If-Else Assignment**:
```cpp
std::string value = (n % 2 == 0) ? "even" : "odd";
```

**Multiple Assignments**:
```cpp
int a = 1, b = 2, c = 3;
```

**Check If All Items in List Are Equal**:
```cpp
bool all_equal = std::all_of(my_list.begin(), my_list.end(), [&](int x) { return x == my_list[0]; });

```

**Check If Any Item in Matrix is Zero**:
```cpp
bool zero_exists = std::any_of(matrix.begin(), matrix.end(), [](const std::vector<int>& row) { return std::any_of(row.begin(), row.end(), [](int x) { return x == 0; }); });
```

**Check if Element is Present in Vector**:
```cpp
if (std::find(vec.begin(), vec.end(), x) != vec.end())
```

**Check if Element is Present in Set:**:
```cpp
if (my_set.find(x) != my_set.end())
```

**Check if Element is Present in Map**:
```cpp
if (my_map.find(key) != my_map.end())
```

**Count Occurrences of Element in Vector**:
```cpp
int count = std::count(vec.begin(), vec.end(), x)
```

**Remove Duplicates from Vector**:
```cpp
vec.erase(std::unique(vec.begin(), vec.end()), vec.end())
```

**Calculate Sum of Vector Elements**:
```cpp
int sum = std::accumulate(vec.begin(), vec.end(), 0)
```

**Find Maximum Element in Vector**:
```cpp
int max_element = *std::max_element(vec.begin(), vec.end())
```

**Sort Vector in Descending Order**:
```cpp
std::sort(vec.rbegin(), vec.rend())
```

**Reverse a Vector**:
```cpp
std::reverse(vec.begin(), vec.end())
```

**Rotate Vector to the Left by K Positions**:
```cpp
std::rotate(vec.begin(), vec.begin() + k, vec.end())
```
**Check Palindrome String**:
```cpp
bool is_palindrome = std::equal(str.begin(), str.begin() + str.size() / 2, str.rbegin())
```
**Find Intersection of Two Vectors**:
```cpp
std::vector<int> result; std::set_intersection(vec1.begin(), vec1.end(), vec2.begin(), vec2.end(), std::back_inserter(result))
```
**example**:
```cpp
```

 