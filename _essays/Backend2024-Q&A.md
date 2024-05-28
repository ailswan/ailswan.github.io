---
layout: essay_single
title: Backend 2024 Q & A
date: 2024-05-28
tags:
  - Backend
  - Review-Q&A
categories:
- Q&A
- Backend

feature_text: |
  ## Backend 2024 Q & A
  Post by ailswan May. 28, 2024
feature_image: "https://picsum.photos/2560/600?image=865"
---

### Java

#### Basic Syntax

1. **Difference between `equals` and `==`**
   
   `==` is used to compare if the references of objects are equal. The `equals()` method is used to compare if the values of objects are equal.

   In general cases, the `equals()` method directly calls `==` to determine if objects are equal, but user-defined classes can override the `equals()` method to implement their own equality logic.

   When overriding the `equals()` method, the `hashCode()` method must also be overridden to ensure that equal objects have the same hash code.

2. **Difference between HashTable and HashMap**

   - `HashTable` inherits from the `Dictionary` class, while `HashMap` inherits from the `AbstractMap` class.
   - `HashMap` supports using `null` as a key, while `HashTable` does not.
   - `HashTable` is thread-safe, while `HashMap` is not.

3. **Scenarios leading to StackOverflowError and OutOfMemoryError**

   - `StackOverflowError` occurs when the call stack depth is too deep, causing stack overflow. This can happen with deep recursion or infinite recursive calls.
   - `OutOfMemoryError` occurs when the heap memory in the Java Virtual Machine (JVM) is exhausted and new objects cannot be allocated. This might be due to too many objects being created, leading to insufficient heap space.

4. **Introduction to the `volatile` keyword**

   The `volatile` keyword is primarily used to ensure the visibility of changes to variables across threads and to prevent instruction reordering.

   The main functions of the `volatile` keyword are:

   - **Visibility**: When a thread modifies a variable declared as `volatile`, the change is visible to other threads. In Java, the working memory of threads is isolated from each other, and using the `volatile` keyword ensures that changes to a variable by one thread are visible to other threads.
   - **Ordering**: The `volatile` keyword prevents instruction reordering, ensuring the order of execution. Without `volatile`, the compiler and processor might reorder instructions, which can lead to unpredictable results in a multi-threaded environment. Using `volatile` prevents such reordering and ensures that instructions are executed in the intended order.
   - **Caching**: In a multi-threaded environment, the compiler and processor might perform caching optimizations on variables, leading to one thread modifying a variable but other threads still using the old cached value. Using `volatile` prevents caching optimizations, ensuring that every access reads the latest value from the main memory.

5. **Difference between Abstract Class and Interface**

   - **Abstract Class**:
     - An abstract class can contain both abstract and non-abstract methods.
     - It can have constructors and member variables.
     - It can use different access modifiers.
     - A class can inherit only one abstract class.

   - **Interface**:
     - An interface is a special type of abstract class that only contains abstract methods and constants; it cannot contain method implementations.
     - It cannot have constructors.
     - Methods in an interface can only be `public`.
     - A class can implement multiple interfaces, allowing for multiple inheritance.

#### JVM Related Knowledge

1. **Class Loading Mechanism**

   The class loading mechanism in Java refers to the process by which the Java Virtual Machine (JVM) loads class files and converts them into executable bytecode. The class loading mechanism mainly includes the following three steps: Loading, Linking, and Initialization. These three steps are collectively known as the class loading process.

   - **Loading**:
     Loading refers to reading the binary data of a class into memory and generating a `java.lang.Class` object that represents the class. The class loader locates and loads the class bytecode using the class's fully qualified name.

   - **Linking**:
     The linking phase includes three steps: Verification, Preparation, and Resolution.
     
     - **Verification**: Ensures that the loaded class is legal and conforms to specifications. This mainly involves verifying the class format, semantics, and bytecode.
     - **Preparation**: Allocates memory for the class's static variables and sets their default initial values.
     - **Resolution**: Converts symbolic references of classes, interfaces, fields, and methods into direct references.

   - **Initialization**:
     During this phase, static variables of the class are assigned initial values, and static blocks are executed. This is the final step of the class loading process and marks the true completion of class loading. The JVM ensures that the initialization of a class is thread-safe and is only executed once.

2. **Java Memory Areas**

   Java memory areas are different regions managed by the Java Virtual Machine (JVM) during runtime, used for storing various types of data and performing different operations. The main memory areas in Java include:

   - **Method Area**:
     The method area is a memory region shared by all threads, used to store class information, constants, static variables, and code compiled by the just-in-time compiler. In the HotSpot JVM, the method area is referred to as the "Permanent Generation" (PermGen), but in Java 8 and later versions, it has been replaced by Metaspace.

   - **Java Heap**:
     The heap is a memory area used for storing object instances and is the largest memory area managed by the JVM. The heap is shared by all threads and is the primary area where garbage collection occurs.

   - **Java Virtual Machine Stack**:
     The stack is a thread-private memory area where each thread has its own stack. It is used to store local variables, method call information, and method return values. The stack is composed of stack frames, each corresponding to a method call. The stack operates on a last-in-first-out (LIFO) basis.

   - **Native Method Stack**:
     Similar to the JVM stack, the native method stack is used to store information when native methods (methods written in languages other than Java) are called. Each thread has its own native method stack.

   - **Program Counter Register**:
     The program counter register stores the address of the current bytecode instruction being executed by the thread. Each thread has its own program counter register to ensure the correct execution position is restored after thread switching.

3. **JVM Garbage Collection Algorithms**

   - **Mark and Sweep Algorithm**:
     - **Mark Phase**: Starting from the root nodes, all reachable objects are marked.
     - **Sweep Phase**: All unmarked objects are cleared, and their memory space is freed.
     - **Disadvantage**: Generates memory fragmentation, affecting the allocation of large objects.

   - **Copying Algorithm**:
     - The heap is divided into two regions: one for active objects and one for free space.
     - When the active object region is full, surviving objects are copied to the free space region, and the previously used region is cleared.
     - **Disadvantage**: Only half of the memory is used, suitable for the young generation.

   - **Mark and Compact Algorithm**:
     - Similar to the Mark and Sweep algorithm, but after marking, surviving objects are moved towards one end, and the memory outside the boundary is cleared.
     - **Advantage**: Reduces memory fragmentation compared to Mark and Sweep.

   - **Generational Collection Algorithm**:
     - The heap is divided into the young generation and the old generation, each using different garbage collection algorithms.
     - The young generation typically uses the copying algorithm, while the old generation uses the Mark and Sweep or Mark and Compact algorithm.
     - **Advantage**: Utilizes the difference in object lifecycles; young generation objects have short lifecycles, while old generation objects have long lifecycles.

   - **Parallel Garbage Collection Algorithm**:
     - Uses multiple threads to perform garbage collection simultaneously, improving efficiency.
     - Includes parallel Mark and Sweep, parallel copying (Parallel Scavenge), etc.

   - **CMS Algorithm (Concurrent Mark-Sweep)**:
     - Tries to execute concurrently with application threads during the marking and sweeping phases to reduce pause times.
     - Involves initial marking, concurrent marking, re-marking, and concurrent sweeping.

   - **G1 Algorithm (Garbage First)**:
     - Divides the heap into multiple independent regions, including young generation, old generation, and mixed regions.
     - Optimizes garbage collection based on expected pause times, aiming to perform garbage collection while user threads are running.

### Redis

Redis is a flexible, high-performance key-value storage system suitable for a variety of uses, from caching to real-time analytics, and building complex distributed systems. Developed in C, it is highly optimized for storage. Since data is stored in memory, access speed is much faster compared to disk storage, making it commonly used to cache data, reduce database pressure, and improve performance.

1. **Redis Data Types**

   - String
   - Hash
   - List
   - Set
   - Sorted Set
   - Bitmap
   - HyperLogLog

Redis uses a hash table as the underlying implementation for dictionaries. Besides the hash data structure, the entire set of keys and values in Redis also forms a hash table. Redis employs a similar bucket-chaining method as Java to resolve collisions. During expansion or contraction, Redis allocates a new hashtable and then performs incremental migration.

3. **Persistence in Redis**

   - **RDB Persistence**: RDB persistence is the default persistence mechanism in Redis. It creates a snapshot of the data in memory and saves it to an RDB file. This file can be used to restore the data when Redis restarts.
   - **AOF Persistence**: AOF persistence logs every write operation Redis performs as a command in an append-only file (AOF). When Redis restarts, it replays these commands to restore the data.

4. **Selection of Secondary Cache**

   Using Redis as a secondary cache is a common choice as it supports fast reads, persistent storage, and distributed architecture. However, it introduces additional complexity to the system, requiring trade-offs between read and write performance and data consistency.

5. **Handling Concurrent Queries**

   Redis manages connections to Redis through a connection pool to minimize the overhead of establishing and closing connections during concurrent queries. For concurrent queries, the `pipeline` feature can be used to send multiple queries together, reducing network latency. Redis can employ optimistic locking to ensure atomic operations. It monitors a key before executing a transaction, canceling it if the key is modified. In distributed environments, the Redlock algorithm can be used to implement distributed locks.

6. **Brief Overview of Cache Breakdown**

   Cache breakdown refers to the situation where a cache key experiences a sudden surge in requests immediately after the cache expires, causing all requests to penetrate the cache and directly access the database or another storage system, leading to a transient surge in system load, affecting normal system operation.

7. **Maximum Size of String**

   A Redis string can be up to 512 MB in size, as clearly stated on the official website. The maximum storage length can be controlled by the configuration item `proto-max-bulk-len`.

8. **Redis String Implementation**

   Redis String objects have three encoding methods: INT, EMBSTR, and RAW. If an integer can be represented using long, it is stored as INT; if a string length is less than a threshold, it is stored as EMBSTR; otherwise, it is stored as RAW.

9. **Is Set Ordered?**

   The underlying implementation of Set in Redis can be either an integer set or a dictionary, with the former being ordered and the latter unordered. If all elements of the Set are integers and the number of elements does not exceed 512, it uses an integer set; otherwise, it uses a dictionary. Overall, Sets should be treated as unordered in business scenarios to avoid certain issues.

10. **Redis Skip List Encoding Mode**

    Skip list is a multi-level linked list data structure with a query efficiency comparable to binary search, with an overall average time complexity of O(logN). Before inserting a new node, the skip list calculates a random level. Initially, each node defaults to one level, and then the probability of increasing a level is 25%, with a maximum of 32 levels.

### Relational Databases (MySQL)

Relational databases are databases based on tables and use Structured Query Language (SQL) for data definition, querying, manipulation, and management. The core concepts of relational databases are tables, rows, and columns, where data is organized in the form of tables, with each table containing multiple rows of data composed of a series of columns. MySQL is an open-source relational database management system (RDBMS) and one of the most popular and widely used databases.

1. **Handling Slow Queries and Viewing Execution Plans**

   Slow queries can be identified by enabling the slow query log and using the `EXPLAIN` statement to view the execution plan. Analyzing the execution plan helps understand how the database executes query statements. Information such as table access methods, index usage, and row estimation in the execution plan can be adjusted to improve query performance.

2. **Lock Overview**

   MySQL provides various types and granularities of locks:
   
   - Shared Lock: Allows multiple transactions to read a resource simultaneously but prevents other transactions from acquiring an exclusive lock on that resource.
   - Exclusive Lock: Allows only one transaction to perform write operations on a resource, ensuring that other transactions cannot read from or write to the same resource.
   - Row-Level Lock: Locks one or more rows of data.
   - Table-Level Lock: Locks the entire table.
   - Intention Lock: Indicates the type of lock a transaction intends to acquire.

3. **Transaction and Isolation Levels Overview**

   A transaction is a set of operations treated as a single unit of work, either all successfully executed or all rolled back to maintain database consistency. Transactions typically have four properties, known as ACID:
   
   - Atomicity: Ensures that transactions are all or nothing.
   - Consistency: Maintains a consistent state of the database before and after transaction execution.
   - Isolation: Allows multiple transactions to execute concurrently while being isolated from each other.
   - Durability: Ensures that committed transactions are permanently saved.
   
   MySQL supports four isolation levels:
   
   - Read Uncommitted
   - Read Committed
   - Repeatable Read (MySQL's default isolation level)
   - Serializable

4. **Index Mechanism in MySQL**

   - **B-tree Index**:
     - Normal Index
     - Unique Index
     - Primary Key Index
     - Composite Index
   - **Hash Index**:
     - Suitable for equality queries
     - Does not support range queries or sorting operations
     - Does not support partial index queries
     - Handles hash collisions typically through linked lists
   
5. **Index Optimization Techniques**

   - Index Covering Optimization
   - Auto-Increment Primary Key
   - Avoiding Index Invalidation
   - Prefix Index Optimization

6. **Ensuring Transaction Isolation**

   Transaction isolation is ensured by Multi-Version Concurrency Control (MVCC) and locks. 
   - Snapshot reads under the Repeatable Read isolation level are achieved through MVCC, ensuring isolation.
   - Current reads (update, select ... for update) are protected by row-level locks to ensure isolation.

7. **Preventing Deadlocks in MySQL**

   Deadlocks cannot be entirely avoided but can be mitigated by:
   - Reducing lock holding time
   - Minimizing gap locks
   - Narrowing the locking scope
   - Adjusting MySQL parameters
   - Setting lock wait timeout parameter (`innodb_lock_wait_timeout`)
   - Enabling active deadlock detection (`innodb_deadlock_detect`)

### SSM and Spring Boot Framework

The combination of Spring, Spring MVC, and MyBatis provides a comprehensive solution for developing Java web applications.

**Spring**: Provides features like dependency injection and aspect-oriented programming for managing objects and transactions in the application.

**Spring MVC**: Based on the Model-View-Controller (MVC) design pattern, it is used for building the web layer of applications.

**MyBatis**: A data persistence framework that simplifies database operations by using XML descriptors or annotations for SQL mapping.

**Spring Boot**: A framework based on the Spring framework for rapid development and convenient configuration, primarily used to simplify and accelerate the development process of Spring applications.

1. **Bean Lifecycle**

   - Instantiation: JavaBean instances are created using the `new` keyword or by the Spring container invoking the bean's constructor method. If no constructor is defined, a default no-argument constructor is provided.
   - Property Setting: After instantiation, bean properties can be set using setter methods.
   - Usage: Beans are used to perform specific business logic, and their properties and methods are accessed and invoked.
   - Event Handling: If a bean defines event handling methods, they can be invoked when specific events occur.
   - Destruction: Beans may be garbage-collected by the Java Virtual Machine when no longer in use. The `finalize()` method can be defined in a bean to perform cleanup tasks before destruction.

2. **Difference Between Singleton and Prototype Beans**

   **Singleton Beans**:
   - Instantiated once during the Spring container startup and exists throughout the application's lifecycle.
   - Shared by all requests, returning the same instance.
   - Thread-safe by default as there is only one instance.
   - Suitable for stateless, lightweight beans.

   **Prototype Beans**:
   - Created each time a bean is requested, resulting in a new instance for each request.
   - Instances are not shared among requests.
   - May have state, but thread safety must be managed by the developer.
   - Suitable for stateful, heavyweight beans.

3. **Aspect-Oriented Programming (AOP) Concepts and Principles**

   AOP is a programming paradigm that separates cross-cutting concerns from the main application logic to improve modularity and maintainability.

   **Implementation Principles**:
   - Proxy-based Dynamic Proxy: Utilizes Java's dynamic proxy mechanism to create proxy objects for target objects, allowing cross-cutting logic to be inserted before or after method execution.
   - Bytecode-based Bytecode Enhancement: Uses bytecode manipulation libraries like ASM or CGLIB to modify the bytecode of target classes, allowing cross-cutting logic to be inserted directly into class files.

4. **Working Mechanism of Spring Boot**

   Spring Boot simplifies and accelerates the development and deployment process of Spring applications through features like auto-configuration, convention over configuration, and embedded containers.

   **Key Features**:
   - Auto-Configuration: Provides a large number of auto-configuration classes based on the application's classpath and existing beans. These classes are conditionally enabled based on specific conditions.
   - Starters: Spring Boot applications typically have a main class annotated with `@SpringBootApplication`, which is a combination of `@Configuration`, `@EnableAutoConfiguration`, and `@ComponentScan`.
   - Embedded Container: Spring Boot supports embedded containers like Tomcat, Jetty, and Undertow. These containers are automatically configured and started based on application settings.
   - Convention over Configuration: Spring Boot follows the convention over configuration principle, defining default directory structures and configurations to make development and maintenance easier.

### Computer Networks

Computer networks refer to the connection of computers and network devices distributed across different geographical locations via communication links to facilitate information exchange and resource sharing. Learning computer networks is crucial for understanding Internet principles, network communication protocols, system security, etc., and is fundamental knowledge in the field of computer science and engineering, providing essential foundations for developing network applications and designing system architectures.

1. **Congestion Control Process**

   TCP utilizes algorithms such as slow start, congestion avoidance, fast retransmit, and fast recovery for congestion control.

   - **Slow Start**:
     - Purpose: To avoid sending a large amount of data too early in the connection to prevent network congestion.
     - Process: The sender initializes a congestion window (cwnd) and doubles it every round-trip time (RTT), resulting in exponential growth of data transmission rate over time.

   - **Congestion Avoidance**:
     - Purpose: To prevent excessively rapid increase of the congestion window and maintain network stability.
     - Process: Once slow start enters the congestion avoidance phase, the congestion window grows linearly, increasing by one segment per RTT.

   - **Fast Retransmit**:
     - Purpose: To improve data transmission reliability by quickly retransmitting lost data.
     - Process: When the sender receives three duplicate acknowledgments (Duplicate ACKs), it assumes a packet loss and immediately retransmits the missing packet without waiting for a timeout.

   - **Fast Recovery**:
     - Purpose: To reduce the congestion window size and expedite network recovery.
     - Process: After fast retransmission, the congestion window is halved, followed by entry into the congestion avoidance phase.

2. **Layered Model of Computer Networks**

   To enhance the design, implementation, and maintenance of networks, layered models for computer networks were developed. The most famous ones are the OSI model and the TCP/IP model.

   **TCP/IP Model Layers**:
   - Network Interface Layer: Responsible for physical network connection.
   - Network Layer: Handles IP address allocation, packet routing, etc.
   - Transport Layer: Provides end-to-end communication services, including TCP and UDP protocols.
   - Application Layer: Offers network services and application program interfaces.

3. **How TCP Achieves Reliable Transmission**

   TCP implements reliable transmission through key mechanisms:
   - Sequence Number and Acknowledgment: Each packet is assigned a sequence number, and the receiver sends back an acknowledgment indicating the last successfully received sequence number.
   - Timeout Retransmission: If no acknowledgment is received within a specified time, the sender assumes packet loss and retransmits it.
   - Cumulative Acknowledgment: The receiver acknowledges the last received byte rather than each individual byte, reducing acknowledgment overhead.
   - Flow Control: The receiver controls the sender's transmission rate using a window size to prevent overwhelming the receiver.
   - Congestion Control: TCP employs various algorithms to control congestion, preventing network congestion due to excessive data transmission.

4. **TCP Three-Way Handshake and Four-Way Handshake**

   **TCP Three-Way Handshake**:
   - Client sends a connection request (SYN) and enters SYN_SENT state.
   - Server receives the request, replies with SYN-ACK, and enters SYN_RCVD state.
   - Client acknowledges the response with ACK, establishing the connection. Both sides enter ESTABLISHED state.

   **TCP Four-Way Handshake**:
   - Initiator sends a connection termination request (FIN) and enters FIN_WAIT_1 state.
   - Responder acknowledges the request with ACK and enters CLOSE_WAIT state.
   - Responder sends its own termination request after sending remaining data, entering LAST_ACK state.
   - Initiator acknowledges the termination request, and both sides enter CLOSED state.

5. **TCP vs. UDP Protocols**

   **TCP**:
   - Connection-oriented: Establishes a connection before data transfer and ensures reliable transmission.
   - Stream-oriented: Transmits data as a continuous stream, ensuring ordered and reliable delivery.
   
   **UDP**:
   - Connectionless: Does not establish a connection before data transfer, resulting in faster transmission but lacks reliability.
   - Datagram-oriented: Transmits data in discrete packets (datagrams), providing no guarantee of delivery order or reliability.

6. **Difference Between HTTP and RPC**

   - **HTTP**: More general-purpose, document-oriented, suitable for web application development.
   - **RPC**: Focuses on remote procedure calls, enabling more efficient service-to-service communication.
   - **HTTP**: Stateless, each request and response is independent.
   - **RPC**: Can maintain state, supporting remote procedure invocation.

7. **Difference Between HTTP and HTTPS**

   - **HTTPS**: Encrypts data transmission using SSL/TLS, ensuring data security.
   - **HTTP**: Transmits data in plaintext, lacking encryption.
   - **HTTPS**: Default port is 443.
   - **HTTP**: Default port is 80.
   - **HTTPS**: Requires SSL/TLS certificates for server authentication.

8. **Concept and Applications of Symmetric and Asymmetric Encryption**

   - **Symmetric Encryption**:
     - Uses the same key for both encryption and decryption, simpler but requires secure key exchange.
     - Suitable for environments requiring high transmission speeds and established trust relationships, such as local file encryption, database encryption.

### Operating Systems

An operating system (OS) is the core software of a computer system responsible for managing hardware resources, providing user interfaces, and executing applications. Learning about operating systems is crucial for gaining a deep understanding of how computers operate at a low level, mastering key concepts such as process management and file systems, and providing essential foundations for software development and system maintenance, thereby enhancing computer science and engineering capabilities.

1. **Contents of a Process**

   A process is associated with a data structure known as the Process Control Block (PCB), which is a critical data structure used by the operating system to manage and control processes. The PCB typically includes the following information:
   - Process State
   - Program Counter (PC)
   - Registers
   - Process ID (PID)
   - Priority
   - Scheduling Information
   - Memory Management Information
   - File Descriptor Table
   - Inter-Process Communication Information
   - Parent-Child Relationship and Other Relationships

2. **Meaning and Differences Between Processes and Threads**

   - **Process**: An instance of a running program in a computer. It is the basic unit of system resource allocation.
   - **Thread**: An execution unit within a process. Threads share the same memory space and resources within a process.

3. **Page Fault Interrupt**

   A page fault interrupt occurs when a program accesses a page (a unit of memory) that is not currently present in main memory. The operating system then needs to load the required page from disk or other secondary storage into main memory and restart the instruction that caused the page fault. The virtual memory system keeps commonly used pages in main memory and swaps out less frequently used ones to secondary storage to improve system performance.

4. **Process Synchronization and Mutual Exclusion**

   - **Process Synchronization**: Ensuring that multiple processes execute in a certain order to facilitate cooperation and maintain data consistency. In concurrent environments, multiple processes may access shared resources simultaneously, necessitating coordination of their execution order.
   - **Mutual Exclusion**: Ensuring that only one process or thread accesses a shared resource at a time to prevent data inconsistency or errors. Mutual exclusion is used to prevent concurrent access to shared resources.

5. **Understanding User Mode and Kernel Mode**

   - **User Mode**:
     - Programs run at a lower privilege level and can only access limited resources, unable to directly manipulate hardware devices or execute privileged instructions.
     - Programs executed in user mode are typically applications like text editors, browsers, etc., running in user space, relatively independent of the operating system kernel.

   - **Kernel Mode**:
     - Programs run at a higher privilege level with broader access to system resources and hardware.
     - The operating system kernel runs in kernel mode, responsible for managing system resources, scheduling processes, handling interrupts and exceptions, and other core functions.

   - **User-to-Kernel Mode Transition**:
     - When an application needs to perform certain operations, such as system calls, it transitions to kernel mode. The CPU switches from user mode to kernel mode to execute the corresponding kernel code, and then switches back to user mode upon completion.

### Design Patterns

Design patterns are reusable solutions to common problems in software design, providing proven design ideas. Learning design patterns helps improve code maintainability, extensibility, and reusability, enhances understanding of design principles, accelerates problem-solving, and improves software quality, making it an important approach to enhancing software engineering proficiency.

1. **Brief Description of Encountered and Used Design Patterns**

   - **Singleton Pattern**:
     Ensures that a class has only one instance and provides a global access point to it. Used in scenarios where only one instance is needed, such as database connection pools, log managers, etc.
   - **Factory Pattern**:
     Defines an interface for creating objects but lets subclasses decide which class to instantiate. Delays the instantiation process to subclasses to achieve decoupling of object creation and usage.
   - **Observer Pattern**:
     Defines a one-to-many dependency between objects, so that when one object's state changes, all its dependents are notified and updated automatically. Commonly used in event handling, publish-subscribe systems, etc.
   - **Strategy Pattern**:
     Defines a family of algorithms, encapsulates each one, and makes them interchangeable. Allows algorithms to vary independently of clients that use them.
   - **Decorator Pattern**:
     Dynamically attaches additional responsibilities to an object. Provides a flexible alternative to subclassing for extending functionality without altering class structure.
   - **Adapter Pattern**:
     Converts the interface of a class into another interface that clients expect. Allows classes with incompatible interfaces to work together.

2. **Implementation and Pros/Cons of Singleton Pattern**

   - **Eager Initialization**:
     ```java
     public class Singleton {
         private static final Singleton instance = new Singleton();
         private Singleton() {}
         public static Singleton getInstance() {
             return instance;
         }
     }
     ```
     - **Pros**:
       - Thread-safe: Instance is created when the class is loaded, avoiding multi-threading issues.
     - **Cons**:
       - Not lazy-loaded: Instance is created even if not used, potentially wasting resources.

   - **Lazy Initialization (Double-Checked Locking)**:
     ```java
     public class Singleton {
         private static volatile Singleton instance;
         private Singleton() {}
         public static Singleton getInstance() {
             if (instance == null) {
                 synchronized (Singleton.class) {
                     if (instance == null) {
                         instance = new Singleton();
                     }
                 }
             }
             return instance;
         }
     }
     ```
     - **Pros**:
       - Lazy-loaded: Instance is created only when first accessed, avoiding resource wastage.
       - Thread-safe: Ensures thread safety using double-checked locking.
     - **Cons**:
       - Code complexity: Introduces complexity with double-checked locking.

   - **Static Inner Class**:
     ```java
     public class Singleton {
         private Singleton() {}
         private static class SingletonHolder {
             private static final Singleton instance = new Singleton();
         }
         public static Singleton getInstance() {
             return SingletonHolder.instance;
         }
     }
     ```
     - **Pros**:
       - Lazy-loaded: Utilizes static inner class feature for lazy loading.
     - **Cons**:
       - Unable to prevent reflection attacks: Can be instantiated via reflection to create new instances.

