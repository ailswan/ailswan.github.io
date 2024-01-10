---
layout: essay_single
title: Design Patterns
date: 2023-09-13
tags:
  - system design
  - Review-Q&A
categories:
- Notes
feature_text: |
  ##  Design Patterns
  Post by ailswan Sep. 13, 202
feature_image: "https://picsum.photos/2560/600?image=865"
---

### System Design Patterns 

The characteristics of object-oriented programming include maintainability, reusability, extensibility, and good flexibility. Its greatest strength lies in the fact that, as business complexity increases, object-oriented programming still ensures a well-structured program, while procedural programming may result in increasingly cumbersome code.

---

## Design Patterns in Software Development

The world of design patterns is diverse and colorful, encompassing various patterns such as the Factory Pattern, which produces individual "products"; the Adapter Pattern, which connects two unrelated interfaces; the Strategy Pattern, which allows for different ways of accomplishing the same task; and the Builder Pattern, which constructs objects based on stable building steps and different configurations during the construction process.

Regardless of the specific design pattern, they all adhere to six major design principles:

### Open/Closed Principle
A software entity, such as a class, module, or function, should be open for extension but closed for modification. This means that new functionality can be added without altering existing code.

### Single Responsibility Principle
A class should have only one reason to change, meaning it should only have one responsibility or do one thing. This principle helps maintain code clarity and ease of modification.

### Liskov Substitution Principle
Subtypes should be substitutable for their base types. In other words, when using inheritance, new functionalities should be added without disrupting the existing functionality of the base class.

### Dependency Inversion Principle
High-level modules should not depend on low-level modules; both should depend on abstractions. This principle advocates for designing the system with abstractions that are stable and allowing details to depend on abstractions, not the other way around.

### Law of Demeter (Least Knowledge Principle)
Also known as the "least knowledge principle," a class should have minimal knowledge about the inner workings of other classes. It should only communicate with its immediate friends and not with the friends' friends.

### Interface Segregation Principle
Clients should not be forced to depend on interfaces they do not use. If an interface contains methods that are unnecessary or irrelevant for a particular client, the interface should be split into smaller, more specific interfaces.

These principles serve as the foundation for designing robust, maintainable, and flexible software systems, and they guide the creation and implementation of various design patterns in the programming world.

---

## Creational Patterns

### 1. Factory Method Pattern
- Create a factory for each class, allowing the client to interact only with the factory to create objects.

### 2. Abstract Factory Pattern
- Extract an abstract interface for each factory, making it easy to add or replace factories.

### 3. Builder Pattern
- Used to create objects with a stable construction process; different builders can define different configurations.

### 4. Singleton Pattern
- Globally use the same object, available in eager and lazy initialization. Lazy initialization has two implementations: double-check locking and inner class.

### 5. Prototype Pattern
- Define a clone method for a class, facilitating the creation of identical objects.

---

## Structural Patterns

### 1. Adapter Pattern
- Used for interfaces that are correlated but incompatible.

### 2. Bridge Pattern
- Used for combining interfaces at the same level.

### 3. Composite Pattern
- Used for structuring whole-part relationships.

### 4. Facade Pattern
- Reflects the encapsulation principle.

### 5. Flyweight Pattern
- Reflects the reusability in object-oriented programming.

### 6. Proxy Pattern
- Primarily used for controlling access to an object.

---

## Behavioral Patterns

Behavioral patterns focus on the interaction and collaboration between classes, similar to how individual behaviors at work may affect colleagues and be influenced by others. In the runtime of a program, no object operates in isolation; they can achieve complex functionalities through communication and collaboration.

### 1. Chain of Responsibility Pattern
- Handles objects with the same responsibility but different degrees, passing them along a chain.

### 2. Command Pattern
- Encapsulates "method calls," decoupling the requester of a behavior from its implementer.

### 3. Interpreter Pattern
- Defines custom syntax rules.

### 4. Iterator Pattern
- Defines `next()` and `hasNext()` methods, allowing an external class to traverse a list and hide its internal details.

### 5. Mediator Pattern
- Transforms a meshed coupling structure into a star-shaped structure by introducing a mediator.

### 6. Memento Pattern
- Stores an object's state for later restoration.

### 7. Observer Pattern
- Manages one-to-many dependencies; multiple observers receive notifications when the observed object changes.

### 8. State Pattern
- A design pattern about polymorphism, where each state class handles one state of an object.

### 9. Strategy Pattern
- Different paths lead to the same goal; multiple methods are used to accomplish the same task.

### 10. Template Method Pattern
- A design pattern about inheritance; the parent class serves as a template for its subclasses.

### 11. Visitor Pattern
- Separates the structure of data from its operations.

---


1. **Singleton**:
    - Purpose: Ensure a class has only one instance and provide a global point to access it.
    - Use Case: Database connections, Logger classes.
    
    ``` python
    class DatabaseConnection:
        _instance = None

        def __new__(cls):
            if cls._instance is None:
                cls._instance = super(DatabaseConnection, cls).__new__(cls)
                # Initialize database connection here
            return cls._instance

    # Usage
    db_instance_1 = DatabaseConnection()
    db_instance_2 = DatabaseConnection()

    assert db_instance_1 is db_instance_2
    ```

2. **Factory**:
    - Purpose: Create objects without specifying the exact class to create.
    - Use Case: GUI libraries where each OS provides a different implementation of a button or a window.

    ``` python
    class ButtonFactory:
        def create_button(self):
            pass

    class WindowsButton(ButtonFactory):
        def create_button(self):
            return "Windows Button"

    class LinuxButton(ButtonFactory):
        def create_button(self):
            return "Linux Button"

    # Usage
    os = "Windows"  # or "Linux"
    button = None

    if os == "Windows":
        button = WindowsButton().create_button()
    elif os == "Linux":
        button = LinuxButton().create_button()

    print(button)

    ```


3. **MVC (Model-View-Controller)**:
    - Purpose: Separate application logic into three interconnected components.
    - Use Case: Web applications, desktop applications.
    
    ``` python
    class Model:
    def get_data(self):
        pass

    class View:
        def render(self, data):
            pass

    class Controller:
        def __init__(self, model, view):
            self.model = model
            self.view = view

        def update_view(self):
            data = self.model.get_data()
            self.view.render(data)

    # Usage
    model = Model()
    view = View()
    controller = Controller(model, view)

    controller.update_view()

    ```

4. **Observer**:
    - Purpose: Allow an object to publish changes to its state for other objects to react accordingly.
    - Use Case: Event listeners, Stock market systems.
    
    ``` python
    class Subject:
    _observers = []

    def add_observer(self, observer):
        self._observers.append(observer)

    def notify_observers(self, data):
        for observer in self._observers:
            observer.update(data)

    class Observer:
        def update(self, data):
            pass

    # Usage
    subject = Subject()

    observer_1 = Observer()
    observer_2 = Observer()

    subject.add_observer(observer_1)
    subject.add_observer(observer_2)

    subject.notify_observers("Some data")

    ```

5. **Strategy**:
    - Purpose: Allow selecting an implementation algorithm from a family of algorithms at runtime.
    - Use Case: Compression algorithms, Payment gateway integration.
    
    ``` python

    class CompressionStrategy:
    def compress(self, data):
        pass

    class ZipCompression(CompressionStrategy):
        def compress(self, data):
            return f"Compressed using Zip: {data}"

    class RarCompression(CompressionStrategy):
        def compress(self, data):
            return f"Compressed using Rar: {data}"

    # Usage
    data = "Some data"
    zip_strategy = ZipCompression()
    rar_strategy = RarCompression()

    print(zip_strategy.compress(data))
    print(rar_strategy.compress(data))

    ```

6. **Proxy**:
    - Purpose: Act as an interface to another object.
    - Use Case: Lazy initialization, Access control, Virtual/Remote proxies.
    
    ``` python
    class RealObject:
    def request(self):
        return "RealObject: Handling request"

    class Proxy:
        _real_object = None

        def request(self):
            if self._real_object is None:
                self._real_object = RealObject()
            return f"Proxy: {self._real_object.request()}"

    # Usage
    proxy = Proxy()
    result = proxy.request()
    print(result)

    ```

7. **Adapter**:
    - Purpose: Allows objects with incompatible interfaces to work together.
    - Use Case: Integrating with third-party libraries, Legacy code integration.
    
    ``` python
    class Target:
        def request(self):
            return "Target: The original request"

    class Adaptee:
        def specific_request(self):
            return "Adaptee: The specific request"

    class Adapter(Target):
        _adaptee = None

        def request(self):
            if self._adaptee is None:
                self._adaptee = Adaptee()
            return f"Adapter: Translated request - {self._adaptee.specific_request()}"

    # Usage
    target = Target()
    result = target.request()
    print(result)

    adapter = Adapter()
    result = adapter.request()
    print(result)

    ```

8. **Composite**:
    - Purpose: Treat individual objects and object collections uniformly.
    - Use Case: Graphics systems, File systems.
    
    ``` python
    class Graphic:
        def draw(self):
            pass

    class Circle(Graphic):
        def draw(self):
            return "Circle"

    class Square(Graphic):
        def draw(self):
            return "Square"

    class CompositeGraphic(Graphic):
        _graphics = []

        def add(self, graphic):
            self._graphics.append(graphic)

        def draw(self):
            result = ""
            for graphic in self._graphics:
                result += f"{graphic.draw()} "
            return result

    # Usage
    circle = Circle()
    square = Square()

    composite = CompositeGraphic()
    composite.add(circle)
    composite.add(square)

    result = composite.draw()
    print(result)


    ```

9. **Decorator**:
    - Purpose: Dynamically add responsibilities to objects without modifying their code.
    - Use Case: GUI toolkits, Middleware (like adding logging or transactional capabilities).
    
    ``` python
    class Component:
        def operation(self):
            pass

    class ConcreteComponent(Component):
        def operation(self):
            return "ConcreteComponent"

    class Decorator(Component):
        _component = None

        def __init__(self, component):
            self._component = component

        def operation(self):
            return f"Decorator({self._component.operation()})"

    # Usage
    component = ConcreteComponent()
    result = component.operation()
    print(result)

    decorator = Decorator(component)
    result = decorator.operation()
    print(result)

    ```

10. **State**:
    - Purpose: Allow an object to change its behavior when its internal state changes.
    - Use Case: TCP connection states, Vending machine states.
    
    ``` python

    class State:
    def handle_request(self):
        pass

    class ConcreteStateA(State):
        def handle_request(self):
            return "ConcreteStateA handles the request"

    class ConcreteStateB(State):
        def handle_request(self):
            return "ConcreteStateB handles the request"

    class Context:
        _state = None

        def __init__(self, state):
            self.transition_to(state)

        def transition_to(self, state):
            self._state = state

        def request(self):
            return self._state.handle_request()

    # Usage
    context = Context(ConcreteStateA())
    result = context.request()
    print(result)

    context.transition_to(ConcreteStateB())
    result = context.request()
    print(result)

    ```

11. **Caching**:
    - Purpose: Store reusable responses to speed up consecutive requests.
    - Use Case: Web browsers, Content delivery networks.
    
    ``` python
    class Cache:
    _cached_data = {}

    def get_data(self, key):
        if key in self._cached_data:
            return f"Cache hit: {self._cached_data[key]}"
        else:
            # Fetch data from the source and cache it
            data = f"Data from source for key={key}"
            self._cached_data[key] = data
            return f"Cache miss: {data}"

    # Usage
    cache = Cache()
    result1 = cache.get_data("key1")
    print(result1)

    result2 = cache.get_data("key2")
    print(result2)

    result3 = cache.get_data("key1")  # This time, it should be a cache hit
    print(result3)


    ```

12. **Load Balancer**:
    - Purpose: Distribute incoming requests across a group of backend servers.
    - Use Case: Enhancing application availability and responsiveness, Cloud systems.
    
    ``` python
    import random

    class LoadBalancer:
        _servers = ["Server1", "Server2", "Server3"]

        def distribute_request(self):
            return random.choice(self._servers)

    # Usage
    load_balancer = LoadBalancer()
    request1 = load_balancer.distribute_request()
    print(request1)

    request2 = load_balancer.distribute_request()
    print(request2)


    ```

13. **Sharding**:
    - Purpose: Split a database into smaller, more manageable pieces, and spread them across a distributed environment.
    - Use Case: Distributed databases, Big Data storage.
    
    ``` python
    class DatabaseShard:
    _data = {}

    def write_data(self, key, value):
        self._data[key] = value

    def read_data(self, key):
        return self._data.get(key, "Key not found")

    class ShardingDatabase:
        _shards = []

        def __init__(self, num_shards):
            for _ in range(num_shards):
                self._shards.append(DatabaseShard())

        def write_data(self, key, value):
            shard_index = hash(key) % len(self._shards)
            self._shards[shard_index].write_data(key, value)

        def read_data(self, key):
            shard_index = hash(key) % len(self._shards)
            return self._shards[shard_index].read_data(key)

    # Usage
    sharding_database = ShardingDatabase(num_shards=3)
    sharding_database.write_data("key1", "value1")
    sharding_database.write_data("key2", "value2")

    result1 = sharding_database.read_data("key1")
    print(result1)

    result2 = sharding_database.read_data("key2")
    print(result2)


    ```

14. **Publisher/Subscriber (Pub/Sub)**:
    - Purpose: Send messages from multiple producers to multiple consumers without them knowing about each other.
    - Use Case: Event-driven architectures, Messaging systems.
    
    ``` python
    class Publisher:
        _subscribers = []

        def add_subscriber(self, subscriber):
            self._subscribers.append(subscriber)

        def remove_subscriber(self, subscriber):
            self._subscribers.remove(subscriber)

        def notify_subscribers(self, message):
            for subscriber in self._subscribers:
                subscriber.update(message)

    class Subscriber:
        def update(self, message):
            pass

    # Usage
    publisher = Publisher()

    subscriber1 = Subscriber()
    subscriber2 = Subscriber()

    publisher.add_subscriber(subscriber1)
    publisher.add_subscriber(subscriber2)

    publisher.notify_subscribers("New message!")


    ```

15. **Microservices**:
    - Purpose: Decompose an application into small, independent services that run as separate processes.
    - Use Case: E-commerce platforms, Cloud-native applications.
    
    ``` python
    class Microservice:
        def execute(self):
            pass

    class AuthenticationService(Microservice):
        def execute(self):
            return "Authentication service logic"

    class OrderService(Microservice):
        def execute(self):
            return "Order service logic"

    class PaymentService(Microservice):
        def execute(self):
            return "Payment service logic"

    # Usage
    authentication_service = AuthenticationService()
    result1 = authentication_service.execute()
    print(result1)

    order_service = OrderService()
    result2 = order_service.execute()
    print(result2)

    payment_service = PaymentService()
    result3 = payment_service.execute()
    print(result3)

    ```

16. **Circuit Breaker**:
    - Purpose: Detect system failures and encapsulate logic that prevents system overloads.
    - Use Case: Distributed systems, Microservices communication.
    
    ``` python
    class CircuitBreaker:
        OPEN = "open"
        HALF_OPEN = "half_open"
        CLOSED = "closed"

        def __init__(self, threshold):
            self._threshold = threshold
            self._state = self.CLOSED
            self._failure_count = 0

        def execute(self, operation):
            try:
                result = operation()
                self._handle_success()
                return result
            except Exception:
                self._handle_failure()
                raise

        def _handle_success(self):
            if self._state == self.HALF_OPEN:
                self._reset()
            elif self._state == self.CLOSED:
                pass

        def _handle_failure(self):
            if self._state == self.CLOSED:
                self._failure_count += 1
                if self._failure_count >= self._threshold:
                    self._state = self.OPEN
            elif self._state == self.HALF_OPEN:
                self._state = self.OPEN

        def _reset(self):
            self._state = self.CLOSED
            self._failure_count = 0

    # Usage
    def risky_operation():
        # Simulating a risky operation that might fail
        if random.random() < 0.5:
            raise Exception("Operation failed")
        return "Operation succeeded"

    circuit_breaker = CircuitBreaker(threshold=2)

    for _ in range(5):
        try:
            result = circuit_breaker.execute(risky_operation)
            print(result)
        except Exception as e:
            print(f"Error: {e}")


    ```

17. **Rate Limiter**:
    - Purpose: Control the amount of requests a user can send to an API within a time window.
    - Use Case: Public APIs, Distributed systems.
    
    ``` python
    import time

    class RateLimiter:
        def __init__(self, requests_per_second):
            self._requests_per_second = requests_per_second
            self._interval = 1 / requests_per_second
            self._last_request_time = 0

        def allow_request(self):
            current_time = time.time()
            elapsed_time = current_time - self._last_request_time

            if elapsed_time >= self._interval:
                self._last_request_time = current_time
                return True
            else:
                return False

    # Usage
    rate_limiter = RateLimiter(requests_per_second=2)

    for _ in range(5):
        if rate_limiter.allow_request():
            print("Request allowed")
        else:
            print("Request blocked")


    ```

18. **API Gateway**:
    - Purpose: Single entry point for managing and routing API requests to internal services.
    - Use Case: Microservices architectures, Cloud applications.
    
    ``` python
    class MicroserviceA:
        def request(self):
            return "MicroserviceA response"

    class MicroserviceB:
        def request(self):
            return "MicroserviceB response"

    class ApiGateway:
        _microservice_a = MicroserviceA()
        _microservice_b = MicroserviceB()

        def route_request(self, service_name):
            if service_name == "MicroserviceA":
                return self._microservice_a.request()
            elif service_name == "MicroserviceB":
                return self._microservice_b.request()
            else:
                return "Service not found"

    # Usage
    api_gateway = ApiGateway()

    result1 = api_gateway.route_request("MicroserviceA")
    print(result1)

    result2 = api_gateway.route_request("MicroserviceB")
    print(result2)

    result3 = api_gateway.route_request("NonExistentService")
    print(result3)

    ```

Understanding the principles behind these patterns is more valuable than memorization. It's essential to know when and why to use a particular pattern and its trade-offs.
    
   