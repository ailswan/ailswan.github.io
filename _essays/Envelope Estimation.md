---
layout: essay_single
title: Envelope Estimation
date: 2024-03-27
tags:
  - System Design
  - Review-Q&A
categories:
- Notes
feature_text: |
  ##  Envelope Estimation
  Post by ailswan Mar. 03, 2024
feature_image: "https://picsum.photos/2560/600?image=865"
---
## Strategies for Python Backend Based on Different Levels of Scenarios and Scale

### Low QPS and Low DAU:

- **Scenario Example:** Personal blog, simple static websites, etc.
- **Example QPS:** 10 queries per second
- **Example DAU:** 500 daily active users
- **Strategies:**
  - Use lightweight web frameworks such as Flask or FastAPI to simplify development and deployment.
  - Static File Hosting: Use static file hosting services (e.g., Nginx or AWS S3) to host static files and relieve the load on the backend server.
  - Single Server Deployment: You can use a low-configured Virtual Private Server (VPS) to host the application.
  - Database Selection: Choose lightweight databases such as SQLite for storing data.

### Medium QPS and Medium DAU:

- **Scenario Example:** Small-scale social applications, content sharing platforms, etc.
- **Example QPS:** 100 queries per second
- **Example DAU:** 5,000 daily active users
- **Strategies:**
  - Use asynchronous task queues such as Celery to handle time-consuming operations such as email sending, data processing, etc., to improve system throughput and response time.
  - Database Optimization: Choose databases suitable for medium-scale applications such as MySQL or PostgreSQL, and perform index optimization, query optimization, etc.
  - Cache Strategy: Use in-memory caches (such as Redis) to cache frequently accessed data, reducing the number of database queries and improving system performance.
  - Multi-server Deployment: Consider using load balancers and multiple servers to share traffic and improve system scalability and stability.

### High QPS and High DAU:

- **Scenario Example:** Large-scale social networks, online video platforms, etc.
- **Example QPS:** 10,000 queries per second
- **Example DAU:** 1,000,000 daily active users
- **Strategies:**
  - Distributed Architecture: Adopt microservices architecture, split the system into multiple independent services to achieve horizontal scaling and high availability.
  - Elastic Scaling: Use automation tools (such as Kubernetes) to achieve elastic scaling, automatically scaling up or down the number of servers based on the load.
  - CDN Acceleration: Use Content Delivery Networks (CDNs) to accelerate the transmission of static resources, reduce server load, and improve user experience.
  - Data Sharding: For applications with large amounts of data, consider storing data in shards to improve database read/write performance.
  - Real-time Monitoring and Tuning: Use monitoring tools (such as Prometheus) to monitor system metrics in real-time and perform performance tuning and capacity planning based on monitoring data.

The above strategies are for reference only, and the specific implementation methods and optimization methods may vary depending on the specific business requirements and system architecture. During the design and implementation process, it is recommended to flexibly select and adjust strategies based on the actual situation to ensure that the system can meet the expected performance and scalability requirements.

## Storage Calculation

| Scenario                  | Example QPS | Example DAU | Average Data Size per User (MB) | Total Data Size per Day (GB) | Total Data Size per Month (TB) | Relevant Real Applications |
|---------------------------|-------------|-------------|---------------------------------|-------------------------------|--------------------------------|---------------------------|
| Low QPS and Low DAU       | 10          | 500         | 0.5                             | 0.25                          | 7.5                            | Personal blogs, Portfolio websites |
| Medium QPS and Medium DAU | 100         | 5,000       | 10                              | 500                           | 15                             | Small-scale social networks, Forums |
| High QPS and High DAU     | 10,000      | 1,000,000   | 100                             | 100,000                       | 3,000                          | Large-scale social networks, Video streaming platforms |


### Social Media Platform:

- **Initial Data Size (Year 1):** 1 TB
- **Yearly Data Growth Rate:** 50%
- **Storage Plan for 5 Years:**
  - Year 2: 1.5 TB
  - Year 3: 2.25 TB
  - Year 4: 3.38 TB
  - Year 5: 5.07 TB

### E-commerce Website:

- **Initial Data Size (Year 1):** 500 GB
- **Yearly Data Growth Rate:** 30%
- **Storage Plan for 5 Years:**
  - Year 2: 650 GB
  - Year 3: 845 GB
  - Year 4: 1.10 TB
  - Year 5: 1.43 TB

### Video Streaming Service:

- **Initial Data Size (Year 1):** 5 PB
- **Yearly Data Growth Rate:** 100%
- **Storage Plan for 5 Years:**
  - Year 2: 10 PB
  - Year 3: 20 PB
  - Year 4: 40 PB
  - Year 5: 80 PB

### Healthcare Data Management System:

- **Initial Data Size (Year 1):** 100 TB
- **Yearly Data Growth Rate:** 20%
- **Storage Plan for 5 Years:**
  - Year 2: 120 TB
  - Year 3: 144 TB
  - Year 4: 173 TB
  - Year 5: 207 TB

### Financial Trading Platform:

- **Initial Data Size (Year 1):** 10 TB
- **Yearly Data Growth Rate:** 10%
- **Storage Plan for 5 Years:**
  - Year 2: 11 TB
  - Year 3: 12.1 TB
  - Year 4: 13.3 TB
  - Year 5: 14.6 TB


## Latency Table for Transaction Times (for 10MB data)

<table>
  <tr>
    <th>Operation</th>
    <th>Latency (ms)</th>
  </tr>
  <tr>
    <td style="border: 1px solid #ccc;">Read from Cache</td>
    <td style="border: 1px solid #ccc;">1-5</td>
  </tr>
  <tr>
    <td style="border: 1px solid #ccc;">Read from Database</td>
    <td style="border: 1px solid #ccc;">10-50</td>
  </tr>
  <tr>
    <td style="border: 1px solid #ccc;">Network Roundtrip</td>
    <td style="border: 1px solid #ccc;">50-200</td>
  </tr>
  <tr>
    <td style="border: 1px solid #ccc;">External API Call</td>
    <td style="border: 1px solid #ccc;">100-500</td>
  </tr>
  <tr>
    <td style="border: 1px solid #ccc;">Complex Calculation</td>
    <td style="border: 1px solid #ccc;">10-1000</td>
  </tr>
</table>

Certainly! Here's a more refined markdown table for better display on your webpage:

### Storage Conversion Power Table with Approximate Values
Got it! Here's a revised version of the storage conversion table using powers of 10 for approximate values:

### Storage Conversion Power Table with Approximate Values

| Power (10^x) | Approximate Value  | Full Name  | Short Name |
|--------------|--------------------|------------|------------|
| 10^0         | 1 Byte             | Byte       | B          |
| 10^3         | 1 Thousand Bytes   | Kilobyte   | KB         |
| 10^6         | 1 Million Bytes    | Megabyte   | MB         |
| 10^9         | 1 Billion Bytes    | Gigabyte   | GB         |
| 10^12        | 1 Trillion Bytes   | Terabyte   | TB         |
| 10^15        | 1 Quadrillion Bytes| Petabyte   | PB         |
| 10^18        | 1 Quintillion Bytes| Exabyte    | EB         |
 
### Storage Conversion Table Example Conversions

#### 1 Gigabyte (GB) to Megabytes (MB):
1 GB = 1,024 MB

#### 500 Megabytes (MB) to Kilobytes (KB):
500 MB = 500 × 1,024 = 512,000 KB

#### 2 Terabytes (TB) to Gigabytes (GB):
2 TB = 2 × 1,024 = 2,048 GB

#### 1 Megabyte (MB) to Bytes (B):
1 MB = 1,048,576 B

## Significance and Impact of High or Low QPS and DAU in System Design

In system design, high or low QPS (Queries Per Second) and DAU (Daily Active Users) have different meanings and impacts:

### QPS (Queries Per Second)
QPS represents the number of query requests a system can handle per second.

#### High QPS
- **Meaning**: High QPS means the system needs to handle a large number of concurrent requests. This requires the system to have high throughput, low latency, and high availability.
- **Impact**:
  - **Server Resources**: Requires more servers, load balancing, and a distributed architecture to handle high concurrency.
  - **Database Design**: Needs optimized database queries, use of caching, and possibly sharding or NoSQL databases.
  - **Network Bandwidth**: Requires higher network bandwidth to handle large data transfers.

#### Low QPS
- **Meaning**: Low QPS means the system handles fewer concurrent requests, thus requiring fewer resources.
- **Impact**:
  - **Server Resources**: Lower resource demand, can use fewer servers and a simpler architecture.
  - **Database Design**: Less pressure on database queries, can use traditional relational databases without complex optimizations.
  - **Network Bandwidth**: Lower network bandwidth demand.

### DAU (Daily Active Users)
DAU represents the number of unique users who use the system daily.

#### High DAU
- **Meaning**: High DAU means the system has a large number of active users, leading to significant data interaction and storage requirements daily.
- **Impact**:
  - **User Management**: Requires efficient user management systems to ensure data security and privacy.
  - **Data Storage**: Needs large-capacity storage systems for user data, with backup and recovery mechanisms.
  - **User Experience**: Needs system performance optimization to ensure a smooth user experience even under high load.

#### Low DAU
- **Meaning**: Low DAU means the system has fewer active users, resulting in lower data interaction and storage requirements.
- **Impact**:
  - **User Management**: Lower demand for user management, can use simpler systems.
  - **Data Storage**: Lower storage requirements, can use smaller-scale storage systems.
  - **User Experience**: User experience is generally not affected under low load, reducing the need for extensive optimization.

### Summary
In system design, high QPS and high DAU typically mean the system needs to have high scalability, reliability, and performance. The system must handle a large number of concurrent requests and data interactions while ensuring data security and a good user experience. In contrast, systems with low QPS and low DAU are relatively simple, with lower requirements for resources and architecture, allowing for simpler design and technical solutions.

## Scenarios of QPS and DAU in different levels 
### High QPS and Low DAU
This scenario means that each user performs very frequent operations, leading to a high number of concurrent requests, but the overall number of users is low. For example, active traders in a financial trading system.

- **Meaning**:
  - The system needs high concurrency handling capability, but user management and storage requirements are relatively low.
  - It requires very efficient request processing and response mechanisms to ensure low latency.

- **Impact**:
  - **Server Resources**: Requires powerful servers and load balancing mechanisms to handle high concurrent requests.
  - **Database Design**: Needs optimized query performance, possibly using caching mechanisms to reduce database pressure.
  - **Application Architecture**: Needs to design efficient APIs and backend services to support high-frequency requests.

### Low QPS and High DAU
This scenario means that the system has a large number of active users, but each user performs operations less frequently. For example, user browsing behavior on a large e-commerce platform.

- **Meaning**:
  - The system needs to handle a large amount of user data and storage requirements, but the number of concurrent requests is relatively low.
  - It requires ensuring data security and user privacy protection.

- **Impact**:
  - **User Management**: Requires efficient user management systems to handle a large amount of user information and identity verification.
  - **Data Storage**: Needs large capacity storage systems and ensures data high availability and redundancy backup.
  - **Application Architecture**: Needs to design user-centric systems, ensuring the accuracy and efficiency of data processing.

### Specific Application Scenarios for High QPS and Low DAU
- **Financial Trading Systems**: A few users frequently trading, requiring fast processing of numerous trade requests.
- **Online Game Servers**: A few players online at the same time, but sending numerous game state update requests per second.

### Specific Application Scenarios for Low QPS and High DAU
- **Large E-commerce Websites**: Numerous users browsing products, but each user's browsing request frequency is low.
- **Online Education Platforms**: Numerous students accessing the platform, but each student's interaction frequency is low.

### Design Strategies
- **High QPS and Low DAU**:
  - Optimize concurrency handling capability, using high-performance servers and load balancing.
  - Use caching and optimized database queries.
  - Design high-performance APIs and backend services.

- **Low QPS and High DAU**:
  - Focus on user management and data storage, ensuring data security and high availability.
  - Use distributed storage systems and backup mechanisms.
  - Design user-friendly systems and efficient data processing mechanisms.

### an example-- Ticket Master Product Architect Design: Envelope Estimation and Corresponding Strategies

| Envelope Estimate                | Strategy Keywords                                           |
|----------------------------------|-------------------------------------------------------------|
| **High QPS (100,000 QPS)**        | **Microservices Architecture**, **Horizontal Scaling**, **Caching (Redis, Memcached)**, **Load Balancing** |
| **Low QPS**                       | **Simple Architecture**, **Minimal Caching**, **Basic Load Balancing** |
| **High DAU (10 million users)**   | **High Availability**, **Horizontal Scaling**, **Data Sharding**, **Real-Time Updates**, **Scalable Storage** |
| **Low DAU**                      | **Simpler Infrastructure**, **Basic Data Storage**, **Standard Monitoring** |
| **Long Session Duration (15 min)**| **Session Management**, **Performance Optimization**, **Efficient Data Handling**, **Session Caching** |
| **Short Session Duration**        | **Lightweight Transactions**, **Quick Load Times**, **Minimal Processing** |
| **Large Data Storage (100 TB/month)** | **Data Warehousing**, **NoSQL Databases (MongoDB, Cassandra)**, **Data Compression**, **Scalable Storage Solutions** |
| **Small Data Storage**            | **Traditional Databases**, **Basic Storage Solutions**, **Simple Backup Strategies** |
| **High Network Bandwidth (1 Gbps)** | **CDN Usage**, **Load Balancers**, **Efficient Data Transfer Protocols**, **High-Speed Networking** |
| **Low Network Bandwidth**         | **Data Optimization**, **Reduced Content Delivery Needs**, **Efficient Compression** |
| **Low Latency (< 100ms)**         | **Fast Data Access**, **Real-Time Processing**, **Optimized Queries**, **Efficient Caching** |
| **High Latency**                  | **Caching Strategies**, **Asynchronous Processing**, **Optimized Data Transfer**, **Load Balancing** |

 