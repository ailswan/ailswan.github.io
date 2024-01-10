---
layout: essay_single
title: Design Patterns
date: 2023-09-13
tags:
  - system design
categories:
- Notes
feature_text: |
  ##  Design Patterns
  Post by ailswan Sep. 13, 2023
feature_image: "https://picsum.photos/2560/600?image=865"
---

### System Design Patterns 

1. **Singleton**:
    - Purpose: Ensure a class has only one instance and provide a global point to access it.
    - Use Case: Database connections, Logger classes.

2. **Factory**:
    - Purpose: Create objects without specifying the exact class to create.
    - Use Case: GUI libraries where each OS provides a different implementation of a button or a window.

3. **MVC (Model-View-Controller)**:
    - Purpose: Separate application logic into three interconnected components.
    - Use Case: Web applications, desktop applications.

4. **Observer**:
    - Purpose: Allow an object to publish changes to its state for other objects to react accordingly.
    - Use Case: Event listeners, Stock market systems.

5. **Strategy**:
    - Purpose: Allow selecting an implementation algorithm from a family of algorithms at runtime.
    - Use Case: Compression algorithms, Payment gateway integration.

6. **Proxy**:
    - Purpose: Act as an interface to another object.
    - Use Case: Lazy initialization, Access control, Virtual/Remote proxies.

7. **Adapter**:
    - Purpose: Allows objects with incompatible interfaces to work together.
    - Use Case: Integrating with third-party libraries, Legacy code integration.

8. **Composite**:
    - Purpose: Treat individual objects and object collections uniformly.
    - Use Case: Graphics systems, File systems.

9. **Decorator**:
    - Purpose: Dynamically add responsibilities to objects without modifying their code.
    - Use Case: GUI toolkits, Middleware (like adding logging or transactional capabilities).

10. **State**:
    - Purpose: Allow an object to change its behavior when its internal state changes.
    - Use Case: TCP connection states, Vending machine states.

11. **Caching**:
    - Purpose: Store reusable responses to speed up consecutive requests.
    - Use Case: Web browsers, Content delivery networks.

12. **Load Balancer**:
    - Purpose: Distribute incoming requests across a group of backend servers.
    - Use Case: Enhancing application availability and responsiveness, Cloud systems.

13. **Sharding**:
    - Purpose: Split a database into smaller, more manageable pieces, and spread them across a distributed environment.
    - Use Case: Distributed databases, Big Data storage.

14. **Publisher/Subscriber (Pub/Sub)**:
    - Purpose: Send messages from multiple producers to multiple consumers without them knowing about each other.
    - Use Case: Event-driven architectures, Messaging systems.

15. **Microservices**:
    - Purpose: Decompose an application into small, independent services that run as separate processes.
    - Use Case: E-commerce platforms, Cloud-native applications.

16. **Circuit Breaker**:
    - Purpose: Detect system failures and encapsulate logic that prevents system overloads.
    - Use Case: Distributed systems, Microservices communication.

17. **Rate Limiter**:
    - Purpose: Control the amount of requests a user can send to an API within a time window.
    - Use Case: Public APIs, Distributed systems.

18. **API Gateway**:
    - Purpose: Single entry point for managing and routing API requests to internal services.
    - Use Case: Microservices architectures, Cloud applications.

Understanding the principles behind these patterns is more valuable than memorization. It's essential to know when and why to use a particular pattern and its trade-offs.
