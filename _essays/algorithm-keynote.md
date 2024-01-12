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

# 2. Input Size and Time Complexity

Problem constraints can be seen as hints since they indicate the upper limits of the solution's time complexity. Having the ability to calculate the expected time complexity of a solution given the input size is a valuable skill. In all LeetCode problems and most Online Assessments (OAs), you will receive constraints for the problem. Unfortunately, during interviews, you usually won't be explicitly told the constraints of the problem. Nevertheless, it's still beneficial for practicing on LeetCode and completing OAs.

- n <= 10

The expected time complexity might involve factorials or exponentials greater than "2," for example, 
  - O(n^2 * n!) or 
  - O(4^n).

You should consider backtracking or any brute-force recursive algorithm. Since n <= 10 is very small, any algorithm that correctly finds the answer is likely to be fast enough.

- 10 < n <= 20

The expected time complexity might involve 
  - O(2^n). Any higher base or factorial would be too slow (
  - 3^20 = ~3.5 billion, 
  - 20! is even larger). 
  - O(2^n) usually means considering all subsets/subsequences for a given element set—two choices for each element: accept or reject.

Again, this limit is very small, so most correct algorithms might be fast enough. Consider backtracking and recursion.

- 20 < n <= 100

At this point, exponentials will be too slow. The upper limit might be 
  - O(n^3). Problems marked as "easy" on LeetCode typically have this limit, which can be deceptive. There might be solutions running in 
  - O(n) that pass the brute-force solutions (finding a linear time solution might not be considered "easy").

Consider powerful solutions involving nested loops. If you come up with a brute-force solution, try analyzing the algorithm to identify which steps are "slow" and attempt to improve those steps using tools like hash maps or heaps.

- 100 < n <= 1,000

As long as the constant factor isn't too large, a time complexity of 
  - O(n^2) is acceptable. Similar to the previous range, you should consider nested loops. The difference from the previous range is that 
  - O(n^2) is often the expected/optimal time complexity in this range and may not be improvable.

- 1,000 < n < 100,000

For this range, 
  - O(n*logn) is sufficient as long as the constant factor isn't too large. Within this range, sorting the input or using heaps might be helpful. If not, aim for an 
  - O(n) algorithm. Nested loops running in 
  - O(n^2) are unacceptable—you may need to use techniques learned in this course to achieve 
  - O(1) or 
  - O(logn):

  - Hash mapping
  - Two pointers, similar to sliding window
  - Monotonic stack
  - Binary search
  - Heap
  - Any combination of the above
  If you have an 
  - O(n) algorithm, the constant factor can be quite large (around 40). A common theme in string problems involves iterating through characters in the alphabet during each iteration, resulting in a time complexity of 
  - O(26n).

- 100,000 < n < 1,000,000

  - O(n) time complexity is rare within this range, and 
  - O(n*logn) is often safe as long as it has a small constant factor. You might need to incorporate hash mapping in some way.

- 1,000,000 < n

For huge inputs, usually in the range of 
  - 10^9 or more, the most common acceptable time complexity is logarithmic 
  - O(logn) or constant 
  - O(1). In these problems, you either significantly reduce the search space at each iteration (usually binary search) or find information cleverly in constant time (using mathematics or cleverly using hash maps).

Other time complexities are possible, such as 
  - O(n), but this case is extremely rare and usually only occurs in very advanced problems.

---

# 3. Sorting Algorithms

All major programming languages have a built-in sorting method. Let's assume and state that the sorting cost is 
  - O(n*logn). This is generally accurate, where 
  - n is the number of elements to be sorted. For the sake of completeness, here is a table listing many common sorting algorithms and their complexities. The algorithms implemented in programming languages can vary; for example, Python uses Timsort, but in C++, specific algorithms are not mandatory and may differ.

| Sorting Algorithm | Time Complexity | Space Complexity | Stable? | Comments |
|-------------------|------------------|------------------|---------|----------|
| **Bubble Sort**   | O(n^2)           | O(1)             | Yes     | Simple and slow for large datasets |
| **Selection Sort**| O(n^2)           | O(1)             | No      | Simple, but inefficient for large datasets |
| **Insertion Sort**| O(n^2)           | O(1)             | Yes     | Efficient for small datasets |
| **Merge Sort**    | O(n*logn)        | O(n)             | Yes     | Efficient for large datasets |
| **Quick Sort**    | O(n*logn)        | O(logn)          | No      | Efficient and widely used |
| **Heap Sort**     | O(n*logn)        | O(1)             | No      | In-place sorting |
| **Radix Sort**    | O(kn)            | O(n+k)           | Yes     | Suitable for integers or strings |
| **Timsort**       | O(n*logn)        | O(n)             | Yes     | Hybrid sorting algorithm (Python's default) |

- **Time Complexity:** Represents the time it takes for the algorithm to complete based on the size of the input data.

- **Space Complexity:** Represents the amount of memory used by the algorithm.

- **Stable:** Indicates whether the algorithm maintains the relative order of equal elements.

Keep in mind that this table provides an overview, and the actual performance may vary based on the specific implementation in a programming language. Sorting costs are often measured using the comparison model, and the complexities listed are typical scenarios.

---

# 4. General DS/Algorithm Flowchart

This is a flowchart that can help you determine which data structure or algorithm you should use. Please note that this flowchart is very general, as it's impossible to cover every scenario.

1. **Start**
2. **Problem Analysis:**
   - Is the problem related to searching or sorting?

      - **Yes:** Go to Step 3.
      - **No:** Go to Step 4.

3. **Searching/Sorting Problem:**
   - **Searching Problem:**
      - Is the data sorted?

         - **Yes:** Consider Binary Search.
         - **No:** Consider Linear Search.

   - **Sorting Problem:**
      - Is a stable sort required?

         - **Yes:** Consider Merge Sort or Timsort.
         - **No:** Consider Quick Sort or Heap Sort.

4. **Data Structure Choice:**
   - Are you dealing with a collection of unique elements?

      - **Yes:** Go to Step 5.
      - **No:** Go to Step 6.

5. **Unique Elements Collection:**
   - Do you need fast insertion and deletion?

      - **Yes:** Consider HashSet.
      - **No:** Consider TreeSet for ordered unique elements.

6. **Non-Unique Elements Collection:**
   - Is the order of elements important?

      - **Yes:** Consider List or Array.
      - **No:** Go to Step 7.

7. **Dynamic vs. Static Data:**
   - Is the size of the data fixed?

      - **Yes:** Go to Step 8.
      - **No:** Consider LinkedList for dynamic data.

8. **Memory Constraints:**
   - Are memory constraints critical?

      - **Yes:** Consider Array or LinkedList with less memory overhead.
      - **No:** Go to Step 9.

9. **Performance Consideration:**
   - Do you need fast access to elements?

      - **Yes:** Consider Array or ArrayList.
      - **No:** Go to Step 10.

10. **Operations on Elements:**
    - Do you need to insert or remove elements frequently?

       - **Yes:** Consider LinkedList.
       - **No:** Go to Step 11.

11. **Conclusion:**
    - Consider the recommended data structure based on the above analysis.

12. **End**

This flowchart provides a general guideline, and the choice of data structure or algorithm may vary based on the specific requirements and constraints of the problem at hand. Adjustments may be needed based on the characteristics of the data and the operations to be performed.

---

# 5. Two Pointers: Traverse from Both Ends with a Single Input

``` C++
int fn(vector<int>& arr) {
    int left = 0;
    int right = int(arr.size()) - 1;
    int ans = 0;

    while (left < right) {
        if (CONDITION) {
            left++;
        } else {
            right--;
        }
    }

    return ans;
}
```
``` python
def fn(arr):
    left = ans = 0
    right = len(arr) - 1

    while left < right:
        if CONDITION:
            left += 1
        else:
            right -= 1
    
    return ans

```

---
# 6. Two Pointers: Traverse Both Inputs, Both Need to be Fully Traversed
```C++
int fn(vector<int>& arr1, vector<int>& arr2) {
    int i = 0, j = 0, ans = 0;

    while (i < arr1.size() && j < arr2.size()) {
 
        if (CONDITION) {
            i++;
        } else {
            j++;
        }
    }

    while (i < arr1.size()) {

        i++;
    }

    while (j < arr2.size()) {

        j++;
    }

    return ans;
}

```
```python
def fn(arr1, arr2):
    i = j = ans = 0

    while i < len(arr1) and j < len(arr2):
     
        if CONDITION:
            i += 1
        else:
            j += 1
    
    while i < len(arr1):
 
        i += 1
    
    while j < len(arr2):
 
        j += 1
    
    return ans
 
```
---

# 6. Sliding Window Technique

```C++
int fn(vector<int>& arr) {
    int left = 0, ans = 0, curr = 0;

    for (int right = 0; right < arr.size(); right++) {
        // add arr[right] to curr

        while (WINDOW_CONDITION_BROKEN) {
            // delete arr[left] from curr
            left++;
        }

        // update ans
    }

    return ans;
}

 
```

```python

def fn(arr):
    left = ans = curr = 0

    for right in range(len(arr)):
        # add arr[right] to curr

        while WINDOW_CONDITION_BROKEN:
            # delete arr[left] from curr
            left += 1

        #  update ans
    
    return ans
 
```

---

# 7. Prefix Sum Technique

``` C++

vector<int> fn(vector<int>& arr) {
    vector<int> prefix(arr.size());
    prefix[0] = arr[0];

    for (int i = 1; i < arr.size(); i++) {
        prefix[i] = prefix[i - 1] + arr[i];
    }

    return prefix;
}
 
```

```python

def fn(arr):
    prefix = [arr[0]]
    for i in range(1, len(arr)):
        prefix.append(prefix[-1] + arr[i])
    
    return prefix
 
```
---

# 8. Efficient String Construction

```C++
string fn(vector<char>& arr) {
    return string(arr.begin(), arr.end())
}
```

```python
def fn(arr):
    ans = []
    for c in arr:
        ans.append(c)
    
    return "".join(ans)
 
```

---

# 9. Linked List: Fast and Slow Pointers

```C++
int fn(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    int ans = 0;

    while (fast != nullptr && fast->next != nullptr) {
        // 
        slow = slow->next;
        fast = fast->next->next;
    }

    return ans;
}

```

```python

def fn(head):
    slow = head
    fast = head
    ans = 0

    while fast and fast.next:
        #  
        slow = slow.next
        fast = fast.next.next
    
    return ans
 
```

---

# 10. Reverse Linked List 

```C++
ListNode* fn(ListNode* head) {
    ListNode* curr = head;
    ListNode* prev = nullptr;
    while (curr != nullptr) {
        ListNode* nextNode = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextNode;
    }

    return prev;
}
```

```python

def fn(head):
    curr = head
    prev = None
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node 
        
    return prev
 
```

---

# 11. Find the Number of Subarrays Meeting Exact Conditions 

```C++
int fn(vector<int>& arr, int k) {
    unordered_map<int, int> counts;
    counts[0] = 1;
    int ans = 0, curr = 0;

    for (int num: arr) {
        // 
        ans += counts[curr - k];
        counts[curr]++;
    }

    return ans;
}

```

```python

from collections import defaultdict

def fn(arr, k):
    counts = defaultdict(int)
    counts[0] = 1
    ans = curr = 0

    for num in arr:
        #  
        ans += counts[curr - k]
        counts[curr] += 1
    
    return ans

```

---

# 12. Monotonic Increasing Stack

```C++

int fn(vector<int>& arr) {
    stack<integer> stack;
    int ans = 0;

    for (int num: arr) {
        //  
        while (!stack.empty() && stack.top() > num) {
            //  
            stack.pop();
        }

        stack.push(num);
    }
}
 
```

```python
def fn(arr):
    stack = []
    ans = 0

    for num in arr:
        # 
        while stack and stack[-1] > num:
            # 
            stack.pop()
        stack.append(num)
    
    return ans
 
```

---
# 13.Binary Tree: Depth-First Search (Recursive)

```C++
int dfs(TreeNode* root) {
    if (root == nullptr) {
        return 0;
    }

    int ans = 0;
    // 
    dfs(root.left);
    dfs(root.right);
    return ans;
}
 
```

```python
def dfs(root):
    if not root:
        return
    
    ans = 0

    # 
    dfs(root.left)
    dfs(root.right)
    return ans
 。
```

---
# 14.Binary Tree: Depth-First Search (Iterative)

```C++
int dfs(TreeNode* root) {
    stack<TreeNode*> stack;
    stack.push(root);
    int ans = 0;

    while (!stack.empty()) {
        TreeNode* node = stack.top();
        stack.pop();
        //  
        if (node->left != nullptr) {
            stack.push(node->left);
        }
        if (node->right != nullptr) {
            stack.push(node->right);
        }
    }

    return ans;
}
 
```

```python
def dfs(root):
    stack = [root]
    ans = 0

    while stack:
        node = stack.pop()
        # 
        if node.left:
            stack.append(node.left)
        if node.right:
            stack.append(node.right)

    return ans
 
```

---
# 15.Binary Tree: Breadth-First Search (BFS)

```C++
int fn(TreeNode* root) {
    queue<TreeNode*> queue;
    queue.push(root);
    int ans = 0;

    while (!queue.empty()) {
        int currentLength = queue.size();
        // 

        for (int i = 0; i < currentLength; i++) {
            TreeNode* node = queue.front();
            queue.pop();
            //  
            if (node->left != nullptr) {
                queue.push(node->left);
            }
            if (node->right != nullptr) {
                queue.push(node->right);
            }
        }
    }

    return ans;
}

```

```python
from collections import deque

def fn(root):
    queue = deque([root])
    ans = 0

    while queue:
        current_length = len(queue)
        # 

        for _ in range(current_length):
            node = queue.popleft()
            #  
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

    return ans

```

---
# 16.Graph: Depth-First Search (DFS) Recursive

The following graph template assumes node numbering from 0 to n - 1, and the graph is represented in the form of an adjacency list. Depending on the problem, you may need to convert the input into an equivalent adjacency list before using the template.

```C++
unordered_set<int> seen;

int fn(vector<vector<int>>& graph) {
    seen.insert(START_NODE);
    return dfs(START_NODE, graph);
}

int fn dfs(int node, vector<vector<int>>& graph) {
    int ans = 0;
    // 
    for (int neighbor: graph[node]) {
        if (seen.find(neighbor) == seen.end()) {
            seen.insert(neighbor);
            ans += dfs(neighbor, graph);
        }
    }

    return ans;
}
 
```

```python
def fn(graph):
    def dfs(node):
        ans = 0
        #  
        for neighbor in graph[node]:
            if neighbor not in seen:
                seen.add(neighbor)
                ans += dfs(neighbor)
        
        return ans

    seen = {START_NODE}
    return dfs(START_NODE)
 
```

---
# 17. Graph: Depth-First Search (DFS) Iterative

```C++
int fn(vector<vector<int>>& graph) {
    stack<int> stack;
    unordered_set<int> seen;
    stack.push(START_NODE);
    seen.insert(START_NODE);
    int ans = 0;

    while (!stack.empty()) {
        int node = stack.top();
        stack.pop();
        //  
        for (int neighbor: graph[node]) {
            if (seen.find(neighbor) == seen.end()) {
                seen.insert(neighbor);
                stack.push(neighbor);
            }
        }
    }
}
 
```

```python

def fn(graph):
    stack = [START_NODE]
    seen = {START_NODE}
    ans = 0

    while stack:
        node = stack.pop()
        #  
        for neighbor in graph[node]:
            if neighbor not in seen:
                seen.add(neighbor)
                stack.append(neighbor)
    
    return ans

 
```

---
# 18. Graph: Breadth-First Search (BFS)

```C++
int fn(vector<vector<int>>& graph) {
    queue<int> queue;
    unordered_set<int> seen;
    queue.add(START_NODE);
    seen.insert(START_NODE);
    int ans = 0;

    while (!queue.empty()) {
        int node = queue.front();
        queue.pop();
        //  
        for (int neighbor: graph[node]) {
            if (seen.find(neighbor) == seen.end()) {
                seen.insert(neighbor);
                queue.push(neighbor);
            }
        }
    }
}
 
```

```python
from collections import deque

def fn(graph):
    queue = deque([START_NODE])
    seen = {START_NODE}
    ans = 0

    while queue:
        node = queue.popleft()
        # 
        for neighbor in graph[node]:
            if neighbor not in seen:
                seen.add(neighbor)
                queue.append(neighbor)
    
    return ans
 
```

---
# 19. Find the Top K Elements in a Heap

```C++
vector<int> fn(vector<int>& arr, int k) {
    priority_queue<int, CRITERIA> heap;
    for (int num: arr) {
        heap.push(num);
        if (heap.size() > k) {
            heap.pop();
        }
    }

    vector<int> ans;
    while (heap.size() > 0) {
        ans.push_back(heap.top());
        heap.pop();
    }

    return ans;
}

```

```python
import heapq

def fn(arr, k):
    heap = []
    for num in arr:
        # 
        heapq.heappush(heap, (CRITERIA, num))
        if len(heap) > k:
            heapq.heappop(heap)
    
    return [num for num in heap]

```

---
# 20.Binary Search

```C++
int binarySearch(vector<int>& arr, int target) {
        int left = 0;
        int right = int(arr.size()) - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) {
                //  
                return mid;
            }
            if (arr[mid] > target) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        
        //  
        return left;
    }

```

```python

def fn(arr, target):
    left = 0
    right = len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            # 
            return
        if arr[mid] > target:
            right = mid - 1
        else:
            left = mid + 1
    
    #  
    return left
 
```

---
# 22. Binary Search: Find the Leftmost Insertion Point for Duplicate Elements

```C++
int binarySearch(vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size();
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] >= target) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return left;
}
```

```python
def fn(arr, target):
    left = 0
    right = len(arr)
    while left < right:
        mid = (left + right) // 2
        if arr[mid] >= target:
            right = mid
        else:
            left = mid + 1

    return left

```

---

# 23. Binary Search: Find the Rightmost Insertion Point for Duplicate Elements


```C++
int binarySearch(vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size();
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] > target) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return left;
}

```

```python
def fn(arr, target):
    left = 0
    right = len(arr)
    while left < right:
        mid = (left + right) // 2
        if arr[mid] > target:
            right = mid
        else:
            left = mid + 1

    return left

```

---

# 24. Binary Search: Greedy Problem
Find the Minimum Value: Binary Search - Greedy Problem
```C++
int fn(vector<int>& arr) {
    int left = MINIMUM_POSSIBLE_ANSWER;
    int right = MAXIMUM_POSSIBLE_ANSWER;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (check(mid)) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return left;
}

bool check(int x) {
    //  
    return BOOLEAN;
}
 
```

```python
def fn(arr):
    def check(x):
        #  
        return BOOLEAN

    left = MINIMUM_POSSIBLE_ANSWER
    right = MAXIMUM_POSSIBLE_ANSWER
    while left <= right:
        mid = (left + right) // 2
        if check(mid):
            right = mid - 1
        else:
            left = mid + 1
    
    return left
 
```
Find the Maximum Value: Binary Search - Greedy Problem

```C++
int fn(vector<int>& arr) {
    int left = MINIMUM_POSSIBLE_ANSWER;
    int right = MAXIMUM_POSSIBLE_ANSWER;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (check(mid)) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return right;
}

bool check(int x) {
    //  
    return BOOLEAN;
}
 
```

```python
def fn(arr):
    def check(x):
        #  
        return BOOLEAN

    left = MINIMUM_POSSIBLE_ANSWER
    right = MAXIMUM_POSSIBLE_ANSWER
    while left <= right:
        mid = (left + right) // 2
        if check(mid):
            left = mid + 1
        else:
            right = mid - 1
    
    return right
 
```

---


# 25. Backtracking

```C++
int backtrack(STATE curr, OTHER_ARGUMENTS...) {
    if (BASE_CASE) {
        //  
        return 0;
    }

    int ans = 0;
    for (ITERATE_OVER_INPUT) {
        //  
        ans += backtrack(curr, OTHER_ARGUMENTS...)
        //  
    }

    return ans;
}

 
```

```python
def backtrack(curr, OTHER_ARGUMENTS...):
    if (BASE_CASE):
        #  
        return
    
    ans = 0
    for (ITERATE_OVER_INPUT):
        # 
        ans += backtrack(curr, OTHER_ARGUMENTS...)
        #  
    
    return ans
 
```

---


# 26. Dynamic Programming: Top-Down Approach (Memoization)

```C++
unordered_map<STATE, int> memo;

int fn(vector<int>& arr) {
    return dp(STATE_FOR_WHOLE_INPUT, arr);
}

int dp(STATE, vector<int>& arr) {
    if (BASE_CASE) {
        return 0;
    }

    if (memo.find(STATE) != memo.end()) {
        return memo[STATE];
    }

    int ans = RECURRENCE_RELATION(STATE);
    memo[STATE] = ans;
    return ans;
}
 
```

```python
def fn(arr):
    def dp(STATE):
        if BASE_CASE:
            return 0
        
        if STATE in memo:
            return memo[STATE]
        
        ans = RECURRENCE_RELATION(STATE)
        memo[STATE] = ans
        return ans

    memo = {}
    return dp(STATE_FOR_WHOLE_INPUT)
 
```

---


# 27. Trie (Prefix Tree) Construction


```C++
struct TrieNode {
    int data;
    unordered_map<char, TrieNode*> children;
    TrieNode() : data(0), children(unordered_map<char, TrieNode*>()) {}
};

TrieNode* buildTrie(vector<string> words) {
    TrieNode* root = new TrieNode();
    for (string word: words) {
        TrieNode* curr = root;
        for (char c: word) {
            if (curr->children.find(c) == curr->children.end()) {
                curr->children[c] = new TrieNode();
            }
            curr = curr->children[c];
            // 
            //  
        }
    }

    return root;
}
 
```

```python
 
class TrieNode:
    def __init__(self):
        #  
        self.data = None
        self.children = {}

def fn(words):
    root = TrieNode()
    for word in words:
        curr = root
        for c in word:
            if c not in curr.children:
                curr.children[c] = TrieNode()
            curr = curr.children[c]
        #  
        #  
    
    return root
 
```

---

 