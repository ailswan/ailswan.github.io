 
---

# 🎬 🎤 English YouTube Script

## CAP Theorem in System Design

---

## 🎯 Opening

Hello everyone.
Today I’d like to walk through **the CAP theorem in distributed systems**.

CAP is one of the most fundamental concepts,
but also one of the most misunderstood.

Because in practice,
it’s not just a theory —
it’s a **decision framework under failure**.

(scroll to framework)

---

## 🎯 1. Core Framework

When I think about CAP,
I usually break it down into four aspects:

First, **what CAP actually means in real systems**.
Second, **the trade-off between consistency and availability**.
Third, **how it maps to user-facing requirements**.
And finally, **how real systems implement these trade-offs**.

---

## 🧱 2. What CAP Actually Means

(scroll to definition)

CAP stands for:

* **Consistency** — all nodes see the same data
* **Availability** — every request gets a response
* **Partition tolerance** — the system continues despite network failures

---

(scroll to insight)

But here’s the key insight:

👉 **Partition is not optional.**

In any real distributed system,
network failures will happen.

---

(scroll to takeaway)

So the real decision is not between C, A, and P.

👉 It’s between **Consistency and Availability when partition happens**.

---

## 🔄 3. Consistency vs Availability

(scroll to CP)

Let’s start with **CP systems**.

These systems prioritize consistency.

If the system cannot guarantee correct data,
it may reject or delay requests.

(scroll to example)

For example,
in a payment system,
it’s better to reject a transaction
than to process an incorrect one.

(scroll to takeaway)

So the key idea is:
**CP systems fail by becoming unavailable.**

---

(scroll to AP)

Now let’s look at **AP systems**.

These systems prioritize availability.

They always respond,
even if the data may be stale.

(scroll to example)

For example,
in a social feed,
it’s acceptable to show slightly outdated content.

(scroll to takeaway)

So the key idea is:
**AP systems fail by returning inconsistent data.**

---

## ⚡ 4. Mapping CAP to User Requirements

(scroll to user)

Here’s the most important part.

CAP is not a system-level choice —
it’s a **per-use-case decision**.

---

(scroll to payments)

For example, **payments**:

We must choose consistency.
It’s better to fail than to be wrong.

---

(scroll to feed)

For **social feeds**:

We prefer availability.
Users tolerate stale data, but not downtime.

---

(scroll to profile)

For **user profiles**:

We often use a hybrid approach —
ensuring read-your-writes consistency
while allowing eventual consistency globally.

---

(scroll to takeaway)

So the key idea is:
**different parts of the system make different CAP decisions.**

---

## ⚡ 5. Failure Scenarios

(scroll to partition)

Let’s look at what happens during failures.

First, **network partition**.

CP systems may reject requests.
AP systems continue serving requests but may diverge.

---

(scroll to split-brain)

Second, **split-brain scenarios**.

Two nodes accept writes independently.

CP systems prevent this via leader election.
AP systems allow it and resolve conflicts later.

---

(scroll to divergence)

Third, **data divergence**.

In AP systems,
replicas may temporarily disagree.

We resolve this with:

* last-write-wins
* versioning
* CRDTs

---

(scroll to takeaway)

So the key idea is:
**failures reveal the true behavior of your system.**

---

## ⚡ 6. Real-world Design Patterns

(scroll to hybrid)

In practice,
most systems are **hybrid**.

---

(scroll to pattern1)

We use:

* **CP for critical paths**
* **AP for scalable paths**

---

(scroll to leader)

Leader-based systems enforce consistency.
Eventually consistent systems prioritize availability.

---

(scroll to multi-region)

In multi-region systems,
we often use:

* strong consistency within a region
* eventual consistency across regions

---

(scroll to takeaway)

So the key idea is:
**real systems combine CAP trade-offs at different layers.**

---

## 🧠 7. Summary

(scroll to summary)

To summarize.

CAP is not about choosing a system type.
It’s about deciding **how your system behaves under failure**.

CP systems ensure correctness.
AP systems ensure availability.

---

## ⭐ 8. Closing Insight

(scroll to closing)

To conclude.

The best systems don’t eliminate trade-offs.

👉 They make them explicit
👉 And align them with user expectations

Because in the end,

👉 **system design is about choosing the right failure mode.**

Thank you.

---

# 🎤 中文讲稿（CAP 定理）

---

## 🎯 开场

大家好。
今天我们来聊一聊，在分布式系统中非常核心的一个概念 —— **CAP 定理**。

很多人觉得 CAP 是一个理论，
但实际上它更重要的是：

👉 **在系统发生故障时，你如何做决策。**

---

## 🎯 1. 核心框架

我通常从四个角度来理解 CAP：

第一，它在真实系统中的含义
第二，一致性 vs 可用性
第三，用户需求如何映射
第四，实际系统怎么设计

---

## 🧱 2. CAP 的本质

CAP 包括：

* C：一致性
* A：可用性
* P：分区容错

但最关键的一点是：

👉 **P 是无法避免的**

网络分区一定会发生。

---

👉 所以真正的问题是：

**在发生分区时，你选择 C 还是 A**

---

## 🔄 3. 一致性 vs 可用性

先看 **CP 系统**：

如果无法保证一致性，
就拒绝请求。

👉 核心：

**宁可失败，也不能错**

---

再看 **AP 系统**：

始终返回结果，
即使数据可能是旧的。

👉 核心：

**宁可不一致，也不能停机**

---

👉 总结一句：

* CP → 不可用
* AP → 不一致

---

## ⚡ 4. 用户需求映射

最重要的一点：

👉 **CAP 不是系统级选择，而是业务级选择**

---

例如：

### 支付系统

必须 CP
宁可失败也不能错

---

### 社交 Feed

可以 AP
用户能接受延迟

---

### 用户资料

通常是混合

👉 自己读自己写 → 强一致
👉 别人看 → 最终一致

---

👉 核心结论：

**不同模块可以做不同选择**

---

## ⚡ 5. 故障场景

几个关键场景：

### 网络分区

* CP：拒绝请求
* AP：继续但可能不一致

---

### 脑裂（split brain）

* AP：允许冲突
* CP：禁止

---

### 数据分歧

解决：

* last-write-wins
* version
* CRDT

---

👉 核心结论：

**故障决定系统真实行为**

---

## ⚡ 6. 实际系统

现实中：

👉 几乎都是混合架构

* 关键路径 → CP
* 非关键 → AP

例如：

* 同区域 → 强一致
* 跨区域 → 最终一致

---

## 🧠 7. 总结

总结一下：

CAP 本质不是选系统，
而是：

👉 **系统在失败时如何表现**

---

## ⭐ 8. 结尾思考

最后总结一句：

优秀的系统设计，
不是消除权衡，

而是：

👉 **明确权衡，并让它符合用户预期**

因为本质上：

👉 **系统设计就是选择失败方式**

谢谢大家。

---
 