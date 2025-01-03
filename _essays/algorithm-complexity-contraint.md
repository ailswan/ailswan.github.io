---
layout: essay_single
title: algorithm Complexity & Constraint
date: 2024-08-20
tags:
  - algorithm
  - python language
categories:
- Notes
- algorithm
feature_text: |
  ## algorithm Complexity & Constraint
  Post by ailswan Aug. 20, 2024
feature_image: "https://picsum.photos/2560/600?image=865"
---
 
## Contraints &  Strategies

| **Constraint**              | **Range**                                     | **Strategy**                                                                                                                                     |
|-----------------------------|-----------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| **Input Size**              | \(n \leq 10^3\)                               | Use \(O(n^2)\) algorithms like brute-force, nested loops, etc.                                                                                   |
|                             | \(n \leq 10^5\)                               | Consider \(O(n \log n)\) algorithms like quicksort, mergesort, binary search, etc.                                                               |
|                             | \(n \leq 10^7\)                               | Opt for \(O(n)\) or lower complexity algorithms like linear scans, hash operations, or divide-and-conquer strategies.                            |
| **Time Complexity**         | \(t \leq 1\) second                           | Keep the algorithm’s complexity within \(O(n \log n)\) or \(O(n)\) to handle up to \(10^8\) or \(10^9\) operations per second.                   |
|                             | Real-time processing                          | Select algorithms with low time complexity, possibly using greedy algorithms, dynamic programming, etc.                                           |
| **Space Complexity**        | \(S \leq 10^6\) bytes                         | Use in-place algorithms to minimize additional space usage, such as in-place versions of sorting algorithms like quicksort.                      |
|                             | \(S \leq 10^9\) bytes                         | Use algorithms with linear space complexity, like dynamic programming with 2D arrays, or recursive implementations of trees.                     |
| **Data Characteristics**    | Data is already sorted                        | Leverage sorted data using techniques like binary search or two-pointer methods.                                                                  |
|                             | High amount of duplicate data                 | Use hash maps or sets to remove duplicates, or apply greedy strategies to avoid unnecessary computations.                                         |
|                             | Sparse data                                   | Employ sparse matrices or compressed storage to reduce space complexity, or optimize using the sparse characteristics, such as skip lists.        |
| **Special Operation Needs** | Frequent lookups                              | Use hash tables (O(1) lookup) or balanced binary search trees (O(log n) lookup) to optimize search operations.                                    |
|                             | Frequent updates                              | Use dynamic data structures like heaps, segment trees, or balanced trees to enable quick updates and queries.                                     |
| **Parallelism**             | Can be distributed                            | Split the task into independent subtasks and process them in parallel using multithreading or distributed systems, suitable for large-scale data. |
|                             | Single-threaded                               | Focus on sequential optimization, reducing the number of loops and redundant calculations.                                                       |
| **Algorithm Robustness**    | Extreme cases or abnormal data                | Design the algorithm to handle edge cases, ensuring correct operation with empty inputs, extreme values, etc. Add input validation for robustness. |
| **I/O Speed**               | Slow data read/write speed                    | Use batch processing to minimize I/O operations or stream processing to read data in chunks, reducing memory footprint.                           |






## Algorithm & Time Complexity

| **Algorithm Type**              | **Algorithm**                    | **Time Complexity**                | **Space Complexity**               | **Description**                                                                                                                                                          |
|---------------------------------|----------------------------------|------------------------------------|------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Sorting**                     | Bubble Sort                      | \(O(n^2)\)                         | \(O(1)\)                           | A simple comparison-based algorithm that repeatedly swaps adjacent elements if they are in the wrong order.                                                              |
|                                 | Selection Sort                   | \(O(n^2)\)                         | \(O(1)\)                           | Selects the minimum element from the unsorted portion and swaps it with the first unsorted element.                                                                      |
|                                 | Insertion Sort                   | \(O(n^2)\)                         | \(O(1)\)                           | Builds the sorted array one element at a time by repeatedly inserting elements in their correct positions.                                                               |
|                                 | Merge Sort                       | \(O(n \log n)\)                    | \(O(n)\)                           | A divide-and-conquer algorithm that splits the array into halves, sorts them, and then merges the sorted halves.                                                          |
|                                 | Quick Sort                       | \(O(n \log n)\) average, \(O(n^2)\) worst | \(O(\log n)\) average, \(O(n)\) worst | A divide-and-conquer algorithm that selects a pivot and partitions the array around it.                                                                                   |
|                                 | Heap Sort                        | \(O(n \log n)\)                    | \(O(1)\)                           | Uses a binary heap data structure to sort the array.                                                                                                                      |
|                                 | Counting Sort                    | \(O(n + k)\)                       | \(O(k)\)                           | A non-comparison-based sorting algorithm that counts the occurrences of each element.                                                                                     |
|                                 | Radix Sort                       | \(O(n \cdot k)\)                   | \(O(n + k)\)                       | Sorts numbers by processing individual digits.                                                                                                                            |
| **Searching**                   | Linear Search                    | \(O(n)\)                           | \(O(1)\)                           | Searches an array sequentially until the desired element is found.                                                                                                       |
|                                 | Binary Search                    | \(O(\log n)\)                      | \(O(1)\)                           | Searches a sorted array by repeatedly dividing the search interval in half.                                                                                               |
|                                 | Depth-First Search (DFS)         | \(O(V + E)\)                       | \(O(V)\)                           | Explores as far as possible along each branch before backtracking, used in graph traversal.                                                                              |
|                                 | Breadth-First Search (BFS)       | \(O(V + E)\)                       | \(O(V)\)                           | Explores all neighbors at the present depth level before moving on to nodes at the next depth level, used in graph traversal.                                             |
| **Dynamic Programming**         | Fibonacci Sequence (Memoized)    | \(O(n)\)                           | \(O(n)\)                           | Computes the Fibonacci sequence using memoization to avoid redundant calculations.                                                                                       |
|                                 | Longest Common Subsequence       | \(O(m \cdot n)\)                   | \(O(m \cdot n)\)                   | Finds the longest subsequence common to two sequences.                                                                                                                   |
|                                 | Knapsack Problem                 | \(O(n \cdot W)\)                   | \(O(n \cdot W)\)                   | Solves the 0/1 Knapsack problem using dynamic programming.                                                                                                                |
| **Greedy Algorithms**           | Dijkstra's Algorithm             | \(O((V + E) \log V)\)              | \(O(V)\)                           | Finds the shortest path from a source node to all other nodes in a graph with non-negative weights.                                                                      |
|                                 | Kruskal's Algorithm              | \(O(E \log E)\)                    | \(O(E)\)                           | Finds the minimum spanning tree of a graph using a greedy approach.                                                                                                      |
|                                 | Prim's Algorithm                 | \(O((V + E) \log V)\)              | \(O(V)\)                           | Another greedy algorithm to find the minimum spanning tree of a graph.                                                                                                    |
| **Divide and Conquer**          | Merge Sort                       | \(O(n \log n)\)                    | \(O(n)\)                           | Divides the array into halves, sorts each half, and merges them.                                                                                                          |
|                                 | Quick Sort                       | \(O(n \log n)\) average, \(O(n^2)\) worst | \(O(\log n)\) average, \(O(n)\) worst | Partitions the array around a pivot and recursively sorts the partitions.                                                                                                 |
| **Graph Algorithms**            | Depth-First Search (DFS)         | \(O(V + E)\)                       | \(O(V)\)                           | Explores all possible paths in a graph by diving as deep as possible first.                                                                                               |
|                                 | Breadth-First Search (BFS)       | \(O(V + E)\)                       | \(O(V)\)                           | Explores all nodes at the present level before moving on to the next level.                                                                                               |
|                                 | Bellman-Ford Algorithm           | \(O(V \cdot E)\)                   | \(O(V)\)                           | Computes shortest paths from a single source to all other vertices, even with negative weights.                                                                           |
|                                 | Floyd-Warshall Algorithm         | \(O(V^3)\)                         | \(O(V^2)\)                         | Computes shortest paths between all pairs of vertices.                                                                                                                    |
| **String Algorithms**           | Knuth-Morris-Pratt (KMP)         | \(O(n + m)\)                       | \(O(m)\)                           | Searches for occurrences of a "pattern" within a "text" by using a prefix table to skip unnecessary comparisons.                                                          |
|                                 | Rabin-Karp                       | \(O(n + m)\) average, \(O(n \cdot m)\) worst | \(O(1)\)                           | Uses hashing to find any one of a set of pattern strings in a text.                                                                                                       |
|                                 | Boyer-Moore                      | \(O(n / m)\) best, \(O(n \cdot m)\) worst | \(O(m)\)                           | Searches for a substring within a string using a heuristic-based approach that skips sections of the text.                                                                |
| **Backtracking**                | N-Queens Problem                 | \(O(N!)\)                          | \(O(N^2)\)                         | Places N queens on an N×N chessboard so that no two queens threaten each other, by trying all possible placements.                                                        |
| **Mathematical Algorithms**     | Sieve of Eratosthenes            | \(O(n \log \log n)\)               | \(O(n)\)                           | Finds all prime numbers up to a specified integer by iteratively marking the multiples of primes.                                                                         |
|                                 | Euclidean Algorithm              | \(O(\log \min(a, b))\)             | \(O(1)\)                           | Computes the greatest common divisor (GCD) of two numbers.                                                                                                                |
| **Data Structures Operations**  | Hash Table (Insert/Search/Delete)| \(O(1)\) average, \(O(n)\) worst   | \(O(n)\)                           | A data structure that provides average constant time complexity for insert, search, and delete operations, but can degrade to linear time in the worst case.              |
|                                 | Binary Search Tree (BST)         | \(O(\log n)\) average, \(O(n)\) worst | \(O(n)\)                           | Provides logarithmic time complexity for insert, search, and delete operations, but can degrade to linear time if unbalanced.                                             |
|                                 | AVL Tree                         | \(O(\log n)\)                      | \(O(n)\)                           | A self-balancing binary search tree that guarantees logarithmic time complexity for insert, search, and delete operations.                                                |
|                                 | Trie (Prefix Tree)               | \(O(m)\) for insert/search         | \(O(m \cdot n)\)                   | A tree-like data structure that stores a dynamic set of strings, where 'm' is the length of the string and 'n' is the number of strings.                                    |

 