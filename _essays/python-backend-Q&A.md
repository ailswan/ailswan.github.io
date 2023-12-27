---
layout: essay_single
title: Python backend Q&A
date: 2023-12-24
tags:
   - python language
categories:
- Q&A
- backend
feature_text: |
  ## Python backend Q&A
  Post by ailswan Oct.24 , 2023
feature_image: "https://picsum.photos/2560/600?image=865"
---

### Python backend Q&A

**link:**
[python backend q&a](https://www.educative.io/blog/python-interview-questions?utm_campaign=coding_interview_pattern&utm_source=google&utm_medium=ppc&utm_content=pmax&utm_term=&eid=5082902844932096&utm_term=&utm_campaign=%5BNew+-+Nov+23%5D+PMAX-Coding+Interview+Patterns&utm_source=adwords&utm_medium=ppc&hsa_acc=5451446008&hsa_cam=20757269941&hsa_grp=&hsa_ad=&hsa_src=x&hsa_tgt=&hsa_kw=&hsa_mt=&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=CjwKCAiAyp-sBhBSEiwAWWzTnl-rjkeXiaLfOQ67fv1PNXZkqkG8tNc2FArX6Oo5bFQC3e0fSnelNBoCDxAQAvD_BwE)
 
### **1. What is Python?**
Python is a programming language that supports objects, modules, threads, exception handling, and automatic memory management. It can be compared to other languages.

Python is an interpreted language, meaning it does not need to be compiled before running the code.

It is a dynamically-typed language, meaning variable types do not need to be declared explicitly.

Python is well-suited for object-oriented programming as it supports defining classes through composition and inheritance.

In Python, functions are first-class objects.

While Python code is written quickly, its execution speed is generally slower than compiled languages.

Python is widely used and often referred to as a "glue language," helping improve the performance of other languages and components.

Using Python allows programmers to focus on algorithm and data structure design without dealing with low-level details.

### **2. Difference between Assignment, Shallow Copy, and Deep Copy**
(1) Assignment:
In Python, assignment involves simple object reference. For example:

python
Copy code
a = [1, 2, "hello", ['python', 'C++']]
b = a
In this case, a and b point to the same memory location; b is an alias for a.

(2) Shallow Copy:
Shallow copy creates a new object, containing references to the first-level objects of the original object.

Using slicing: b = a[:] or b = [x for x in a]
Using factory function: b = list(a)
Using copy module: b = copy.copy(a)
Shallow copy creates a new object (b) that is different from a, but modifying nested lists within a will affect b.

(3) Deep Copy:
Deep copy is achieved using the copy.deepcopy() function from the copy module. It copies all levels of nested objects.

Deep copy creates a completely new object, independent of the original. Modifying b does not affect a, even for deeply nested structures.

(4) Notes:

For non-container types like numbers or characters, there is no concept of copying; it's just referencing.
If a tuple contains atomic types, even with deep copy, it results in a shallow copy.
### **3. Difference between `__init__` and `__new__`**
When creating an object using the syntax ClassName(), Python performs two tasks: allocating memory and initializing the object.

Memory allocation is handled by the __new__ method.
Initialization is handled by the __init__ method.
__new__ is responsible for allocating memory and returning the object's reference to the Python interpreter. The reference is then passed to __init as its first parameter (self). __init__ can define instance attributes based on the object's reference.

Learning __new__ is important because it allows modification of memory allocation to ensure that, regardless of how many times the class is instantiated, only one object instance is created in memory, achieving the singleton design pattern.

