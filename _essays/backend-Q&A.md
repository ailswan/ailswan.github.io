---
layout: essay_single
title: backend Q&A
date: 2023-12-24
tags:
   - backend
categories:
- Q&A
- backend
feature_text: |
  ## Backend Q&A
  Post by ailswan Oct.24 , 2023
feature_image: "https://picsum.photos/2560/600?image=865"
---

### Python backend Q&A

**link:**
[python backend q&a](https://www.cative.io/blog/python-interview-questions?utm_campaign=coding_interview_pattern&utm_source=google&utm_medium=ppc&utm_content=pmax&utm_term=&eid=5082902844932096&utm_term=&utm_campaign=%5BNew+-+Nov+23%5D+PMAX-Coding+Interview+Patterns&utm_source=adwords&utm_medium=ppc&hsa_acc=5451446008&hsa_cam=20757269941&hsa_grp=&hsa_ad=&hsa_src=x&hsa_tgt=&hsa_kw=&hsa_mt=&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=CjwKCAiAyp-sBhBSEiwAWWzTnl-rjkeXiaLfOQ67fv1PNXZkqkG8tNc2FArX6Oo5bFQC3e0fSnelNBoCDxAQAvD_BwE)
 
 
### **1. Interface vs. Abstract Class**

| Feature                       | Interface                           | Abstract Class                     |
|-------------------------------|-------------------------------------|------------------------------------|
| **Methods**                   | Abstract methods only               | Can have both abstract and regular methods |
| **Keyword**                   | `interface`                         | `abstract`                         |
| **Constant/Variable Definition** | Can only define static constants  | Member variables                   |
| **Subclass Methods**          | All methods must be implemented     | Implement all abstract methods     |
| **Subclass Inheritance**      | Supports multiple inheritance      | Supports single inheritance        |
| **Constructor**               | Cannot have constructors            | Can have constructors               |
| **Interface Implementation**  | Can only inherit interfaces, cannot implement them | Can implement interfaces, including not implementing interface methods |

### **2. Multiple Inheritance:**
**Java:**
Supports only single inheritance, where a class can inherit from one superclass.
**C++:**
Allows multiple inheritance, enabling a class to inherit from more than one class.
**Python:**
Supports multiple inheritance like C++. A class can inherit from multiple classes.

### **3. Java Parameter Passing: Value or Reference?**

In Java, the mechanism for parameter passing is often a point of confusion. Java uses a mechanism that can be described as "pass-by-value."

- **Pass-by-Value:**
  - In Java, when you pass a primitive type (e.g., int, float) as an argument to a method, you are passing the actual value of the variable.
  - When you pass an object as an argument, you are passing the value of the reference to the object, not the actual object itself.

- **Object References:**
  - While it may seem like objects are passed by reference because you can modify the state of the object within a method, what is actually passed is the value of the reference to the object.
  - This means that if you modify the state of the object (e.g., changing the properties of the object), the changes are reflected outside the method.

- **Immutable Objects:**
  - For immutable objects (e.g., String), the effect of modification inside a method is similar to pass-by-value because the state of the object cannot be changed.

In summary, Java uses a pass-by-value mechanism, where the value of the variable is passed to the method. For objects, this means passing the value of the reference to the object, not the object itself.

### **4. Procedural Programming vs. Object-Oriented Programming (OOP)**

**Procedural Programming:**
- Focuses on procedures and steps.
- Emphasizes the current process and completes tasks step by step.
- Generally more efficient in execution.

**Object-Oriented Programming (OOP):**
- Abstracts entities into objects.
- Assigns attributes and methods to objects, accomplishing tasks through their execution.
- Offers advantages of lower coupling, strong extensibility, and easy maintenance.

**Comparison:**
- Procedural is more efficient but less maintainable.
- OOP provides higher maintainability, lower coupling, and better code organization.
- Procedural suits smaller projects, while OOP is suitable for larger, complex projects.

### **5. Differences between final, finally, and finalize**

**final:**
- Used to modify attributes, classes, and methods. Once a variable is assigned a value using final, it cannot be reassigned.
- Instance variables marked with final must explicitly specify an initial value.

**finally:**
- Employed in exception handling and can only be used within a try/catch block.
- The code following finally will always be executed.

**finalize:**
- A method in the `java.lang.Object` class.
- Inherited by every object. It is invoked during the execution of the garbage collection mechanism, allowing the recovery of unused memory garbage.

### **6. What is Serialization? What is Deserialization?**

**Serialization:**
- Serialization involves converting an object into a byte sequence, making it suitable for storage and transmission.
- The purpose is to represent the object's state in a format that can be easily stored or transmitted.

**Deserialization:**
- Deserialization is the process of converting a byte sequence back into an object.
- It serves as the complementary operation to serialization, restoring the object to its original form.

Serialization and deserialization are essential concepts in handling object persistence and communication in various programming contexts.

### **7. What is an Immutable Class?**

An immutable class refers to a class whose instance properties cannot be modified. Once an instance of an immutable class is created, its member variables cannot be altered. The Java platform's class library includes many immutable classes, such as String and primitive data type wrappers. Immutable classes offer enhanced safety compared to their mutable counterparts.

### **8. Why is String Immutable in Java?**

The immutability of the String class in Java is attributed to several factors:

1. **Internal Representation:**
   - String class contains three private attributes: a char array called `value`, and two integers `offset` and `count`.
   - These attributes are inaccessible from external classes, as they are private and lack methods to modify their values.
  
2. **Final Keyword:**
   - The three attributes in the String class are marked with the `final` keyword, making them immutable from within the class.

3. **String Pool:**
   - Java has a special storage area called the String Pool in the method area.
   - When creating a String, if the same string value is found in the String Pool, a reference to the existing String is returned instead of creating a new object.
  
4. **Preventing Unintended Changes:**
   - If String were mutable, modifying one instance could impact other references to the same string value, leading to unintended changes.

The combination of a private, final, and unmodifiable internal representation, along with the String Pool mechanism, ensures the immutability of the String class in Java.

### **9. Difference Between API and SPI**

**API (Application Programming Interface):**
- Defined and implemented by the provider.
- Users only interact with the API through method calls; the implementation details are hidden.
- Users are consumers of the API, utilizing the functionality provided by the implementation.

**SPI (Service Provider Interface):**
- Interface defined by the consumer.
- Implementation is left to the service provider, allowing for multiple implementations.
- Consumers have the flexibility to choose among different implementations of the same interface.
  
**Example - JDBC:**
- In JDBC, when connecting to different databases, specific drivers are required.
- JDBC provides a driver interface (SPI) that is implemented differently by various driver providers.
- Users (callers) can choose and use specific driver implementations based on their database requirements.

In summary, while API is defined and implemented by the provider, SPI allows consumers to define an interface and leave the implementation to various service providers, providing flexibility in choosing different implementations.

### **10. Differences Between Threads and Processes**

| Feature          | Process                               | Thread                                      |
|------------------|---------------------------------------|---------------------------------------------|
| **Definition**   | Basic unit for resource allocation and scheduling by the operating system | Smallest unit of computation schedulable by the operating system |
| **Hierarchy**    | Instance of a running program         | Execution flow within a process              |
| **Resource Sharing** | Processes cannot share resources with each other | Threads within the same process can share resources |
| **Context Switching** | Slow context switching               | Fast context switching                       |
| **Control**      | Governed by the operating system      | Controlled by the programmer                |

In summary, processes are instances of running programs, managed by the operating system, and cannot share resources directly. Threads, on the other hand, are the smallest units of computation within a process, allowing for resource sharing and faster context switching, and are controlled by the programmer.

### **11. Differences Between Threads and Coroutines**

| Feature                | Thread                                | Coroutine                                   |
|------------------------|---------------------------------------|---------------------------------------------|
| **Definition**         | Smallest unit of execution managed by the operating system | Smallest unit of resource management, not bound to the operating system |
| **Hierarchy**          | A process can have multiple threads   | A thread can have multiple coroutines        |
| **Synchronization**    | Synchronous mechanisms               | Asynchronous mechanisms                      |
| **Resource Consumption**| MB-level, larger                      | KB-level, smaller                           |
| **Use Cases for Coroutines** | High-concurrency services like seckill systems, RPC servers, etc. | Web scraping development, real-time communication services such as chat rooms and game servers |

In summary, threads are the smallest units of execution managed by the operating system, while coroutines are smaller units of resource management not tied to the operating system. Coroutines are often used in scenarios requiring high concurrency, such as seckill systems and RPC servers, as well as in web scraping and real-time communication services.

### **12. Understanding Thread Safety in Containers and Specific Implementations**

**Thread Safety:**
- **Definition:**
  - In a program with multiple threads operating on shared data, thread safety ensures that code can execute correctly and reliably in parallel through synchronization mechanisms.
  - Thread-safe code prevents unexpected issues such as data corruption.

**Thread Unsafe:**
- **Definition:**
  - In scenarios without protective mechanisms, multiple threads may alter shared data without proper synchronization, leading to potential inconsistencies or "dirty data."

**Specific Implementations for Thread Safety:**

1. **Mutex Synchronization:**
   - Achieved through the `synchronized` keyword.
   - Generates bytecode instructions (`monitorenter` and `monitorexit`) to establish and release locks.
   - Ensures that only one thread can execute the synchronized block at a time.

2. **Non-Blocking Synchronization:**
   - An optimization of mutex synchronization.
   - Threads that fail to acquire a lock do not immediately suspend but may spin for a brief period before suspending.
   - Reduces the overhead of thread suspension.

3. **No Synchronization Approach:**
   - Lack of any protective mechanisms.
   - Multiple threads can concurrently modify shared data, leading to potential conflicts.
   - Used when performance is a critical consideration, and developers accept the risk of race conditions.

**Additional Thread Safety Strategies:**

4. **Reentrant Code:**
   - Code that can be interrupted at any point for the execution of other code and can safely continue within reasonable boundaries (e.g., supporting multiple reentrant calls).

5. **Thread-Local Storage:**
   - Allocates a separate storage space (copy) for each thread.
   - Modifications by a thread only affect its local copy, avoiding interference with other threads.

In summary, thread safety in containers is achieved through various mechanisms such as mutex synchronization, non-blocking synchronization, or even opting for no synchronization in specific cases. Additional strategies include implementing reentrant code and utilizing thread-local storage to isolate modifications made by individual threads.

### **13. Achieving Thread Safety in Java**

To ensure thread safety in Java, use the following approaches:

1. **Atomic Classes with CAS:**
   - Utilize classes from the `java.util.concurrent.atomic` package.
   - Employ CAS operations to guarantee uninterrupted execution.

2. **Synchronized and Volatile Keywords:**
   - Use the `synchronized` or `volatile` keyword to enforce locking mechanisms.
   - For example, when dealing with collections like `HashMap`, lacking internal locking, consider using `Hashtable` or other synchronized collections.

3. **Thread-Local Storage (TLS):**
   - Implement TLS to mitigate resource contention.
   - Provide each thread with its copy of the resource, allowing simultaneous access without conflicts.
   - Useful for isolating thread-specific data.

**Example - Synchronized Approach:**
```java
public class SynchronizedExample {
    private int sharedVariable = 0;

    public synchronized void increment() {
        sharedVariable++;
    }
}
```
**Example - Using Atomic Classes:**
```java
import java.util.concurrent.atomic.AtomicInteger;

public class AtomicExample {
    private AtomicInteger atomicVariable = new AtomicInteger(0);

    public void increment() {
        atomicVariable.incrementAndGet();
    }
}
```
**Example - Thread-Local Storage (TLS):**
```java
public class ThreadLocalExample {
    private static final ThreadLocal<Integer> threadLocalVariable = ThreadLocal.withInitial(() -> 0);

    public void increment() {
        threadLocalVariable.set(threadLocalVariable.get() + 1);
    }

    public int getValue() {
        return threadLocalVariable.get();
    }
}
```
These approaches, whether using atomic classes, synchronization, or TLS, contribute to creating thread-safe Java programs by preventing data corruption and ensuring proper synchronization.

### **14. Thread Pool Implementations Provided by the Concurrency Library**

1. **`newCachedThreadPool()`**
   - Creates a thread pool that dynamically adjusts the number of threads based on demand.
   - Threads are reused if available or new ones are created if needed.

2. **`newFixedThreadPool(int nThreads)`**
   - Creates a thread pool with a fixed number of threads specified by `nThreads`.
   - The pool maintains a constant number of threads, reusing them if available.

3. **`newSingleThreadExecutor()`**
   - Creates a thread pool with a single thread.
   - Useful for sequential execution of tasks in a dedicated thread.

4. **`newSingleThreadScheduledExecutor()`** and **`newScheduledThreadPool(int corePoolSize)`**
   - Create thread pools that support scheduling of tasks.
   - `newSingleThreadScheduledExecutor()` has a single thread for scheduling tasks.
   - `newScheduledThreadPool(int corePoolSize)` allows specifying the core pool size for scheduling.

5. **`newWorkStealingPool(int parallelism)`**
   - Creates a thread pool that dynamically adjusts the number of threads based on demand, utilizing a work-stealing algorithm.
   - Efficiently handles tasks with varying execution times.

These thread pool implementations provided by the concurrency library offer different strategies for managing threads and tasks, catering to various concurrency requirements.

### **15. Key Parameters in Thread Pools and Setting Strategies**

In a thread pool, several parameters, such as core pool size and maximum pool size, play crucial roles. If you were to set these values, how would you do it, and based on what criteria?

**Parameters in Thread Pools:**
- **Core Pool Size:** The number of threads to keep in the pool, even when they are idle.
- **Maximum Pool Size:** The maximum number of threads to allow in the pool.
- **Thread Keep-Alive Time:** The time that excess idle threads will wait for new tasks before terminating.

**Setting Strategies Based on Task Types:**
1. **CPU-Intensive Tasks:**
   - For tasks mainly consuming CPU resources, set an additional thread to fully utilize CPU idle time.
   - Formula: Number of Threads = N + 1

2. **I/O-Intensive Tasks:**
   - Tasks with significant I/O interactions don't occupy the CPU during I/O processing.
   - Allocate more threads to handle I/O-bound tasks efficiently.
   - Formula: Number of Threads = 2N

3. **General Business Applications:**
   - For typical business scenarios, use the formula:
     - Formula: Number of Threads = N * (1 + WT / ST)
     - N: Number of CPU cores
     - WT: Thread wait time
     - ST: Thread service time

**Setting Procedure:**
   - Evaluate the business scenario and choose between "N+1" and "2N" based on the task nature.
   - Use the formula to calculate an approximate thread count.
   - Refine the count through practical load testing, observing changes in execution time.
   - Fine-tune the thread count based on empirical results to establish an optimal configuration.

By employing these strategies, you can tailor thread pool parameters to the specific requirements of CPU-intensive or I/O-intensive tasks, ensuring optimal performance in different scenarios.

### **16.Lock Types in Java**

| Lock Type                    | Description                                                                                                     |
|------------------------------|-----------------------------------------------------------------------------------------------------------------|
| **ReentrantLock**            | Provides a mutual exclusion lock similar to synchronized but with more advanced features.                        |
| **ReadLock / WriteLock**     | Part of the ReadWriteLock interface, allowing multiple threads to read data concurrently or a single thread to write data exclusively. |
| **ReentrantReadWriteLock**   | Implements the ReadWriteLock interface, allowing multiple threads to read data concurrently or a single thread to write data exclusively. |
| **StampedLock**              | Introduces optimistic reading, potentially improving performance by allowing multiple threads to read concurrently without locking. |
| **Condition**                | Associated with a Lock, provides a way for threads to suspend execution until a certain condition is met.        |
| **Semaphore**                | Maintains a set of permits, allowing control over access to a shared resource by multiple threads.                 |
| **CountDownLatch**           | A synchronization aid that allows a set of threads to wait until a specified count of operations completes.         |
| **CyclicBarrier**            | Enables a set of threads to wait at a barrier until all threads have reached it before continuing.                |
| **Phaser**                   | Provides a more flexible and scalable alternative to CyclicBarrier and CountDownLatch.                             |
| **LockSupport**              | Supports synchronization primitives for creating locks and other synchronization utilities.                       |

These are some of the common lock types in Java, each serving specific synchronization and concurrency control purposes.

### **17.Understanding Optimistic Locking and Pessimistic Locking**

**Optimistic Locking:**
- Optimistic locking assumes a positive outlook, believing that others won't modify data simultaneously. Therefore, it avoids locking by default.
- It uses a comparison-based approach during data updates. If the data has been modified since retrieval, the operation is abandoned; otherwise, the operation proceeds.
- Typical optimistic locking mechanisms include CAS (Compare and Swap) and versioning.
  - CAS involves comparing and setting data through memory location, expected value, and the intended new value.
  - Versioning adds a version field to records, incrementing it with each update.

**Pessimistic Locking:**
- Pessimistic locking takes a more negative approach, assuming that others might modify data. It always opts for locking during data operations.
- Common implementations of pessimistic locking include the `synchronized` keyword, `ReentrantLock` exclusive lock, and MySQL's exclusive lock.
  - `synchronized` ensures that only one thread can access shared data at a time.
  - ReentrantLock provides exclusive locking, but the switch between user and kernel space can impact efficiency.
  - MySQL's exclusive lock prevents other transactions from accessing the same data during updates.

**Choosing Between the Two:**
- **Optimistic Locking:** Suitable when concurrent updates are infrequent, and conflicts are minimal. It enhances performance by avoiding unnecessary locks.
- **Pessimistic Locking:** Suitable when the likelihood of concurrent updates is high, ensuring exclusive access to shared resources during operations.

In summary, the choice between optimistic and pessimistic locking depends on the specific characteristics of data operations and the expected concurrency scenarios.
