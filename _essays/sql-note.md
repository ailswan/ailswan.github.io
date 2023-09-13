---
layout: essay_single
title: SQL language note
date: 2023-09-13
tags:
  - sql language
 
categories:
- Notes
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

This note provides an overview of the commonly used SQL features and commands. It is a quick reference guide for database operations and management in SQL. 