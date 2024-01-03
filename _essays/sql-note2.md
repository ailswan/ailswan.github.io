---
layout: essay_single
title: SQL Q&A
date: 2023-12-24
tags:
   - SQL
categories:
- Q&A
- SQL
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
