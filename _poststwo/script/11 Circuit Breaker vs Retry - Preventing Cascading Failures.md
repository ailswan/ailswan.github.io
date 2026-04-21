
---

# 🎬 🎤 English YouTube Script

## Circuit Breaker vs Retry — Preventing Cascading Failures

---

## 🎯 Opening

Hello everyone.
Today I’d like to walk through **how to handle failures in distributed systems**.

When a service fails,
the real danger is not the failure itself.

👉 It’s how the system reacts to that failure.

Because if handled incorrectly,
a small issue can quickly turn into a **system-wide outage**.

(scroll to framework)

---

## 🎯 1. Core Framework

When thinking about failure handling,
I usually break it down into four aspects:

First, **retry vs circuit breaker strategies**.
Second, **how cascading failures happen**.
Third, **trade-offs like latency and load amplification**.
And finally, **how real systems combine these approaches**.

---

## 🧱 2. Retry vs Circuit Breaker

(scroll to retry)

Let’s start with **retry**.

Retry simply means
re-attempting a failed request.

(scroll to benefit)

This works well for **transient failures**,
such as network timeouts.

It improves success rate
with minimal complexity.

(scroll to risk)

But there’s a major risk.

Retries can **amplify traffic**.

If a downstream service is already slow or overloaded,
retries can make it worse.

(scroll to takeaway)

So the key idea is:
**Retry helps recover failures, but can amplify them.**

---

(scroll to circuit)

Now let’s look at **circuit breakers**.

A circuit breaker monitors failures,
and when a threshold is exceeded,
it stops sending requests.

(scroll to states)

It typically has three states:

* closed → normal
* open → fail fast
* half-open → test recovery

(scroll to benefit)

This prevents sending traffic
to an already unhealthy service.

(scroll to tradeoff)

But it may reject requests
that could have succeeded.

(scroll to takeaway)

So the key idea is:
**Circuit breakers protect the system by failing fast.**

---

## 🔄 3. Cascading Failures

(scroll to cascade)

Now let’s talk about **cascading failures**.

This happens when:

One service fails →
upstream retries →
load increases →
more services fail

---

(scroll to insight)

The key insight is:

👉 **The biggest danger is not failure —
it’s failure amplification.**

---

(scroll to retry problem)

Retries are often the root cause:

* retry storms
* thundering herd
* exponential load growth

---

(scroll to solution)

Circuit breakers solve this by:

* stopping traffic
* failing fast
* allowing recovery

---

(scroll to takeaway)

So the key idea is:
**good systems limit failure propagation.**

---

## ⚡ 4. Trade-offs & Design Decisions

(scroll to retry strategy)

For retries, best practices include:

* exponential backoff
* jitter
* retry limits
* idempotent operations

---

(scroll to circuit tuning)

For circuit breakers,
we need to tune:

* failure thresholds
* open duration
* recovery probes

---

(scroll to tradeoff)

There is also a key trade-off:

* Retry → higher latency, better success rate
* Circuit breaker → lower latency, but may drop requests

---

(scroll to takeaway)

So the key idea is:
**we balance recovery vs protection.**

---

## ⚡ 5. Real-world Patterns

(scroll to combined)

In real systems,
we combine both approaches.

---

### Pattern 1: Retry + Circuit Breaker

Limited retries first,
then circuit breaker stops further damage.

---

### Pattern 2: Retry Budget

Limit total retry traffic
to prevent overload.

---

### Pattern 3: Fallback

When circuit breaker opens,
serve:

* cached data
* degraded responses

---

### Pattern 4: Bulkhead Isolation

Isolate resources per dependency
to limit blast radius.

---

(scroll to takeaway)

So the key idea is:
**resilience comes from combining multiple strategies.**

---

## 🧠 6. Summary

(scroll to summary)

To summarize.

Retry helps recover transient failures.
Circuit breakers prevent cascading failures.

But the real challenge is
**controlling failure amplification**.

---

## ⭐ 7. Closing Insight

(scroll to closing)

To conclude.

The biggest danger in distributed systems
is not failure itself.

👉 It’s amplifying failure through retries.

Great systems:

* fail fast
* isolate failures
* and recover gracefully

That’s what resilience is about.

Thank you.

---

# 🎤 中文讲稿（断路器 vs 重试）

---

## 🎯 开场

大家好。
今天我们来聊一聊，在分布式系统中如何处理**失败（Failure）**。

很多人觉得失败是问题，
但更大的问题是：

👉 **系统如何应对失败。**

因为处理不当，
一个小问题可能演变成**全系统崩溃**。

---

## 🎯 1. 核心框架

我通常从四个角度来看：

第一，Retry vs Circuit Breaker
第二，级联故障
第三，延迟与负载的权衡
第四，实际系统组合方案

---

## 🧱 2. Retry vs Circuit Breaker

先看 **Retry（重试）**。

就是请求失败后重新尝试。

优点是：

* 能解决短暂故障
* 提高成功率

但问题是：

👉 **会放大流量**

下游已经慢的时候，
重试会让情况更糟。

---

👉 核心结论：

**Retry 能“救”，但也可能“放大问题”。**

---

再看 **Circuit Breaker（断路器）**。

当失败率超过阈值时：

👉 直接拒绝请求（fail fast）

优点：

* 防止系统被拖垮
* 快速失败

缺点：

* 可能拒绝可恢复请求

---

👉 核心结论：

**Circuit Breaker 是“止损”。**

---

## 🔄 3. 级联故障

级联故障是这样发生的：

服务A慢 → 上游重试 → QPS暴涨 → 更多服务挂

---

👉 核心洞察：

**真正的危险不是失败，而是失败被放大。**

---

Retry 会导致：

* 重试风暴
* 流量爆炸

---

Circuit Breaker：

* 停止流量
* 给系统恢复时间

---

👉 核心结论：

**好的系统要限制故障传播。**

---

## ⚡ 4. 权衡与设计

Retry：

* backoff
* jitter
* 限制次数

Circuit Breaker：

* 失败阈值
* 恢复策略

---

关键权衡：

* Retry → 延迟高但成功率高
* Circuit Breaker → 延迟低但可能丢请求

---

👉 核心结论：

**在“恢复”和“保护”之间做平衡**

---

## ⚡ 5. 实际系统模式

现实中都是组合：

👉 Retry + Circuit Breaker

---

还有：

* Retry Budget（限制总重试量）
* Fallback（降级）
* Bulkhead（隔离）

---

👉 核心思想：

**用多种机制一起控制风险**

---

## 🧠 6. 总结

总结一下：

Retry → 处理短暂失败
Circuit Breaker → 防止系统崩溃

---

关键问题是：

👉 **如何控制失败的放大**

---

## ⭐ 7. 结尾思考

最后总结一句：

分布式系统中最危险的不是失败，

而是：

👉 **失败被无限放大**

优秀的系统会：

* 快速失败
* 隔离问题
* 优雅恢复

这就是系统的韧性（Resilience）。

谢谢大家。

---
 