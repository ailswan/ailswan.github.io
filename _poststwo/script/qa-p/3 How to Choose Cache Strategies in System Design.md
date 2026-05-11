
## 🎯 Opening

Hello everyone.
Today I’d like to walk through **how to choose cache strategies in system design**.

Caching is one of the most effective ways to improve performance.
But it also introduces a fundamental challenge — **cache consistency**.

So the real question is not just *how to cache*,
but **how to balance consistency, latency, and system complexity**.

(scroll to framework)

---

## 🎯 1. Core Framework

When thinking about cache strategies,
I usually break it down into four common patterns:

First, **cache-aside**.
Second, **write-through**.
Third, **write-back**.
And fourth, **read-through caching**.

Each of these strategies represents a different trade-off
between **consistency, performance, and complexity**.

Let’s go through them one by one.

---

## 🧱 2. Cache Aside (Lazy Loading)

(scroll to cache-aside)

Let’s start with **cache-aside**,
which is the most commonly used pattern.

In this model, the application manages the cache explicitly.

For reads:
it first checks the cache,
and on a cache miss, queries the database and populates the cache.

(scroll to write)

For writes:
it updates the database first,
and then invalidates the cache.

(scroll to benefit)

The benefit is simplicity and flexibility.
The cache only stores **hot data**,
and integrates well with existing architectures.

(scroll to tradeoff)

But the trade-off is **inconsistency during the update window**,
and additional latency on cache misses.

(scroll to takeaway)

So the key idea is:
**Cache-aside optimizes for simplicity and read-heavy workloads.**

---

## 🔄 3. Write Through Cache

(scroll to write-through)

Next is **write-through caching**.

In this model,
all writes go through the cache first,
and the cache synchronously updates the database.

(scroll to benefit)

This guarantees that the cache is always consistent with the database.
So reads are always fast and predictable.

(scroll to tradeoff)

But the downside is higher write latency,
because every write must update both layers.

(scroll to takeaway)

So the key idea is:
**Write-through prioritizes consistency, at the cost of write performance.**

---

## ⚡ 4. Write Back (Write Behind)

(scroll to write-back)

Now let’s look at **write-back caching**.

Here, writes are stored in the cache first,
and flushed to the database asynchronously.

(scroll to benefit)

This removes the database from the critical path,
which gives you **very high write throughput**.

(scroll to tradeoff)

But it introduces durability risks.
If the cache fails before persistence,
data can be lost.

(scroll to takeaway)

So the key idea is:
**Write-back maximizes write performance, but sacrifices durability.**

---

## 🗄️ 5. Read Through Cache

(scroll to read-through)

Finally, **read-through caching**.

In this model,
the application only talks to the cache.

On a cache miss,
the cache itself loads data from the database.

(scroll to benefit)

This simplifies application logic
and centralizes cache management.

(scroll to tradeoff)

But it requires more complex cache infrastructure
and can be harder to debug.

(scroll to takeaway)

So the key idea is:
**Read-through centralizes caching logic, but increases system complexity.**

---

## ⚡ 6. Choosing the Right Strategy

(scroll to decision)

So how do we choose?

If the system is **read-heavy**,
cache-aside is usually the default.

If **strong consistency** is required,
write-through is a better choice.

If the system is **write-heavy**,
and can tolerate some data loss,
write-back becomes attractive.

If you want to **standardize caching across services**,
read-through can simplify application logic.

(scroll to insight)

In practice,
most systems combine multiple strategies.

---

## 🧠 7. Summary

(scroll to summary)

To summarize.

Cache-aside is simple and widely used.
Write-through ensures consistency.
Write-back optimizes write throughput.
Read-through centralizes cache logic.

Choosing the right strategy
depends on **read-write patterns and consistency requirements**.

---

## ⭐ 8. Closing Insight

(scroll to closing)

To conclude.

In large-scale systems,
cache consistency is rarely strict.

Instead,
the goal is to **minimize the inconsistency window**,
while maximizing performance and scalability.

Caching is not just about making things faster —
it’s about **making the system scalable without breaking correctness**.

Thank you.

---

# 🎤 中文讲稿（缓存策略）

---

## 🎯 开场

大家好。
今天我们来聊一聊，在系统设计中如何选择**缓存策略**。

缓存确实可以极大提升性能，
但它同时也带来了一个核心问题 —— **缓存一致性**。

所以关键不只是“如何用缓存”，
而是**如何在一致性、性能和复杂度之间做权衡**。

---

## 🎯 1. 核心框架

在思考缓存策略时，我通常会分成四种常见模式：

第一，Cache Aside
第二，Write Through
第三，Write Back
第四，Read Through

这四种策略本质上是对
**一致性、性能和复杂度**的不同取舍。

---

## 🧱 2. Cache Aside

先看 **Cache Aside（旁路缓存）**。

这是最常见的一种模式。

读流程是：

先查缓存 → miss → 查数据库 → 写入缓存

写流程是：

先更新数据库 → 再删除缓存

优点是：

* 简单
* 灵活
* 只缓存热点数据

但问题是：

* 更新过程中可能有短暂不一致
* cache miss 会增加延迟

👉 核心结论：
**Cache Aside 适合读多写少，是默认选择。**

---

## 🔄 3. Write Through

再看 **Write Through**。

写请求先写缓存，
再同步写数据库。

优点是：

* 缓存和数据库始终一致
* 读非常稳定

缺点是：

* 写延迟增加

👉 核心结论：
**Write Through 用性能换一致性。**

---

## ⚡ 4. Write Back

再看 **Write Back（Write Behind）**。

写请求先写缓存，
再异步写数据库。

优点是：

* 写入性能极高
* 数据库压力小

缺点是：

* cache 挂了可能丢数据

👉 核心结论：
**Write Back 用一致性换性能。**

---

## 🗄️ 5. Read Through

最后是 **Read Through**。

应用只访问缓存，
cache miss 时由缓存系统自动加载数据。

优点是：

* 应用逻辑简单
* 缓存逻辑集中

缺点是：

* 基础设施复杂
* 调试困难

👉 核心结论：
**Read Through 用架构复杂度换统一性。**

---

## ⚡ 6. 如何选择

那实际怎么选？

* 读多写少 → Cache Aside
* 强一致性 → Write Through
* 写多 → Write Back
* 平台化 → Read Through

但现实中通常是**组合使用**。

---

## 🧠 7. 总结

总结一下：

Cache Aside → 默认方案
Write Through → 强一致
Write Back → 高写入性能
Read Through → 架构统一

核心是看：

👉 **读写比例 + 一致性要求**

---

## ⭐ 8. 结尾思考

最后总结一句：

在大规模系统中，
缓存一致性通常不是“强一致”，
而是**尽量缩小不一致窗口**。

缓存的本质，
不是单纯提升性能，
而是在保证正确性的前提下，让系统能够扩展。

谢谢大家。

---

# 🧠 Cache 深挖面试追问合集（Staff级）
 
# 1️⃣ Cache Consistency & Double Delete

## ❓面试官会问

> 如何解决 cache 和 database 不一致问题？
> 为什么需要 double delete？

---

## ✅ 标准回答（可背）

Cache inconsistency usually happens during concurrent updates.

For example,
one request updates the database and deletes the cache,
while another request reads stale data and repopulates the cache.

To mitigate this, we often use **delayed double delete**:

1. Delete cache
2. Update database
3. Sleep for a short period
4. Delete cache again

This reduces the chance of stale data being written back into the cache.

---

## 🔥 加分点（一定说）

* “This doesn’t guarantee strong consistency, but minimizes the inconsistency window.”
* Mention **eventual consistency model**
* 可以补一句：

👉 “For stronger guarantees, we may use distributed locks or versioning.”

---

# 2️⃣ Cache Stampede（缓存击穿）

## ❓面试官会问

> What is cache stampede and how to prevent it?

---

## ✅ 标准回答

Cache stampede happens when a hot key expires,
and many requests hit the database simultaneously.

To prevent this:

* Use **mutex lock** to ensure only one request rebuilds the cache
* Use **request coalescing**
* Add **randomized TTL** to avoid synchronized expiration
* Use **stale-while-revalidate** to serve stale data temporarily

---

## 🔥 加分点

👉 “The key idea is to protect the database from sudden traffic spikes.”

---

# 3️⃣ Cache Avalanche（雪崩）

## ❓面试官会问

> What is cache avalanche?

---

## ✅ 标准回答

Cache avalanche happens when a large number of keys expire at the same time,
causing a massive spike in database traffic.

Solutions include:

* Add **TTL jitter** (random expiration)
* Use **multi-level caching**
* Pre-warm cache
* Use **rate limiting** or circuit breakers

---

## 🔥 加分点

👉 “Avalanche is a system-wide failure, while stampede is usually key-level.”

---

# 4️⃣ Cache Penetration（穿透）

## ❓面试官会问

> What is cache penetration?

---

## ✅ 标准回答

Cache penetration happens when requests query **non-existent data**,
which is not cached, so every request hits the database.

Solutions:

* Cache null values
* Use **Bloom filters**
* Input validation

---

## 🔥 加分点

👉 “Bloom filter helps reject invalid requests before hitting DB.”

---

# 5️⃣ Hot Key Problem

## ❓面试官会问

> How do you handle hot keys?

---

## ✅ 标准回答

Hot keys are keys with extremely high access frequency,
which can overload a single cache node.

Solutions include:

* Key sharding (split into multiple keys)
* Local cache (per instance)
* Replication
* CDN for static data

---

## 🔥 加分点

👉 “Hot key is essentially a load imbalance problem.”

---

# 6️⃣ Cache Eviction Strategy（Redis）

## ❓面试官会问

> How do you choose eviction policy?

---

## ✅ 标准回答

Common eviction strategies include:

* LRU → remove least recently used
* LFU → remove least frequently used
* TTL-based expiration

Choice depends on workload:

* LRU works well for recency-based access
* LFU works better for stable hot keys

---

## 🔥 加分点

👉 “In practice, LFU is often better for long-term hot data patterns.”

---

# 7️⃣ Write Strategy Trade-off（核心追问）

## ❓面试官会问

> Why not always use write-through or write-back?

---

## ✅ 标准回答

Because each strategy optimizes different aspects:

* Write-through ensures consistency but increases latency
* Write-back improves write throughput but risks data loss

So the choice depends on:

* Consistency requirements
* Write latency tolerance
* Failure tolerance

---

## 🔥 加分点

👉 “There is no universally best strategy — only trade-offs.”

---

# 8️⃣ Multi-Level Cache（进阶）

## ❓面试官会问

> When do you use multi-level cache?

---

## ✅ 标准回答

Multi-level caching is used to reduce latency and distribute load:

* L1: local in-memory cache (fast, per instance)
* L2: distributed cache (shared, Redis)
* L3: CDN / edge cache

This improves performance and reduces pressure on each layer.

---

## 🔥 加分点

👉 “It also helps mitigate hot key and stampede problems.”

---

# 9️⃣ Cache vs DB Source of Truth

## ❓面试官会问

> Which is the source of truth?

---

## ✅ 标准回答

The database is always the source of truth.

Cache is a derived layer used for performance optimization.

---

## 🔥 加分点

👉 “We should design cache to tolerate inconsistency, not eliminate it completely.”

---

# 🔟 Final Staff-Level Summary（终极收尾）

👉 面试最后你可以这样总结（非常加分）：

**English:**

Cache design is fundamentally about trade-offs.

We balance:

* consistency
* latency
* scalability

And instead of aiming for strict consistency,
we focus on minimizing inconsistency windows
while protecting the system from overload.

---

**中文：**

缓存设计本质上是权衡问题：

* 一致性
* 延迟
* 扩展性

在大规模系统中，我们通常不会追求强一致，
而是尽量缩小不一致窗口，同时保护系统不被流量击垮。

 