---
layout: essay_single
title: Algorithm key-note
date: 2024-01-12
tags:
  - Algorithm
  - python language
  - backend
  - Review-Q&A
categories:
- Notes
- Algorithm
feature_text: |
  ## Algorithm key-note
  Post by ailswan Jan. 12, 2024
feature_image: "https://picsum.photos/2560/600?image=865"
---

# 1. Time Complexity (Big O)

First, let's discuss the time complexity of common operations categorized by data structures/algorithms. Then, we will explore the reasonable complexity for a given input size.

## Arrays (Dynamic Arrays/Lists)

Assume n = arr.length,

- Append or remove elements at the end: 
  - O(1) [Discussion](#)
  
- Add or remove elements from any index: 
  - O(n)

- Access or modify elements at any index: 
  - O(1)

- Check if an element exists: 
  - O(n)

- Two pointers: 
  - O(n*k), where k is the work done per iteration, including sliding window

- Build prefix sum: 
  - O(n)

- Find the sum of subarrays with a given prefix sum: 
  - O(1)

## Strings (Immutable)

Assume n = s.length,

- Add or remove characters: 
  - O(n)

- Access element at any index: 
  - O(1)

- Concatenate two strings: 
  - O(n+m), where m is the length of another string

- Create a substring: 
  - O(m), where m is the length of the substring

- Two pointers: 
  - O(n*k), where k is the work done per iteration, including sliding window

- Build strings by connecting arrays, stringbuilder, etc.: 
  - O(n)

## Linked Lists

Given n as the number of nodes in the linked list,

- Add or remove elements after a given pointer position: 
  - O(1)

- If it's a doubly linked list, add or remove elements after a given pointer position: 
  - O(1)

- Add or remove elements at any position without a pointer: 
  - O(n)

- Access elements at any position without a pointer: 
  - O(n)

- Check if an element exists: 
  - O(n)

- Reverse between positions i and j: 
  - O(j-i)

- Use fast and slow pointers or hash mapping to complete a single traversal: 
  - O(n)

## Hash Table/Dictionary

Given n = dic.length,

- Add or remove key-value pairs: 
  - O(1)

- Check if a key exists: 
  - O(1)

- Check if a value exists: 
  - O(n)

- Access or modify the value associated with a key: 
  - O(1)

- Traverse all key-value pairs: 
  - O(n)

Note: O(1) operations are constant relative to n. In practice, hash algorithms might have a high cost. For example, if your key is a string, it will take 
  - O(m), where m is the length of the string. These operations only require constant time relative to the size of the hash map.

## Set

Given n = set.length,

- Add or remove elements: 
  - O(1)

- Check if an element exists: 
  - O(1)

The explanations above also apply here.

## Stack

Stack operations depend on their implementation. A stack only needs to support pop and push. If implemented using a dynamic array:

Given n = stack.length,

- Push an element: 
  - O(1)

- Pop an element: 
  - O(1)

- Peek (view the top element): 
  - O(1)

- Access or modify elements at any index: 
  - O(1)

- Check if an element exists: 
  - O(n)

## Queue

Queue operations depend on their implementation. A queue only needs to support dequeue and enqueue. If implemented using a doubly linked list:

Given n = queue.length,

- Enqueue an element: 
  - O(1)

- Dequeue an element: 
  - O(1)

- Peek (view the front element): 
  - O(1)

- Access or modify elements at any index: 
  - O(n)

- Check if an element exists: 
  - O(n)

Note: Most programming languages implement queues in a way more complex than a simple doubly linked list. Depending on the implementation, accessing elements by index might be faster than 
  - O(n), but with an important constant divisor.

## Binary Tree Problems (DFS/BFS)

Given n as the number of nodes in the tree,

Most algorithms have a time complexity of 
  - O(n*k), where k is the number of operations done at each node, usually 
  - O(1). This is a general rule and not always true. Here, we assume BFS is implemented efficiently using a queue.

## Binary Search Tree

Given n as the number of nodes in the tree,

- Add or remove elements: Worst case 
  - O(n), average case 
  - O(log n)

- Check if an element exists: Worst case 
  - O(n), average case 
  - O(log n)

The average case is when the tree is balanced—each depth is close to full. The worst case is when the tree is just a straight line.

## Heap/Priority Queue

Given n = heap.length, discussing a minimum heap,

- Add an element: 
  - O(log n)

- Remove the minimum element: 
  - O(log n)

- Find the minimum element: 
  - O(1)

- Check if an element exists: 
  - O(n)

## Binary Search

In the worst case, the time complexity of binary search is 
  - O(log n), where 
  - n is the initial search space size.

## Others

- Sorting: 
  - O(n*log n), where 
  - n is the size of the data to be sorted

- DFS and BFS on a graph: 
  - O(n*k+e), where 
  - n is the number of nodes, 
  - e is the number of edges, assuming each node processing cost is 
  - O(1) and no need for duplicate traversal.

- DFS and BFS space complexity: Usually 
  - O(n), but if it's on a graph, it might be 
  - O(n+e) to store the graph.

- Dynamic Programming time complexity: 
  - O(n*k), where 
  - n is the number of states, 
  - k is the number of operations per state.

- Dynamic Programming space complexity: 
  - O(n), where 
  - n is the number of states

---

