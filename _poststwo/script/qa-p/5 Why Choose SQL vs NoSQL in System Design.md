 
---

# 🎬 🎤 English YouTube Script

## Why Choose SQL vs NoSQL in System Design

---

## 🎯 Opening

Hello everyone.
Today I’d like to walk through **how to choose between SQL and NoSQL in system design**.

This is one of the most common decisions,
but also one of the most misunderstood.

It’s not about which database is better —
it’s about **choosing the right trade-offs for your system**.

(scroll to framework)

---

## 🎯 1. Core Decision Framework

When evaluating SQL vs NoSQL,
I usually break it down into four dimensions:

First, **concurrency and throughput**.
Second, **query complexity**.
Third, **transaction requirements**.
And fourth, **scalability strategy**.

Let’s go through them one by one.

---

## 🧱 2. Concurrency & Throughput

(scroll to SQL)

Let’s start with SQL databases.

SQL systems like PostgreSQL or MySQL
provide strong ACID guarantees
and mature concurrency control mechanisms,
such as MVCC and row-level locking.

(scroll to benefit)

They scale reads well through replicas,
and ensure correctness under concurrent access.

(scroll to limitation)

However, write scalability is often constrained
by a single primary node,
and heavy write workloads can lead to lock contention.

(scroll to takeaway)

So the key idea is:
**SQL is strong in consistency, but limited in write scalability.**

---

(scroll to NoSQL)

Now let’s look at NoSQL.

NoSQL systems are designed for **horizontal scalability from day one**.

They support built-in partitioning and sharding,
and are optimized for **high write throughput**.

(scroll to tradeoff)

But they often rely on **eventual consistency**,
and may require data duplication.

(scroll to takeaway)

So the key idea is:
**NoSQL trades strict consistency for scalability and throughput.**

---

## 🔄 3. Query Complexity

(scroll to SQL query)

SQL databases excel at complex queries.

They support JOINs, aggregations,
subqueries, and window functions,
all powered by mature query optimizers.

(scroll to takeaway)

This makes them ideal for analytics, reporting,
and complex relational models.

---

(scroll to NoSQL query)

In contrast, NoSQL databases
have limited or no JOIN support.

They rely on **denormalized data**,
and require query patterns to be defined in advance.

(scroll to takeaway)

So the key idea is:
**SQL is query-driven, while NoSQL is access-pattern-driven.**

---

## ⚡ 4. Transaction Requirements

(scroll to SQL transaction)

SQL databases provide strong ACID guarantees.

They support multi-row and multi-table transactions,
with strict consistency and reliable rollback.

(scroll to use case)

This is critical for systems like:

* payments
* inventory
* financial transactions

(scroll to takeaway)

So the key idea is:
**SQL is the default choice for correctness-critical systems.**

---

(scroll to NoSQL transaction)

NoSQL systems typically follow a BASE model,
favoring availability and partition tolerance.

Some systems support limited transactions,
but not at the same level as SQL.

(scroll to use case)

They are better suited for:

* social feeds
* logging systems
* telemetry pipelines

(scroll to takeaway)

So the key idea is:
**NoSQL prioritizes availability and scalability over strict consistency.**

---

## ⚡ 5. Scalability Strategy

(scroll to SQL scaling)

SQL databases traditionally scale vertically.

Horizontal scaling is possible,
but sharding introduces significant complexity.

(scroll to limitation)

As the system grows,
operational overhead increases.

---

(scroll to NoSQL scaling)

NoSQL systems, on the other hand,
are built for horizontal scaling.

Partitioning is simpler,
and they fit naturally into distributed architectures.

(scroll to takeaway)

So the key idea is:
**NoSQL is designed for large-scale distributed systems.**

---

## ⚡ 6. Real-World Decision

(scroll to decision)

So how do we choose?

If the system requires:

* strong consistency
* complex queries
* transactional guarantees

→ SQL is usually the better choice.

If the system is:

* write-heavy
* globally distributed
* highly scalable

→ NoSQL becomes more suitable.

(scroll to hybrid)

In practice,
many systems adopt a **hybrid approach**:

SQL for transactional data,
and NoSQL for high-volume or denormalized workloads.

---

## 🧠 7. Summary

(scroll to summary)

To summarize.

SQL excels at correctness and complex queries.
NoSQL excels at scalability and high throughput.

The decision depends on:

* consistency requirements
* query patterns
* workload characteristics

---

## ⭐ 8. Closing Insight

(scroll to closing)

To conclude.

The decision is not about SQL vs NoSQL —
it’s about **choosing the right trade-offs for your system**.

Great system design is not about picking one technology,
but about aligning your data layer
with your business needs and growth trajectory.

Thank you.

---

# 🎤 中文讲稿（SQL vs NoSQL）

---

## 🎯 开场

大家好。
今天我们来聊一聊，在系统设计中如何选择 **SQL 和 NoSQL**。

这是一个非常常见的问题，
但同时也是一个非常容易被误解的问题。

关键不在于哪个数据库更好，
而在于：

👉 **你需要什么样的权衡。**

---

## 🎯 1. 核心框架

在做这个决策时，我通常从四个维度来看：

第一，并发与吞吐
第二，查询复杂度
第三，事务需求
第四，扩展性策略

---

## 🧱 2. 并发与吞吐

先看 SQL。

SQL 提供强 ACID 保证，
并且有成熟的并发控制机制（比如 MVCC）。

优点是：

* 数据一致性强
* 并发安全

但问题是：

* 写扩展受限
* 高写入下可能有锁竞争

👉 核心结论：
**SQL 强在一致性，但写扩展能力有限。**

---

再看 NoSQL。

NoSQL 天然支持水平扩展，
并且优化了高写入吞吐。

但代价是：

* 最终一致性
* 数据冗余

👉 核心结论：
**NoSQL 用一致性换扩展性。**

---

## 🔄 3. 查询复杂度

SQL 支持：

* JOIN
* 聚合
* 窗口函数

👉 非常适合复杂查询和分析

而 NoSQL：

* 不支持或弱支持 JOIN
* 需要反规范化

👉 需要提前设计访问模式

👉 核心结论：
**SQL 面向查询，NoSQL 面向访问模式。**

---

## ⚡ 4. 事务需求

SQL 提供强事务：

* 多表
* 回滚
* 强一致

👉 适合：

* 支付
* 库存
* 金融

NoSQL：

* 通常是最终一致性
* 事务能力有限

👉 适合：

* feed
* 日志
* 监控

👉 核心结论：
**SQL 保证正确，NoSQL 保证可用。**

---

## ⚡ 5. 扩展性

SQL：

* 主要靠垂直扩展
* 分片复杂

NoSQL：

* 天然水平扩展
* 更适合分布式

👉 核心结论：
**NoSQL 更适合大规模系统。**

---

## ⚡ 6. 实际选择

怎么选？

* 强一致 + 复杂查询 → SQL
* 写多 + 大规模 → NoSQL

现实中：

👉 **通常是混合架构**

SQL 处理事务数据
NoSQL 处理高流量数据

---

## 🧠 7. 总结

总结一下：

SQL → 正确性 + 查询能力
NoSQL → 扩展性 + 吞吐

选择取决于：

👉 一致性、访问模式、系统规模

---

## ⭐ 8. 结尾思考

最后总结一句：

SQL vs NoSQL 的问题，
本质不是技术选型，
而是**业务需求驱动的权衡问题**。

优秀的系统设计，
是让数据层和业务增长路径匹配。

谢谢大家。
 