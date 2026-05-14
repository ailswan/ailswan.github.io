下面是 **10 页 PPT 对应的自然英文口播稿**，可以直接念，English-only。内容基于你上传的 Metrics System 设计材料整理。

---

Hello everyone.
Today I’d like to walk through how to design a **Metrics System**.

A metrics system collects numerical measurements from applications and infrastructure.

It helps engineers answer questions like:

How many requests are we serving?
What is the error rate?
What is the p95 latency?
Is CPU or memory usage too high?
Should we trigger an alert?

The core question is:

**How do we collect high-volume time-series data, query it quickly, and control storage cost at scale?**

**(PPT 1: Title Slide — Design Metrics System)**

When I think about Metrics System design, I usually break it down into five parts.

First, how metrics are generated and collected.
Second, the ingestion pipeline.
Third, the time-series data model.
Fourth, aggregation, rollups, storage, and query serving.
And finally, alerting, cardinality control, reliability, security, and observability.

The main trade-off is:

**ingestion throughput vs query latency vs storage cost.**

**(PPT 2: Core Framework)**

Let’s start with the difference between metrics and logs.

Logs are detailed event records.

For example, a log may say: payment failed, with an error message, trace ID, and request details.

Metrics are numerical measurements over time.

For example: request count, error count, latency, CPU usage, memory usage, or queue depth.

So logs are optimized for search and debugging.

Metrics are optimized for aggregation, dashboards, and alerting.

The key idea is:

**Logs explain what happened. Metrics show how the system is behaving over time.**

**(PPT 3: Metrics vs Logs)**

Now let’s talk about metric types.

The first type is a **counter**.

A counter only increases.

Examples include request count, error count, or order created count.

Counters are useful for QPS, throughput, and error rate.

The second type is a **gauge**.

A gauge can go up or down.

Examples include CPU usage, memory usage, queue depth, and active connections.

The third type is a **histogram**.

A histogram tracks a distribution.

It is useful for latency and response size.

For example, histograms help us calculate p50, p95, and p99 latency.

The key idea is:

**Counters measure events, gauges measure current state, and histograms measure distributions.**

**(PPT 4: Metric Types)**

Next is the collection model.

There are three common ways to collect metrics.

The first is the push model.

Applications send metrics directly to the metrics system.

This is simple and works well for short-lived jobs, but it can add complexity to application code.

The second is the pull model.

A metrics collector periodically scrapes application endpoints.

This gives centralized control and is common in Prometheus-style systems.

The third is the agent or sidecar model.

The application emits metrics locally, and a local agent batches, buffers, and forwards them to the metrics pipeline.

At large scale, agents or sidecars are useful because they reduce application complexity and provide buffering.

The key idea is:

**Metrics collection should not make the application request path slower or less reliable.**

**(PPT 5: Collection Model)**

Now let’s discuss the time-series data model.

A time series is identified by the metric name plus its labels.

For example, request count for the payment service, checkout endpoint, and 500 status code is one unique time series.

Each data point has a timestamp and a value.

The most important concept here is **cardinality**.

Cardinality means the number of unique time series.

If we have 100 services, 100 endpoints, and 5 status codes, that already creates 50,000 time series.

If we add user ID or request ID as labels, the number can explode.

That creates high memory usage, high storage cost, slow queries, and ingestion overload.

The key idea is:

**Metric labels are powerful, but high-cardinality labels can destroy the system.**

**(PPT 6: Time-Series Model and Cardinality)**

Next is the ingestion pipeline.

A typical flow is:

Applications or agents emit metrics.
The ingestion gateway receives them.
The gateway validates labels, timestamps, and schema.
Then it sends samples to a queue.
Aggregation workers process the samples.
Finally, the data is written into time-series storage and rollup storage.

The ingestion gateway should handle authentication, rate limiting, label validation, timestamp normalization, compression, and tenant tagging.

Aggregation workers can compute rates, counters, histograms, and time-bucketed rollups.

The key idea is:

**The ingestion pipeline must be high-throughput, buffered, and safe against bad metric producers.**

**(PPT 7: Ingestion Pipeline)**

Now let’s talk about aggregation and rollups.

Raw metrics at high resolution are expensive to keep forever.

For example, keeping one-second resolution for a full year would be very expensive.

So we usually keep raw high-resolution data for a short period.

Then we downsample it into lower-resolution rollups.

For example, we may keep raw metrics for 7 days, one-minute rollups for 30 days, five-minute rollups for 6 months, and one-hour rollups for 2 years.

Common aggregations include sum, average, min, max, count, rate, and percentiles like p95 or p99.

The key idea is:

**Rollups keep historical metrics useful without storing raw data forever.**

**(PPT 8: Aggregation and Rollups)**

Now let’s discuss storage and query serving.

Recent high-resolution metrics should go to hot storage.

Hot storage needs fast writes, fast time-range reads, and efficient compression.

Older rolled-up data can move to cheaper storage.

Metrics queries are usually time-range aggregation queries.

For example, QPS by service over the last hour, p95 latency by endpoint, error rate by region, or CPU usage by host.

The query engine should choose the right resolution.

For recent short windows, use raw data.
For longer historical windows, use rollup data.

To keep queries fast, we should limit high-cardinality group-bys, cache common dashboard queries, and precompute common aggregations.

The key idea is:

**Query serving should use the right resolution for the time range.**

**(PPT 9: Storage and Query System)**

Finally, let’s talk about alerting, reliability, and observability.

Alerting is built on top of metrics.

A rule evaluator periodically checks metric conditions.

For example, if the payment service error rate is above 5 percent for 5 minutes, trigger an alert.

A good alerting system should support thresholds, burn-rate alerts, missing data detection, deduplication, grouping, silence windows, and routing by team or service.

Reliability is also important.

Agents should buffer locally.
Gateways should rate limit bad producers.
Queues should absorb traffic spikes.
If the system is overloaded, it is better to drop low-priority metrics than to impact application traffic.

Security also matters.

Metrics may contain sensitive operational information.

So we need tenant isolation, role-based access control, encryption, audit logs, and label validation to prevent personal information from entering metric labels.

The metrics system itself must also be observable.

We should monitor ingestion throughput, queue lag, dropped samples, active time-series count, cardinality growth, storage latency, query latency, alert evaluation delay, and cost per tenant or service.

**(PPT 10: Alerting, Reliability, Observability, and Closing Insight)**

To summarize.

A metrics system is an aggregation-first time-series platform.

Applications emit counters, gauges, histograms, and timers.
Collectors or agents batch and forward metrics.
The ingestion pipeline validates, buffers, aggregates, and stores samples.
Rollups control long-term storage cost.
The query system powers dashboards.
The alerting system detects production issues.

The final insight is:

**A metrics system is not a general event search system.
It is a high-throughput time-series aggregation system designed for monitoring, dashboards, and alerting at scale.**

Thank you.
