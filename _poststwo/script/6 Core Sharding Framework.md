  
---

# 🎬 🎤 English YouTube Script

## Core Sharding Framework in System Design

---

## 🎯 Opening

Hello everyone.
Today I’d like to walk through **how to think about sharding in system design**.

Sharding is often introduced as a way to scale databases.
But in reality, it’s not just about distributing data.

It’s about **distributing load in a way that matches how your system is used**.

(scroll to framework)

---

## 🎯 1. Core Framework

When thinking about sharding strategies,
I usually break it down into three dimensions:

First, **data distribution strategy** — hash, range, or geo.
Second, **query patterns and access locality**.
And third, the **trade-offs between scalability, hotspots, and operational complexity**.

Let’s go through them one by one.

---

## 🧱 2. Hash vs Range vs Geo Sharding

(scroll to hash)

Let’s start with **hash-based sharding**.

In this model,
we use a hash function on the shard key,
for example, `hash(user_id) % N`.

(scroll to benefit)

This gives us **even data distribution**,
which helps avoid hotspots
and makes it ideal for high write throughput systems.

(scroll to limitation)

But it has limitations.

It does not support range queries well,
and it’s difficult to optimize for data locality.

(scroll to takeaway)

So the key idea is:
**Hash sharding optimizes for balance, but sacrifices query flexibility.**

---

(scroll to range)

Next is **range-based sharding**.

Here, data is partitioned based on value ranges,
such as time or alphabetical ranges.

(scroll to benefit)

This makes range queries very efficient,
and improves data locality.

(scroll to limitation)

However, it introduces hotspot risks —
for example, recent data receiving most of the traffic.

(scroll to takeaway)

So the key idea is:
**Range sharding optimizes for query efficiency, but risks uneven load.**

---

(scroll to geo)

Finally, **geo-based sharding**.

This partitions data by geographic regions,
such as US, EU, or APAC.

(scroll to benefit)

It reduces latency by placing data closer to users,
and helps with data residency requirements.

(scroll to limitation)

But it complicates cross-region queries
and consistency management.

(scroll to takeaway)

So the key idea is:
**Geo sharding optimizes for locality, but increases system complexity.**

---

## 🔄 3. Query Patterns & Access Locality

(scroll to patterns)

Now let’s talk about a critical principle.

Sharding strategy must align with **query patterns**,
not just data size.

(scroll to examples)

* Hash works best for **point lookups**, like `get(user_id)`
* Range works best for **ordered queries**, like time-series
* Geo works best for **location-based access**

(scroll to anti-pattern)

A mismatch leads to serious issues.

For example:

* Using hash sharding for range queries → full scatter-gather
* Using range sharding for hot writes → overloaded shard

(scroll to takeaway)

So the key idea is:
**access patterns should drive your sharding strategy.**

---

## ⚡ 4. Trade-offs & Real System Design

(scroll to hotspot)

One major challenge is **hotspots**.

* Range sharding → recent partition becomes hot
* Geo sharding → one region dominates traffic

Solutions include:

* adding random suffix (salting)
* splitting hot shards
* adaptive rebalancing

---

(scroll to resharing)

Another challenge is **re-sharding**.

* Hash requires consistent hashing
* Range requires splitting and merging
* Geo requires data migration

---

(scroll to cross-shard)

And then there are **cross-shard queries**.

These are expensive,
because they require fan-out and aggregation.

We usually mitigate this with:

* pre-aggregation
* secondary indexes
* data duplication

---

(scroll to hybrid)

In practice,
we rarely use a single strategy.

Instead, we combine them.

For example:

* Geo → then hash within region
* Range → then hash within partitions

(scroll to takeaway)

So the key idea is:
**real systems use hybrid sharding to balance load and query efficiency.**

---

## 🧠 5. Summary

(scroll to summary)

To summarize.

Hash sharding ensures even distribution.
Range sharding enables efficient queries.
Geo sharding improves latency and compliance.

The right choice depends on
**how your data is accessed, not just how much data you have.**

---

## ⭐ 6. Closing Insight

(scroll to closing)

To conclude.

Sharding is not a one-time decision.

As traffic patterns evolve,
your sharding strategy must evolve as well.

The hardest part is not choosing a strategy —
it’s **adapting it without breaking the system**.

Thank you.

---

# 🎤 中文讲稿（分片设计）

---

## 🎯 开场

大家好。
今天我们来聊一聊，在系统设计中如何理解**分片（Sharding）**。

很多人觉得分片就是“把数据拆开”，
但实际上更重要的是：

👉 **按照系统的访问方式去分配负载。**

---

## 🎯 1. 核心框架

在思考分片时，我通常从三个维度来看：

第一，数据分布方式（Hash / Range / Geo）
第二，查询模式和访问局部性
第三，扩展性、热点和复杂度的权衡

---

## 🧱 2. 三种分片策略

先看 **Hash 分片**。

通过 hash(user_id) 来均匀分布数据。

优点是：

* 分布均匀
* 不容易出现热点
* 适合高写入系统

但问题是：

* 不支持范围查询
* 不适合做数据局部优化

👉 核心结论：
**Hash 解决均匀性，但牺牲查询能力。**

---

再看 **Range 分片**。

按照时间或区间分片。

优点是：

* 支持范围查询
* 数据局部性好

但问题是：

* 容易产生热点（比如最新数据）

👉 核心结论：
**Range 提升查询效率，但容易不均衡。**

---

再看 **Geo 分片**。

按地区分布数据。

优点是：

* 延迟低
* 满足数据合规

但问题是：

* 跨区查询复杂
* 一致性难

👉 核心结论：
**Geo 优化用户体验，但增加系统复杂度。**

---

## 🔄 3. 核心原则

最重要的一点是：

👉 **分片必须匹配查询模式，而不是数据规模。**

例如：

* Hash → 点查
* Range → 时间查询
* Geo → 地理查询

反例：

* Hash + range query → 全库扫描
* Range + 热写 → 单分片爆

---

## ⚡ 4. 实际问题与解决

常见问题是：

👉 **热点（Hotspot）**

解决方案：

* 加随机后缀
* 拆分热点分片
* 动态扩容

还有：

👉 **跨分片查询**

解决：

* 预聚合
* 冗余数据

---

现实系统中：

👉 几乎都是混合方案

* Geo → Hash
* Range → Hash

---

## 🧠 5. 总结

总结一下：

Hash → 均匀分布
Range → 查询能力
Geo → 延迟与合规

核心不是选哪个，
而是：

👉 **是否匹配访问模式**

---

## ⭐ 6. 结尾思考

最后总结一句：

分片不是一次性的设计，
而是一个**持续演进的过程**。

真正的难点不是选策略，
而是：

👉 **在不影响系统的情况下不断调整分片策略。**

谢谢大家。

--- 