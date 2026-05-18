

Hello everyone.
Today I’d like to walk through how to design a **Logging System**.

A logging system may look like a place to store application logs.
But in production, it is really a high-throughput data pipeline.

The core question is:

**How do we collect massive amounts of logs, make them searchable quickly, and control storage cost at the same time?**

**(PPT 1: Title Slide — Design Logging System)**

When I think about Logging System design, I usually break it down into five parts.

First, how logs are generated and collected.
Second, the ingestion pipeline.
Third, buffering, queueing, and backpressure.
Fourth, storage, indexing, search, and retention.
And finally, reliability, security, access control, and observability.

The main trade-off is:

**write throughput vs search speed vs storage cost.**

**(PPT 2: Core Framework)**

Let’s start with log collection.

Applications should not synchronously send every log line directly to a central logging service.

That would add latency to the request path, and if the logging service has a problem, it could affect the application.

A better pattern is:

The application writes logs to standard output or a local log file.
A local log agent collects those logs.
The agent buffers them, batches them, enriches them, and sends them to the central pipeline asynchronously.

This is common in production, especially in container or Kubernetes environments.

The key idea is:

**Logging should be decoupled from the application request path.**

**(PPT 3: Log Collection)**

Next is the ingestion pipeline.

A typical flow looks like this:

The application writes logs.
The log agent collects them.
The ingestion gateway receives them.
Then logs go into a durable queue.
Processing workers parse, normalize, enrich, redact, and route them to storage and indexing systems.

The ingestion gateway should handle authentication, rate limiting, schema validation, compression, service tagging, and load shedding when overloaded.

Processing workers are responsible for turning raw logs into searchable, safe, and structured events.

The key idea is:

**Ingestion should be asynchronous, durable, and scalable.**

**(PPT 4: Ingestion Pipeline)**

Now let’s talk about the log data model.

Whenever possible, I would store logs as structured events.

A log event should include fields like timestamp, service name, environment, log level, message, trace ID, host, region, and metadata.

Some fields should be indexed because they are commonly used in queries.

For example, timestamp, service, environment, log level, trace ID, host, and region.

But we should not index everything.

Indexing every field increases write cost, storage cost, and memory usage.

High-cardinality fields, like user ID, request ID, session ID, or order ID, can be useful, but they must be controlled carefully.

The key idea is:

**Store the raw log for completeness, but index only the fields needed for fast search.**

**(PPT 5: Log Data Model and Indexing)**

Next is buffering and backpressure.

This is extremely important because log volume often spikes during incidents.

Ironically, when a system fails, it usually generates even more logs.

So the logging system needs multiple buffering layers.

The log agent should have a local disk buffer.
The ingestion gateway may have a short memory buffer.
A durable queue protects the system from downstream failures.
And storage can have its own write buffer.

If the system is overloaded, we should prioritize important logs.

For example, keep error logs and security logs.
Sample or drop debug logs first.
Apply rate limits per service or tenant.
And slow down non-critical producers if needed.

The key idea is:

**Backpressure protects the logging system during log storms.**

**(PPT 6: Buffering and Backpressure)**

Now let’s discuss storage.

I would separate hot storage from cold storage.

Recent logs should go to hot storage because engineers need fast search during debugging and incident response.

Examples include systems like Elasticsearch, OpenSearch, or ClickHouse.

Older logs should move to cold storage, such as object storage.

Cold storage is cheaper and more durable, but slower to query.

Logs are naturally time-series data, so partitioning by time is very effective.

We can also partition by tenant, service, or environment.

The key idea is:

**Recent logs need fast search. Older logs need cost-efficient retention.**

**(PPT 7: Hot and Cold Storage)**

Now let’s talk about query and search.

Most log queries are time-bound.

For example, an engineer may search for error logs from one service in the last 30 minutes.

So the query service should first narrow by time range.

Then it should filter by service, environment, log level, trace ID, or other indexed fields.

For very large queries, I would limit result size, use cursor-based pagination, or run the query asynchronously.

Real-time log streaming is another important feature.

For example, during a deployment, an engineer may want to tail logs for one service.

This can be implemented with a stream processor, pub/sub, and WebSocket or server-sent events.

The key idea is:

**Log search should start with time filtering, then use indexed fields to reduce the search space.**

**(PPT 8: Query and Real-time Streaming)**

Retention, sampling, and cost control are also critical.

Logging systems can become very expensive.

Not all logs have the same value.

For example, error logs may be kept longer.
Info logs may be kept for a shorter period.
Debug logs may be sampled aggressively or retained only briefly.

A good strategy is to keep recent important logs in hot storage, move older logs to cold storage, compress logs, sample low-value logs, and avoid indexing noisy high-cardinality fields.

The key idea is:

**Cost control is part of the logging system design, not an afterthought.**

**(PPT 9: Retention, Sampling, and Cost Control)**

Finally, let’s talk about reliability, security, and observability.

For failure handling, the system should prioritize raw log durability.

If indexing is delayed, logs should still be stored durably.

If the search index has a problem, we can rebuild it later from raw storage.

If the system is overloaded, we can drop or sample low-priority logs, but we should preserve error logs, security logs, and audit logs.

Security is also critical because logs may contain sensitive data.

The system should redact secrets and personal information, encrypt logs at rest and in transit, enforce role-based access control, isolate tenants, and audit access to production logs.

The logging system itself must also be observable.

We should monitor ingestion rate, queue lag, dropped logs, indexing delay, storage errors, query latency, hot shards, and cost by service or tenant.

**(PPT 10: Reliability, Security, Observability, and Closing Insight)**

To summarize.

A logging system is not just a place to store text.

It is a high-throughput data pipeline for collection, ingestion, buffering, storage, indexing, search, alerting, retention, and access control.

Applications write logs locally.
Agents collect and forward them asynchronously.
Queues protect the pipeline.
Hot storage supports fast search.
Cold storage controls long-term cost.
Indexing makes logs searchable.
Security and observability make the system safe and reliable.

The final insight is:

**A logging system is about reliably collecting massive log volume, making recent logs searchable quickly, and retaining older logs cost-effectively.**

Thank you.
