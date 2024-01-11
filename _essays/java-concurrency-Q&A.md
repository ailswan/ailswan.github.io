---
layout: essay_single
title: Java Concurrency Q & A
date: 2024-01-10
tags:
  - Java
  - Backend
  - Review-Q&A
categories:
- Concurrency    
- Backend

feature_text: |
  ## Java Concurrency Q & A
  Post by ailswan Jan. 10, 2024
feature_image: "https://picsum.photos/2560/600?image=865"
---

# 1. Multithreading

## Three ways to create threads (`Thread`):
1. Directly using `Thread`
2. `Thread` + `Runnable`
3. `Thread` + `Callable` + `FutureTask`

## Methods provided by the `Thread` class to control threads, their purposes, and their impact on thread states:
- `start` / `run`
  - **Purpose:** Initiates the execution of the thread.
- `sleep` / `yield`
  - **Purpose:** `sleep` pauses the execution for a specified time; `yield` suggests that the thread is willing to relinquish its current use of a processor.
- `join` / `join(long n)`
  - **Purpose:** Waits for the thread to die. The `join(long n)` method waits at most `n` milliseconds for the thread to terminate.
- `interrupt`
  - **Purpose:** Interrupts the thread.
- `setDaemon`
  - **Purpose:** Marks the thread as a daemon thread, which does not prevent the program from exiting.

## Three essential properties related to thread safety:
1. **Atomicity:**
   - **Definition:** An operation is uninterruptible, either it succeeds entirely or fails entirely (providing mutual exclusion, allowing only one thread to operate on data at any given time).
   
2. **Visibility:**
   - **Definition:** When one thread modifies a shared variable, other threads can immediately be aware of this modification.

3. **Ordering:**
   - **Definition:** Due to the optimization of program performance, compilers and processors may reorder instruction sequences. In a multithreaded environment, this can lead to incorrect program results.

## Principles followed by compilers and processors during reordering:
- **Data Dependency:**
  - During reordering, compilers and processors adhere to data dependency, maintaining the execution order of operations with a data dependency relationship.

- **As-If-Serial Semantics:**
  - **Definition:** Regardless of how reordering occurs, the program's execution results must not be altered. Compilers, runtime, and processors must adhere to the as-if-serial semantics.

In fact, visibility and ordering are contradictory aspects. On the one hand, for programmers, we hope that the memory model is easy to understand and program. Therefore, the designers of the Java Memory Model (JMM) need to provide programmers with a strong guarantee of memory visibility, referred to as a "strong memory model." On the other hand, compilers and processors want as few constraints from the memory model as possible so that they can perform as many optimizations as possible (such as reordering) to improve performance. Therefore, the designers of JMM aim to relax restrictions on compilers and processors as much as possible, known as a "weak memory model."

---

# 2. Ensuring Thread Safety in Java

## Visibility
To ensure visibility in Java, the following approaches can be used:
- Use the `volatile` keyword, which not only ensures visibility but also prevents instruction reordering.
- Additionally, the `synchronized` and `final` keywords also guarantee visibility.

## Atomicity
To ensure atomicity in Java, the following methods can be employed:
- Use locks and classes from the `java.util.concurrent.atomic` package. This package, commonly known as J.U.C, introduces classes that ensure atomicity through Compare-And-Swap (CAS) operations.
  - It's crucial to delve into CAS, understand the associated problems, and explore the underlying principles of these atomic classes.

## Locks in Java
Understanding locks in Java is essential. Before delving into the topic, grasp various lock concepts, including:
- Pessimistic locks and optimistic locks
- Heavyweight locks and lightweight locks
- Spin locks
- Biased locks
- Reentrant locks and non-reentrant locks
- Fair locks and unfair locks
- Shared locks and exclusive locks

## Additional Concepts
- Concepts related to locks, such as critical sections and race conditions, are crucial to understanding.

## Implementation of Locks in Java
In the early days, Java programs relied on the `synchronized` keyword for locking. After mastering its usage and underlying principles, you'll encounter associated methods like `wait/notify/notifyAll`.
- Since Java SE 5, the concurrency package JUC introduced the `Lock` interface and related implementation classes (found in the `java.util.concurrent.locks` package) to implement locking functionality.

# Introduction to the Java Lock Interface

## Why Introduce the Lock Interface and Its Implementations?

The introduction of the `Lock` interface and its related implementations stemmed from the limitations of using the `synchronized` keyword. While `synchronized` implicitly acquires and releases locks, it rigidly couples lock acquisition and release—always acquiring before releasing. Although this simplifies synchronization management, it lacks the flexibility of explicitly acquiring and releasing locks.

For example, consider a scenario where locks A, B, C, D, etc., need to be acquired and released in a specific order, such as acquiring A, then B, releasing A while acquiring C, and so on. Achieving this with the `synchronized` keyword can be challenging, but using the `Lock` interface provides a more straightforward solution.

The `Lock` interface offers synchronization features similar to the `synchronized` keyword but requires explicit lock acquisition and release. Despite lacking the convenience of implicit lock acquisition and release, it provides operability, interruptible lock acquisition, timeout-based lock acquisition, and other synchronization features not present in the `synchronized` keyword.

Moreover, a crucial point to note is that when exploring classes implementing the `Lock` interface, such as `ReentrantLock` (often translated as reentrant lock), you'll be surprised to find minimal code. Most methods in these classes delegate their functionality to the static inner class `Sync`, which, in turn, inherits from the `AbstractQueuedSynchronizer` class (also known as AQS, the Queue Synchronizer).

AQS can be understood as a framework for constructing locks and synchronizers (utility classes). Various locks in the `locks` package and utility classes in the upcoming JUC (Java Util Concurrent) are implemented based on AQS.

In conclusion, the article doesn't delve further into AQS, and the three concurrent keywords—`synchronized`, `volatile`, and `final`. These topics will be covered in future articles.

# Overview of Java Util Concurrent (JUC)

JUC can be categorized into five main classes:

1. **Lock Framework (in the `locks` package):**
   - This class includes various locks that are part of the Lock framework.

2. **Atomic Classes (in the `atomic` package):**
   - The atomic package consists of classes that provide atomic operations.

3. **Concurrent Collections:**
   - This category includes concurrent collections that facilitate operations in a multi-threaded environment.

4. **Thread Pools:**
   - Thread pools are a crucial part of JUC, managing and optimizing the execution of threads.

5. **Utility Classes:**
   - Various utility classes in JUC provide solutions to common concurrency-related problems.

In this stage of learning, our focus will be on the last three categories. While concurrent collections and thread pools are straightforward topics with well-defined learning objectives, the commonly used utility classes are also worth exploring:

- **CountDownLatch:**
  - Used in scenarios where the main thread needs to wait for multiple threads to complete their tasks before proceeding. It acts as a countdown mechanism.

- **CyclicBarrier:**
  - Facilitates synchronization among multiple threads by providing a point where threads must wait for each other.

- **Semaphore:**
  - Controls access to a resource by limiting the number of threads that can simultaneously access it.

- **Exchanger:**
  - Facilitates data exchange between two threads by providing a point where they can swap data.

Utility classes encapsulate complex operations, making it simple for us to perform these tasks. Taking CountDownLatch as an example: in multi-threaded collaboration scenarios where the main thread needs to wait for other threads to complete tasks, we could traditionally use the `join` method of the Thread class. However, JUC provides a more convenient solution with the CountDownLatch class, acting as a "countdown" mechanism for such business scenarios.

---

# 2.Q&A: Difference Between Java Threads and Operating System Threads

## 1. User Space and Kernel Space

Regarding the concepts of kernel mode and user mode, you can refer to this article: [Understanding Things About Operating Systems](link to the article), so I won't delve into it here.

Understanding what is system space and user space is also straightforward. In an operating system, memory is usually divided into two parts: user space and kernel space. When a process/thread runs in user space, it is in user mode, and when it runs in kernel space, it is in kernel mode:

- Programs running in kernel mode can access both user space and kernel space, meaning they can access any computer resource without restrictions. For example, they can coordinate CPU resources, allocate memory resources, provide a stable environment for application program execution, etc.
- Application programs mainly run in user mode, which is the space provided for the execution of application programs. Programs running in user mode can only access user space.

So, why distinguish between user mode and kernel mode?

In the early days, operating systems did not distinguish between user mode and kernel mode, meaning application programs could access any memory space. If a program was unstable, it could crash the system by overwriting operating system memory data. To address this, experts devised a set of rules: dangerous operations require switching to kernel mode to run. For instance, resource management programs such as CPU, memory, and devices should run in kernel mode; otherwise, there would be no security guarantee.

For example, concerning file systems and data, file system data and management must be in kernel mode, while user data and management can be in user mode.

User-mode programs cannot arbitrarily operate in kernel address space, effectively preventing operating system programs from being compromised by application programs.

If a program in user mode wants to access kernel space, it needs to perform a system call to switch from user mode to kernel mode.

## 2. Operating System Threads

### 1. Implementing Threads in User Space

In the early days of operating systems, all threads were implemented in user space. The operating system could only see the process to which the thread belonged and not the thread itself.

From a developer's perspective, user-level threads involve defining the thread's data structure, creating, destroying, scheduling, and maintaining the threads. These threads run within a specific process of the operating system, and the operating system directly schedules the process.

**Advantages of User-Level Threads:**
- **Thread Support:** Even if the operating system does not natively support threads, we can implement thread support using library functions.
- **User-Space Scheduling:** Thread scheduling occurs in user space, avoiding the overhead of transitioning from kernel mode to user mode.

**Disadvantages of User-Level Threads:**
- **Lack of Visibility:** Since the operating system is unaware of the threads, and CPU time-slice switching occurs at the process level, a long-running operation in one thread can cause other threads in the same process to wait for an extended period.
- **Blocking Issues:** If a thread in a process gets blocked due to a system call, such as a page fault, the entire process may be blocked, even if other threads within the process are still active.

#### 2. Implementing Threads in Kernel Space

Kernel-level threads run in the kernel space and are directly managed by the kernel. The kernel is responsible for the creation, destruction, scheduling, and maintenance of these threads.

**Advantages of Kernel-Level Threads:**
- **Kernel Support:** Modern operating systems, including Windows, Linux, macOS, and Solaris, support kernel-level threads.
- **Concurrent Processing:** Each kernel thread acts as a separate entity, enabling the operating system to handle multiple tasks concurrently.

**Developer's Perspective on Kernel-Level Threads:**
- Developers can directly use pre-built threads provided by the operating system.
- Thread creation, destruction, scheduling, and maintenance are handled directly by the kernel through system calls.

#### (1) Many-to-One Thread Model:

In the many-to-one model, multiple user-level threads are mapped to a single kernel thread.
Thread management is handled by a user-space thread library, which is efficient.
However, if a blocking system call occurs, even if other user threads can continue, the entire process will be blocked.
Since a single kernel thread can run on only one CPU, the many-to-one model does not allow splitting a single process across multiple CPUs.
From a concurrency perspective, although the many-to-one model allows developers to create any number of user threads, it does not increase concurrency significantly. This model is rarely used in modern operating systems as it cannot leverage multiple processing cores.

#### (2) One-to-One Thread Model:

The one-to-one model overcomes the issues of the many-to-one model.
In the one-to-one model, a separate kernel thread is created to handle each user thread.
However, managing the one-to-one model incurs more overhead, involving additional costs and slowing down the system.
Most implementations of this model limit the number of threads that can be created.
From a concurrency perspective, while the one-to-one model offers greater concurrency, developers should be cautious not to create too many threads within an application (sometimes the system may limit the number of threads created) due to the higher management overhead. Both Windows (from Win95 onward) and Linux implement a one-to-one thread model.

#### (3) Many-to-Many Thread Model:

The many-to-many model allows any number of user threads to be multiplexed onto the same or fewer number of kernel threads, combining the best features of both one-to-one and many-to-one models.
There is no restriction on the number of threads a user can create.
Blocking a kernel system call does not block the entire process.
Processes can be distributed across multiple processors.
A variable number of kernel threads can be allocated for each process, depending on the number of CPUs and other factors.

## 3. Java Threads

Before delving into the topic of Java threads, it's essential to explain the concept of the Thread library.

In the thread model overview mentioned earlier, we discussed creating and managing threads using a thread library. So, what is a thread library?

A thread library is an API set that provides developers with the tools to create and manage threads.

Thread libraries can be implemented either in user space or kernel space. The former involves implementing API functions solely within user space, without kernel support. The latter involves system calls, meaning that invoking an API function from the library results in a system call to the kernel and requires a kernel that supports the thread library.

Here's a brief introduction to three major thread libraries:

1. **POSIX Pthreads:** Can be provided as either a user or kernel library, serving as an extension to the POSIX standard.

2. **Win32 Threads:** A kernel-level thread library for the Windows operating system.

3. **Java Threads:** The Java thread API typically utilizes the thread library of the host system. This means that on Windows systems, Java thread API often employs the Win API, while on UNIX-like systems, it uses Pthread.

Now, let's dive into the details of Java threads:

In fact, before JDK 1.2, Java threads were implemented based on what was called "Green Threads," which were user-level thread implementations. In other words, Java developers created their own thread library or thread management mechanism for the JVM.

However, from JDK 1.2 onwards, the JVM opted for a more stable and convenient approach, using native kernel-level threads through system calls, handing over thread scheduling to the operating system kernel. For different operating systems, their design philosophies are fundamentally different, leading to various differences in their thread designs. Thus, the JVM explicitly declares that the thread states in the virtual machine do not reflect any thread states in any operating system.

It's worth noting that this statement holds true for mainstream commercial Java virtual machines on mainstream platforms, such as HotSpot. There are exceptions, for instance, the HotSpot VM on the Solaris platform provides both 1:1 and N:M thread models.

To summarize, answering the question posed in the subsequent content, the essence of threads in Java today is essentially the threads in the operating system. The thread library and thread model heavily depend on the specifics of the operating system (host system) implementation. For instance, on Windows, Java is based on the Win32 thread library for thread management, and Windows adopts a one-to-one thread model.

---

# 3.Q&A: Understanding the Underlying Operation of Threads with DEBUG

When it comes to the underlying operation of threads, it's inevitable to talk about the JVM (Java Virtual Mariefly explain the DEBUG method in IntelliJ IDEA.

The use of tools is something many students often lack, and I myself am a victim of it, frequently habitually trying to debug with the naked eye line by line (dog's head).

#### Java Runtime Data Areas

*Friendly reminder: Most students may already have some understanding of this part, so feel free to skip to the next section.*

The Java Virtual Machine divides the memory it manages into various data areas during the execution of a Java program. Each of these areas serves a specific purpose and has its own creation and destruction times.

Throughout this article, we'll use the runtime data areas of JDK 7 as an example:

**Understanding Thread Shared and Thread Private:**

- **Thread Private:** In simple terms, each thread creates something unique to itself. These private areas between threads do not interfere with each other and store independently. For example, the program counter is thread-private, with each thread having its own program counter that doesn't interfere with others.

- **Thread Shared:** It's self-explanatory. Think of it as a public space where everyone can go, and the data stored there is accessible to all threads.

Now, let's analyze each area one by one. Of course, we won't go into too much detail here, as it might make the article too bulky. On the basis of understanding this article, you should have a basic awareness of each area.

**Thread Shared Areas:**

1. **Java Heap:** The Java Heap is the largest memory area managed by the Java Virtual Machine. It is created when the virtual machine starts. The sole purpose of this memory area is to store object instances, and almost all object instances are allocated memory here. According to the Java Virtual Machine Specification, all object instances and arrays must be allocated in the heap.

2. **Method Area:** Like the Java Heap, the Method Area is a memory area shared by all threads. It is used to store loaded class information, constants, static variables, code compiled by the just-in-time compiler, and other data.

Many people commonly refer to the Method Area as the Permanent Generation, but they are not equivalent. In layman's terms, the Method Area is a specification, and the Permanent Generation is a means by which the HotSpot virtual machine implements this specification. For other virtual machines (such as BEA JRockit, IBM J9, etc.), the concept of the Permanent Generation does not exist.

Additionally, for the HotSpot virtual machine, it completely abandoned the concept of the Permanent Generation in JDK 8. Instead, it adopted metaspace (Meta-space) implemented in native memory, similar to JRockit and J9. All the remaining content of the Permanent Generation in JDK 7 (mainly type information) was moved to metaspace.

**Thread Private Areas:**

(1) **Java Virtual Machine Stacks:** These are essentially composed of stack frames, with each stack frame describing the memory model of a Java method execution. In other words, each method, when executed, creates a stack frame to store local variable tables, operand stacks, dynamic links, method return addresses, and other information.

### Detailed Understanding of Thread Execution and Debugging

Every method call and its execution process correspond to the pushing and popping of a stack frame in the virtual machine stack. Naturally, the order of popping follows the Last-In-First-Out (LIFO) principle of the stack.

The concept of stack frames is crucial in the subsequent sections of the principle analysis, and it's essential for everyone to understand.

(2) **Native Method Stack:**

Similar to the virtual machine stack mentioned earlier, the native method stack serves a basic purpose. The only difference is that the native method stack is for the virtual machine's use of native methods, while the virtual machine stack serves the execution of Java methods (i.e., bytecode).

Here's an explanation of the concept of Native methods. This concept is not exclusive to Java and is found in many programming languages.

"A native method is a Java method whose implementation is provided by non-Java code."

In other words, a Native method is essentially an interface, but its specific implementation is written in a language other than Java. Therefore, for the same Native method, if different virtual machines invoke it, the results and runtime efficiency may differ because each virtual machine has its own implementation for a Native method, such as the `hashCode` method in the `Object` class.

This ability allows Java programs to go beyond the boundaries of the Java runtime, effectively expanding the capabilities of the JVM.

(3) **Program Counter Register:**

The program counter register is a small memory space that can be considered an indicator of the bytecode's line number currently being executed by the current thread. The bytecode interpreter works by changing the value of this counter to select the next bytecode instruction that needs to be executed. Basic functionalities like branching, looping, jumping, exception handling, and thread recovery all rely on this counter.

As Java's virtual machine implements multithreading by allocating CPU time slices in a round-robin manner, each thread needs an independent program counter to restore the correct execution position after a thread switch.

So, what does the program counter store?

According to "Understanding the Java Virtual Machine: Advanced Practices and Best Practices - 2nd Edition," if the thread is executing a Java method, the program counter records the address of the currently executing virtual machine bytecode instruction. If the thread is executing a Native method, the counter value is empty (Undefined).

### Understanding Thread Execution with DEBUG

Now, let's delve into the underlying principles of thread execution and debugging using DEBUG.

The logic of the provided code is straightforward: the `main` method calls `method1`, and `method1` calls `method2`.

Let's set a breakpoint and debug:

1. Set a breakpoint:
 
2. Debugging the `main` method:


As we run the `Test.main()` in DEBUG mode, although we didn't explicitly create a thread here, the invocation of the `main` function itself represents a thread, known as the main thread. Therefore, when we start the program, the main thread is allocated a virtual machine stack memory.

As mentioned earlier, the virtual machine stack memory is essentially a shell, with the real data stored inside being individual stack frames for each method.

So, when the main thread calls the `main` method, a stack frame is created for the `main` method, containing information such as local variable tables, operand stacks, dynamic links, and the method's return address.

Now, let's take a look at the DEBUG window:

- On the left, you see "Frames," representing stack frames. Currently, there is only one `main` stack frame in the main thread.
- On the right, "Variables" shows the local variable table of this stack frame, and you can see there is only one local variable in the `main` frame, which is the method parameter `args`.

Continuing with DEBUG, as you step into the next line, observe the changes in the DEBUG window. You can use the following buttons:

1. **Step Over (F8):** Executes one line of code. If the line contains a method call, the method is executed entirely before moving to the next line.

2. **Step Into (F7):** Executes one line of code. If the line contains a user-defined method, the debugger steps into that method (does not step into library methods).

3. **Force Step Into (Alt + Shift + F7):** Executes one line of code. If the line contains a user-defined method or a library method, the debugger steps into it (can step into any method).

4. **Step Out (Shift + F8):** Exits the current method being debugged. If you've stepped into a method and realize it's okay, you can use Step Out to complete the method and return to the calling method.

5. **Drop frame:** Returns to the calling method of the current method, discarding the current method's execution context.

Returning to our test program, as you step into `method1`, a `method1` stack frame is created in the virtual machine stack memory.

Continuing with DEBUG until you enter `method2`, another `method2` stack frame is added to the virtual machine stack memory.

When you step over to the `return n` statement in `method2`, the address pointed to by `n` in the heap is returned to `m` in `method1`. Following the LIFO principle, the `method2` stack frame is then destroyed from the virtual machine stack memory.

Clicking Step Over to complete the println statement, `method1` accomplishes its mission, and its stack frame is also destroyed from the virtual machine stack memory.

Finally, proceeding to the next step, the `main` stack frame will also be destroyed. At this point, the program has reached its end.

### Thread Execution Principle Detailed Illustration

The detailed changes in Java runtime data areas during thread execution are explained through a series of steps:

#### 1. Class Loading

Class loading, as explained in "Understanding the Java Virtual Machine: Advanced Practices and Best Practices - 2nd Edition," involves the virtual machine loading class data from the Class file (bytecode file) into memory. The loaded bytecode information is stored in the method area. In the provided code, the bytecode is not explicitly written for ease of understanding, but it corresponds to the code.

[Class Loading Image]

#### 2. Execution Flow

The overall execution flow is as follows:

1. The main thread calls the `main` method, creating a `main` stack frame.
2. The value of the `args` parameter in the `main` method comes from the heap (newly created). The return address of the `main` method is the program's exit address.
3. The program counter, pointing to the bytecode instruction address corresponding to the `method1(10)`, is stored in the program counter register.
4. The CPU, following the program counter, enters the `method1` method, creating a `method1` stack frame.
5. After arranging the local variable table and method return address, the specific method call can begin. Initially, `10` is passed to `x`, and then, the bytecode instruction address corresponding to `int y = x + 1` is stored in the program counter.
6. When reaching `Object m = method2()`, another `method2` stack frame is created.

---

# 4.Q&A: Java Memory Model and Atomicity, Visibility, Ordering

The this part is designed to emphasize the foundational and essential nature of this article (dog head emoji). The knowledge in concurrent programming primarily revolves around Java Memory Model (JMM) and its three major properties.

The overall structure of the content is as follows:

1. **Why Learn Concurrent Programming?**
2. **Why is Concurrent Programming Needed?**
3. **Introduction to Java Memory Model**
4. **Detailed Explanation of Three Properties of Java Memory Model (Atomicity, Visibility, Ordering):**
   - What is Atomicity
   - Problems arising from non-atomic operations
   - Ensuring Atomicity

## Why Learn Concurrent Programming

Addressing the question of "Why do we need to learn concurrent programming?" is analogous to the question of "Why do we need to study politics?" We often encounter it rarely in our daily lives (at least as students), memorize a bunch of "correct and immensely great nonsense," and eventually forget it as a rote exercise.

It wasn't until I delved into understanding this knowledge rather than blindly memorizing that I realized it is indeed correct and immensely great, but not nonsense.

Despite the complexity of the underlying principles and the vast knowledge system of concurrent programming, Java language and Java Virtual Machine provide numerous concurrent tools. These tools hide many details of thread concurrency, allowing us to focus more on business logic, thus lowering the barrier for concurrent programming.

However, regardless of how advanced the language, middleware, and frameworks are, we should not fully rely on them to handle all aspects of concurrent processing. Understanding the internals of concurrency and learning the underlying principles is still a crucial step in becoming an advanced programmer.

I believe the above passage roughly answers the question, "Why do we need to learn concurrent programming?"

## Why is Concurrent Programming Needed

Have you heard of Moore's Law, often hailed as the first law of computers? It is an empirical observation by one of the founders of Intel, Gordon Moore. Though not rigorously derived as truth, it remains unquestionably convincing. In simple terms, it states that the processor's performance doubles every two years. It may sound like a cliché (dog head emoji).

In reality, the development of multi-core CPUs is indeed supporting the validity of Moore's Law. In the current era, concurrent programming has become a prevailing force. Leveraging the computing power of multi-core CPUs to the fullest through concurrent programming enhances performance.

For instance, in the twilight of today's image processing domain, many image processing algorithms, though producing excellent results, require an extensive optimization process. If the computation takes too much time, even outstanding algorithms become impractical for integration into products for user use.

Consider a 1000 x 800 resolution image. The initial approach is to iterate from the first pixel to the last. Faced with such a vast and complex computation, the most direct and easily implemented idea to improve algorithm performance is to utilize multiple threads to make full use of the computing power of multi-core CPUs.

Divide the entire image into several blocks, say 8 blocks for an 8-core CPU, with each block being 1000 * 100 pixels. Create 8 threads, each processing one image block, and assign each CPU to execute one thread. This approach significantly boosts computation speed.

Of course, after such an operation, the computation speed will not quadruple because thread creation and release, as well as context switching, have certain overhead.

Here's an excerpt from the book "Java Concurrency in Practice" to answer the question, why do we need concurrent threads?

The advent of multi-core CPUs has broken the limitations of single-core CPU performance. Multiple CPUs mean each thread can run on its own CPU, reducing the overhead of thread context switching. However, with the increasing demands for application system performance and throughput, there is an urgent need for high-concurrency programming to handle massive data and requests.

As for the reasons for the prevalence of multi-core CPUs, the book "Understanding the Java Virtual Machine - 3rd Edition" also addresses this. Here is a modified excerpt:

Multitasking is almost a necessary function in modern computer operating systems. In many scenarios, letting the computer do several things simultaneously is not only because the computer's computing power has become powerful but also, more importantly, because the speed of the computer's processing is much faster than the speed of its storage and communication subsystems. Thus, the CPU has to spend a lot of time waiting for other resources, such as disk I/O, network communication, or database access.

Therefore, we must use some means to squeeze the processing power of the processor, or it will result in significant performance waste. Allowing the computer to handle several tasks simultaneously is the easiest and proven effective way to "squeeze" the processor's computing power.

Additionally, besides fully utilizing the computing power of the computer processor, another specific concurrent application scenario is providing services to multiple clients simultaneously on a server.

## In-depth Exploration of Atomicity, Visibility, Ordering

### Atomicity: What, Issues, and Ensuring

The text discusses the three main properties of Java Memory Model (JMM): Atomicity, Visibility, and Ordering. Atomicity is illustrated by examining what it is, the problems arising from non-atomic operations, and how to ensure atomicity. Taking atomicity as an example, the logic is roughly as follows:

1. What is Atomicity
2. Problems caused by lack of Atomicity
3. How to ensure Atomicity

### Why Learn Concurrent Programming

Addressing the question of "Why do we need to learn concurrent programming?" is analogous to the question of "Why do we need to study politics?" We often encounter it rarely in our daily lives (at least as students), memorize a bunch of "correct and immensely great nonsense," and eventually forget it as a rote exercise.

It wasn't until I delved into understanding this knowledge rather than blindly memorizing that I realized it is indeed correct and immensely great, but not nonsense.

Despite the complexity of the underlying principles and the vast knowledge system of concurrent programming, Java language and Java Virtual Machine provide numerous concurrent tools. These tools hide many details of thread concurrency, allowing us to focus more on business logic, thus lowering the barrier for concurrent programming.

However, regardless of how advanced the language, middleware, and frameworks are, we should not fully rely on them to handle all aspects of concurrent processing. Understanding the internals of concurrency and learning the underlying principles is still a crucial step in becoming an advanced programmer.

I believe the above passage roughly answers the question, "Why do we need to learn concurrent programming?"

### Why is Concurrent Programming Needed

Have you heard of Moore's Law, often hailed as the first law of computers? It is an empirical observation by one of the founders of Intel, Gordon Moore. Though not rigorously derived as truth, it remains unquestionably convincing. In simple terms, it states that the processor's performance doubles every two years. It may sound like a cliché (dog head emoji).

In reality, the development of multi-core CPUs is indeed supporting the validity of Moore's Law. In the current era, concurrent programming has become a prevailing force. Leveraging the computing power of multi-core CPUs to the fullest through concurrent programming enhances performance.

For instance, in the twilight of today's image processing domain, many image processing algorithms, though producing excellent results, require an extensive optimization process.

---

# 5.Q&A: JMM Core Concept: Happens-before Principle

# JMM Core Concept: Happens-before Principle

## The Dilemma and Perfect Solution Faced by JMM Designers

In the previous article, we explored the Java Memory Model (JMM) and its three major characteristics. From the perspective of JMM designers, visibility and ordering are inherently contradictory:

- On one hand, for programmers, we desire a memory model that is easy to understand and program. To achieve this, JMM designers need to provide strong guarantees of memory visibility, termed "strong memory model."
  
- On the other hand, compilers and processors prefer less restriction on the memory model, allowing for more optimizations (such as reordering) to enhance performance. Hence, JMM designers aim to relax restrictions on compilers and processors, referred to as a "weak memory model."

From JDK 5 onward, within the JSR-133 memory model, a perfect solution was introduced: the Happens-before principle. Translated literally, Happens-before means "precedes." The definition of Happens-before relationships, as outlined in "JSR-133: Java Memory Model and Thread Specification," is as follows:

1. If one operation Happens-before another operation, the result of the first operation will be visible to the second operation, and the execution order of the first operation precedes that of the second operation.

2. The existence of a Happens-before relationship between two operations does not imply that the specific implementation of the Java platform must execute in the order specified by the Happens-before relationship. If the results of execution after reordering are consistent with the results of execution following the Happens-before relationship, such reordering is not illegal (i.e., JMM allows such reordering).

Understanding the first rule is crucial for programmers. If A Happens-before B, JMM guarantees to the programmer that the result of operation A will be visible to B, and the execution order of A precedes that of B. It's essential to note that Happens-before provides cross-thread memory visibility guarantees.
 
Assuming that operation a Happens-before operation b, we can conclude that after the execution of operation b, the value of variable j will definitely be equal to 1.

The reasoning behind this conclusion includes the guarantee provided by Happens-before that the result of operation a is visible to b, meaning the result of "i=1" can be observed. Additionally, as thread C has not run yet, there are no other threads modifying the value of variable i after the completion of thread A's operations.

Now, considering thread C, we maintain that a Happens-before b. However, since c occurs between the operations a and b, c does not have a Happens-before relationship with b. Therefore, b may not necessarily see the result of c. As a result, the value of j after operation b is uncertain, possibly being either 1 or 2, making this code segment thread-unsafe.

Next, let's examine the second rule of Happens-before. This rule is JMM's assurance to the weak memory model of compilers and processors. Given sufficient operational space, JMM imposes constraints on the reordering of compilers and processors. In essence, JMM adheres to a fundamental principle: as long as it does not alter the program's execution results (referring to single-threaded programs and correctly synchronized multi-threaded programs), compilers and processors are free to optimize as they please.

The reason behind JMM's approach is that programmers are not concerned with whether these two operations are actually reordered. Programmers care about ensuring that the results of execution remain unchanged.

To simplify understanding, consider an example to explain the second rule:
```
int a = 1;      // Operation A
int b = 2;      // Operation B
int c = a + b;  // Operation C
```
According to the Happens-before rules (discussed later), the above code has three Happens-before relationships:

A Happens-before B
B Happens-before C
A Happens-before C
It is evident that among these three Happens-before relationships, the second and third are necessary, but the first is unnecessary. In other words, although A Happens-before B, the complete reordering between A and B does not alter the program's execution results. Therefore, JMM allows compilers and processors to perform such reordering.

Now, let's delve into the eight Happens-before rules defined in "JSR-133: Java Memory Model and Thread Specification." These rules represent the "natural" Happens-before relationships in JMM, requiring no synchronization assistance and can be directly used in coding. If the relationship between two operations is not covered by these rules and cannot be deduced from them, there is no guarantee of order, and the JVM is free to reorder them arbitrarily.

Program Order Rule: Within a thread, according to the control flow sequence, operations written earlier Happen-before those written later. Note that this refers to control flow sequence, not the program code sequence, considering branches, loops, and other structures.

This is easily understood and aligns with logical thinking. For example:
```
int a = 1;      // Operation A
int b = 2;      // Operation B
int c = a + b;  // Operation C

```
According to the program order rule, the above code has three Happens-before relationships: A Happens-before B, B Happens-before C, and A Happens-before C.

Monitor Lock Rule: An unlock operation Happens-before a later lock operation on the same lock. Emphasizing "the same lock," and "later" refers to the chronological order.

This rule is specifically for synchronized. JVM does not expose lock and unlock operations directly to users but provides higher-level bytecode instructions monitorenter and monitorexit, implicitly utilizing these operations. These bytecode instructions translate into synchronized blocks in Java code.

According to the monitor lock rule, assuming x's initial value is 10, after thread A executes the code block, the value of x becomes 1. After automatically releasing the lock, when thread B enters the code block, it can observe the write operation of thread A, i.e., thread B can see x == 1.

Volatile Variable Rule: A write operation to a volatile variable Happens-before a subsequent read operation on the same variable. Here, "subsequent" also refers to the chronological order.

This rule, introduced in JDK 1.5, is significant and easily handles visibility. For example, after thread A executes the writer() method, and thread B executes the reader() method:

According to the program order rule: 1 Happens-before 2; 3 Happens-before 4.
According to the volatile variable rule: 2 Happens-before 3.
Applying transitivity: 1 Happens-before 3; 1 Happens-before 4.

---

# 6.Q&A: Thread Creation: Three Fundamental Methods

At first, I wasn't very eager to write about this basic knowledge, as simple concepts might not be appealing to everyone and tend to be widely known. However, after reviewing and organizing the information, I found some valuable insights. For instance, understanding the `run` method overridden in the `Thread` class helped clarify the separation of tasks (`Runnable`) and threads themselves.

## Three Methods for Creating Threads

In Java, a thread is represented by the `Thread` class in the `java.lang` package. It is essential to note that this class implements the `Runnable` interface, which will be explained in detail later.

### Merging Thread and Task – Directly Inherit from `Thread` Class

Naturally, a thread needs to execute specific tasks, and the `run` method in the `Thread` class defines what tasks a thread should perform. Surprisingly, this `run` method is not a part of the `Thread` class itself. The `Thread` class implements the `Runnable` interface, and the `run` method is declared as an abstract method within this interface. This interface can be considered as a task class.

### Separating Thread and Task – `Thread` + Implement `Runnable` Interface

If multiple threads perform the same tasks, it's not efficient to write redundant code using the first method. Instead, we can separate the task execution from the thread itself.

This approach not only avoids code duplication but also provides more flexibility compared to the first method. Since a class can inherit from only one parent class, this approach is preferred, especially when dealing with classes that already inherit from other classes. Additionally, it integrates well with advanced APIs such as thread pools.

The constructor of the `Thread` class takes a `Runnable` object as a parameter and assigns it to a member variable called `target`. This `target` represents the task to be executed.

### Separating Thread and Task – `Thread` + Implement `Callable` Interface

Although `Runnable` is useful, it has a limitation – it cannot return the result of the task since its `run` method returns `void`. For threads that require the task result, `Callable` is a perfect choice.

The critical difference between `Runnable` and `Callable` is that the `run` method is replaced with `call`. Unlike `void run`, `call` has a return type, and it can throw exceptions.

To use `Callable` as a task, we wrap it into a `FutureTask`, making it suitable for the `Thread` constructor, which accepts a `Runnable` parameter. The `FutureTask` indirectly inherits the `Runnable` interface and implements the `Future` interface, allowing us to retrieve the result of the `call` method.

```java
FutureTask<Integer> futureTask = new FutureTask<>(new CallableTask());
Thread t3 = new Thread(futureTask);
t3.start();
Integer result = futureTask.get();
```
It's important to note that the get method blocks the calling thread. If the call method takes a long time, the calling thread will be blocked until the result is available.

Starting Threads
Now that we have created threads successfully, how do we start them? Let's consider the first method:
t1.run();
This leads to a classic interview question: why do we use start to launch a thread instead of using the run method directly?

While using run seems correct as it defines the task to be executed, it doesn't actually start a new thread. When t1.run() is called, the program continues to run in the main thread, not creating a new t1 thread. If run is used, the "Execution completed" message will only be printed after the file is read, making the file reading operation synchronous.

On the other hand, using start initiates asynchronous execution, and the "Execution completed" message will be quickly printed even before the file is completely read. This is possible because the file reading operation is performed by the t1 thread, and the main thread isn't blocked.

---

# 7.Q&A: Thread States and "Java Concurrency in Practice"

The source code may not be straightforward for beginners, but it's undeniable that the source code is the most authoritative learning document. Initially, I didn't have the habit of looking at the source code. I preferred to search more on Baidu than to dive into the source code. Many experts and teachers say this is a fear of the source code. From my perspective, it's more about laziness—being unwilling to find what I need in so many files and lines of code. Browsing a couple of times on Baidu and using what the experts say seemed more comfortable.

Later on, as I gradually delved into the source code, I realized that going through it once indeed leaves a more profound impression. Moreover, articles on the internet vary in quality. Without the ability to distinguish, comparing them with the source code is a wise choice.

Now, back to the main topic of this article. When most students start learning concurrent programming, the first things they probably learn are how to create threads and the different states a thread can have. In the previous article, we learned how to create threads. In this article, we'll explore the various states a thread can have, which is the lifecycle of a thread.

## Overview
During its lifecycle, a thread doesn't stay fixed in a particular state. Instead, it switches between different states as the code executes.

The six states of a thread and the transition operations between these states are well-documented in the `Thread` class:

### NEW State
Thread state for a thread which has not yet started.

This is the initial state when a thread is created but hasn't started yet, meaning the `start` method hasn't been called.

### RUNNABLE State
Thread state for a runnable thread.

A thread in the runnable state is executing in the Java virtual machine but may be waiting for other resources from the operating system, such as a processor.

After the `start` method is called, the thread enters the running state (`RUNNABLE`). In Java, the thread's ready (`READY`) and running (`RUNNING`) states in the operating system are collectively referred to as "RUNNABLE."

Reviewing the classic five-state model of threads in an operating system:

### BLOCKED State
Thread state for a thread blocked waiting for a monitor lock.

A thread in the blocked state is waiting for a monitor lock to enter a synchronized block/method or re-enter a synchronized block/method after calling `Object.wait`.

This state indicates that a thread is blocked due to a lock, specifically a monitor lock (i.e., `synchronized`). When a thread attempts to acquire a lock held by another thread, it enters the BLOCKED state. Once the thread holding the lock completes its synchronized block, it will wake up all BLOCKED threads (in the BLOCKED queue) to compete again. If a thread, e.g., `t`, succeeds in the competition, it transitions from BLOCKED to RUNNABLE. Other unsuccessful threads remain BLOCKED.

It's crucial to differentiate this from threads blocked under the `Lock` interface of the Java Util Concurrent (J.U.C) package. Threads blocked under `Lock` are in the WAITING state, as depicted in the image, and we'll discuss this later in detail.

The topic of how a thread enters the BLOCKED state is a common source of errors in online articles. The culprit might be the widely circulated image from "Java Concurrency in Practice." From this image, it seems that a thread enters the BLOCKED state only when entering a synchronized method or block.

I searched for "Java thread states" and picked the top-ranked article:
 
The content matches the image in "Java Concurrency in Practice."

Of course, it's not to say that this is wrong, but it does lack clarity. The source code, however, is explicit, as shown in the comments:
 
To clarify, when a thread that has called `Object.wait` (in the WAITING state) is awakened by another thread and re-enters a synchronized region, it needs to recompete for the lock. If the competition fails, the thread transitions from WAITING to BLOCKED.

This point is crucial. Without making this clear, many might think that when a thread in the WAITING state is awakened, it can immediately wait for the operating system to allocate CPU resources and continue running (to RUNNABLE).

Now, with this clarification, it's evident that the transition from WAITING to BLOCKED is the correct sequence: WAITING -> RUNNABLE -> BLOCKED.

To make this clearer, the image in "Java Concurrency in Practice" could be modified as follows:


### WAITING State
Thread state for a waiting thread. A thread is in the waiting state due to calling one of the following methods:

- `Object.wait` with no timeout
- `Thread.join` with no timeout
- `LockSupport.park`

A thread in the waiting state is waiting for another thread to perform a particular action. For example, a thread that has called `Object.wait()` on an object is waiting for another thread to call `Object.notify()` or `Object.notifyAll()` on that object. A thread that has called `Thread.join()` is waiting for a specified thread to terminate.

This state indicates that a thread in the WAITING state needs notification from another thread to return to the RUNNABLE state.

From the source code comments and the image, it's clear that a thread transitions from RUNNABLE to WAITING in three scenarios:

1. Calling `Object.wait`
2. Calling `Thread.join` (Note: there's a mistake in the "Java Concurrency in Practice" image, which says `Object.join`)
3. Calling `LockSupport.park` to pause the thread

More detailed explanations about the applications of `wait` and `notify/notifyAll` and `park/unpark` will be provided in subsequent articles. Here, let's briefly differentiate between `wait` and `join`:

- For instance, if thread `t` acquires an object lock through `synchronized` and then calls `wait()`, the thread will transition from RUNNABLE to WAITING. It's essential to note that this is about thread `t`.
- If the current thread, i.e., the main thread, calls `t.join()`, it will transition from RUNNABLE to WAITING. Note that this refers to the current thread. 

Calling `t1.join()` in the main thread can be understood as follows: when thread `t1` finishes execution, the main thread continues.

Additionally, the scenarios where a thread transitions from WAITING back to RUNNABLE are evident from the image and source code comments:

1. Calling `Object.notify`
2. Calling `Object.notifyAll`
3. Calling `LockSupport.unpark` to resume the execution of a specific thread

### TIMED_WAITING State
Thread state for a waiting thread with a specified waiting time.

A thread is in the timed waiting state due to calling one of the following methods with a specified positive waiting time:

- `Thread.sleep`
- `Object.wait` with a timeout
- `Thread.join` with a timeout
- `LockSupport.parkNanos`
- `LockSupport.parkUntil`

This state represents


---

# 8.Q&A: 

---

# 9.Q&A: 

---

# 10.Q&A: 