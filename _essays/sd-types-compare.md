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

### System Design Compare 1

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

---

### System Design Compare 2


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


---

| Criteria                  | Peer-to-Peer System     | Data Warehousing System  | Real-time Collaborative System   | Content Distribution System | Recommendation System    |
|---------------------------|-------------------------|--------------------------|----------------------------------|-----------------------------|--------------------------|
| **Data Access Pattern**   | Decentralized data      | Analytical queries       | Simultaneous editing and updates | Efficient content delivery | User-specific suggestions |
|                           | sharing, minimal        | and reporting            | from multiple users             | and replication            | based on preferences      |
|                           | reliance on central     |                         |                                  |                             |                          |
|                           | servers                 |                         |                                  |                             |                          |
| **Example Technologies**  | BitTorrent, Blockchain  | Amazon Redshift, Google   | Google Docs, Office 365          | Content Delivery Networks  | Netflix, Spotify, Amazon  |
|                           |                         | BigQuery, Snowflake      |                                 |                             | Recommendations          |
| **Optimizations**         | Distributed hash        | Query optimization,      | Conflict resolution algorithms,  | Caching, Load Balancing    | Collaborative filtering,  |
|                           | table, Merkle trees      | Data partitioning        | Operational transforms          | Peer-to-peer protocols    | Machine learning models   |
|                           |                         |                         |                                  |                             |                          |
| **Scalability Concerns**  | Horizontal Scaling,     | Horizontal Scaling       | Scalability for concurrent      | Content replication,      | Scalability based on user |
|                           | Fault Tolerance         |                         | edits                            | Load Balancing            | base and data volume      |
|                           |                         |                         |                                  |                             |                          |
| **Data Consistency**       | Eventual Consistency,   | Consistency models       | Operational transformations,    | Consistent Hashing         | Personalized experiences  |
|                           | Merkle-Dag Consistency   | based on use case        | Conflict resolution            |                             | based on the latest data  |
|                           |                         |                         |                                  |                             |                          |
| **Concurrency Handling**  | Distributed Locking,    | Parallel processing,     | Operational transforms, CRDTs   | Multi-level caching,      | Collaborative filtering,  |
|                           | Consensus algorithms    | Batch processing         | (Conflict-Free Replicated Data)  | Concurrent request handling| Real-time updates          |
|                           |                         |                         |                                  |                             |                          |
| **Examples of Systems**   | BitTorrent, Bitcoin     | Amazon Redshift, Google   | Google Docs, Figma, Slack        | Content Delivery Networks  | Netflix Recommendations,|
|                           |                         | BigQuery                 |                                 | Akamai, Cloudflare         | Amazon Personalize       |
|                           |                         |                         |                                 |                             |                          |

---

### System Design Compare 3


| Criteria                  | Internet of Things (IoT) System | Video Streaming System     | Online Gaming System        | Healthcare Information System | Fault-Tolerant System      |
|---------------------------|----------------------------------|----------------------------|-----------------------------|---------------------------------|---------------------------|
| **Data Access Pattern**   | Continuous data streams from      | On-demand video content,   | Real-time player interactions| Patient records, medical data   | Redundancy, Error Handling |
|                           | IoT devices, Sensor data          | live streaming events      | and synchronization          | monitoring, diagnostics         | and Recovery               |
|                           |                                 |                            |                             |                                 |                           |
| **Example Technologies**  | MQTT, CoAP, Azure IoT Hub         | YouTube, Netflix, Hulu     | Multiplayer platforms like   | Electronic Health Record (EHR)  | Replication, Load Balancing|
|                           |                                 |                            | Xbox Live, PlayStation      | systems, Health Information     |                           |
|                           |                                 |                            | Network                     | Exchanges (HIE), Health IoT      |                           |
| **Optimizations**         | Data compression, Edge            | Adaptive Bitrate Streaming,| Latency optimization,        | Data encryption, Access Control | Distributed consensus     |
|                           | computing, Stream processing      | Content Delivery Networks,| Load balancing,              | Mechanisms, Authentication      |                           |
|                           |                                 | Caching, Load Balancing   | Sharding                     | and Authorization                |                           |
| **Scalability Concerns**  | Horizontal Scaling,               | Horizontal Scaling         | Dynamic scaling based on     | Scalability for patient data,    | Load Balancing,           |
|                           | Scalability for device            | (Adding more servers for   | concurrent players          | High availability, Scalability  | Replication               |
|                           | communication and data storage    | increased demand)          |                             | for medical data                |                           |
|                           |                                 |                            |                             |                                 |                           |
| **Data Consistency**       | Eventual Consistency              | Consistency based on        | Consistency models for        | Strong Consistency,             | Consensus Algorithms       |
|                           |                                 | streaming protocols         | real-time gameplay           | Healthcare standards            |                           |
|                           |                                 |                            |                             |                                 |                           |
| **Concurrency Handling**  | Optimistic Concurrency Control,  | Concurrent streaming        | Distributed game state       | Versioning, Transactional       | Rollback Strategies        |
|                           | Conflict Resolution for IoT       | with chunked encoding       | synchronization              | Processing                     |                           |
| **Examples of Systems**   | Smart Home Automation,            | Netflix, Twitch, YouTube   | Fortnite, PUBG, World of     | Electronic Health Record (EHR),  | Google Cloud Spanner,     |
|                           | Industrial IoT applications,      | Live, Hulu Live             | Warcraft                     | Health Information Exchanges    | Amazon DynamoDB           |
|                           | Wearables, Environmental Sensors  |                             |                             |                                 |                           |

---

| Criteria                  | Chat Application System | Social Networking System  | Distributed File System  | Data Analytics System   | Location-Based Services System |
|---------------------------|-------------------------|---------------------------|--------------------------|-------------------------|--------------------------------|
| **Data Access Pattern**   | Real-time messaging and  | User posts, comments,     | File reads and writes    | Large-scale data        | User location tracking,        |
|                           | notification delivery    | friend requests           | and storage              | processing, querying    | geofencing, mapping            |
|                           |                         |                           |                          |                         |                                |
| **Example Technologies**  | WhatsApp, Slack,         | Facebook, Twitter,        | Hadoop Distributed File  | Apache Spark, HBase,    | Google Maps API,               |
|                           | Telegram                | Instagram, LinkedIn       | System (HDFS), Google     | Amazon S3, Elasticsearch| Foursquare                      |
|                           |                         |                           | File System (GFS)        |                         |                                |
| **Optimizations**         | Message indexing,        | Content caching,          | Distributed data         | Query optimization,     | Caching, Load Balancing,        |
|                           | Compression, Push        | Friend recommendation,    | replication,              | Parallel processing,    | Geographical load distribution |
|                           | notifications            | Sharding, Load Balancing  | Fault tolerance          | Data partitioning       |                                |
|                           |                         |                           |                          |                         |                                |
| **Scalability Concerns**  | Horizontal Scaling,      | Horizontal Scaling        | Horizontal Scaling       | Horizontal Scaling     | Horizontal Scaling             |
|                           | Load Balancing           | (Adding more servers)     | (Adding more servers)    | (Adding more servers)  | (Adding more servers)          |
|                           |                         |                           |                          |                         |                                |
| **Data Consistency**       | Eventual Consistency,    | Consistency models        | Consistency based on      | Eventual Consistency   | Consistency based on            |
|                           | Operational transforms   | based on social network   | replication and           | and Distributed        | distributed transactions       |
|                           |                         | use cases                  | consensus                | Processing              |                                |
| **Concurrency Handling**  | Optimistic Concurrency   | Concurrent processing,    | Distributed locking,     | Distributed            | Concurrency control,           |
|                           | Control, Conflict         | Locking, Transactions      | Versioning, Conflict      | Transactions, Isolation | Distributed Transactions       |
|                           | Resolution               | Resolution                | Resolution               |                         |                                |
| **Examples of Systems**   | WhatsApp, Slack,         | Facebook, Twitter,        | Hadoop Distributed File  | Apache Spark,           | Google Maps, Foursquare         |
|                           | Telegram                | Instagram, LinkedIn       | System, Google File       | HBase                   |                                |
|                           |                         |                           | System                   |                         |                                |



 