---
layout: essay_single
title: C# language note
date: 2024-07-29
tags:
  - C# language
 
categories:
- Notes
feature_text: |
  ## C# language note
  Post by ailswan Jul. 29, 2024
feature_image: "https://picsum.photos/2560/600?image=865"
---


### Summary
This document provides a list of common C# methods and features spanning various categories like string manipulation, list operations, and more.

### String Methods:
- `s.Split(separator)`: Split string into array.
- `s.Trim()`: Remove leading and trailing whitespace.
- `s.StartsWith(prefix)`: Check if starts with prefix.
- `s.EndsWith(suffix)`: Check if ends with suffix.
- `s.IndexOf(sub)`: Find substring.
- `s.Replace(old, new)`: Replace substring.
- `s.ToUpper()`: Convert to uppercase.
- `s.ToLower()`: Convert to lowercase.
- `s.Substring(startIndex, length)`: Retrieve substring starting from the specified index with the specified length.
- `s.Contains(substring)`: Check if string contains substring.

### StringBuilder Methods:
- `sb.Append(str)`: Append string to the builder.
- `sb.Insert(index, str)`: Insert string at the specified index.
- `sb.Replace(oldStr, newStr)`: Replace all occurrences of a specified string.
- `sb.Remove(startIndex, length)`: Remove characters from the specified start index and length.
- `sb.Clear()`: Clear all characters from the builder.
- `sb.ToString()`: Convert the builder to a string.
- `sb.Length`: Get or set the length of the builder.
- `sb[index]`: Get or set the character at the specified index.

### List Methods:
- `list.Add(item)`: Add item to list.
- `list.AddRange(collection)`: Append all items in the specified collection to the list.
- `list.Remove(item)`: Remove the first occurrence of the specified item.
- `list.RemoveAt(index)`: Remove the item at the specified index.
- `list.IndexOf(item)`: Return the index of the first occurrence of the specified item.
- `list.LastIndexOf(item)`: Return the index of the last occurrence of the specified item.
- `list.Clear()`: Remove all items from the list.
- `list.Contains(item)`: Check if the list contains the specified item.
- `list.Count`: Get the number of items in the list.
- `list.Insert(index, item)`: Insert the item at the specified index.
- `list.Sort()`: Sort the items in the list.

### Queue Methods:
- `queue.Enqueue(item)`: Add item to the end of the queue.
- `queue.Dequeue()`: Remove and return the item at the beginning of the queue.
- `queue.Peek()`: Return the item at the beginning of the queue without removing it.
- `queue.Contains(item)`: Check if the queue contains the specified item.
- `queue.Clear()`: Remove all items from the queue.
- `queue.Count`: Get the number of items in the queue.

### Dictionary Methods:
- `dict.Add(key, value)`: Add the specified key and value to the dictionary.
- `dict.Remove(key)`: Remove the value with the specified key.
- `dict.ContainsKey(key)`: Check if the dictionary contains the specified key.
- `dict.TryGetValue(key, out value)`: Get the value associated with the specified key.
- `dict.Clear()`: Remove all keys and values from the dictionary.
- `dict.Keys`: Get a collection containing the keys in the dictionary.
- `dict.Values`: Get a collection containing the values in the dictionary.

### Examples of Using List:
1. **Creating and Using a List**:
```csharp
List<string> list = new List<string>();
list.Add("apple");
list.Add("banana");
list.Add("cherry");

foreach (string item in list)
{
    Console.WriteLine(item);
}
```
2. **Inserting an Item at a Specific Index**:
```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
numbers.Insert(2, 10);

foreach (int number in numbers)
{
    Console.WriteLine(number);
}
// Output: 1, 2, 10, 3, 4, 5

```
3. **Removing an Item from a List**:
```csharp
List<string> fruits = new List<string> { "apple", "banana", "cherry" };
fruits.Remove("banana");

foreach (string fruit in fruits)
{
    Console.WriteLine(fruit);
}
// Output: apple, cherry

```

4. **Checking if a List Contains an Item**:
```csharp
List<string> fruits = new List<string> { "apple", "banana", "cherry" };
bool hasApple = fruits.Contains("apple");
Console.WriteLine(hasApple); // Output: True

```

5. **Sorting a List**:
```csharp
List<int> numbers = new List<int> { 5, 1, 4, 3, 2 };
numbers.Sort();

foreach (int number in numbers)
{
    Console.WriteLine(number);
}
// Output: 1, 2, 3, 4, 5

```

6. **Finding the Index of an Item in a List**:
```csharp
List<string> fruits = new List<string> { "apple", "banana", "cherry" };
int index = fruits.IndexOf("cherry");
Console.WriteLine(index); // Output: 2

```
7. **Clearing a List**:
```csharp
List<string> fruits = new List<string> { "apple", "banana", "cherry" };
fruits.Clear();
Console.WriteLine(fruits.Count); // Output: 0

```
8. **Adding a Range of Items to a List**:
```csharp
List<int> numbers = new List<int> { 1, 2, 3 };
List<int> moreNumbers = new List<int> { 4, 5, 6 };
numbers.AddRange(moreNumbers);

foreach (int number in numbers)
{
    Console.WriteLine(number);
}
// Output: 1, 2, 3, 4, 5, 6

```

