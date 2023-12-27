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

### **4. **