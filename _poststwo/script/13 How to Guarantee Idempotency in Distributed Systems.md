
---

# 🎬 🎤 English YouTube Script

## How to Guarantee Idempotency in Distributed Systems

---

## 🎯 Opening

Hello everyone.
Today I’d like to walk through **idempotency in distributed systems**.

In distributed systems,
failures are unavoidable.

Requests time out.
Messages get duplicated.
Consumers restart.

So the real question is:

👉 **What happens when the same request is executed multiple times?**

If we don’t handle this properly,
we can easily end up with:

* double charges
* duplicated orders
* inconsistent state

---

## 🎯 1. Core Framework

When thinking about idempotency,
I usually break it down into four approaches:

First, **idempotency keys for API requests**.
Second, **database constraints for write safety**.
Third, **event deduplication in streaming systems**.
And fourth, **designing naturally idempotent operations**.

Let’s go through them one by one.

---

## 🧱 2. Idempotency Keys

(scroll to keys)

Let’s start with **idempotency keys**.

This is the most common approach
for client-driven APIs.

---

(scroll to example)

For example, in a payment API:

The client sends:

```
POST /payment
Idempotency-Key: 123
```

---

(scroll to flow)

On the server:

* check if the key exists
* if not → process request
* store result
* if exists → return previous result

---

(scroll to benefit)

This ensures:

* safe retries
* no duplicate execution

---

(scroll to tradeoff)

But it requires:

* storage
* expiration strategy
* careful key design

---

(scroll to takeaway)

So the key idea is:
**idempotency keys turn retries into safe operations.**

---

## 🔄 3. Database Constraints

(scroll to db)

Another approach is
**database-level idempotency**.

---

(scroll to example)

For example:

```
UNIQUE(user_id, request_id)
```

Even if the request runs twice,
only one insert succeeds.

---

(scroll to benefit)

This gives:

* strong guarantee
* simple implementation

---

(scroll to limitation)

But it only works for:

* create operations
* simple cases

---

(scroll to takeaway)

So the key idea is:
**databases can enforce idempotency at the storage layer.**

---

## ⚡ 4. Event Deduplication

(scroll to events)

In event-driven systems,
duplicate events are common.

---

(scroll to example)

For example:

* Kafka re-delivery
* consumer restarts

---

(scroll to solution)

The solution is:

Store processed event IDs:

```
if event_id exists:
    skip
else:
    process
```

---

(scroll to benefit)

This ensures:

* correctness under at-least-once delivery
* no double counting

---

(scroll to takeaway)

So the key idea is:
**event systems must explicitly handle duplication.**

---

## 🔗 5. Idempotent Operations

(scroll to ops)

Now let’s look at a deeper approach.

Instead of preventing duplicates,
we design operations to be **naturally idempotent**.

---

(scroll to example)

Instead of:

```
balance = balance - 10
```

We use:

```
set balance = 90
```

Or version-based updates.

---

(scroll to benefit)

This removes the need for deduplication logic.

---

(scroll to tradeoff)

But it’s harder to design,
and not always possible.

---

(scroll to takeaway)

So the key idea is:
**the best idempotency is built into the operation itself.**

---

## ⚡ 6. Real-world Composition

(scroll to combo)

In real systems,
we combine multiple approaches.

---

### API Layer

* idempotency keys

### Database Layer

* unique constraints

### Event Layer

* processed event tracking

### Business Logic

* idempotent operations

---

(scroll to takeaway)

So the key idea is:
**idempotency is enforced at multiple layers.**

---

## 🧠 7. Summary

(scroll to summary)

To summarize.

Idempotency keys protect APIs.
Database constraints protect writes.
Event deduplication protects streaming systems.
Idempotent design protects business logic.

---

## ⭐ 8. Closing Insight

(scroll to closing)

To conclude.

Idempotency is not just a retry safety feature.

👉 It is a **core correctness guarantee**
in distributed systems.

Because retries are inevitable.

But incorrect results are not.

That’s what we must prevent.

Thank you.

---

# 🎤 中文讲稿（幂等性）

---

## 🎯 开场

大家好。
今天我们来聊一聊，在分布式系统中非常关键的一个问题 —— **幂等性（Idempotency）**。

在分布式系统中：

* 请求会重试
* 消息会重复
* 服务会失败

所以核心问题是：

👉 **同一个请求执行多次会发生什么？**

如果处理不好，就会出现：

* 重复扣费
* 重复下单
* 数据错误

---

## 🎯 1. 核心框架

我通常从四个角度来看幂等性：

第一，Idempotency Key
第二，数据库约束
第三，事件去重
第四，天然幂等设计

---

## 🧱 2. 幂等 Key

客户端给每个请求一个唯一 key。

服务器：

* 查 key
* 没有 → 执行
* 有 → 返回旧结果

---

👉 核心结论：

**让 retry 变成安全操作**

---

## 🔄 3. 数据库约束

通过唯一索引：

```
UNIQUE(user_id, request_id)
```

防止重复写入。

---

👉 核心结论：

**用数据库保证不重复**

---

## ⚡ 4. 事件去重

Kafka 等系统：

可能重复消费。

解决：

```
event_id 去重
```

---

👉 核心结论：

**event 系统必须主动处理重复**

---

## 🔗 5. 天然幂等设计

例如：

不要：

```
减10
```

而是：

```
设为某个值
```

---

👉 核心结论：

**最好的幂等性是“天然幂等”**

---

## ⚡ 6. 实际系统

现实中是组合：

* API → key
* DB → constraint
* Event → 去重
* Logic → 幂等

---

👉 核心思想：

**多层保证正确性**

---

## 🧠 7. 总结

总结一下：

幂等性是：

👉 **保证系统不会因为重试而出错**

---

## ⭐ 8. 结尾思考

最后总结一句：

幂等性不是优化，

👉 而是系统正确性的基础。

因为：

👉 **重试一定会发生，但错误不应该发生**

谢谢大家。

---
 