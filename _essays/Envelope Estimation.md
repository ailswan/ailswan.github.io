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


## Storage calculation

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


## latency table for transaction times for 10MB data
| Operation            | Latency (ms) |
|----------------------|--------------|
| Read from Cache      | 1-5          |
| Read from Database   | 10-50        |
| Network Roundtrip    | 50-200       |
| External API Call    | 100-500      |
| Complex Calculation  | 10-1000      |
