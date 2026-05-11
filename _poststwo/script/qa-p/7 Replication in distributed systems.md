 
---

# 🎬 🎤 English YouTube Script

## Replication in Distributed Systems

---

## 🎯 Opening

Hello everyone.
Today I’d like to walk through **replication in distributed systems**.

Replication is often introduced as a way to improve reliability.
But in reality, it’s much deeper than that.

It’s about answering a fundamental question:

👉 **When can we say a write is truly durable?**

(scroll to framework)

---

## 🎯 1. Core Framework

When I think about replication,
I usually break it down into four aspects:

First, **synchronous vs asynchronous replication**.
Second, **consistency vs availability trade-offs**.
Third, **failure scenarios**.
And finally, **how real systems combine these approaches**.

Let’s go through them one by one.

---

## 🧱 2. Sync vs Async Replication

(scroll to sync)

Let’s start with **synchronous replication**.

In this model,
a write is only acknowledged
after replicas confirm persistence.

(scroll to benefit)

This guarantees strong consistency and durability.
It’s typically used in systems like financial transactions.

(scroll to limitation)

But it comes with higher latency,
and reduced availability —
because writes depend on replica responsiveness.

(scroll to takeaway)

So the key idea is:
**Sync replication prioritizes correctness over performance.**

---

(scroll to async)

Now let’s look at **asynchronous replication**.

Here, the primary acknowledges the write immediately,
and replicas catch up later.

(scroll to benefit)

This improves latency and availability significantly,
which makes it suitable for large-scale systems.

(scroll to tradeoff)

But it introduces **replication lag**,
and in failure scenarios,
can lead to data loss.

(scroll to takeaway)

So the key idea is:
**Async replication prioritizes performance over durability.**

---

## 🔄 3. Consistency vs Availability (CAP)

(scroll to CAP)

At its core,
this is a **CAP trade-off**.

Synchronous systems lean toward **consistency**,
and may sacrifice availability during failures.

Asynchronous systems lean toward **availability**,
but may serve stale or inconsistent data.

(scroll to read)

This also affects read behavior.

In async systems,
replica lag can cause stale reads.

We often mitigate this by:

* routing critical reads to the primary
* or using session stickiness

(scroll to takeaway)

So the key idea is:
**replication strategy directly impacts both writes and reads.**

---

## ⚡ 4. Failure Scenarios (Critical)

(scroll to failure1)

Let’s look at some failure scenarios.

First, **primary crashes before replication completes**.

In synchronous systems,
this is safe — replicas already have the data.

In asynchronous systems,
this can result in data loss.

---

(scroll to failure2)

Second, **network partition**.

Synchronous systems may block writes,
because they cannot reach replicas.

Asynchronous systems continue writing,
but replicas may diverge.

---

(scroll to failure3)

Third, **replica lag**.

Followers fall behind the leader,
which can lead to stale reads.

We typically handle this with:

* leader reads
* quorum reads
* lag-aware routing

(scroll to takeaway)

So the key idea is:
**sync fails by becoming unavailable,
async fails by becoming inconsistent.**

---

## ⚡ 5. Real-world Hybrid Strategies

(scroll to hybrid)

In practice,
we rarely use pure sync or pure async.

Instead, we combine them.

---

(scroll to quorum)

One approach is **quorum-based replication**.

By ensuring that R + W > N,
we guarantee overlap between reads and writes,
which enables strong consistency.

---

(scroll to semi-sync)

Another approach is **semi-synchronous replication**.

Here, the primary waits for at least one replica
before acknowledging the write.

This improves durability
without the full cost of sync replication.

---

(scroll to multi-region)

In multi-region systems,
we often use:

* synchronous replication within a region
* asynchronous replication across regions

This balances latency, availability, and durability.

---

(scroll to takeaway)

So the key idea is:
**real systems use hybrid strategies to balance trade-offs.**

---

## 🧠 6. Summary

(scroll to summary)

To summarize.

Synchronous replication ensures correctness and durability.
Asynchronous replication improves performance and availability.

The right choice depends on:

* consistency requirements
* latency tolerance
* failure expectations

---

## ⭐ 7. Closing Insight

(scroll to closing)

To conclude.

Replication is not just about copying data —
it’s about defining **when a write is considered durable**.

And the real design decision is:

👉 **how much risk of inconsistency or data loss your system can tolerate.**

That’s what drives the choice.

Thank you.

---

# 🎤 中文讲稿（复制机制）

---

## 🎯 开场

大家好。
今天我们来聊一聊，在分布式系统中如何理解**数据复制（Replication）**。

很多人会觉得复制是为了“高可用”，
但更本质的问题是：

👉 **什么时候我们可以认为一次写入是“真正安全的”？**

---

## 🎯 1. 核心框架

在思考复制时，我通常从四个维度来看：

第一，Sync vs Async
第二，一致性 vs 可用性
第三，故障场景
第四，实际系统中的混合策略

---

## 🧱 2. Sync vs Async

先看 **同步复制（Sync）**。

写请求必须等所有副本确认后才返回。

优点是：

* 强一致
* 高可靠

但问题是：

* 延迟高
* 副本慢就会卡住

👉 核心结论：
**Sync 用性能换正确性。**

---

再看 **异步复制（Async）**。

主节点先返回，
副本后续再同步。

优点是：

* 延迟低
* 可用性高

但问题是：

* 有延迟（lag）
* 故障可能丢数据

👉 核心结论：
**Async 用正确性换性能。**

---

## 🔄 3. 一致性 vs 可用性

本质上，这是一个 **CAP 问题**。

* Sync → 偏一致性
* Async → 偏可用性

同时也影响读：

* 副本可能读到旧数据

解决方法：

* 关键读走主节点
* session stickiness

👉 核心结论：
**复制策略会同时影响读和写。**

---

## ⚡ 4. 故障场景

几个关键场景：

### 主节点挂掉（未同步）

* Sync：安全
* Async：可能丢数据

---

### 网络分区

* Sync：写会卡住
* Async：继续写但可能分裂

---

### 副本延迟

* 读到旧数据

解决：

* 主读
* quorum
* lag-aware routing

👉 核心结论：

**Sync 挂是不可用，
Async 挂是不一致。**

---

## ⚡ 5. 实际系统

现实中：

👉 几乎都是 hybrid

* Quorum
* 半同步
* 跨区 async

例如：

* 同城同步
* 跨区异步

👉 核心目标：

**平衡性能、可用性和正确性**

---

## 🧠 6. 总结

总结一下：

Sync → 强一致
Async → 高性能

选择取决于：

👉 业务对一致性和延迟的要求

---

## ⭐ 7. 结尾思考

最后总结一句：

复制不是简单的数据复制，
而是定义：

👉 **什么时候写入才算“成功”。**

真正的设计难点在于：

👉 **系统可以接受多大的不一致或丢失风险。**

谢谢大家。

---
 