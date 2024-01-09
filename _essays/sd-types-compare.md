---
layout: essay_single
title: System Design Compare
date: 2024-01-09
tags:
  - System Design
categories:
- Notes
feature_text: |
  ## System Design Compare
  Post by ailswan Jan. 09, 2024
feature_image: "https://picsum.photos/2560/600?image=865"
---

### System Design Compare 

| Criteria                  | Read-Heavy System      | Write-Heavy System     | Celebrated Call System |
|---------------------------|------------------------|------------------------|------------------------|
| **Data Access Pattern**   | Emphasizes frequent    | Focuses on frequent     | Highlights a specific  |
|                           | read operations        | write operations       | high-impact call       |
| **Example Technologies**  | Content Delivery       | Logging and Analytics  | Payment Processing     |
|                           | Networks (CDNs)        | Systems                | Systems                |
| **Optimizations**         | Caching, Indexing,     | Sharding, Replication, | Caching, Load Balancing,|
|                           | Load Balancing         | Load Balancing         | Rate Limiting          |
| **Scalability Concerns**  | Horizontal Scaling     | Vertical Scaling       | Vertical Scaling       |
|                           | (Adding more servers)  | (Upgrading hardware)   | (Optimizing for the    |
|                           |                        |                        | celebrated call)       |
| **Data Consistency**       | Eventual Consistency   | Strong Consistency     | May vary based on      |
|                           |                        |                        | specific requirements  |
| **Concurrency Handling**  | Optimistic Concurrency | Pessimistic            | May require careful    |
|                           | Control, Locking       | Locking, Transactions   | handling based on      |
|                           |                        |                        | the nature of the call  |
| **Examples of Systems**   | Social Media Feeds,    | Transactional          | Real-time Chat,         |
|                           | News Aggregators       | Databases              | Video Streaming        |
|                           |                        |                        |                        |


| Criteria                    | Search-Intensive System | Messaging System         | Geographically Distributed System | Event-Driven System     |
|-----------------------------|-------------------------|--------------------------|-----------------------------------|------------------------|
| **Data Access Pattern**     | Emphasizes search       | Focuses on messaging and | Spreads data and workload across  | Reacts to events and   |
|                             | operations              | communication            | multiple locations               | triggers processing    |
| **Example Technologies**    | Search Engines (e.g.,   | Message Brokers (e.g.,   | Content Delivery Networks (CDNs), | Event Sourcing,        |
|                             | Elasticsearch)          | RabbitMQ, Kafka          | Global Load Balancers             | Apache Kafka, AWS Kinesis|
| **Optimizations**           | Indexing, Caching       | Message Queue            | Data Replication, Anycast Routing | Asynchronous Processing|
|                             | Load Balancing          | Load Balancing           | Content Mirroring                |                        |
| **Scalability Concerns**    | Horizontal Scaling      | Horizontal Scaling       | Horizontal Scaling               | Horizontal Scaling     |
|                             | (Adding more servers)   | (Adding more servers)    | (Adding more servers)            | (Adding more servers)  |
| **Data Consistency**         | Eventually Consistent   | Eventual Consistency     | Consistency Models based on      | Eventual Consistency   |
|                             |                        |                          | Specific Use Cases               |                        |
| **Concurrency Handling**    | Optimistic Concurrency  | Concurrent Processing,  | Multi-Region Locking, Conflict   | Event Sourcing,        |
|                             | Control, Caching        | Message Queues           | Resolution Strategies            | Distributed Transactions|
| **Examples of Systems**     | Search Engines (e.g.,   | Real-time Chat,           | Multi-Datacenter Systems,        | IoT Platforms,         |
|                             | Google Search)          | Notifications Systems    | Cloud-based Applications        | Streaming Analytics    |
|                             |                        |                          |                                   | Systems                |



 