---
layout: essay_single
title: Concurrency Q & A
date: 2024-01-10
tags:
  - Backend
  - Review-Q&A
categories:
- Concurrency    
- Backend

feature_text: |
  ## Concurrency Q & A
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

---

# 2. 