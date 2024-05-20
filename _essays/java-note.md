---
layout: essay_single
title: Java language note
date: 2023-09-12
tags:
  - java language
 
categories:
- Notes
feature_text: |
  ## Java language note
  Post by ailswan Sep. 12, 2023
feature_image: "https://picsum.photos/2560/600?image=865"
---

### Summary
This document provides a list of common Java methods and features spanning various categories like string manipulation, list operations, and more.

### **String Methods**:
- `s.split(regex)`: Split string into array.
- `s.trim()`: Remove leading and trailing whitespace.
- `s.startsWith(prefix)`: Check if starts with prefix.
- `s.endsWith(suffix)`: Check if ends with suffix.
- `s.indexOf(sub)`: Find substring.
- `s.replace(old, new)`: Replace substring.
- `s.toUpperCase()`: Convert to uppercase.
- `s.toLowerCase()`: Convert to lowercase.
- `String.valueOf(obj)`: Convert object to string.
- `s.toCharArray()`: Convert string to character array.

### **StringBuilder Methods**:
- `sb.append(str)`: Append string to the builder.
- `sb.insert(offset, str)`: Insert string at the specified offset.
- `sb.replace(start, end, str)`: Replace characters from start to end with the specified string.
- `sb.delete(start, end)`: Remove characters from start to end.
- `sb.reverse()`: Reverse the character sequence.
- `sb.toString()`: Convert the builder to a string.
- `sb.length()`: Get the length of the builder.
- `sb.setLength(newLength)`: Set the length of the builder.
- `sb.charAt(index)`: Get the character at the specified index.
- `sb.setCharAt(index, char)`: Set the character at the specified index.

### **List Methods (ArrayList)**:
- `list.add(item)`: Add item to list.
- `list.addAll(collection)`: Append all of the items in the collection to the list.
- `list.get(index)`: Get item by index.
- `list.set(index, item)`: Replace item at index.
- `list.remove(index)`: Remove item at index.
- `list.indexOf(item)`: Return index of item.
- `Collections.sort(list)`: Sort list.
- `Collections.reverse(list)`: Reverse list.

### **Set Methods (HashSet)**:
- `set.add(item)`: Add item to set.
- `set.remove(item)`: Remove item from set.
- `set.contains(item)`: Check if item exists.
- `set.clear()`: Clear all items.

### **Map Methods (HashMap)**:
- `map.keySet()`: Get keys.
- `map.values()`: Get values.
- `map.entrySet()`: Get key-value pairs.
- `map.get(key)`: Get value by key.
- `map.put(key, value)`: Put key-value pair.
- `map.remove(key)`: Remove key-value pair.
- `map.containsKey(key)`: Check if map contains key.
- `map.containsValue(value)`: Check if map contains value.

### **Java Collections**:
- `Collections.sort(list)`: Sort a list.
- `Collections.shuffle(list)`: Shuffle a list.
- `Collections.max(collection)`: Return max element.
- `Collections.min(collection)`: Return min element.
- `Collections.frequency(collection, object)`: Count occurrences.

### **Looping Techniques**:
- `for(item : collection)`: Enhanced for loop.
- `list.forEach(action)`: forEach with lambda for lists.
- `map.forEach((key, value) -> action)`: forEach with lambda for maps.

### **Functional Programming**:
- `stream.filter(predicate)`: Filter collection.
- `stream.map(function)`: Transform each element.
- `stream.collect(collector)`: Accumulate elements.
- `stream.reduce(identity, accumulator)`: Combine elements.
- `stream.forEach(action)`: Loop over elements.

### **Noteworthy Differences**:

### **In-Place vs. Return Value**:
- `Collections.sort(list)` vs `list.stream().sorted().collect(Collectors.toList())`:
    - `Collections.sort(list)`: Modifies the list in-place.
    - `list.stream().sorted().collect(Collectors.toList())`: Returns a new sorted list, leaving the original list unmodified.
  
### **String Operations**:
Java strings are immutable. Thus, operations on strings return new strings.
- For example:
    - `s.trim()`: Returns a new string with whitespace removed from both ends. The original string `s` remains unchanged.

### **Lambda Functions in Different Scenarios**:

1. **Filtering**:
    - Filtering out even numbers from a list:
        ```java
        List<Integer> evens = nums.stream().filter(x -> x % 2 == 0).collect(Collectors.toList());
        ```

2. **Mapping**:
    - Squaring all numbers in a list:
        ```java
        List<Integer> squares = nums.stream().map(x -> x * x).collect(Collectors.toList());
        ```

3. **Reduce**:
    - Summing all elements of a list:
        ```java
        int sum = nums.stream().reduce(0, (x, y) -> x + y);
        ```

4. **Using with `max()` and `min()`**:
    - Finding the longest string in a list:
        ```java
        String longest = words.stream().max(Comparator.comparingInt(String::length)).orElse(null);
        ```

5. **ForEach**:
    - Iterating over a list:
        ```java
        nums.forEach(System.out::println);
        ```

6. **Custom Sorting**:
    - Sorting by length of strings:
        ```java
        words.sort(Comparator.comparingInt(String::length));
        ```

 