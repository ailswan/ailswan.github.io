---
layout: essay_single
title: SQL Q&A
date: 2023-12-24
tags:
   - SQL
categories:
- Q&A
- SQL
- Backend
feature_text: |
  ## SQL Q&A (Translated from Chinese)
  Post by ailswan Jan.03, 2024
feature_image: "https://picsum.photos/2560/600?image=865"
---

### **1. What is a Database?**

A database is a container that organizes data (usually in one or more files) and is created and manipulated through a Database Management System (DBMS). The primary goal of a DBMS is to provide a convenient and efficient way to access database information.

When we talk about an XX database, it essentially refers to the XX Database Management System. Currently, popular DBMS includes MySQL, SQL Server, Oracle, and others.

There are two types of databases: relational databases and non-relational databases.

| Database Type           | Definition                                                   | Advantages                                             | Disadvantages                                              | Common Examples                                   |
|-------------------------|--------------------------------------------------------------|--------------------------------------------------------|-----------------------------------------------------------|----------------------------------------------------|
| Relational Database     | Built on the relational model, consisting of interconnected tables | 1) Consistent table structure, easy maintenance; 2) Use of SQL for complex queries; 3) High security with data stored on disk | 1) Poor read/write performance; 2) Inevitable space wastage due to the relational model; 3) Fixed table structure, lower flexibility | MySQL, Microsoft SQL Server, Oracle, PostgreSQL, etc. |
| Non-relational Database | Also known as NoSQL, often storing data in the form of objects with relationships determined by the object's own attributes | 1) Storage formats can be key-value, document, image, etc., with a broader range of applications; 2) Easy maintenance and processing of massive data; 3) Advantages of scalability, high concurrency, stability, and low cost | 1) No SQL support; 2) No transaction processing, unable to guarantee data integrity and security; 3) Features are not as comprehensive as relational databases | Neo4j, Redis, MongoDB, etc. |

Note: SQL stands for Structured Query Language, a database query language used for accessing, querying, updating, and managing relational database systems. Unlike other languages (such as English and Java), SQL is composed of a small number of highly descriptive words, making it simple and easy to learn.

---

### **2. Why Use Databases?**

| Data Storage Method | Advantages                                                  | Disadvantages                                             |
|----------------------|------------------------------------------------------------|-----------------------------------------------------------|
| In-Memory Storage    | Fast access speed                                           | Data cannot be permanently saved                           |
| File-Based Storage   | Data can be permanently saved                                | Inconvenient for querying data; Slower operation speed than in-memory operations; Frequent IO operations |
| Database Storage     | Data can be permanently saved with high security; Convenient and efficient querying using SQL; Easy data management, intelligent data analysis | Inconvenient for database portability; Lack of support for clustering; Not proficient in handling business logic |
 
In summary, facing vast amounts of network data, using databases allows for efficient and well-organized data storage. It enables people to manage data more quickly and conveniently.

---

### **3. Difference Between SQL and MySQL**

SQL and MySQL are two terms that often cause confusion in the realm of Database Management Systems (DBMS). There are fundamental differences between the two.

- **SQL (Structured Query Language):**
  - SQL is a structured query language used to perform various operations on a database.
  - It is employed for accessing, updating, and manipulating data in databases. Users need to learn this language and then write queries to interact with the database.

- **MySQL (Relational Database Management System - RDBMS):**
  - MySQL, on the other hand, is a specific type of DBMS known as a Relational Database Management System (RDBMS).
  - It utilizes SQL to execute all database operations, providing users with an interface where they can perform various database operations by simply clicking buttons.

- **Usage:**
  - SQL is a language used for interacting with databases and is not a standalone software.
  - MySQL, however, is a software that receives regular updates. Users interact with it through a graphical interface, eliminating the need to write SQL queries manually.

- **Consistency:**
  - In SQL, the commands remain the same regardless of the software used.
  - MySQL, being software, receives various updates periodically.

In summary, SQL is a language, while MySQL is a software implementing an RDBMS using SQL for its operations. SQL commands remain consistent, but MySQL, being software, undergoes regular updates.

---
### **4. Meaning of Database Connection Leakage**

Database connection leakage refers to the situation where, if Connection, Statement, and ResultSet resources are not correctly closed in a certain usage or program segment, each execution will leave some unclosed connections. These connections lose their references and cannot be reused, leading to a leakage of database connections. Database connection resources are valuable and limited. If this leakage occurs in a frequently used code segment, the database connection resources will be exhausted, affecting the normal operation of the system.

---

### **5. What is a Trigger?**

A trigger is a database object related to a table. It is a type of event-driven special stored procedure defined by users on a relational table. Triggers are triggered when specified conditions are met and execute a set of statements defined in the trigger. This characteristic of triggers helps in ensuring the integrity of the database on the database side.

**Use Cases:**
- Implementing cascading changes through related tables.
- Real-time monitoring of changes to a specific field in a table, with corresponding actions.

---

### **6. Index**

In the interview process, when discussing database-related questions, it's inevitable to touch upon the knowledge of database indexes, including concepts, principles, and significance. This chapter primarily introduces key points about index knowledge in the context of interviews.

An index is a type of data structure. A database index is a sorted data structure in a Database Management System (DBMS) that helps in quickly querying and updating data in database tables. The implementation of indexes typically uses B-trees and variations like B+ trees.

In simpler terms, an index is like a directory, existing to facilitate the lookup of data content, and it also occupies physical space.

---

### **7. Pros and Cons of Indexing**

**Advantages of Indexing:**
- Ensures the uniqueness of each row of data in the database table by creating a unique index.
- Accelerates data retrieval speed, a primary reason for creating indexes.
- Speeds up connections between tables, especially significant in achieving data referential integrity.
- Enhances system performance by utilizing optimization heuristics during the query process.

**Disadvantages of Indexing:**
- Time-wise, creating and maintaining indexes consume time, and this time increases with the growth of data. Specifically, when adding, deleting, or modifying data in a table, indexes need dynamic maintenance, slowing down data maintenance speed.
- Space-wise, indexes occupy physical space. In addition to the data space occupied by the data table, each index also occupies a certain amount of physical space. If a clustered index needs to be established, more space is required.

---
### **8. Index Data Structures**

Database indexes can be classified based on structure, primarily including B-tree index, Hash index, and Bitmap index.

**B-tree Index**

A B-tree index, also known as a balanced tree index, is the most frequently used index type in MySQL databases. MySQL, Oracle, and SQL Server databases default to using B-tree indexes (implemented using B+ trees, but commonly referred to as B-tree indexes).

A B-tree index is organized in a tree structure, consisting of one or more branch nodes that point to single-level leaf nodes. The branch nodes are used for traversing the tree, while the leaf nodes store actual values and their positions.

B+ trees are an optimization of B-trees, making them more suitable for implementing external storage index structures.

Properties of an m-order B-Tree:
- Each node has at most m child nodes.
- Except for the root and leaf nodes, each node has at least m/2 (rounded up) child nodes.
- All leaf nodes are at the same level.
- Each node contains k elements (keys), where m/2 ≤ k < m (rounded down to m/2).
- Elements in each node are arranged in ascending order.
- The value of the left child node of each element (key) is less than or equal to the element, and the value of the right child node is greater than or equal to the element.

B+ Tree has a similar structure to B-Tree but with specific characteristics:
- Non-leaf nodes store only key information.
- All specific data is stored in leaf nodes.
- All leaf nodes contain information about all elements.
- There is a chain link between all leaf nodes.

**Hash Index**

A hash index uses a specific hash algorithm (common algorithms include direct addressing, square middle, folding, division remainder, random number) to convert database field data into a fixed-length hash value. This hash value, along with the row pointer for this data, is stored in the corresponding position of the hash table. In case of hash collisions (two different keywords having the same hash value), data is stored in the corresponding hash key position as a linked list.

Retrieval does not require a step-by-step search from the root node to leaf nodes, as in B+ trees. It only requires a hash algorithm to immediately locate the corresponding position, resulting in very fast retrieval, with an average retrieval time of O(1).

**Bitmap Index**

While B-tree indexes excel at handling columns with many different values, they become challenging to use for columns with a small cardinality. If the column being queried has a very small cardinality, meaning it has only a few fixed values (e.g., gender, marital status, administrative region, etc.), either indexes are not used, and queries scan all records row by row, or bitmap indexes are considered.

A bitmap index generates a bitmap for each unique value in a column. For example, for the marital status column, the generated bitmap index may look roughly like this:

| Value / Row ID | 1 | 2 | 3 | 4 | 5 | 6 | … |
|----------------|---|---|---|---|---|---|---|
| Unmarried      | 1 | 1 | 0 | 0 | 0 | 0 |   |
| Married        | 0 | 0 | 0 | 1 | 1 | 1 |   |
| Divorced       | 0 | 0 | 1 | 0 | 0 | 0 |   |

During data lookup, only the 1 values in the relevant bitmap need to be checked (with AND, OR operations based on query requirements).

It's worth noting that besides being suitable for columns with a small cardinality, bitmap indexes are also suitable for static data and not recommended for columns with frequently updated indexes.

---

### **9. Advantages of Using B+ Trees**

Due to the fact that B+ tree internal nodes only store keys and not values, a single read can retrieve more keys within the same memory page, facilitating quicker narrowing of the search range.

B+ tree leaf nodes are connected by a linked list. When a full data traversal is required, the B+ tree needs only O(logN) time to find the smallest node and then perform O(N) sequential traversal through the linked list. Alternatively, when finding data greater or less than a specific key, the B+ tree only needs to locate that key and then traverse along the linked list.

---

### **10. Differences Between Hash Index and B+ Tree Index**

Hash index and B+ tree index have several noticeable differences:

- Hash index performs faster for equality queries (in general) but cannot perform range queries.
- Hash index does not support indexing for sorting.
- Hash index does not support fuzzy queries or the leftmost prefix match for
---
### **10. Differences Between Hash Index and B+ Tree Index**

Hash index and B+ tree index have several noticeable differences:

1. **Query Performance:**
   - Hash index performs faster for equality queries (in general), but it cannot perform range queries.
   - B+ tree index supports both equality and range queries.

2. **Sorting:**
   - Hash index does not support using the index for sorting.
   - B+ tree index supports sorting using the index.

3. **Search Capability:**
   - Hash index does not support fuzzy queries or the leftmost prefix match due to the unpredictability of the hash function.
   - B+ tree index allows for fuzzy queries and the use of the leftmost prefix match.

4. **Backtracking for Data Retrieval:**
   - Hash index always involves backtracking to retrieve data, especially in the presence of hash collisions.
   - B+ tree, under certain conditions (e.g., with clustered indexes, covering indexes), can retrieve data solely through the index without the need for backtracking.

5. **Stability and Predictability:**
   - Hash index query performance is faster for equality queries but is less stable and predictable. In cases of a large number of duplicate key values leading to hash collisions, efficiency may significantly decrease.
   - B+ tree index query efficiency is more stable and predictable. The query involves traversing from the root node to the leaf nodes, and the tree's height is generally low.

---

### **11. What is Prefix Index?**

Sometimes, there is a need to index long character columns, which can make the index larger and slower. A strategy to address this is to index only the initial characters, rather than the entire value, known as a **prefix index**. This is done to save space and achieve better performance.

The prerequisite for using a prefix index is that the selected prefix has high selectivity. For example, passwords are suitable for creating a prefix index because passwords are almost always unique.

A prefix index reduces the required space but also decreases selectivity. Index selectivity (INDEX SELECTIVITY) is the ratio of unique index values (also known as cardinality) to the total number of rows in the table (T), with a value range of 1/T to 1. High selectivity indexes are beneficial as they can filter out more rows during matching, with the selectivity rate of 1 being the optimal value for a unique index.

For a prefix index, longer prefixes often result in better selectivity, but choosing the right prefix length involves a trade-off between selectivity and space savings. This decision can be made by debugging and examining the average matching degree for different prefix lengths.

---
### **12. What is the Leftmost Prefix Matching Principle?**

In MySQL, when creating a composite index (multi-column index), the system follows the Leftmost Prefix Matching Principle, which means matching starts from the leftmost column of the composite index when retrieving data. For example, if there is a 3-column index (a, b, c), indexes have been created for (a), (a, b), and (a, b, c). Therefore, when creating a composite index, based on business requirements, the column used most frequently in the WHERE clause should be placed on the left.

Following the Leftmost Prefix Matching Principle, MySQL continues matching to the right until encountering a range query (> <, BETWEEN, LIKE), at which point the matching stops. For instance, with a query condition WHERE a = 1 AND b = 2 AND c > 3 AND d = 4, if an index is created in the order (a, b, c, d), the index won't be used for column d. However, if the index order is (a, b, d, c), it will be utilized. Additionally, the order of columns a, b, and d in the WHERE clause can be rearranged as needed.

If the index is created in the order (a, b), then according to the Leftmost Prefix Matching Principle, a query condition like WHERE b = 1 cannot fully utilize the index.

---

### **13. Principles for Adding Indexes**

While indexes can enhance query performance, there are guidelines to follow when adding indexes:

1. **Avoid Indexing Rarely Used or Referenced Columns:**
   - Do not create indexes on columns rarely used or referenced in queries. Indexing such columns may decrease system maintenance speed and increase space requirements.

2. **Avoid Indexing Columns with Few Distinct Values:**
   - Columns with very few distinct values may not benefit significantly from indexing. For example, indexing a gender column in a personnel table may not enhance retrieval speed, especially if the data rows requiring search cover a large proportion of the table.

3. **Avoid Indexing Columns with Text, Image, or Bit Data Types:**
   - Columns with data types like text, image, or bit, having either substantial data volume or few distinct values, should not be indexed.

4. **Consider Performance Trade-offs:**
   - If modification performance is significantly more critical than retrieval performance, avoid creating indexes. Indexes improve retrieval speed but may reduce modification performance.

5. **Index Columns with Foreign Keys:**
   - Columns with foreign keys should be indexed to enhance query performance related to these columns.

 ---
### **14. What is a Clustered Index?**

A clustered index, also known as a clustering index, is not a specific index type but a data storage method. Specifically, a clustered index refers to storing data and index together, where finding the index means finding the data.

In MySQL, only INNODB tables support clustered indexes. For INNODB tables, data itself is a clustered index, with non-leaf nodes stored in primary key order, and leaf nodes storing the primary key and corresponding row records. Thus, performing a full table sequential scan on an INNODB table is very fast.

**Features:**
- Due to the storage of both index and data together, it offers higher retrieval efficiency.
- Compared to non-clustered indexes, clustered indexes can reduce the number of disk I/O operations.
- The physical storage of the table is based on the structure of the clustered index. Therefore, a table can have only one clustered index but can have multiple non-clustered indexes.
- Generally, clustered indexes are created on fields frequently used for sorting.

**Non-Clustered Index:**
- Any index other than a clustered index is called a non-clustered index. Non-clustered indexes are also in a B-tree structure, but they differ from clustered indexes in that they do not store actual data rows; instead, they contain a pointer to the data row.

In simple SQL queries, divided into SELECT and WHERE clauses, index creation is based on these, categorized as composite indexes and covering indexes.

---

### **15. What is a Database Transaction?**

A database transaction is a mechanism, an operation sequence that consists of a set of database operation commands. The result of executing these commands must transition the database from one consistent state to another. Transactions submit or roll back a set of database commands as a single unit of work, ensuring either all commands are executed or none, making it an indivisible logical work unit. If any operation fails, the entire set of operations fails, returning to the pre-operation state or the previous checkpoint.

Therefore, transactions are crucial for maintaining logical data consistency and recoverability. Locks play a key role in implementing transactions, ensuring the integrity and concurrency of transactions.

---
### **16. What are the Transaction States?**

A transaction goes through different states during its entire lifecycle, and these states are also referred to as transaction states.

**Active State:**
- The initial state of a transaction, where any transaction in progress is in this state. Changes made are stored in the buffer of the main memory.

**Partially Committed State:**
- After the last operation, the transaction enters the partially committed state. It is termed "partially committed" because the changes made still reside in the buffer of the main memory.

**Failed State:**
- If a check fails while in the active state or if an error occurs during the active or partially committed state, rendering the transaction unable to proceed further, it enters the failed state.

**Aborted State:**
- If any transaction reaches the failed state, the recovery manager rolls back the database to the original state when the execution started.

**Committed State:**
- If all operations are successfully executed, the transaction transitions from the partially committed state to the committed state. Transactions in the committed state cannot be rolled back; it represents a new consistent state.

---

### **17. Four Properties of Transactions (ACID)**

A transaction has four properties known as ACID: Atomicity, Consistency, Isolation, and Durability. These four properties are fundamental for relational databases to ensure data integrity and reliability.

**Atomicity:**
- Transactions are the smallest units of execution, indivisible. Atomicity ensures that actions either fully execute or do not execute at all.

**Consistency:**
- Upon completion, a transaction must leave the database in a consistent state, meaning the results of multiple transactions reading the same data must be the same.

**Isolation:**
- When multiple users access the database concurrently, a transaction's execution should not be interfered with by other transactions. It provides separation and prevents interference between transactions.

**Durability:**
- Once a transaction is committed, the changes made are permanent and persist, even in the event of a system failure.

---

### **18. How to Implement ACID Properties in Transactions**

The ACID properties of transactions are implemented by the Database Management System (DBMS).

**Atomicity:**
- Achieved by maintaining a log that records transaction updates. If an error occurs during the transaction, the log is used to undo the changes, ensuring atomicity.

**Consistency:**
- The DBMS ensures consistency by validating the database before and after a transaction. If inconsistencies are found, the transaction is rolled back.

**Isolation:**
- Concurrency control mechanisms such as locks are used to ensure that transactions executing concurrently do not interfere with each other, maintaining isolation.

**Durability:**
- Durability is achieved through periodic backups and the use of write-ahead logging. Changes are recorded in a log, and after each transaction, the log is updated to persist the changes.

---
### **19. Impact of Transactions on Each Other**

**Dirty Read:**
- Occurs when one transaction reads data that another transaction has not yet committed. It leads to reading uncommitted data.

**Non-repeatable Read:**
- In a single transaction, two identical queries return different results due to modifications made by other transactions in the meantime.

**Phantom Read:**
- Phantom read happens when a transaction is not executed independently. For instance, one transaction modifies all rows in a table, and another transaction inserts a new row. The first transaction might perceive phantom rows that seem not to have been modified.

**Lost Update:**
- Lost update occurs when two transactions read the same record simultaneously. If transaction A modifies the record first and transaction B, unaware of A's modification, also modifies the record, the changes made by B might overwrite A's modifications, leading to a lost update.

### **20. Transaction Isolation Levels**

To minimize the impact of transactions on each other and achieve the four properties of transactions, SQL standards define four transaction isolation levels: READ-UNCOMMITTED, READ-COMMITTED, REPEATABLE-READ, and SERIALIZABLE. These levels determine the depth of concurrency for concurrent transactions. The corresponding impact on various transaction interactions is as follows:

**Isolation Level** | **Dirty Read** | **Non-repeatable Read** | **Phantom Read** | **Lost Update**
--- | --- | --- | --- | ---
READ-UNCOMMITTED | Yes | Yes | Yes | Yes
READ-COMMITTED | No | Yes | Yes | Yes
REPEATABLE-READ | No | No | Yes | No
SERIALIZABLE | No | No | No | No

- **READ-UNCOMMITTED:** Lowest isolation level where a transaction can read uncommitted data from another transaction, causing all concurrency issues.

- **READ-COMMITTED:** Only sees committed data from other transactions, solving the dirty read problem but still susceptible to non-repeatable read and phantom read. This is the default in Oracle.

- **REPEATABLE-READ:** Ensures that within a transaction, reading the same data always returns consistent results, solving dirty read and non-repeatable read issues. Default in MySQL.

- **SERIALIZABLE:** Highest isolation level, making transactions execute serially. It completely adheres to ACID, sacrificing system concurrency.

---
### **21. Classification of Locks**

1. **Shared Lock (S):**
   - Allows concurrent reading of data but prevents modifications. All transactions are blocked from modifying the data until the shared lock is released.

2. **Exclusive Lock (X):**
   - Prevents other transactions from accessing the resource for any operation (read, write, or update). It ensures exclusive access to the resource until the exclusive lock is released.

3. **Update Lock (U):**
   - A lock mode to prevent deadlock situations. It is used when two transactions want to read and then modify the same data. Update lock can prevent deadlocks that may occur with shared and exclusive locks.

4. **Intent Locks:**
   - Represent the intention to acquire shared or exclusive locks at a lower level in a hierarchy. Intent locks help in avoiding unnecessary checks on lower-level locks for transactions.

   - Types of intent locks include Intent Shared (IS), Intent Exclusive (IX), and Shared with Intent Exclusive (SIX).

5. **Schema Locks:**
   - Used during operations dependent on table schema. Types include Schema Modification (Sch-M) and Schema Stability (Sch-S). Sch-M is used during Data Definition Language (DDL) operations, and Sch-S is used during query compilation.

6. **Bulk Update Lock (BU):**
   - Used when copying large amounts of data to a table with the TABLOCK hint. It allows concurrent large-scale copying to the same table while preventing other processes from accessing the table.

### **22. Relationship Between Transaction Isolation Levels and Locks**

- **READ-UNCOMMITTED:** Reading data doesn't require a shared lock, avoiding conflicts with exclusive locks on modified data.

- **READ-COMMITTED:** Read operations need a shared lock, but it is released immediately after the statement execution.

- **REPEATABLE-READ:** Read operations need a shared lock, and the lock is held until the transaction commits, preventing other transactions from modifying the data.

- **SERIALIZABLE:** The most restrictive level, locks the entire range of keys and holds the lock until the transaction completes.

---
### **23. Deadlocks and Solutions**

**Deadlock:**
- A situation where two or more transactions cannot proceed because each is waiting for the other to release a lock, causing a cycle of dependencies.

**Common Solutions:**
1. **Orderly Access to Tables:**
   - Ensure that different programs accessing multiple tables follow a consistent order. This helps reduce the chance of deadlocks.

2. **Transaction Batching:**
   - Attempt to perform all necessary locks in a single transaction to minimize the probability of deadlock.

3. **Lock Granularity Management:**
   - Adjust lock granularity to higher levels, such as table-level locks, for business sections prone to deadlocks. This reduces the likelihood of deadlock occurrence.

---
### **24. Optimistic and Pessimistic Concurrency Control**

**Pessimistic Locking (Pessimistic Concurrency Control):**
- Assumes that conflicts will occur and shields against any operations that could violate data integrity. Transactions acquire locks as soon as data is read and hold them until the transaction is committed. This approach can significantly impact system concurrency, especially for long transactions. Implementation: Utilizes database locking mechanisms.

**Optimistic Locking (Optimistic Concurrency Control):**
- Assumes that conflicts are unlikely and checks for data integrity violations only during the commit operation. Optimistic locking is suitable for scenarios with more reads than writes, enhancing throughput. Implementation: Often employs versioning or Compare-and-Swap (CAS) algorithms.

### **25. Categories of SQL Statements**

1. **DDL (Data Definition Language):**
   - Examples: CREATE, DROP, ALTER.
   - Used for defining or altering the structure of the database objects like tables, views, and indexes.

2. **DQL (Data Query Language):**
   - Example: SELECT.
   - Primarily for querying data, including simple queries, joins, etc.

3. **DML (Data Manipulation Language):**
   - Examples: INSERT, UPDATE, DELETE.
   - Used for manipulating data, such as inserting, updating, or deleting records.

4. **DCL (Data Control Language):**
   - Examples: GRANT, REVOKE, COMMIT, ROLLBACK.
   - Deals with database security, integrity, and transaction control.

### **26. Superkey, Candidate Key, Primary Key**

**Superkey:**
- In a relational database, a superkey is a set of attributes that uniquely identifies a tuple (row) in a relation (table). It includes candidate keys and may contain extra attributes.

**Candidate Key:**
- A candidate key is a minimal superkey, meaning it is a set of attributes that uniquely identifies a tuple, and removing any attribute from the set would make it lose this property.

**Primary Key:**
- The primary key is a specific candidate key chosen to uniquely identify each tuple in a relation. It must be unique for each tuple and cannot contain NULL values.

**Foreign Key:**
- In a relational database, a foreign key is a column or a set of columns that refers to the primary key of another table. It establishes a link between two tables, enforcing referential integrity.

---

### **27. SQL Constraints Types**

SQL constraints are rules enforced on a column or multiple columns to ensure data consistency. There are six major types of constraints:

1. **NOT NULL Constraint:**
   - Ensures that a column cannot have a NULL value.

2. **DEFAULT Constraint:**
   - Provides a default value for a column if no value is specified.

3. **PRIMARY KEY Constraint:**
   - Uniquely identifies each record in a table. It must contain unique values and cannot have NULLs.

4. **FOREIGN KEY Constraint:**
   - Enforces referential integrity. It ensures that values in one table's column match with the values in another table's primary key.

5. **UNIQUE Constraint:**
   - Ensures that all values in a column are unique.

6. **CHECK Constraint:**
   - Enforces a condition on a column to ensure that the values meet specific criteria.

### **28. Difference Between CHAR and VARCHAR**

**CHAR:**
- Represents a fixed-length string with a maximum length of 255 characters.
- Padding with spaces is used if the inserted data is shorter than the fixed length.
- Fixed length leads to faster retrieval but may waste storage space.

**VARCHAR:**
- Represents a variable-length string with a maximum length of 65,532 characters.
- Does not pad with spaces; the actual length of the data is stored.
- More flexible in terms of storage but may have slightly slower retrieval speed.

These differences allow developers to choose between a fixed-length and variable-length string based on specific requirements.

---
### **29. Types of Joins in MySQL**

In database development, complex or multi-table queries often require the use of join operations. Here are five types of joins in MySQL:

1. **CROSS JOIN:**
   - Returns the Cartesian product of the two tables, where each row from the first table is combined with every row from the second table.

2. **INNER JOIN:**
   - Retrieves rows that have matching values in both tables based on a specified condition. Types include equal join (ON A.id = B.id), non-equal join (ON A.id > B.id), and self-join (SELECT * FROM A T1 INNER JOIN A T2 ON T1.id = T2.pid).

3. **OUTER JOIN (LEFT JOIN / RIGHT JOIN):**
   - LEFT JOIN: Retrieves all rows from the left table and the matched rows from the right table. Unmatched rows on the right side are filled with NULL values.
   - RIGHT JOIN: Retrieves all rows from the right table and the matched rows from the left table. Unmatched rows on the left side are filled with NULL values.

4. **UNION and UNION ALL:**
   - UNION: Combines result sets from multiple SELECT statements into a single result set, removing duplicate rows. The number of columns must be the same, and it requires matching data types.
   - UNION ALL: Similar to UNION but includes duplicate rows.

5. **FULL JOIN:**
   - MySQL does not directly support FULL JOIN, but it can be emulated using a combination of LEFT JOIN, UNION, and RIGHT JOIN.

### **30. Subqueries in MySQL**

A subquery, in the context of MySQL, refers to a nested SQL query within another SQL statement. Subqueries can be used with SELECT, SELECT...INTO, INSERT...INTO, DELETE, UPDATE, or nested within another subquery.

Subqueries are fundamental in multi-table queries and are often used in conjunction with JOIN operations.

### **31. Types of Subqueries**

Subqueries are categorized into four types:

1. **Scalar Subquery:**
   - Returns a single value, such as a number or a string. It is the simplest form of a subquery.

2. **Column Subquery:**
   - Returns a result set with one column and multiple rows. It usually comes from querying a specific column in a table.

3. **Row Subquery:**
   - Returns a result set with one row and multiple columns. It often involves querying specific data from a single row.

4. **Table Subquery:**
   - Returns a result set with multiple rows and columns, essentially representing a table.

### **32. Differences Between DROP, DELETE, and TRUNCATE**

|        | DROP               | DELETE                             | TRUNCATE                         |
|--------|--------------------|------------------------------------|----------------------------------|
| SQL Type | DDL (Data Definition Language) | DML (Data Manipulation Language) | DDL (Data Definition Language) |
| Rollback | Not rollbackable   | Rollbackable                       | Not rollbackable                 |
| Effect | Deletes the table along with data, indexes, and permissions | Deletes specified rows based on a condition | Deletes all rows, retains table structure |
| Speed  | Fastest            | Slower                             | Faster                           |

In summary, use DROP when you want to completely remove a table, DELETE when you want to remove specific rows, and TRUNCATE when you want to remove all rows but keep the table structure.

---
### **33. Difference Between UNION and UNION ALL**

**UNION:**
- Combines result sets from multiple SELECT statements into a single result set.
- Eliminates duplicate rows from the result set.
- Requires matching data types and number of columns in the SELECT statements.

**UNION ALL:**
- Combines result sets from multiple SELECT statements into a single result set.
- Retains all rows, including duplicate rows.
- Offers higher efficiency compared to UNION.

In summary, use UNION when you want to remove duplicate rows, and use UNION ALL when you want to retain all rows, considering it is more efficient.

### **34. Characteristics of Redis Cache**

Redis, as a high-performance Key-Value database, distinguishes itself from other Key-Value cache products with the following characteristics:

1. **In-Memory with Persistence:**
   - Redis runs in-memory but can persist data to disk, allowing data to be reloaded upon restart.

2. **Versatile Data Structures:**
   - Supports various data structures such as List, Set, Sorted Set, Hash, in addition to simple Key-Value pairs.

3. **Backup Support:**
   - Provides data backup capabilities, including Master-Slave replication for data backup.

### **35. Differences Between Redis and MySQL**

1. **Type Difference:**
   - MySQL is a relational database using table-based storage, adhering to ACID principles.
   - Redis is a NoSQL database using key-value storage, providing flexibility and high performance, but with relaxed ACID compliance.

2. **Functionality:**
   - MySQL is primarily used for persistent storage with a focus on data integrity and relational structure.
   - Redis uses caching for frequently accessed data, enhancing read and write performance, with limited data retention.

3. **Operational Mechanism:**
   - MySQL follows a conservative caching strategy to ensure strict ACID compliance, sacrificing some performance.
   - Redis adopts a more flexible approach, sacrificing some consistency for higher throughput, making it suitable for scenarios with massive concurrent access.

In summary, MySQL is suitable for scenarios requiring strict ACID compliance and relational data structure, while Redis excels in high-performance caching and flexible data storage.

---
### **36. Differences Between Redis and MongoDB**

MongoDB and Redis, both being NoSQL databases with a focus on structured data storage, have the following key differences:

1. **Performance:**
   - Overall, TPS (Transactions Per Second) in Redis tends to be higher than MongoDB.

2. **Operability:**
   - MongoDB supports rich data expressions, indexes, and a query language similar to relational databases, making operations more convenient than Redis.

3. **Memory and Storage:**
   - MongoDB is suitable for large data storage and relies on OS virtual memory management.
   - Redis, with features like virtual memory and time-based data expiration, can break through physical memory limitations.

4. **Persistence and Recovery:**
   - MongoDB supports persistence using the binlog method, enhancing reliability.
   - Redis relies on snapshots and enhanced AOF for persistence, impacting access performance to some extent.

5. **Data Consistency:**
   - MongoDB lacks native transaction support, relying on client-side measures for data consistency.
   - Redis supports transactions, ensuring ordered execution of operations within a transaction.

6. **Data Analysis:**
   - MongoDB includes built-in data analysis features like map-reduce, while Redis lacks built-in data analysis support.

7. **Use Cases:**
   - MongoDB is suitable for scenarios with massive data, focusing on improved access efficiency.
   - Redis is suitable for smaller data sets, emphasizing performance.

### **37. Redis Data Types**

Redis supports five main data types:

1. **String:**
   - Basic data type supporting binary-safe storage (e.g., images or serialized objects) with a maximum size of 512 MB.

2. **Hash:**
   - Key-value pair collection, suitable for storing objects.

3. **List:**
   - Ordered string list, supporting insertion at the head (left) or tail (right).

4. **Set:**
   - Unordered collection of unique string elements, offering O(1) complexity for add, delete, and lookup operations.

5. **Sorted Set:**
   - Similar to Set, each element is associated with a double-type score for sorting.

### **38. Implementing Redis Timers**

Redis utilizes time events for implementing a timer mechanism. The server handles two types of events: file events (abstraction for socket operations) and time events (abstraction for timed operations).

A time event has three main attributes:
- **id:** Event identifier.
- **when:** Arrival time of the time event.
- **timeProc:** Time event handler, invoked when the event arrives.

Events can be either one-shot or periodic, determined by the return value of the time event handler.

### **39. Efficiency of Single-Threaded Redis**

Redis achieves high efficiency with a single-threaded design by leveraging an event-driven architecture. The file event processor operates in a single thread, utilizing I/O multiplexing to monitor multiple sockets. This design simplifies Redis internals and facilitates seamless integration with other single-threaded modules within the server.

---
### **40. Redis Eviction Policies**

When the memory data in Redis reaches a certain limit, data eviction (purging) policies are implemented based on the `maxmemory-policy` configuration. Redis decides its behavior as follows:

1. **no-eviction:**
   - No eviction strategy. Returns an error when the maximum memory limit is reached and more memory is required.

2. **allkey-lru:**
   - Randomly selects multiple keys from all key hash tables and uses the LRU algorithm to evict the least recently used data.

3. **volatile-lru:**
   - Randomly selects multiple keys with set expiration times and uses the LRU algorithm to evict the least recently used data.

4. **volatile-random:**
   - Randomly selects keys with set expiration times for eviction.

5. **allkey-random:**
   - Randomly selects keys from all key hash tables for eviction.

6. **volatile-ttl:**
   - Randomly selects keys with set expiration times and evicts data with the shortest remaining time to live.

### **41. Understanding Redis**

Redis, short for Remote Dictionary Server, is fundamentally a Key-Value in-memory database. It operates entirely in memory, periodically writing data to disk asynchronously. It supports Master-Slave synchronization and offers various value types, including String, List, Set, Sorted Set, and Hash. These types allow for a broad range of atomic operations.

Redis excels in scenarios where data sets are relatively small, providing high-performance operations and computations. Its single-threaded design simplifies internals and facilitates integration with other modules.

### **42. Database Structure Optimization**

Database structure optimization involves considerations such as data redundancy, query/update speed, and appropriate data types. Optimization techniques include:

1. **Decomposing Tables with Many Fields:**
   - Splitting tables with numerous fields into multiple tables, especially when some fields are infrequently used.

2. **Adding Intermediate Tables:**
   - Introducing intermediate tables for frequent JOIN operations to enhance query efficiency.

3. **Adding Redundant Fields:**
   - Introducing redundant fields strategically to improve query performance, considering the trade-off with normalization principles.

### **43. Handling High CPU Usage in MySQL**

When MySQL CPU usage spikes to 500%, follow these steps:

1. Use the OS command `top` to identify the process causing high CPU usage.
2. If it's `mysqld`, run `SHOW PROCESSLIST` to identify resource-consuming queries.
3. Analyze and optimize the identified queries (e.g., add indexes, optimize SQL, adjust memory parameters).
4. If high CPU is due to a sudden increase in connections, analyze the cause and implement appropriate measures (e.g., limit connections).

---
### **44. Reasons for Database Sharding**

The need for database sharding arises due to the following reasons:

- **Unmanageable Data Volume:**
  - Over time, the data volume in a database can become uncontrollable, leading to increased operational costs for data manipulation operations (e.g., inserts, deletes, updates).

- **Resource Limitations:**
  - A single server's resources (CPU, disk, memory, IO) are limited. As the data grows, the server's processing capacity becomes a bottleneck.

- **Performance and Availability:**
  - To enhance performance and availability, databases are split into multiple shards distributed across different servers.

### **45. Strategies for Implementing Database Sharding**

Database sharding involves vertical or horizontal partitioning, and sometimes a combination of both.

| Sharding Type | Definition | Pros | Cons | Use Cases |
| --- | --- | --- | --- | --- |
| Vertical Sharding | Splitting tables based on columns, dividing a table into multiple tables with fewer columns but related data. | - Reduces row size, minimizing I/O and simplifying table structures. | - Introduces redundancy in primary keys and complicates JOIN operations. - Increases difficulty in managing transactional consistency. | Suitable for scenarios with many tables and clear, low-coupling business logic. |
| Horizontal Sharding | Splitting tables based on rows, storing data in separate shards while maintaining the same table structure. | - Supports large data storage. - Requires minimal application changes. | - Complexities in managing sharded transactions. - Increases complexity in logic, deployment, and maintenance. | Suitable for scenarios with large data volumes per table and independent data. |

---
### **46. Challenges of Database Sharding**

Implementing database sharding introduces several challenges:

1. **Transaction Issues:**
   - Handling transactions in a sharded environment involves complexities. Reliance on the database's distributed transaction management results in performance overhead, while managing transactions through application logic adds programming burdens.

2. **Cross-Database JOIN Challenges:**
   - Sharding may split logically related data into different tables or databases, making JOIN operations difficult. JOINing tables across different shards or with varying sharding granularity poses challenges.

3. **Additional Data Management Overhead:**
   - Extra data management burdens include challenges in locating data and dealing with redundant operations for data manipulation. These issues can be resolved through application-level solutions but add computational overhead.

### **47. MySQL Master-Slave Replication**

MySQL Master-Slave replication involves transmitting Data Definition Language (DDL) and Data Manipulation Language (DML) operations from a master database to one or more slave databases. The slave databases then redo these operations, ensuring data consistency.

The purposes of Master-Slave replication include:
- Failover to the slave in case of master database issues.
- Implementing read-write separation for load balancing.
- Real-time data backup on the slave.

### **48. Working Principle of MySQL Master-Slave Replication**

MySQL Master-Slave replication operates asynchronously, transferring data from a master to one or more slave databases. The process involves three threads: two on the slave (SQL thread and I/O thread) and one on the master (I/O thread).

**Basic Workflow:**

1. **Master Side:**
   - Enables binary logging to record DDL and DML operations in the master's binlog.

2. **Slave Side:**
   - Initiates an I/O thread to fetch binlog content from the master, storing it in the relay log on the slave.

3. **Slave Side:**
   - SQL execution thread reads the relay log and sequentially executes SQL events.

---

