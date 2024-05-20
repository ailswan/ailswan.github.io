---
layout: essay_single
title: Java language note
date: 2023-09-12
tags:
  - java language
 
categories:
- Notes
feature_text: |
  ## Java language note
  Post by ailswan Sep. 12, 2023
feature_image: "https://picsum.photos/2560/600?image=865"
---

### Summary
This document provides a list of common Java methods and features spanning various categories like string manipulation, list operations, and more.

### **String Methods**:
- `s.split(regex)`: Split string into array.
- `s.trim()`: Remove leading and trailing whitespace.
- `s.startsWith(prefix)`: Check if starts with prefix.
- `s.endsWith(suffix)`: Check if ends with suffix.
- `s.indexOf(sub)`: Find substring.
- `s.replace(old, new)`: Replace substring.
- `s.toUpperCase()`: Convert to uppercase.
- `s.toLowerCase()`: Convert to lowercase.
- `String.valueOf(obj)`: Convert object to string.
- `s.toCharArray()`: Convert string to character array.

### **StringBuilder Methods**:
- `sb.append(str)`: Append string to the builder.
- `sb.insert(offset, str)`: Insert string at the specified offset.
- `sb.replace(start, end, str)`: Replace characters from start to end with the specified string.
- `sb.delete(start, end)`: Remove characters from start to end.
- `sb.reverse()`: Reverse the character sequence.
- `sb.toString()`: Convert the builder to a string.
- `sb.length()`: Get the length of the builder.
- `sb.setLength(newLength)`: Set the length of the builder.
- `sb.charAt(index)`: Get the character at the specified index.
- `sb.setCharAt(index, char)`: Set the character at the specified index.

### **List Methods (ArrayList)**:
- `list.add(item)`: Add item to list.
- `list.addAll(collection)`: Append all of the items in the collection to the list.
- `list.get(index)`: Get item by index.
- `list.set(index, item)`: Replace item at index.
- `list.remove(index)`: Remove item at index.
- `list.indexOf(item)`: Return index of item.
- `list.lastIndexOf(item)`: Return last index of item.
- `list.clear()`: Remove all items from the list.
- `list.toArray()`: Convert the list to an array.
- `list.removeAll(collection)`: Remove all items in the specified collection from the list.
- `Collections.sort(list)`: Sort list.
- `Collections.reverse(list)`: Reverse list.

### **Queue Methods**:
- `queue.add(element)`: Inserts the specified element into the queue. Throws an exception if the element cannot be added.
- `queue.offer(element)`: Inserts the specified element into the queue. Returns `false` if the element cannot be added.
- `queue.remove()`: Retrieves and removes the head of the queue. Throws an exception if the queue is empty.
- `queue.poll()`: Retrieves and removes the head of the queue. Returns `null` if the queue is empty.
- `queue.element()`: Retrieves, but does not remove, the head of the queue. Throws an exception if the queue is empty.
- `queue.peek()`: Retrieves, but does not remove, the head of the queue. Returns `null` if the queue is empty.
- `queue.clear()`: Removes all elements from the queue.
- `queue.size()`: Returns the number of elements in the queue.
- `queue.isEmpty()`: Checks if the queue is empty.
- `queue.contains(element)`: Checks if the queue contains the specified element.
- `queue.toArray()`: Converts the queue to an array.

### **Examples of Using Queue**:

1. **Creating and Using a Queue**:
    ```java
    Queue<String> queue = new LinkedList<>();
    queue.add("apple");
    queue.add("banana");
    queue.add("cherry");

    System.out.println(queue); // Output: [apple, banana, cherry]
    ```

2. **Using `offer` Method**:
    ```java
    Queue<String> queue = new LinkedList<>();
    queue.offer("apple");
    queue.offer("banana");
    queue.offer("cherry");

    System.out.println(queue); // Output: [apple, banana, cherry]
    ```

3. **Removing Elements from a Queue**:
    ```java
    Queue<String> queue = new LinkedList<>();
    queue.add("apple");
    queue.add("banana");
    queue.add("cherry");

    String removedElement = queue.remove();
    System.out.println(removedElement); // Output: apple
    System.out.println(queue);          // Output: [banana, cherry]
    ```

4. **Polling Elements from a Queue**:
    ```java
    Queue<String> queue = new LinkedList<>();
    queue.add("apple");
    queue.add("banana");
    queue.add("cherry");

    String polledElement = queue.poll();
    System.out.println(polledElement); // Output: apple
    System.out.println(queue);         // Output: [banana, cherry]
    ```

5. **Peeking at the Head of the Queue**:
    ```java
    Queue<String> queue = new LinkedList<>();
    queue.add("apple");
    queue.add("banana");
    queue.add("cherry");

    String head = queue.peek();
    System.out.println(head); // Output: apple
    ```

6. **Checking if the Queue Contains an Element**:
    ```java
    Queue<String> queue = new LinkedList<>();
    queue.add("apple");
    queue.add("banana");
    queue.add("cherry");

    boolean containsApple = queue.contains("apple");
    System.out.println(containsApple); // Output: true
    ```

7. **Converting a Queue to an Array**:
    ```java
    Queue<String> queue = new LinkedList<>();
    queue.add("apple");
    queue.add("banana");
    queue.add("cherry");

    Object[] array = queue.toArray();
    System.out.println(Arrays.toString(array)); // Output: [apple, banana, cherry]
    ```

### **List Methods (LinkedList)**:
- `list.addFirst(item)`: Add item to the beginning of the list.
- `list.addLast(item)`: Add item to the end of the list.
- `list.getFirst()`: Get the first element of the list.
- `list.getLast()`: Get the last element of the list.
- `list.removeFirst()`: Remove the first element of the list.
- `list.removeLast()`: Remove the last element of the list.
- `list.offer(item)`: Add an item to the end of the list (equivalent to `addLast()`).
- `list.offerFirst(item)`: Add an item to the beginning of the list (equivalent to `addFirst()`).
- `list.offerLast(item)`: Add an item to the end of the list (equivalent to `addLast()`).
- `list.peek()`: Retrieve the first element of the list without removing it.
- `list.peekFirst()`: Retrieve the first element of the list without removing it (equivalent to `getFirst()`).
- `list.peekLast()`: Retrieve the last element of the list without removing it (equivalent to `getLast()`).
- `list.poll()`: Retrieve and remove the first element of the list.
- `list.pollFirst()`: Retrieve and remove the first element of the list (equivalent to `removeFirst()`).
- `list.pollLast()`: Retrieve and remove the last element of the list (equivalent to `removeLast()`).
- `list.push(item)`: Push an item onto the stack represented by the list.
- `list.pop()`: Pop the top item off the stack represented by the list.
- `list.removeFirstOccurrence(item)`: Remove the first occurrence of the specified element from the list.
- `list.removeLastOccurrence(item)`: Remove the last occurrence of the specified element from the list.
- `list.descendingIterator()`: Obtain an iterator over the elements in reverse order.

### **Set Methods (HashSet)**:
- `set.add(item)`: Add item to set.
- `set.remove(item)`: Remove item from set.
- `set.contains(item)`: Check if item exists.
- `set.clear()`: Clear all items.

### **Map Methods (HashMap)**:
- `map.keySet()`: Get keys.
- `map.values()`: Get values.
- `map.entrySet()`: Get key-value pairs.
- `map.get(key)`: Get value by key.
- `map.put(key, value)`: Put key-value pair.
- `map.putIfAbsent(key, value)`: Put key-value pair if the key is not already associated with a value.
- `map.put(key, value)`: Put key-value pair.
- `map.remove(key)`: Remove key-value pair.
- `map.remove(key, value)`: Remove key-value pair only if currently mapped to the specified value.
- `map.containsKey(key)`: Check if map contains key.
- `map.containsValue(value)`: Check if map contains value.

### **Map Methods (HashTable)**:
- `table.put(key, value)`: Maps the specified key to the specified value in the hashtable.
- `table.get(key)`: Returns the value to which the specified key is mapped, or `null` if this map contains no mapping for the key.
- `table.remove(key)`: Removes the key (and its corresponding value) from this hashtable.
- `table.containsKey(key)`: Tests if the specified object is a key in this hashtable.
- `table.containsValue(value)`: Returns `true` if this hashtable maps one or more keys to this value.
- `table.isEmpty()`: Tests if this hashtable maps no keys to values.
- `table.size()`: Returns the number of key-value mappings in this hashtable.
- `table.clear()`: Clears this hashtable so that it contains no keys.
- `table.putIfAbsent(key, value)`: Maps the specified key to the specified value if the key is not already mapped.
- `table.replace(key, value)`: Replaces the entry for the specified key only if it is currently mapped to some value.
- `table.replace(key, oldValue, newValue)`: Replaces the entry for the specified key only if it is currently mapped to the specified value.
- `table.remove(key, value)`: Removes the entry for a key only if it is currently mapped to the specified value.
- `table.keys()`: Returns an enumeration of the keys in this hashtable.
- `table.elements()`: Returns an enumeration of the values in this hashtable.

### **Java Collections**:
- `Collections.sort(list)`: Sort a list.
- `Collections.shuffle(list)`: Shuffle a list.
- `Collections.max(collection)`: Return max element.
- `Collections.min(collection)`: Return min element.
- `Collections.frequency(collection, object)`: Count occurrences.

### **Looping Techniques**:
- `for(item : collection)`: Enhanced for loop.
- `list.forEach(action)`: forEach with lambda for lists.
- `map.forEach((key, value) -> action)`: forEach with lambda for maps.

### **Functional Programming**:
- `stream.filter(predicate)`: Filter collection.
- `stream.map(function)`: Transform each element.
- `stream.collect(collector)`: Accumulate elements.
- `stream.reduce(identity, accumulator)`: Combine elements.
- `stream.forEach(action)`: Loop over elements.

### **Random Methods**:
- `Random rand = new Random()`: Create a new Random instance.
- `rand.nextInt()`: Returns a random integer.
- `rand.nextInt(bound)`: Returns a random integer between 0 (inclusive) and the specified bound (exclusive).
- `rand.nextDouble()`: Returns a random double between 0.0 and 1.0.
- `rand.nextBoolean()`: Returns a random boolean value.
- `rand.nextLong()`: Returns a random long value.
- `rand.nextFloat()`: Returns a random float between 0.0 and 1.0.
- `rand.nextBytes(byte[] bytes)`: Fills the specified byte array with random bytes.

### **Comparator Methods**:
- `Comparator.naturalOrder()`: Returns a comparator that compares `Comparable` objects in natural order.
- `Comparator.reverseOrder()`: Returns a comparator that compares `Comparable` objects in reverse of natural order.
- `Comparator.comparing(Function keyExtractor)`: Returns a comparator that compares by the value extracted by the specified function.
- `Comparator.comparingInt(ToIntFunction keyExtractor)`: Returns a comparator that compares `int` values extracted by the specified function.
- `Comparator.comparingDouble(ToDoubleFunction keyExtractor)`: Returns a comparator that compares `double` values extracted by the specified function.
- `Comparator.comparingLong(ToLongFunction keyExtractor)`: Returns a comparator that compares `long` values extracted by the specified function.
- `Comparator.thenComparing(Comparator other)`: Returns a comparator that first uses this comparator, then uses the specified comparator.
- `Comparator.thenComparing(Function keyExtractor)`: Returns a comparator that first uses this comparator, then uses a key extractor function.
- `Comparator.thenComparingInt(ToIntFunction keyExtractor)`: Returns a comparator that first uses this comparator, then compares `int` values extracted by the specified function.
- `Comparator.thenComparingDouble(ToDoubleFunction keyExtractor)`: Returns a comparator that first uses this comparator, then compares `double` values extracted by the specified function.
- `Comparator.thenComparingLong(ToLongFunction keyExtractor)`: Returns a comparator that first uses this comparator, then compares `long` values extracted by the specified function`.

### **Examples of Using Comparator**:

1. **Sorting a List of Strings in Natural Order**:
    ```java
    List<String> words = Arrays.asList("apple", "banana", "cherry");
    words.sort(Comparator.naturalOrder());
    System.out.println(words); // Output: [apple, banana, cherry]
    ```

2. **Sorting a List of Strings in Reverse Order**:
    ```java
    List<String> words = Arrays.asList("apple", "banana", "cherry");
    words.sort(Comparator.reverseOrder());
    System.out.println(words); // Output: [cherry, banana, apple]
    ```

3. **Sorting a List of People by Age**:
    ```java
    class Person {
        String name;
        int age;
        
        Person(String name, int age) {
            this.name = name;
            this.age = age;
        }

        @Override
        public String toString() {
            return name + ": " + age;
        }
    }

    List<Person> people = Arrays.asList(new Person("Alice", 30), new Person("Bob", 25), new Person("Charlie", 35));
    people.sort(Comparator.comparingInt(person -> person.age));
    System.out.println(people); // Output: [Bob: 25, Alice: 30, Charlie: 35]
    ```

4. **Sorting a List of People by Name, Then by Age**:
    ```java
    List<Person> people = Arrays.asList(new Person("Alice", 30), new Person("Bob", 25), new Person("Alice", 22));
    people.sort(Comparator.comparing((Person person) -> person.name).thenComparingInt(person -> person.age));
    System.out.println(people); // Output: [Alice: 22, Alice: 30, Bob: 25]
    ```

5. **Custom Comparator for Sorting by Length of String**:
    ```java
    List<String> words = Arrays.asList("apple", "banana", "cherry");
    Comparator<String> lengthComparator = Comparator.comparingInt(String::length);
    words.sort(lengthComparator);
    System.out.println(words); // Output: [apple, cherry, banana]
    ```

### **Noteworthy Differences**:

### **In-Place vs. Return Value**:
- `Collections.sort(list)` vs `list.stream().sorted().collect(Collectors.toList())`:
    - `Collections.sort(list)`: Modifies the list in-place.
    - `list.stream().sorted().collect(Collectors.toList())`: Returns a new sorted list, leaving the original list unmodified.
  
### **String Operations**:
Java strings are immutable. Thus, operations on strings return new strings.
- For example:
    - `s.trim()`: Returns a new string with whitespace removed from both ends. The original string `s` remains unchanged.

### **Lambda Functions in Different Scenarios**:

1. **Filtering**:
    - Filtering out even numbers from a list:
        ```java
        List<Integer> evens = nums.stream().filter(x -> x % 2 == 0).collect(Collectors.toList());
        ```

2. **Mapping**:
    - Squaring all numbers in a list:
        ```java
        List<Integer> squares = nums.stream().map(x -> x * x).collect(Collectors.toList());
        ```

3. **Reduce**:
    - Summing all elements of a list:
        ```java
        int sum = nums.stream().reduce(0, (x, y) -> x + y);
        ```

4. **Using with `max()` and `min()`**:
    - Finding the longest string in a list:
        ```java
        String longest = words.stream().max(Comparator.comparingInt(String::length)).orElse(null);
        ```

5. **ForEach**:
    - Iterating over a list:
        ```java
        nums.forEach(System.out::println);
        ```

6. **Custom Sorting**:
    - Sorting by length of strings:
        ```java
        words.sort(Comparator.comparingInt(String::length));
        ```

 