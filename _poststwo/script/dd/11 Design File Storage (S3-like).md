 
Hello everyone.
Today I’d like to walk through how to design an **S3-like File Storage System**.

At first glance, file storage sounds like a normal file system.

But S3-like storage is different.

It is an object storage system designed to store massive amounts of data with very high durability, high availability, scalable capacity, and strong access control.

The core question is:

**How do we store huge amounts of object data durably and cost-effectively, while supporting upload, download, listing, security, and lifecycle management at scale?**

**(PPT 1: Title Slide — Design File Storage)**

When I think about S3-like storage design, I usually break it down into five parts.

First, the core object model: buckets, objects, and keys.
Second, upload, download, delete, and list flows.
Third, metadata and object data separation.
Fourth, partitioning, replication, durability, and multipart upload.
And finally, consistency, security, lifecycle policies, cost control, and observability.

The main trade-off is:

**durability vs availability vs cost vs latency.**

**(PPT 2: Core Framework)**

Let’s start with the core concepts.

An S3-like system is built around three ideas: bucket, object, and key.

A bucket is a namespace.

For example, one bucket may store user photos, another bucket may store logs, and another may store backups.

An object is the actual stored data, plus metadata.

It includes the object content, object key, size, checksum, content type, version ID, and storage class.

The object key may look like a file path, such as a photo path organized by year and month.

But internally, this is not a traditional hierarchical file system.

It is usually a flat key-value object store, and prefixes are mainly used for organization and listing.

The key idea is:

**S3-like storage is based on buckets and objects, not folders and files.**

**(PPT 3: Bucket, Object, and Key)**

Now let’s look at the main APIs.

The system needs APIs to create buckets, upload objects, download objects, delete objects, and list objects by prefix.

For large files, it should also support multipart upload.

The upload API receives binary file content and metadata such as content type, content length, and checksum.

The download API returns the object data.

The list API returns objects under a prefix, with pagination.

Multipart upload is especially important for large files.

Instead of uploading a huge file in one request, the client can split it into parts, upload parts independently, and then complete the upload.

The key idea is:

**Small objects can be uploaded directly, but large objects need multipart upload for reliability and performance.**

**(PPT 4: Main APIs and Multipart Upload)**

Next is the data model.

I would separate metadata from object data.

Metadata includes bucket information, object key, version ID, size, checksum, content type, storage class, status, permissions, and physical location.

The actual object bytes are stored separately on distributed storage nodes.

For large objects, the data is split into chunks.

Each chunk has its own chunk ID, chunk index, size, checksum, and storage node locations.

This separation is very important.

Metadata needs fast lookup, listing, permission checks, and version management.

Object data needs durable, scalable, and cost-efficient storage.

The key idea is:

**Metadata tells us what the object is and where it lives. Storage nodes hold the actual bytes.**

**(PPT 5: Metadata and Object Data Separation)**

Now let’s discuss the high-level architecture.

The request first goes to an API Gateway.

The gateway handles routing, authentication, rate limiting, and TLS termination.

Then the Auth Service checks whether the user can access the bucket or object.

The Metadata Service manages bucket metadata, object metadata, version information, and prefix listing.

The Storage Coordinator chooses storage nodes, splits large objects into chunks, verifies checksums, and coordinates replication.

Storage Nodes store the actual object chunks and serve reads.

Background workers handle repair, garbage collection, lifecycle transitions, expired object deletion, and incomplete multipart cleanup.

The key idea is:

**The metadata layer controls object identity. The storage layer controls durable bytes.**

**(PPT 6: High-Level Architecture)**

Now let’s walk through the upload flow.

The client uploads an object.

The API Gateway authenticates the request.

The Metadata Service validates the bucket and permissions.

The Storage Coordinator chooses healthy storage nodes.

Then the object data is written to storage nodes.

The system verifies checksums to make sure the data was not corrupted.

After the object data is safely stored and replicated, the Metadata Service commits the object metadata.

Only then does the system return success to the client.

This ordering matters.

If metadata is committed before data is durable, we may create metadata that points to missing or incomplete data.

The key idea is:

**Commit metadata only after object data is safely stored.**

**(PPT 7: Upload Flow)**

Now let’s look at the download flow.

The client requests an object.

The system authenticates the request and checks permissions.

Then the Metadata Service fetches object metadata.

The Storage Coordinator uses metadata to locate object chunks.

Storage nodes return the data, and the system streams it back to the client.

For large objects, I would also support range reads.

Range reads allow the client to request only part of a file.

This is useful for video streaming, resumable downloads, large file access, and partial reads.

The key idea is:

**Download is metadata lookup plus streaming data from storage nodes.**

**(PPT 8: Download Flow and Range Read)**

Next is durability and replication.

Object storage must assume disks, nodes, racks, and even availability zones can fail.

The simple approach is replication.

For example, store each object chunk on three different storage nodes.

Replicas should be placed across different disks, nodes, racks, or availability zones.

Replication is simple and gives fast reads and recovery, but it has high storage cost.

For large cold objects, we can use erasure coding.

Instead of storing full copies, the system splits data into data blocks and parity blocks.

This reduces storage cost while still tolerating failures.

But erasure coding is more complex and recovery can be slower.

The key idea is:

**Replication is simple and fast. Erasure coding is cheaper but more complex.**

**(PPT 9: Replication and Durability)**

Finally, let’s talk about listing, security, lifecycle, and failure handling.

Listing objects is a metadata query.

A bucket may contain billions of objects, so listing must be paginated.

The system should use metadata indexes sorted by bucket and key, and support cursor-based pagination.

Security is critical.

I would support bucket policies, object-level permissions, IAM-style access control, temporary credentials, and pre-signed URLs.

Pre-signed URLs are useful when we want to allow temporary upload or download without exposing permanent credentials.

Data should be encrypted in transit and at rest, with integration to a key management service.

Lifecycle policies help control cost.

For example, frequently accessed objects stay in standard storage, older objects move to infrequent access, and rarely used objects move to archive storage.

Background workers enforce these rules asynchronously.

For failure handling, the system should use checksum validation, background repair, retry failed multipart parts, fail over to replicas, and use cross-region replication for disaster recovery.

Observability is also essential.

We should monitor upload latency, download latency, metadata query latency, storage node health, replication lag, disk utilization, checksum failures, lifecycle job lag, hot partitions, and cost by bucket or tenant.

**(PPT 10: Security, Lifecycle, Failure Handling, and Closing Insight)**

To summarize.

An S3-like storage system is a distributed object store.

The core abstraction is bucket, object, and key.

Metadata is stored separately from object data.

Uploads write object data first, verify checksums, replicate data, and then commit metadata.

Downloads read metadata, locate chunks, and stream data back to the client.

Multipart upload supports large files and efficient retries.

Replication and erasure coding provide durability.

Security, lifecycle policies, and storage classes help control access and cost.

The final insight is:

**S3-like storage is not a traditional file system.
It is a highly durable, distributed object storage system built around buckets, objects, metadata, and scalable storage nodes.**

Thank you.
