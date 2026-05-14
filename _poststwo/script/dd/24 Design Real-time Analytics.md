 Below is the **10-page PPT natural English voiceover script** for **Design Real-time Analytics**, ready to read directly. 

---

Hello everyone.
Today I’d like to walk through how to design a **Real-time Analytics System**.

A real-time analytics system may look like a dashboard that updates quickly.

But behind the scenes, it is a streaming data pipeline.

It needs to ingest events continuously, process them in near real time, aggregate metrics over time windows, and serve dashboards and alerts with low latency.

The core question is:

**How do we provide fresh analytics quickly, while keeping the results accurate, scalable, and cost-efficient?**

**(PPT 1: Title Slide — Design Real-time Analytics)**

When I think about Real-time Analytics design, I usually break it down into five parts.

First, event ingestion.
Second, the durable event stream.
Third, stream processing and windowed aggregation.
Fourth, real-time storage and dashboard serving.
And finally, late events, deduplication, backfill, alerting, scaling, and observability.

The main trade-off is:

**latency vs accuracy vs cost.**

Fresh dashboards are useful, but very low latency can mean incomplete data.
More accurate results often require waiting longer or correcting data later.

**(PPT 2: Core Framework)**

Let’s start with the core flow.

Events are produced by clients, backend services, or infrastructure systems.

For example, a user completes a purchase, a request fails, or a service reports latency.

These events are sent to an event collector.

The collector validates the event, adds server receive time, enriches it with metadata, and writes it to a durable event stream.

A stream processor consumes events from that stream, performs aggregation, and writes the results into a real-time analytics store.

Dashboards and alerting systems then query the analytics store.

The key idea is:

**Real-time analytics is a streaming pipeline from events to aggregates to dashboards.**

**(PPT 3: End-to-End Flow)**

Now let’s talk about the main APIs.

The first API is event ingestion.

This allows clients or backend services to send events into the system.

The second API is metric query.

This allows dashboards to query metrics such as purchase count, error rate, active users, or p95 latency.

The third API is alert rule creation.

This allows users to define rules like: trigger an alert if error rate is above five percent for five minutes.

The important point is that ingestion and query paths have different requirements.

Ingestion needs high throughput and durability.

Dashboard queries need low latency and fast aggregation.

The key idea is:

**Ingestion is write-heavy. Dashboards are read-optimized.**

**(PPT 4: APIs and Requirements)**

Next is the ingestion pipeline.

The collector should only do lightweight work.

It should validate the schema, normalize timestamps, add received time, enrich with metadata, and write the event to a durable stream such as Kafka, Pulsar, or Kinesis.

Once the event is durably written, the collector can return success.

Heavy computation should not happen in the collector.

Why?

Because collectors are on the write path.

If they do too much work, ingestion latency increases, and the system becomes harder to scale.

The key idea is:

**Collectors should validate quickly, write durably, and push heavy work downstream.**

**(PPT 5: Event Ingestion)**

Now let’s discuss the durable event stream.

A durable stream is the backbone of the system.

It buffers traffic spikes.

It decouples producers from processors.

It supports replay when downstream systems fail.

It also allows multiple consumers to process the same event stream independently.

For example, one consumer may compute dashboard metrics.

Another consumer may evaluate alerts.

Another consumer may write raw events to object storage.

Partitioning is important.

We can partition by tenant, event type, customer ID, user ID, or metric key, depending on access patterns and processing needs.

The key idea is:

**A durable event stream gives the system buffering, replayability, and fault isolation.**

**(PPT 6: Durable Event Stream)**

Next is stream processing.

Stream processors continuously consume events and transform them into useful metrics.

They parse events, filter invalid data, deduplicate events, handle late arrivals, join reference data, compute aggregates, and write results to a real-time store.

For example, they may compute purchases per minute by region.

They may compute error rate by service.

They may compute active users in the last five minutes.

They may also compute p95 latency by endpoint.

The key idea is:

**Stream processing turns raw events into continuously updated metrics.**

**(PPT 7: Stream Processing)**

Now let’s talk about windowed aggregation.

Most real-time analytics questions are time-window based.

For example:

How many orders happened in the last five minutes?
What is the error rate over the last fifteen minutes?
What is the p95 latency by endpoint over the last hour?

There are different types of windows.

A tumbling window is fixed and non-overlapping.

For example, one window from 10:00 to 10:05, then another from 10:05 to 10:10.

A sliding window overlaps.

For example, the last five minutes, updated every minute.

A session window groups activity by gaps.

For example, start a new session after thirty minutes of inactivity.

The key idea is:

**Windowed aggregation is the core of real-time metrics.**

**(PPT 8: Windowed Aggregation)**

Next is late events and deduplication.

In real systems, events may arrive late.

A mobile app may be offline.

The network may be slow.

A client may retry.

A stream processor may restart.

So every event should include both event time and received time.

Event time tells us when the action happened.

Received time tells us when the server received it.

To handle late events, stream processors can use watermarks and allowed lateness windows.

For example, the system may accept events up to five minutes late.

Very late events can be sent to a correction or backfill pipeline.

Duplicates are also normal.

Clients may retry events after a timeout.

Collectors may retry writes.

Processors may reprocess events.

So every event should have a unique event ID.

The system can use deduplication caches, idempotent writes, and transactional stream processing when available.

The key idea is:

**Real-time analytics should aim for exactly-once effect, even if delivery is at-least-once.**

**(PPT 9: Late Events and Deduplication)**

Finally, let’s talk about storage, dashboards, alerts, scaling, and failure handling.

Dashboards should not query raw events directly.

Raw events are too large and too expensive to scan for every dashboard refresh.

Instead, dashboards should query a real-time OLAP store.

Systems like Pinot, Druid, or ClickHouse are good examples because they support fast time-range queries, group-by queries, high write throughput, and columnar compression.

Raw events should also be stored in object storage.

Why?

Because raw events allow replay, backfill, correction, auditing, and new metric creation.

If a stream processing bug is discovered, we can reprocess raw events and rebuild the aggregates.

For dashboards, I would use pre-aggregations, rollups, caching, and limits on high-cardinality group-bys.

High-cardinality dimensions are dangerous.

Fields like user ID, request ID, session ID, order ID, or IP address can create too many groups.

That increases memory usage, slows queries, and raises cost.

Alerts can be built on top of the same real-time metrics.

The stream processor computes the metric, a rule evaluator checks the condition, and the notification system sends the alert.

The alerting system should support deduplication, cooldown windows, grouping, silencing, and alert state tracking.

For failure handling, the system should be replayable.

If stream processing fails, replay from Kafka.

If aggregates are wrong, rebuild from raw events.

If dashboards time out, return cached or degraded data.

If a schema deployment breaks the pipeline, roll it back and route bad events to a dead-letter queue.

For observability, I would monitor ingestion QPS, collector latency, queue lag, stream processing lag, watermark delay, late event rate, duplicate event rate, OLAP write latency, dashboard query latency, data freshness, alert delay, and dead-letter queue volume.

**(PPT 10: Storage, Alerts, Scaling, and Closing Insight)**

To summarize.

A real-time analytics system is not just querying fresh data.

It is a streaming aggregation and serving platform.

Events are collected by collectors.

A durable event stream provides buffering and replay.

Stream processors aggregate metrics over time windows.

A real-time OLAP store serves dashboards and alerts.

Raw events are stored for replay, backfill, and correction.

Late events and duplicates are expected, so the system needs watermarks, deduplication, idempotent writes, and correction pipelines.

The final insight is:

**Real-time analytics is about providing fresh, reliable, low-latency metrics through streaming aggregation, OLAP serving, and replayable raw data.**

Thank you.
