 
---

# 🎬 🎤 English YouTube Script

## Exactly-once vs At-least-once Delivery — What Really Matters

---

## 🎯 Opening

Hello everyone.
Today I’d like to walk through **delivery guarantees in distributed systems**.

You’ve probably heard terms like:

* at-least-once
* exactly-once

But here’s the real question:

👉 **What happens when messages are duplicated or lost?**

Because in distributed systems,
both scenarios are inevitable.

---

## 🎯 1. Core Framework

When I think about delivery semantics,
I usually break it down into four aspects:

First, **what these guarantees actually mean**.
Second, **the trade-offs between at-least-once and exactly-once**.
Third, **failure scenarios and their implications**.
And finally, **real-world implementation patterns**.

---

## 🧱 2. What Delivery Guarantees Really Mean

(scroll to definition)

Let’s define the two models.

---

### At-least-once

Messages are guaranteed to be delivered,
but may be delivered multiple times.

---

### Exactly-once

Each message is processed once —
no duplicates, no loss.

---

(scroll to insight)

But here’s the key insight:

👉 **Exactly-once is not a messaging feature —
it’s an end-to-end system guarantee.**

---

(scroll to takeaway)

So the key idea is:
**delivery semantics must be designed across the entire system.**

---

## 🔄 3. At-least-once vs Exactly-once

(scroll to at-least)

Let’s start with **at-least-once delivery**.

---

### Strengths

* simple
* scalable
* avoids data loss

---

### Limitations

* duplicate messages
* requires idempotent processing

---

(scroll to takeaway)

👉 **At-least-once trades duplication for simplicity and reliability.**

---

(scroll to exactly)

Now let’s look at **exactly-once delivery**.

---

### Strengths

* no duplicates
* strong correctness guarantees

---

### Limitations

* high complexity
* coordination overhead
* performance impact

---

(scroll to takeaway)

👉 **Exactly-once trades simplicity for stronger guarantees.**

---

## ⚡ 4. Failure Scenarios (Critical)

(scroll to scenario1)

### Scenario 1: Consumer crashes after processing

Message is processed,
but not acknowledged.

---

👉 Result:

* system retries
* duplicate processing

---

(scroll to scenario2)

### Scenario 2: Acknowledged before processing

Message is acknowledged too early.

---

👉 Result:

* failure → message lost

---

(scroll to scenario3)

### Scenario 3: Network failure during commit

System is unsure
whether processing succeeded.

---

👉 Result:

* ambiguity → duplicates or loss

---

(scroll to insight)

👉 Key insight:

**You must handle either duplicates,
or risk data loss,
or add coordination complexity.**

---

## ⚡ 5. Real-world Implementation Patterns

(scroll to idempotent)

### Pattern 1: Idempotent Consumer (Most Common)

Process messages safely even if duplicated.

---

(scroll to dedup)

### Pattern 2: Deduplication

Store processed message IDs
to ignore duplicates.

---

(scroll to transaction)

### Pattern 3: Transactional Processing

Process message + update state atomically.

---

(scroll to kafka)

### Pattern 4: Kafka Exactly-once

* idempotent producer
* transactional consumer

---

(scroll to outbox)

### Pattern 5: Outbox Pattern

Avoid dual-write problems
between DB and message queue.

---

(scroll to takeaway)

👉 The key idea is:
**exactly-once is achieved through multiple coordinated techniques.**

---

## 🧠 6. Summary

(scroll to summary)

To summarize.

At-least-once:

* simple
* reliable
* but may duplicate

Exactly-once:

* correct
* but complex and expensive

---

## ⭐ 7. Closing Insight

(scroll to closing)

To conclude.

Exactly-once is not about eliminating duplicates.

👉 It’s about ensuring
duplicates do not break correctness.

And in practice,

👉 most systems choose at-least-once
with idempotent design.

Because simplicity scales.

Thank you.

---

# 🎤 中文讲稿（Exactly-once vs At-least-once）

---

## 🎯 开场

大家好。
今天我们来聊一聊，在分布式系统中非常关键的一个问题：

👉 **消息投递语义（Delivery Semantics）**

常见有两种：

* At-least-once
* Exactly-once

但核心问题是：

👉 **消息重复或丢失时会发生什么？**

---

## 🎯 1. 核心框架

我通常从四个角度来看：

第一，这两个语义是什么意思
第二，它们的权衡
第三，失败场景
第四，实际实现方式

---

## 🧱 2. 本质理解

At-least-once：

👉 不丢数据，但可能重复

---

Exactly-once：

👉 不重复，也不丢

---

👉 核心洞察：

**Exactly-once 不是 MQ 的能力，而是系统级保证**

---

## 🔄 3. 权衡

At-least-once：

* 简单
* 可扩展
* 需要处理重复

---

Exactly-once：

* 正确性强
* 复杂
* 性能差

---

👉 核心结论：

**一个简单，一个严格**

---

## ⚡ 4. 故障场景

消费者处理完挂掉：

👉 会重复

---

提前 ack：

👉 会丢数据

---

网络问题：

👉 不确定状态

---

👉 核心结论：

**必须在三者中取舍：重复 / 丢失 / 复杂性**

---

## ⚡ 5. 实际方案

常见模式：

* 幂等消费
* 去重
* 事务
* Kafka EOS
* Outbox

---

👉 核心思想：

**多层保证正确性**

---

## 🧠 6. 总结

At-least-once：

👉 简单 + 可扩展

Exactly-once：

👉 正确 + 复杂

---

## ⭐ 7. 结尾思考

最后总结一句：

Exactly-once 的本质，

不是避免重复，

👉 而是：

**让重复不影响结果**

而现实系统中：

👉 **大多数选择 At-least-once + 幂等**

因为：

👉 简单的系统更容易扩展

谢谢大家。

---
 