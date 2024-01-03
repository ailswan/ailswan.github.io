---
layout: essay_single
title: SQL language note
date: 2023-09-13
tags:
  - sql language
 
categories:
- Notes
- SQL
feature_text: |
  ## SQL language note
  Post by ailswan Sep. 13, 2023
feature_image: "https://picsum.photos/2560/600?image=865"
---

### Summary
This document provides an overview of common SQL commands and operations spanning categories like data retrieval, data modification, and database management.

### **Data Retrieval (Queries)**:
- `SELECT column1, column2, ... FROM table_name`: Retrieve specific columns from a table.
- `SELECT * FROM table_name`: Retrieve all columns from a table.
- `SELECT column1, column2, ... FROM table_name WHERE condition`: Retrieve specific columns based on a condition.

### **Sorting and Filtering**:
- `SELECT column1, column2, ... FROM table_name ORDER BY column1 ASC, column2 DESC`: Sort results based on columns.
- `SELECT column1, column2, ... FROM table_name WHERE condition LIMIT number`: Limit the number of results returned.
  
### **Joining Tables**:
- `SELECT ... FROM table1 INNER JOIN table2 ON table1.column = table2.column`: Inner join.
- `SELECT ... FROM table1 LEFT JOIN table2 ON table1.column = table2.column`: Left join.
- `SELECT ... FROM table1 RIGHT JOIN table2 ON table1.column = table2.column`: Right join.
- `SELECT ... FROM table1 FULL JOIN table2 ON table1.column = table2.column`: Full (outer) join.

### **Data Modification**:
- `INSERT INTO table_name (column1, column2, ... ) VALUES (value1, value2, ... )`: Insert new records.
- `UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition`: Modify existing records.
- `DELETE FROM table_name WHERE condition`: Delete records.

### **Database and Table Management**:
- `CREATE DATABASE database_name`: Create a new database.
- `DROP DATABASE database_name`: Delete a database.
- `CREATE TABLE table_name ( column1 datatype, column2 datatype, ... )`: Create a new table.
- `DROP TABLE table_name`: Delete a table.
- `ALTER TABLE table_name ADD column_name datatype`: Add a new column to a table.

### **Aggregation Functions**:
- `COUNT(column)`: Count entries.
- `SUM(column)`: Sum entries.
- `AVG(column)`: Calculate average.
- `MIN(column)`: Get minimum value.
- `MAX(column)`: Get maximum value.

### **Data Definition Language (DDL)**:
- `CREATE`: Used to create objects like databases, tables, etc.
- `ALTER`: Used to alter existing database objects.
- `DROP`: Used to delete database objects.

### **Data Manipulation Language (DML)**:
- `SELECT`: Used to query data from a database.
- `INSERT`: Used to insert data into tables.
- `UPDATE`: Used to update existing data.
- `DELETE`: Used to delete data from a database.

### **Data Control Language (DCL)**:
- `GRANT`: Provides privileges on database objects.
- `REVOKE`: Removes privileges provided with the GRANT command.

### **Transactional Control Commands**:
- `COMMIT`: Saves the work done during the current transaction.
- `ROLLBACK`: Restores the database state to the last committed state.
- `SET TRANSACTION`: Configures the properties of a transaction.

### **Constraints in SQL**:
- `PRIMARY KEY`: A column or group of columns used to uniquely identify rows in a table.
- `FOREIGN KEY`: A set of columns used to establish and enforce a link between data in two tables.
- `UNIQUE`: Ensures that all values in a column are unique.
- `NOT NULL`: Ensures that a column cannot have a NULL value.
- `CHECK`: Ensures that the value in a column meets a specific condition.

## SQL examples list:

1. **Basic Operations**:
    - Retrieve all records: `SELECT * FROM table_name;`
    - Retrieve specific columns: `SELECT column1, column2 FROM table_name;`
    - Retrieve with conditions: `SELECT column1, column2 FROM table_name WHERE column1 = value;`

2. **Filtering and Sorting**:
    - Using AND & OR: `SELECT * FROM table_name WHERE column1 = value1 AND column2 = value2;`
    - Sorting in ascending order: `SELECT * FROM table_name ORDER BY column1 ASC;`
    - Sorting in descending order: `SELECT * FROM table_name ORDER BY column1 DESC;`
    - Limit results: `SELECT * FROM table_name LIMIT 10;`

3. **Aggregate Functions**:
    - Count: `SELECT COUNT(column1) FROM table_name;`
    - Average: `SELECT AVG(column1) FROM table_name;`
    - Maximum: `SELECT MAX(column1) FROM table_name;`
    - Minimum: `SELECT MIN(column1) FROM table_name;`

4. **Joining Tables**:
    - Inner Join: `SELECT * FROM table1 INNER JOIN table2 ON table1.column = table2.column;`
    - Left Join: `SELECT * FROM table1 LEFT JOIN table2 ON table1.column = table2.column;`
    - Right Join: `SELECT * FROM table1 RIGHT JOIN table2 ON table1.column = table2.column;`
    - Full Outer Join: `SELECT * FROM table1 FULL JOIN table2 ON table1.column = table2.column;`

5. **Insert, Update, Delete**:
    - Insert: `INSERT INTO table_name (column1, column2) VALUES (value1, value2);`
    - Update: `UPDATE table_name SET column1 = value1 WHERE column2 = value2;`
    - Delete: `DELETE FROM table_name WHERE column1 = value1;`

6. **Creating & Modifying Tables**:
    - Create Table: `CREATE TABLE table_name (column1 datatype, column2 datatype);`
    - Add Column: `ALTER TABLE table_name ADD column_name datatype;`
    - Drop (Delete) Table: `DROP TABLE table_name;`

7. **Database Management**:
    - Create Database: `CREATE DATABASE database_name;`
    - Use Database: `USE database_name;`
    - Drop (Delete) Database: `DROP DATABASE database_name;`

8. **Constraints**:
    - Primary Key: `ALTER TABLE table_name ADD PRIMARY KEY (column1);`
    - Foreign Key: `ALTER TABLE table_name ADD FOREIGN KEY (column1) REFERENCES other_table (other_column);`
    - Unique: `ALTER TABLE table_name ADD UNIQUE (column1);`
    - Check: `ALTER TABLE table_name ADD CHECK (condition);`
    - Not Null: `ALTER TABLE table_name MODIFY column1 datatype NOT NULL;`

9. **Index**:
    - Create Index: `CREATE INDEX index_name ON table_name (column1);`
    - Drop Index: `DROP INDEX table_name.index_name;`

10. **Transactions**:
    - Start Transaction: `START TRANSACTION;`
    - Commit: `COMMIT;`
    - Rollback: `ROLLBACK;`

 