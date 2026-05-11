 

## 🎯 Opening

Hello everyone.
Today I’d like to walk through **rate limiting in system design**.

Most people think rate limiting is just about rejecting requests.

But in reality,
it’s much deeper than that.

👉 It’s a **resource allocation problem under contention**.

And the core trade-off is:

👉 **Fairness vs Throughput**

---

## 🎯 1. Core Framework

When I think about rate limiting,
I usually break it down into four aspects:

First, **what fairness and throughput actually mean**.
Second, **common rate limiting strategies**.
Third, **system design patterns**.
And finally, **advanced trade-offs at scale**.

---

## 🧱 2. Fairness vs Throughput

(scroll to fairness)

Let’s start with **fairness**.

Fairness ensures
that each user gets a reasonable share of resources.

---

(scroll to example)

For example:

* per-user limits
* tenant quotas
* preventing noisy neighbor problems

---

(scroll to throughput)

Now let’s look at **throughput**.

Throughput focuses on
maximizing total system utilization.

---

(scroll to example)

For example:

* allowing requests as long as capacity exists
* avoiding idle resources

---

(scroll to tradeoff)

Here’s the key trade-off:

* Strict fairness → lower utilization
* Max throughput → risk of starvation

---

(scroll to takeaway)

So the key idea is:
**rate limiting is a balance between fairness and efficiency.**

---

## 🔄 3. Common Strategies

(scroll to global)

Let’s start with **global rate limiting**.

All clients share the same quota.

---

(scroll to analysis)

This maximizes throughput,
because no capacity is wasted.

But it has a major issue:

👉 one heavy user can consume everything.

---

(scroll to takeaway)

So the key idea is:
**global limits are efficient but not fair.**

---

(scroll to per-user)

Next is **per-user rate limiting**.

Each user gets a fixed quota.

---

(scroll to analysis)

This ensures fairness and isolation,
but may leave capacity unused
when traffic is uneven.

---

(scroll to takeaway)

So the key idea is:
**per-user limits improve fairness but reduce utilization.**

---

(scroll to weighted)

We can also use **weighted rate limiting**.

For example:

* premium users → higher limits
* free users → lower limits

---

(scroll to takeaway)

So the key idea is:
**rate limiting can align with business priorities.**

---

## ⚡ 4. System Design Patterns

(scroll to centralized)

Let’s look at system design.

First, **centralized rate limiting**,
often implemented with Redis.

---

(scroll to analysis)

This gives strong consistency,
but adds latency
and may become a bottleneck.

---

(scroll to distributed)

Next, **distributed rate limiting**.

Each node enforces limits locally.

---

(scroll to analysis)

This is scalable and low latency,
but less accurate globally.

---

(scroll to hybrid)

So in practice,
we use a **hybrid approach**:

* local enforcement
* periodic global coordination

---

(scroll to takeaway)

So the key idea is:
**we trade perfect accuracy for scalability.**

---

## ⚡ 5. Advanced Trade-offs

(scroll to latency)

Fairness vs latency:

Strict fairness requires coordination,
which increases latency.

---

(scroll to availability)

Fairness vs availability:

Centralized systems may block requests
if the limiter fails.

---

(scroll to protection)

Throughput vs protection:

Too permissive → overload
Too strict → wasted capacity

---

(scroll to multi-tenant)

In multi-tenant systems,
this becomes even more complex.

---

(scroll to insight)

👉 The key insight is:

**rate limiting becomes a distributed scheduling problem.**

---

## 🧠 6. Summary

(scroll to summary)

To summarize.

Fairness ensures isolation.
Throughput ensures efficiency.

Global limits maximize utilization.
Per-user limits ensure fairness.

In real systems,
we combine multiple approaches.

---

## ⭐ 7. Closing Insight

(scroll to closing)

To conclude.

Rate limiting is not just about blocking requests.

👉 It’s about deciding
how to allocate limited resources
across competing users.

And at scale,

👉 it becomes a **distributed scheduling system**.

That’s the real challenge.

Thank you.

---

# 🎤 中文讲稿（限流）

---

## 🎯 开场

大家好。
今天我们来聊一聊，在系统设计中如何理解**限流（Rate Limiting）**。

很多人觉得限流只是“限制请求”，
但实际上更重要的是：

👉 **如何分配系统资源**

---

## 🎯 1. 核心框架

我通常从四个角度来看：

第一，公平性 vs 吞吐量
第二，常见策略
第三，系统设计
第四，规模化权衡

---

## 🧱 2. 公平 vs 吞吐

公平性：

👉 每个用户都有资源

吞吐量：

👉 系统资源最大利用

---

冲突在于：

* 公平 → 可能浪费资源
* 吞吐 → 可能资源被抢占

---

👉 核心结论：

**限流是效率和公平的权衡**

---

## 🔄 3. 常见策略

全局限流：

* 吞吐高
* 不公平

---

用户级限流：

* 公平
* 利用率低

---

权重限流：

* 按业务价值分配

---

👉 核心结论：

**不同策略对应不同目标**

---

## ⚡ 4. 系统设计

集中式：

* 精确
* 有瓶颈

---

分布式：

* 快
* 不精确

---

混合方案：

👉 生产系统主流

---

👉 核心结论：

**用不完美换可扩展性**

---

## ⚡ 5. 高级权衡

公平 vs 延迟
公平 vs 可用性
吞吐 vs 保护

---

👉 核心洞察：

**限流本质是调度问题**

---

## 🧠 6. 总结

公平 → 隔离
吞吐 → 利用率

实际系统：

👉 必须组合

---

## ⭐ 7. 结尾思考

最后总结一句：

限流不是简单控制流量，

👉 而是：

**在资源有限情况下做分配决策**

在大规模系统中，

👉 它本质上是一个**分布式调度系统**

谢谢大家。

---
 