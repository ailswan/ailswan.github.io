---
layout: essay_single
title: CPP backend Q&A
date: 2023-12-24
tags:
   - Backend
categories:
- Q&A
- Backend
- Review
feature_text: |
  ## CPP backend Q&A
  Post by ailswan Oct.24 , 2023
feature_image: "https://picsum.photos/2560/600?image=865"
---

### CPP backend Q&A

 [cpp backend q&a](https://leetcode.cn/leetbook/read/7-day-interview-hou-duan/dn19it/)
 
 ### **1. Redis Data Structures and Use Cases**

1. **String**
   - **Structure:** 
     ```java
     struct SDS {
       T capacity;      // Array capacity
       T len;           // Actual length
       byte flages;     // Flags, low three bits represent the type
       byte[] content;  // Array content
     }
     ```
   - **Application Scenarios:**
     - Storing key-value pairs.

2. **List**
   - **Storage Structure:** 
     - Ziplist for small data, Quicklist for large data.
   - **Application Scenarios:**
     - Message queues, friend timelines, comment lists, and rankings.

3. **Hash**
   - **Structure:** 
     - Array + List structure for handling hash collisions.
   - **Application Scenarios:**
     - User information storage, shopping carts.

4. **Set**
   - **Internal Structure:** 
     - Acts as a special dictionary with all values set to NULL.
   - **Application Scenarios:**
     - Collecting friends, followers, fans, and people of interest.

5. **Sorted Set**
   - **Also Known As:** SortedSet.
   - **Internal Structure:** 
     - Implemented using a data structure called "skip list."
   - **Application Scenarios:**
     - Storing fan lists, ranking users based on scores (e.g., grades).

---

### **2. Redis Memory Eviction Strategies**

1. **Scheduled Deletion**
   - **Description:**
     - Redis maintains a separate dictionary containing keys with expiration dates and periodically scans this dictionary to delete expired keys.
   - **Implementation:**
     - By default, Redis performs expiration scans 10 times per second (every 100ms).
     - The process involves randomly selecting 20 keys from the expiration dictionary and deleting the expired ones.
     - If the ratio of expired keys exceeds 1/4, repeat the process.
   - **Note:**
     - Random key selection helps avoid excessive CPU load by iterating over a large number of keys.

2. **Lazy Deletion**
   - **Description:**
     - Redis checks the expiration date of a key and deletes it when a client accesses the key without returning any content.
   - **Use Case:**
     - Useful for scenarios where many expired keys may not be deleted during scheduled deletion and need to be removed when explicitly checked.
   - **Advantage:**
     - Allows for decentralized handling of key expiration, ensuring immediate deletion upon detection.

**Summary:**
- Scheduled deletion is a centralized approach, while lazy deletion is a decentralized approach.

---

### **3. MySQL and Redis Data Consistency Issues**

**Data Consistency:**
- Data consistency generally refers to the scenario where the data in the cache matches the data in the database.

**Two Consistency Scenarios:**
1. **Cache Has Data:**
   - Cache data matches the latest database values.
   - Avoids inconsistent states where the cache holds outdated values.

2. **Cache Initially Empty:**
   - When there is no data in the cache, the database holds the latest values.
   - Data consistency is achieved when the cache is populated with the latest values upon querying the database.

**Inconsistent Data and Strategies:**
- **Scenario 1 (Cache Has Data):**
  - Inconsistent State: Cache data doesn't match the latest database values.
  - Strategy: Update the database and clear the cache (Update Database + Clear Cache).

- **Scenario 2 (Cache Initially Empty):**
  - Inconsistent State: Data retrieved from the database may be outdated.
  - Strategy: Update the database and populate the cache (Update Database + Update Cache).

---

### **4. Why Use B+ Trees in MySQL?**

**Tree Data Structures:**
- Hashes are slow for range queries, and linked lists are inefficient.
- Various tree structures like binary search trees, AVL trees, red-black trees, B-trees, and B+ trees exist.

**Challenges with Other Trees:**
- Binary Search Trees: Can degenerate into linked lists, leading to excessive levels.
- AVL Trees: Still have too many levels for certain scenarios.
- Red-Black Trees: Trade-off between insertion/update optimization and balancing concerns.

**B+ Trees:**
- Address B-tree issues by reducing levels but introduce sibling navigation challenges.
- B+ Trees address these challenges by linking leaf nodes into a linked list.
- B+ Trees also include parent node information in child nodes, resolving sibling navigation challenges.

**Conclusion:**
- B+ Trees offer a balanced solution, reducing levels and optimizing for both range queries and insertion/update operations.

---

### **5. What is a Transaction?**

- A transaction is a sequence of operations treated as a single logical unit of work. It must exhibit the ACID properties: Atomicity, Consistency, Isolation, and Durability.

---

### **6. Database Isolation Levels and Issue Resolution**

**Isolation Levels:**
1. **Read Uncommitted:**
   - Allows uncommitted changes to be read by other transactions.
   - Issues: Dirty Reads, Non-repeatable Reads, Phantom Reads.

2. **Read Committed:**
   - Reads only committed changes by other transactions.
   - Resolves Dirty Reads.

3. **Repeatable Read:**
   - Ensures a transaction sees the same data throughout its execution.
   - Resolves Dirty Reads, Non-repeatable Reads.

4. **Serializable:**
   - Provides the highest isolation level, preventing any anomalies.
   - Resolves Dirty Reads, Non-repeatable Reads, Phantom Reads.

**Issue Resolution:**
- **Dirty Reads:**
  - Solution: Increase isolation level (e.g., to Read Committed).

- **Non-repeatable Reads:**
  - Solution: Increase isolation level (e.g., to Repeatable Read).

- **Phantom Reads:**
  - Solution: Increase isolation level (e.g., to Serializable).

---

### **7. Multi-Version Concurrency Control (MVCC)**

**Concept:**
- MVCC ensures data consistency by maintaining snapshots of data at different transaction start times.
- Each transaction sees a snapshot of the database at its specific start time.

**Implementation:**
- Keeps track of historical versions of data.
- Allows multiple transactions to work concurrently without locking.

**Advantages:**
- Avoids locking and enables concurrent read and write operations.
- Provides a non-blocking approach to data consistency.

**Example:**
- Supports scenarios where a transaction sees different versions of a row based on its start time.
- Enables comparison of versions and decision-making based on transaction time.

**Conclusion:**
- MVCC offers a mechanism to achieve data consistency without the need for extensive locking, enhancing concurrent access and system performance.

### **8. MVCC and Phantom Reads**

**MVCC Overview:**
- MVCC leverages version chains, undo logs, and Read View to address consistency issues in snapshot read mode.
- In current read mode, MVCC alone cannot prevent phantom reads as current reads require obtaining the latest data.

**Phantom Reads Explanation:**
- Phantom reads occur when a transaction reads a set of rows that satisfy a certain condition, but another transaction inserts, updates, or deletes rows, causing the first transaction to see additional or missing rows.

**MVCC in Snapshot Read Mode:**
- In snapshot read mode, transactions see a consistent snapshot of the data based on their start time.
- Undo logs and version chains help maintain the integrity of the snapshot.

**Limitation in Current Read Mode:**
- In current read mode (e.g., when using SELECT FOR UPDATE), transactions need the latest data, potentially leading to phantom reads.
- Current read mode does not rely solely on MVCC for preventing phantom reads.

**Conclusion:**
- While MVCC is effective in preventing phantom reads in snapshot read mode, it may not provide the same guarantee in current read mode, where obtaining the latest data is crucial.

---

### **9. Optimistic Locking vs. Pessimistic Locking**

**Pessimistic Locking:**
- **Definition:** Acquires locks before any operation.
- **Characteristics:**
  - Locks are held during the entire transaction.
  - Other transactions are blocked from accessing locked resources.
  - Ensures exclusive access to the locked data.

**Optimistic Locking:**
- **Definition:** Assumes the best-case scenario and checks for conflicts only during updates.
- **Characteristics:**
  - No locks are acquired during read operations.
  - Conflicts are detected during the update, and the update is rejected if a conflict occurs.
  - Reduces the contention for locks.

**Comparison:**
- **Pessimistic Locking:**
  - Suitable for scenarios with frequent writes and potential conflicts.
  - Provides a straightforward approach to exclusive access.

- **Optimistic Locking:**
  - Ideal for scenarios with more reads than writes (low contention).
  - Reduces the overhead of locking, improving system throughput.

---

### **10. Use Cases for Optimistic Locking and Pessimistic Locking**

**Optimistic Locking:**
- **Scenario:** Low contention, predominantly read-heavy workload.
- **Benefits:**
  - Minimizes locking overhead during reads.
  - Optimizes system throughput.

**Pessimistic Locking:**
- **Scenario:** High contention, frequent writes, and potential conflicts.
- **Benefits:**
  - Ensures exclusive access to data during the entire transaction.
  - Resolves conflicts by preventing concurrent updates.

**Considerations:**
- **Optimistic Locking:**
  - Effective when conflicts are rare, reducing the need for continuous locking.
  - Reduces contention, enhancing system performance.

- **Pessimistic Locking:**
  - Suitable for scenarios where ensuring exclusive access is critical.
  - Addresses situations with frequent writes and potential conflicts.

---

### **11. Differences Between Processes and Threads**

**Basic Concepts:**
- A process is the encapsulation of a running program, serving as the basic unit for system resource scheduling and allocation. It achieves operating system concurrency.
- A thread is a subtask of a process and serves as the basic unit for CPU scheduling. It ensures the real-time execution of a program and achieves concurrency within a process. Threads are the smallest units recognized by the operating system.

**Differences:**
- A thread belongs to a single process, and a process can have multiple threads, but it must have at least one. The existence of threads depends on processes.
- Processes have independent memory units during execution, whereas threads share the memory of the process. Threads share code segments (code and constants), data segments (global and static variables), and heap storage within the same process. Each thread has its own stack segment containing local and temporary variables.
- A process is the minimum unit for resource allocation, while a thread is the minimum unit for CPU scheduling.
- Overhead: The creation or termination of a process involves resource allocation or deallocation (e.g., memory space and I/O devices), resulting in higher overhead. Context switching between processes requires saving the entire CPU environment and setting up the CPU environment for the new process. In contrast, context switching between threads involves saving and setting a few registers, resulting in lower overhead.
- Communication: Threads within the same process can communicate more easily due to their shared memory space. Inter-process communication (IPC) is used for communication between different processes, involving mechanisms such as message queues, semaphores, signals, and shared memory.

**Conclusion:**
- Processes are resource allocation units with higher overhead, while threads are CPU scheduling units with lower overhead and easier communication within the same process.

---

### **12. Inter-Process and Inter-Thread Communication**

**Inter-Process Communication (IPC):**
- **Mechanisms:**
  - Pipes: Provides one-way communication between processes.
  - System IPC:
    - Message Queues: Messages stored in queues for communication.
    - Semaphores: Used for synchronization and signaling.
    - Signals: Software interrupts for communication.
    - Shared Memory: Memory shared between processes.

**Inter-Thread Communication:**
- **Mechanisms:**
  - Shared Memory: Threads within the same process share memory space, allowing direct communication.
  - Mutexes (Mutual Exclusion): Ensures that only one thread accesses shared resources at a time.
  - Condition Variables: Enables threads to wait for a certain condition to be met before proceeding.
  - Semaphores: Used for synchronization between threads.

**Communication Methods:**
- **Producer-Consumer Scenario:**
  - IPC: Message queues or shared memory.
  - Threads: Shared memory, mutexes, condition variables, or semaphores.

**Considerations:**
- IPC is used for communication between different processes, while threads within the same process can communicate more directly using shared memory and synchronization mechanisms.
- The choice of communication method depends on the specific requirements and constraints of the application.

---

### **13. Virtual Address Mapping to Physical Address**

When the CPU obtains a virtual address, it needs to translate it into a physical address through the Memory Management Unit (MMU). The MMU performs this translation based on the virtual address by accessing the page table.

**Key Steps:**
1. **Page Table Lookup:**
   - The MMU uses the virtual address to index the page table.
   - The page table contains information about the mapping between virtual and physical addresses.

2. **Virtual Page to Physical Page Mapping:**
   - The page table entry provides the mapping information for the virtual page to a physical page.
   - The physical page corresponds to a specific location in the physical memory.

3. **Obtaining Physical Address:**
   - The offset within the virtual page is combined with the starting address of the corresponding physical page to obtain the final physical address.

4. **Accessing Physical Memory:**
   - The CPU can then access the actual data in the physical memory using the obtained physical address.

**Summary:**
- Virtual addresses are mapped to physical addresses through the MMU using information stored in the page table.
- The translation process involves looking up the page table, mapping virtual pages to physical pages, and determining the offset within the pages for the final physical address.

---

### **14. Deadlock Resolution Strategies**

**Deadlock Conditions:**
1. Mutual Exclusion: Resources cannot be shared; only one process can hold a resource at a time.
2. Hold and Wait: Processes hold resources and wait for additional resources.
3. No Preemption: Resources cannot be forcibly taken from a process.
4. Circular Wait: A cycle of processes waiting for resources.

**Deadlock Prevention:**
1. Static Resource Allocation: Allocate all necessary resources to a process at the beginning, reducing resource utilization efficiency.
2. Allow Preemption: Introduce the ability to preemptively reclaim resources from a process.

**Deadlock Avoidance:**
1. Resource Allocation Graph: Use a graph to represent the relationships between processes and resources, ensuring no circular wait conditions.
2. Banker's Algorithm: Evaluate whether a resource allocation request would lead to a safe state before granting it.

**Deadlock Detection and Recovery:**
1. Periodically check for deadlocks.
2. If a deadlock is detected, employ strategies such as process termination or resource preemption to resolve the deadlock.

---

### **15. Process Switching Flow**

To switch from Process A to Process B, the following steps are involved:

1. **User to Kernel Mode:**
   - CPU transitions from user mode to kernel mode to perform privileged operations.

2. **Save User Process Context:**
   - Save the context of the user process A, including registers, program counter, stack pointer, etc.
   - This involves saving the user-level context to the process control block (PCB) or a similar data structure.

3. **Scheduler Activation:**
   - The operating system scheduler determines the next process to run (Process B).

4. **Load User Process Context:**
   - Load the context of the user process B from its PCB or equivalent data structure.

5. **Kernel to User Mode:**
   - CPU transitions from kernel mode back to user mode, allowing the execution of user-level instructions.

**Context:**
- The context includes information about the state of the process, enabling the operating system to resume the process from where it left off.
- Context switching is essential for multitasking, allowing multiple processes to share the CPU.

**Note:**
- The transition between user mode and kernel mode involves hardware support, typically through hardware interrupts or system calls.
- Efficient context switching is crucial for maintaining system responsiveness and overall performance.

### **16. IO Multiplexing **

**Overview:**
IO Multiplexing is a synchronous IO model where a single thread can monitor multiple file descriptors. When a file descriptor is ready, the application is notified to perform corresponding read or write operations. If no file descriptors are ready, the application is blocked, allowing the CPU to be relinquished.

**Key Concepts:**
- Monitors multiple file descriptors, typically TCP connections (sockets) or channels.
- A single or a small number of threads handle multiple TCP connections.
- Achieves reduced system overhead, avoiding the need to create and maintain numerous processes/threads.

**Implementations:**
1. **Select:**
   - Older and more basic method.
   - Limits on the number of file descriptors to monitor.
   - Inefficient for large-scale applications.

2. **Poll:**
   - Overcomes some limitations of `select`.
   - No arbitrary limits on the number of file descriptors.
   - More efficient for handling a large number of connections.

3. **Epoll:**
   - Modern and scalable solution, widely used.
   - Dynamically manages file descriptors, adapting to the number of active connections.
   - Efficiently scales with a large number of connections.

**Benefits:**
- Reduces system overhead by avoiding the creation of excessive processes/threads.
- Efficiently handles a large number of connections, making it suitable for high-performance networking applications.

---

### **17. Steps from Inputting URL to Viewing Web Page**

1. **URL Input:**
   - User enters the URL in the browser.

2. **DNS Resolution:**
   - Browser resolves the domain name to an IP address using DNS.

3. **Establish TCP Connection:**
   - Browser establishes a TCP connection with the web server.

4. **Send HTTP/HTTPS Request:**
   - Browser sends an HTTP/HTTPS request, potentially establishing a TLS connection for secure communication.

5. **Server Responds:**
   - Web server processes the request and sends back the response.

6. **Browser Parses and Renders:**
   - Browser receives the response, parses HTML, and renders the webpage.

7. **HTTP Request Completion:**
   - Once the webpage is loaded, the HTTP request is completed, and the TCP connection may be closed.

**Note:**
- Additional steps may involve loading external resources, such as images or scripts.

---

### **18. Purpose of TCP Three-Way Handshake**

**Objective:**
The TCP three-way handshake aims to establish a reliable and synchronized connection between a client and a server. It ensures both parties agree on the initial sequence numbers and establishes a full-duplex communication channel.

**Reasons for Three-Way Handshake:**
1. **Prevent Connection Hijacking:**
   - Ensures that the connection is initiated by a legitimate party and not hijacked by an unauthorized entity.

2. **Synchronize Sequence Numbers:**
   - Allows both client and server to agree on initial sequence numbers for data transmission.

3. **Establish Reliability:**
   - Confirms that both parties are ready to exchange data and establishes a reliable connection.

**Why Not Two-Way or Four-Way:**
- Two-Way: Insufficient to establish bidirectional communication and may lead to ambiguity in initial sequence numbers.
- Four-Way: The third step in the handshake confirms the establishment of a reliable connection. Adding more steps does not provide additional benefits in terms of reliability and security.

### **19. TCP Four-Way Handshake and 2MSL Explanation**

**Why Four Steps in TCP Four-Way Handshake:**
- The server's ACK and FIN packets in the termination phase cannot be combined into a single step. 
- The process involves the client indicating the completion of its data transmission (FIN), the server acknowledging it (ACK), and the server independently finishing its data transmission and signaling the client about it (FIN-ACK).

**Four Steps in TCP Four-Way Handshake:**
1. **Client (Initiator) Sends FIN:**
   - Client initiates termination by sending a FIN (finish) packet to the server.

2. **Server Acknowledges (ACK) Client's FIN:**
   - Server acknowledges the client's FIN with an ACK (acknowledge) packet but indicates it may continue to send data.

3. **Server Sends FIN:**
   - Server independently finishes data transmission and sends its own FIN packet to the client.

4. **Client Acknowledges (ACK) Server's FIN:**
   - Client acknowledges the server's FIN, and both parties can now terminate the connection.

**Explanation of 2MSL (Maximum Segment Lifetime):**
- After the client acknowledges the server's FIN, it waits for a duration known as 2MSL before considering the connection fully closed.
- This waiting period helps ensure that any delayed packets or potential duplicates related to the terminated connection are not misinterpreted, allowing for a clean termination.

### **20. Differences Between TCP Long Connection and Short Connection**

**TCP Short Connection:**
- **Characteristics:**
  - Client and server establish a connection, perform one read/write operation, and then close the connection.
- **Advantages:**
  - Simplified management.
  - Lower server pressure.

**TCP Long Connection:**
- **Characteristics:**
  - Connection remains open after one read/write operation, allowing for multiple interactions.
- **Advantages:**
  - Faster multiple read/write operations.
  - Avoids frequent connection establishment overhead.
  - Suitable for scenarios with periodic interactions.

**Considerations:**
- Selection between short and long connections depends on application requirements and resource considerations.

---

### **21. Ensuring TCP Data Reliability**

**TCP Reliability Mechanisms:**

1. **Checksum:**
   - Implemented at the packet level, ensuring the integrity of transmitted data.

2. **Sequence Number, Acknowledgment, and Retransmission:**
   - Each data packet has a sequence number, and the receiver acknowledges received packets.
   - Retransmission occurs when acknowledgment is not received within a timeout.

3. **Flow Control:**
   - Adapts data transmission rates based on the receiver's buffer availability.
   - Prevents overwhelming the receiver.

4. **Congestion Control:**
   - Adjusts transmission rates to avoid network congestion.
   - Utilizes mechanisms like slow start, congestion avoidance, and fast retransmit.

**Summary:**
- TCP employs checksums, sequence numbers, acknowledgments, flow control, and congestion control to ensure data reliability during transmission.

### **22. Redis Online User Counting Strategies**

To count online users efficiently in Redis, various methods can be employed, including HyperLogLog, bitmaps, sets, and sorted sets.

1. **HyperLogLog:**
   - Efficiently reduces memory consumption.
   - Accuracy might be lower, making it less suitable for precise tracking of online users.

2. **Sets or Sorted Sets:**
   - Stores the specific list of online user names.
   - Consumes considerable memory.
   - Provides accurate tracking.

3. **Bitmaps:**
   - Utilizes a binary array to represent user presence.
   - Sets the corresponding bit to 1 when a user comes online using the SETBIT command.
   - Checks if a bit is set to 1 to determine if a user is online using the GETBIT command.
   - Counts the number of set bits using the BITCOUNT command to get the online user count.
   - Enables logical operations (AND, OR, XOR, NOT) using the BITOP command on multiple bitmaps.
   - Efficiently manages memory.

### **23. Analysis of Sorting Algorithms**

| Sorting Algorithm | Average Time Complexity | Worst Time Complexity | Best Time Complexity | Space Complexity | Stability |
|-------------------|------------------------|-----------------------|----------------------|-------------------|-----------|
| Bubble Sort       | O(n²)                  | O(n²)                 | O(n)                 | O(1)              | Stable    |
| Selection Sort    | O(n²)                  | O(n²)                 | O(n)                 | O(1)              | Unstable  |
| Insertion Sort    | O(n²)                  | O(n²)                 | O(n)                 | O(1)              | Stable    |
| Quick Sort        | O(n log n)             | O(n²)                 | O(n log n)           | O(n log n)        | Unstable  |
| Heap Sort         | O(n log n)             | O(n log n)            | O(n log n)           | O(1)              | Unstable  |
| Shell Sort        | O(n log n)             | O(ns)                 | O(n)                 | O(1)              | Unstable  |
| Merge Sort        | O(n log n)             | O(n log n)            | O(n log n)           | O(n)              | Stable    |
| Counting Sort     | O(n + k)               | O(n + k)              | O(n + k)             | O(n + k)          | Stable    |
| Radix Sort        | O(N * M)               | O(N * M)              | O(N * M)             | O(M)              | Stable    |

**Note:**
- N: Number of elements.
- M: Number of digits in the maximum element.
- k: Range of input (maximum - minimum + 1).

---

### **24. Advantages of DNS Load Balancing**

The primary advantages of DNS load balancing include:

1. **Simplicity of Configuration:**
   - DNS load balancing simplifies configuration as the scheduling of the server cluster is entirely handled by the DNS server.
   - Allows focus on ensuring the stability and throughput of backend servers.
   - DNS server performance is usually not a concern, even with simple strategies like round-robin, as it maintains excellent throughput.

2. **Scalability:**
   - Exhibits strong scalability by supporting multiple IP addresses for a single domain resolution.
   - The system can handle more IP addresses without significant performance concerns.

---

### **25. Inter-Process Communication Methods**

There are six main methods for inter-process communication:

1. **Pipes**
2. **Semaphores**
3. **Message Queues**
4. **Signals**
5. **Shared Memory**
6. **Sockets**

---

### **26. Differences in epoll's ET and LT Modes**

In epoll, there are two working modes: LT (level-triggered) and ET (edge-triggered).

- **LT (Level-Triggered):**
  - Default working mode.
  - Supports both block and non-blocking sockets.
  - Kernel informs whether a file descriptor is ready, allowing multiple IO operations without immediately responding.
  - Reduces the likelihood of programming errors.

- **ET (Edge-Triggered):**
  - High-performance working mode.
  - Only supports non-blocking sockets.
  - Kernel notifies when a descriptor transitions from not ready to ready.
  - Assumes the user knows when a file descriptor is ready and does not continuously notify if no action is taken.
  - Often faster but requires more caution in programming.

---

### **27. Design Patterns - Six Main Principles**

1. **Single Responsibility Principle (SRP):**
   - A class should have only one reason to change, meaning it should have only one responsibility.

2. **Liskov Substitution Principle (LSP):**
   - Objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program.

3. **Dependency Inversion Principle (DIP):**
   - High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details; details should depend on abstractions.

4. **Interface Segregation Principle (ISP):**
   - A class should not be forced to implement interfaces it does not use.

5. **Open/Closed Principle (OCP):**
   - Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification.

6. **Law of Demeter (LoD):**
   - A module should not have knowledge of the inner workings of the objects it manipulates, and it should interact only with its immediate neighbors.

---

### **28. Understanding MySQL Architecture**

MySQL architecture consists of two layers: MySQL Server layer and Storage Engine layer.

1. **MySQL Server Layer:**
   - **Connection Layer:** Handles communication protocol, thread management, and user authentication.
   - **SQL Layer:** Manages SQL parsing, query caching, query optimization, and execution planning.
   - **Utilizes Interfaces:** Applications connect through interfaces like ODBC and JDBC.

2. **Storage Engine Layer:**
   - Responsible for actual storage and retrieval of data.
   - Multiple storage engines available (e.g., InnoDB, MyISAM) with different features and performance characteristics.
   - Storage engines interact with the MySQL Server through a standardized API.

The MySQL Server layer includes components for connection handling, SQL processing, and interfaces for application connectivity. The Storage Engine layer manages the storage and retrieval of data, allowing for flexibility and optimization based on specific use cases.

---

### **29. Execution Flow of a SQL Statement in a Database Framework**

For a query statement, the execution flow in a database framework typically involves the following steps:

1. **Query Cache:**
   - Check if the query is present in the cache.
   - If found, return the cached result directly.

2. **Parser:**
   - Perform lexical and syntax analysis of the SQL statement.
   - Identify keywords and structure according to the syntax rules of the database.

3. **Optimizer:**
   - Optimize the query execution plan.
   - Decide on index usage, join order, and other optimization strategies.

4. **Executor:**
   - Execute the optimized query plan.
   - Access data based on the plan, involving opening tables and utilizing the storage engine.

5. **Result Return:**
   - Return the query result to the client.

---

### **30. Three Normal Forms in Databases**

1. **First Normal Form (1NF):**
   - Requires having a primary key.
   - Each field should be atomic and not divisible.

2. **Second Normal Form (2NF):**
   - All non-primary key fields must be fully functionally dependent on the primary key.
   - Avoid partial dependencies.

3. **Third Normal Form (3NF):**
   - Eliminate transitive dependencies between non-primary key fields.
   - No non-prime attribute depends on other non-prime attributes.

---

### **31. Difference between CHAR and VARCHAR**

- **CHAR:**
  - Fixed-length.
  - Storage is padded with spaces.

- **VARCHAR:**
  - Variable-length.
  - Storage only uses the necessary space.

- Both store non-Unicode character data.

---

### **32. Difference between VARCHAR(10) and VARCHAR(20)**

- Both have the same disk space usage.
- Longer VARCHAR values may consume more memory during file sorting or disk-based temporary table operations.

---

### **33. Underlying Data Structure of Indexes**

Indexes in databases typically use the B+ tree data structure.

---

### **34. Clustered Index vs. Non-Clustered Index**

- **Clustered Index:**
  - Data storage and index are physically organized together.
  - Finding the index means finding the data.

- **Non-Clustered Index:**
  - Data storage and index are separate.
  - Index structure's leaf nodes point to the actual data rows.

---

### **35. Understanding Hash Index**

- Hash index is implemented based on a hash table, and it is effective only for exact matching of all indexed columns.
- It stores hash codes and pointers, not the actual field values, which means it cannot be used to avoid reading rows.
- Accessing rows in memory is fast (especially for MEMORY engine), minimizing the performance impact.
- Hash index data is not stored in the order of index values, making it unsuitable for sorting.
- Partial index column searches are not supported. Hash index always uses the entire content of indexed columns to calculate hash codes.
  - For example, if a hash index is built on columns (A, B), it cannot be used if the query only involves column A.
- Supports only equality comparisons (=, IN(), <=>). Does not support range queries (e.g., WHERE price > 100).
- Hash collisions (different indexed columns having the same hash code) can impact query speed, requiring traversal of row pointers and individual comparisons.

---

### **36. Understanding Covering Index**

- Covering index refers to an index that includes all the columns required for a query, making it unnecessary to look up the actual table data.
- It avoids the need to search the primary key index after finding the data in a non-primary key index.
- Reduces the number of tree traversal steps, significantly improving performance.

---

### **37. Understanding the Leftmost Prefix Principle**

- The leftmost prefix principle states that for a composite index, any leftmost prefix of that index can be used for queries.
- If you have a composite index (col1, col2, col3), all prefixes (col1), (col1, col2), (col1, col2, col3) can be used for queries.
- Any query that includes the leading columns of the index will utilize that index.

---

### **38. Checking Index Usage and Identifying Slow Queries**

- To check if an index is used, you can use the `EXPLAIN` command before your query.
- `EXPLAIN` provides insights into the query execution plan, including which indexes are used, if any.
- Slow query analysis involves looking at the execution plan, identifying steps with high rows or key counts, and understanding where performance bottlenecks occur.

---

### **39. InnoDB vs. MyISAM Comparison**

#### **InnoDB:**
- Supports transactions, while MyISAM does not.
- Supports foreign keys, while MyISAM does not.
- Utilizes a clustered index, whereas MyISAM uses a non-clustered index.
- Does not save the exact row count; `SELECT COUNT(*)` may involve a full table scan.
- Employs row-level locking, allowing for better concurrency.
  
#### **MyISAM:**
- Lacks transaction support.
- Does not support foreign keys.
- Utilizes a non-clustered index structure.
- Saves the exact row count, enabling faster `SELECT COUNT(*)` queries.
- Uses table-level locking, which can limit concurrency and performance.

---

### **40. Understanding Horizontal and Vertical Sharding**

#### **Vertical Sharding:**
- Splitting information from one table into two or more tables, often through primary key relationships (vertical splitting of columns, distributing column data into different tables).
  
**Pros:**
- Clear and explicit database splitting rules.
- Clear application module separation, making integration easier.
- Convenient data maintenance and localization.

**Cons:**
- Some table associations cannot be completed at the database level and must be handled in the application.
- Performance bottleneck for large single tables still exists.
- Complex transaction processing.
- Expansion limitations after reaching a certain level of sharding.

#### **Horizontal Sharding:**
- Dividing data from one table into different tables or databases based on certain rules (horizontal splitting of rows, distributing row data into different tables).

**Pros:**
- Resolves performance bottlenecks for large tables.
- Minimal changes required to the overall application architecture.
- Simpler transaction processing.
- Fewer limitations on scalability.

**Cons:**
- More complex sharding rules; difficult to define a rule that covers the entire database.
- Increased difficulty in later data maintenance, making it more challenging to locate data manually.
- Higher coupling between application modules; potential difficulties in data migration and sharding.

---

### **41. Main Threads in MySQL Master-Slave Replication**

1. **Binlog Thread (Master):** Records all statements altering database data and stores them in the master's binary log.

2. **I/O Thread (Slave):** Responsible for fetching binary log events from the master and storing them in the slave's relay log.

3. **SQL Execution Thread (Slave):** Reads events from the relay log and executes them on the slave.

---

### **42. Causes of Replication Delay and Solutions**

**Architectural Aspects:**
1. Use a sharding architecture to horizontally scale MySQL services.
2. Implement read-write separation with one master and multiple slaves to distribute load and protect the master.
3. Introduce a cache layer (memcache, Redis) between applications and databases to reduce read pressure.
4. Distribute databases for different businesses on different physical machines to reduce load concentration.
5. Use high-quality server hardware. For example, 4U servers generally outperform 2U servers, and 2U servers outperform 1U servers.

**Hardware Aspects:**
1. Employ high-performance storage options such as SSDs, disk arrays, or SANs to enhance random write performance.
2. Ensure master and slave are in the same switch and use a 10Gb network.

**MySQL Master-Slave Replication Acceleration:**
1. Set `sync_binlog` to 0 on the slave side.
2. Disable binary logging on the slave side.
3. On the slave side, if using InnoDB, set `innodb_flush_log_at_trx_commit` to 2.
4. Adjust synchronization parameters. For the master (write), higher data security is required (e.g., `sync_binlog=1`, `innodb_flush_log_at_trx_commit=1`). For the slave (read), lower data security is acceptable (`sync_binlog=0` or turning off binlog, `innodb_flushlog=0`).

---

### **43. MySQL Default Isolation Level**

MySQL's default isolation level is **Repeatable Read (RR)**.

---

### **44. Locking Algorithms in the InnoDB Storage Engine**

The InnoDB storage engine employs three types of row-locking algorithms:

#### **1. Record Lock:**
   - **Description:** Lock applied to a single row record.
   - **Usage:** When a transaction modifies or reads a row, it acquires a record lock on that specific row to prevent other transactions from concurrently modifying it.

#### **2. Gap Lock:**
   - **Description:** Lock applied to a range of values between index records but does not include the records themselves.
   - **Usage:** Used to prevent other transactions from inserting a new row that would fall within the range of the gap lock.

#### **3. Next-Key Lock:**
   - **Description:** Combination of a Record Lock and a Gap Lock, covering a range and including the endpoint.
   - **Usage:** Prevents other transactions from inserting a new row that falls within the range, as well as updating or deleting any row within the range.

These locking mechanisms are essential for maintaining consistency and ensuring data integrity in a multi-user database environment.

---

### **45. Why Is Redis So Fast?**

Redis achieves its high performance due to several factors:

1. **In-Memory Storage:**
   - Redis stores data in memory, which allows for extremely fast read and write operations compared to databases that rely on disk storage.

2. **Simple Data Structures:**
   - Redis uses specialized and optimized data structures tailored for specific use cases, making operations on these structures very efficient.

3. **Single-Threaded Model:**
   - Redis operates on a single-threaded model, avoiding unnecessary context switches and contention that can arise in multi-threaded or multi-process environments. It eliminates concerns related to locks and provides predictable performance.

4. **Non-Blocking I/O:**
   - Redis uses a non-blocking I/O model, allowing it to handle a large number of simultaneous connections without the need for threading. This approach enhances scalability and responsiveness.

5. **Custom Protocol and VM Mechanism:**
   - Redis uses its own communication protocol and virtual machine (VM) mechanism. The custom VM mechanism avoids the overhead associated with standard system calls, contributing to its speed.

---

### **46. What Is Cache Avalanche? How to Solve It?**

**Cache Avalanche:**
Cache avalanche occurs when a large number of cache entries expire simultaneously, leading to a surge in requests hitting the database simultaneously. This can overload the database and degrade system performance.

**Solution:**
To prevent or mitigate cache avalanche, the following solutions can be employed:

1. **Randomized Expiry Time:**
   - Add a random component to the expiration time of cache entries to avoid simultaneous expiration. This spreads the load on the database over time.

2. **Cache Fallback Mechanism:**
   - Implement a cache fallback mechanism. If the cache is unavailable, the application can retrieve the data from the database and repopulate the cache gradually to distribute the load.

3. **Use of Caching Libraries:**
   - Utilize caching libraries or frameworks that offer features like automatic cache refreshing to avoid large-scale cache expiration at once.

4. **Monitoring and Alerting:**
   - Implement monitoring and alerting systems to detect unusual patterns in cache usage or database load. This allows proactive measures to be taken before an avalanche occurs.

---

### **47. What Is Cache Penetration? How to Solve It?**

**Cache Penetration:**
Cache penetration happens when requests with invalid or non-existent keys are sent to the cache, resulting in cache misses and subsequent unnecessary database queries.

**Solution:**
To address cache penetration, consider the following solutions:

1. **Placeholder for Invalid Keys:**
   - Store a placeholder value in the cache for invalid keys, indicating that the corresponding data is not present in the database. This prevents repeated querying for the same invalid key.

2. **Bloom Filters:**
   - Use Bloom filters to check whether a key exists in the cache before attempting to access the database. Bloom filters can reduce false cache misses and prevent unnecessary database queries.

Remember that each solution has its trade-offs, and the choice depends on specific use cases and requirements.

---

### **48. Signal Handling Methods**

Signal handling in Unix-like operating systems involves different methods:

1. **Executing Default Action:**
   - When a process receives a signal, it may perform the default action associated with that signal, which is predefined by the operating system.

2. **Ignoring:**
   - A process can choose to ignore a particular signal by setting the corresponding signal handler to `SIG_IGN`.

3. **Catching:**
   - Processes can catch signals by installing a signal handler. The handler is a function that gets executed when the process receives a specific signal. This allows custom actions to be performed in response to signals.

---

### **49. Redis Persistence Mechanisms**

Redis provides two main mechanisms for persistence:

1. **RDB (Redis DataBase) Snapshotting:**
   - Periodically saves the dataset to disk as a binary file. It is a point-in-time snapshot of the dataset.
  
2. **AOF (Append-Only File):**
   - Logs every write operation received by the server. It is a log of commands that can be replayed to reconstruct the dataset.

---

### **50. Redis Eviction Policies**

Redis eviction policies determine how Redis selects which keys to remove when it needs to free up space. Common policies include:

- `noeviction`: No eviction strategy; returns an error if memory limit is reached.
- Volatile eviction policies (e.g., `volatile-random`, `volatile-ttl`, `volatile-lru`, `volatile-lfu`) apply to keys with expiration times.
- All keys eviction policies (e.g., `allkeys-lru`, `allkeys-random`, `allkeys-lfu`) apply to all keys, regardless of expiration.

---

### **51. Common Redis Performance Issues and Solutions**

Common Redis performance issues and solutions include:

1. **Master Writing Memory Snapshots:**
   - Avoid writing memory snapshots on the master to prevent service interruptions. Preferably, use replication for backup.

2. **AOF File Rewrite Impact:**
   - AOF file rewriting consumes significant CPU and memory resources. Schedule rewrites during low-traffic periods.

3. **Main Thread Blocked during Full-Sync:**
   - During full synchronization, the main thread is blocked. Choose appropriate synchronization strategies and consider slave parallel synchronization.

4. **Single Point of Failure in Replication:**
   - Implement solutions like proactive replication, proxies, or slave promotion for handling single points of failure.

---

### **52. TCP vs. UDP: Differences and Use Cases**

1. **Connection-Oriented vs. Connectionless:**
   - TCP is connection-oriented, establishing a connection before data transfer. UDP is connectionless, allowing direct data transmission.

2. **Reliability:**
   - TCP provides reliable data delivery through mechanisms like acknowledgment and retransmission. UDP is unreliable and doesn't guarantee delivery.

3. **Ordered vs. Unordered:**
   - TCP ensures ordered data delivery, while UDP does not guarantee the order of data.

4. **Flow Control:**
   - TCP incorporates flow control mechanisms, preventing congestion. UDP does not have flow control, which may lead to congestion.

5. **Streaming vs. Message-Oriented:**
   - TCP delivers a continuous stream of bytes, while UDP sends individual messages.

6. **Performance:**
   - TCP is slower due to connection establishment and reliability mechanisms. UDP is faster, making it suitable for real-time applications like gaming and streaming.

7. **Header Size:**
   - TCP headers are larger compared to UDP headers, impacting the overall size of transmitted data.

8. **Use Cases:**
   - TCP is suitable for applications requiring reliability, such as file transfer and web browsing. UDP is preferred for real-time applications, including online gaming and live video streaming.

---

### **53. Differences Among HTTP 1.0, 1.1, and 2.0**

#### **HTTP 1.0 vs. HTTP 1.1:**

1. **Connection Handling:**
   - HTTP 1.0 requires the `keep-alive` parameter to establish persistent connections. HTTP 1.1 supports persistent connections by default, reducing connection overhead.

2. **Bandwidth Efficiency:**
   - HTTP 1.1 supports sending only header information (without the body) with a 100 response status. This saves bandwidth by avoiding unnecessary data transmission.

3. **Host Header:**
   - HTTP 1.1 introduces the `Host` header, allowing virtual hosting where multiple virtual sites on a single server share the same IP and port.

#### **HTTP 1.1 vs. HTTP 2.0:**

1. **Multiplexing:**
   - HTTP 2.0 uses multiplexing, allowing multiple requests to be handled concurrently on a single connection, significantly increasing efficiency. HTTP 1.1 can use multiple TCP connections for concurrency.

2. **Data Compression:**
   - HTTP 2.0 uses the HPACK algorithm to compress header data, reducing the volume of transmitted data and improving network speed. HTTP 1.1 does not support header compression.

3. **Server Push:**
   - HTTP 2.0 supports server push, where the server can push resources to the client before they are explicitly requested, optimizing resource loading.

---

### **54. Difference Between POST and GET: Use Cases**

#### **Differences:**

1. **Data Location:**
   - GET requests place data in the URL in the HTTP header, while POST requests place data in the HTTP body.

2. **Data Amount:**
   - GET requests have a limited data capacity (usually up to 1024B), while POST requests can transmit more data.

3. **Security:**
   - POST is considered more secure as it allows encrypted data transmission, reducing the risk of cross-site request forgery (CSRF) attacks. GET transmits data in plain text.

4. **Safety and Idempotence:**
   - POST requests are considered neither safe nor idempotent, as they modify server resources. GET requests are safe and idempotent.

#### **Use Cases:**

- **GET:** Used for retrieving resources, querying data. Suitable for requests that do not modify server resources.

- **POST:** Used for transmitting entity-body to the resource identified by the URI. Suitable for requests that modify server resources, such as form submissions.

---

### **55. Common HTTP Status Codes and Use Cases**

#### **1xx Informational:**

- **100 Continue:** Request received, continue processing.

- **101 Switching Protocols:** Switching to a different protocol.

#### **2xx Success:**

- **200 OK:** Successful request.

- **204 No Content:** Request succeeded, no additional content.

#### **3xx Redirection:**

- **301 Moved Permanently:** Resource moved permanently.

- **302 Found:** Resource temporarily moved.

- **304 Not Modified:** Resource not modified (used in caching).

#### **4xx Client Error:**

- **400 Bad Request:** Malformed request.

- **404 Not Found:** Resource not found.

- **405 Method Not Allowed:** Request method not allowed.

#### **5xx Server Error:**

- **500 Internal Server Error:** Server encountered an error.

- **502 Bad Gateway:** Bad gateway error.

- **504 Gateway Timeout:** Gateway timeout.

---

### **56. Difference Between HTTP Status Codes 301 and 302**

#### **Differences:**

- **301 Permanent Redirect:**
  - Indicates that the requested resource has been permanently moved to a new location.
  - Search engines update their index with the new URL.
  - Useful when you want all future requests to be directed to the new URL.

- **302 Found (Temporary Redirect):**
  - Indicates that the requested resource is temporarily located at a different URL.
  - Search engines keep the original URL in their index.
  - Suitable for temporary changes and when you want future requests to go back to the original URL.

#### **Use Cases:**

- **301 Redirect:**
  - Changing domain names permanently.
  - Updating URLs for SEO purposes.

- **302 Redirect:**
  - Temporary content changes.
  - A/B testing or temporary maintenance pages.

---

### **57. Implementation of Polymorphism**

Polymorphism is implemented through virtual functions. The address of virtual functions is stored in a virtual function table (vtable), and the address of the vtable is stored in the memory space of an instance object that belongs to a class with virtual functions.

Here is a brief explanation of the implementation:

1. **Virtual Functions:**
   - Virtual functions are declared in a class using the `virtual` keyword.

2. **Virtual Function Table (vtable):**
   - Classes with virtual functions have a virtual function table associated with them.
   - When an object is created, it contains a pointer to its corresponding vtable (vptr).

3. **vptr (Virtual Table Pointer):**
   - Each object has a vptr, which points to the virtual function table of its class.
   - The vptr is automatically set by the compiler during object creation.

4. **Function Invocation:**
   - When a virtual function is called through a base class pointer pointing to a derived class object, the vptr is used to find the correct virtual function in the vtable.

5. **Dynamic Binding:**
   - The actual function to be called is determined at runtime (dynamic binding).
   - This allows the program to invoke the correct overridden function based on the actual type of the object being referred to.

---

### **58. Mechanism Behind Virtual Functions**

**Implementation Mechanism:**

- Virtual functions are implemented using a virtual function table (vtable).
- The address of virtual functions is stored in the vtable, and each class with virtual functions has its own vtable.
- When an object is created, it contains a pointer to its vtable, known as the vptr (virtual table pointer).
- During runtime, when a virtual function is called, the vptr is used to locate the correct function in the vtable for execution.
- This mechanism allows dynamic binding, enabling the invocation of the correct overridden function based on the actual type of the object.

**Vtable Structure:**

- Each class with virtual functions has its vtable, a static array of function pointers.
- The vtable is created by the compiler during compilation.
- The vtable contains entries for each virtual function declared in the class, and each entry points to the corresponding function.

**Usage of vptr:**

- The vptr is set up by the compiler during object creation, and it points to the vtable of the class.
- When a virtual function is called, the vptr is used to access the correct function in the vtable, providing the flexibility of polymorphism.
  