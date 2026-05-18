 
Hello everyone.
Today I’d like to walk through how to design an **Event Tracking System**.

An event tracking system may look like simple click logging.

But in production, it is really a high-throughput data pipeline.

It collects user actions and system events, validates them, stores raw events durably, and turns them into analytics, dashboards, funnels, attribution, experiments, and product insights.

The core question is:

**How do we collect large volumes of events reliably, while keeping data accurate, private, and cost-efficient?**

**(PPT 1: Title Slide — Design Event Tracking System)**

When I think about Event Tracking System design, I usually break it down into five parts.

First, event generation and SDK design.
Second, event schema and validation.
Third, ingestion pipeline and durable event log.
Fourth, stream processing, batch processing, and storage.
And finally, deduplication, late events, privacy, scaling, failure handling, and observability.

The main trade-off is:

**accuracy vs latency vs cost.**

Real-time dashboards can usually be eventually consistent.
But consent, privacy, deletion requests, experiment assignment, and billing-related events require stronger correctness.

**(PPT 2: Core Framework)**

Let’s start with the core events.

An event represents something that happened.

For example, a user viewed a page.
A user clicked a product.
A user searched for an item.
A user signed up.
A user started checkout.
A user completed a purchase.

Events can come from web clients, mobile apps, and backend services.

The system should support both single event uploads and batch event uploads.

Batching is important because client SDKs may buffer events and send them together to reduce network overhead.

The key idea is:

**Event tracking turns user behavior into structured data for analytics and decision-making.**

**(PPT 3: Core Events and APIs)**

Next is the event schema.

A good event should include a unique event ID, event name, user ID if available, anonymous ID, event timestamp, server received timestamp, properties, and context.

Properties describe the event itself.

For example, for a product click, properties may include product ID, category, and surface.

Context describes the environment.

For example, device type, app version, browser, IP address, or user agent.

Schema is critical because bad event data can break downstream analytics.

I would use a schema registry to define allowed event names, required fields, property types, schema versions, and deprecation rules.

The key idea is:

**Good analytics starts with good event schema.**

**(PPT 4: Event Schema and Validation)**

Now let’s talk about the client SDK.

The SDK is important because many events are generated at the edge.

The SDK should generate event IDs, attach user and device context, buffer events locally, batch uploads, retry failures with backoff, and respect user consent.

For mobile apps, the SDK must handle offline mode, limited battery, and limited network.

For web apps, the SDK should avoid blocking page navigation.

If the page closes before events are sent, the SDK should use browser-friendly mechanisms when possible.

Most importantly, event tracking should never slow down the user experience.

The key idea is:

**The SDK should collect events reliably, but never block the product experience.**

**(PPT 5: Client SDK Design)**

Next is the ingestion pipeline.

When an event reaches the collector, the collector should authenticate the source, apply rate limits, validate the schema, normalize timestamps, add a received timestamp, enrich context when needed, and filter based on consent rules.

Then the collector writes the event to a durable event log, such as Kafka, Pulsar, or Kinesis.

Once the event is durably written, the collector can return success.

Heavy processing should happen asynchronously.

This keeps ingestion fast and scalable.

The key idea is:

**Collectors should do lightweight validation, then write events to a durable log as quickly as possible.**

**(PPT 6: Ingestion Pipeline)**

Now let’s discuss deduplication and ordering.

Event systems should assume duplicates will happen.

Duplicates can come from client retries, network timeouts, SDK resends, collector retries, or stream processor retries.

That is why every event should have a unique event ID.

The pipeline can use short-term dedupe caches, persistent dedupe tables for critical events, and idempotent downstream writes to avoid double-counting.

Ordering is also not guaranteed.

For example, a purchase event may arrive before an add-to-cart event if the client was offline.

So I would store both event time and received time.

Event time tells us when the action happened.
Received time tells us when the server received it.

For analytics, stream processors can use watermarks and allowed lateness windows to handle delayed events.

The key idea is:

**Events can be duplicated, delayed, and out of order, so the system must design for that from the beginning.**

**(PPT 7: Deduplication and Late Events)**

Next is stream processing and batch processing.

Stream processing powers near-real-time use cases.

For example, live dashboards, real-time alerts, experiment metrics, fraud detection, operational monitoring, and personalization.

A stream processor consumes events from the durable log, deduplicates them, aggregates them by time window, and writes results to a real-time analytics store.

Batch processing is used for more reliable historical analytics.

For example, daily reporting, long-term attribution, sessionization, retention analysis, model training, data quality checks, and backfills.

Raw events should be stored durably in object storage.

This is important because if a downstream pipeline has a bug, we can replay raw events and rebuild analytics tables.

The key idea is:

**Stream processing gives freshness. Batch processing gives accuracy and replayability.**

**(PPT 8: Stream and Batch Processing)**

Now let’s talk about storage.

I would use multiple storage systems because one database cannot serve all needs well.

Raw events should go to object storage.

They should be partitioned by date, hour, event name, or source.

This gives cheap, durable, long-term storage and makes replay possible.

Real-time aggregates should go to a low-latency analytics store, such as ClickHouse, Druid, Pinot, or Elasticsearch.

This supports fast dashboards and time-range queries.

Curated historical tables should go to a data warehouse, such as BigQuery, Snowflake, Hive, or Redshift.

This supports reporting, ad hoc SQL, attribution, and machine learning.

The key idea is:

**Raw storage is for durability, real-time stores are for speed, and warehouses are for historical analytics.**

**(PPT 9: Storage Design)**

Finally, let’s talk about privacy, scaling, failure handling, and observability.

Event tracking can easily collect sensitive data.

Events may contain user IDs, IP addresses, device IDs, location, email, payment metadata, or other sensitive signals.

So the system must enforce consent, data minimization, PII redaction, encryption, access control, audit logs, retention policies, and user deletion support.

We should not allow arbitrary personal data inside event properties.

For scaling, I would batch events at the client, write to a durable event log, separate real-time and batch paths, partition raw storage by time and event type, and enforce schemas with a registry.

For failure handling, clients should buffer and retry.

Collectors should rate limit and write to a durable queue.

Invalid events should go to a dead-letter queue.

Raw events should be stored so downstream jobs can replay or backfill.

For observability, I would monitor event ingestion QPS, collector latency, collector error rate, queue lag, duplicate event rate, invalid event rate, late event rate, stream processing lag, raw storage failures, warehouse load latency, and data freshness.

**(PPT 10: Privacy, Scaling, Failure Handling, and Closing Insight)**

To summarize.

An event tracking system is not just logging clicks.

It is a high-throughput analytics data pipeline.

SDKs generate and batch events.
Collectors validate and enrich events.
A durable event log provides buffering and replay.
Stream processing powers near-real-time analytics.
Batch processing powers reliable historical analytics.
Raw event storage enables replay and backfill.
Schema validation and privacy controls protect data quality and user trust.

The final insight is:

**An event tracking system is the data foundation for analytics, experimentation, attribution, personalization, and product decisions.**

Thank you.
