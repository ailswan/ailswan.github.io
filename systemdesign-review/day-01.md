---
layout: page
title: "Day 01 · Functional / Non-functional Requirements"
permalink: /systemdesign-review/day-01/
---

[← 返回每日笔记目录]({{ "/systemdesign-review/" | relative_url }})

第 1 周 · 基础框架

## 学习笔记

## 一、面试中优先考虑的 4 个 NFR

| NFR | 你需要确定什么？ | 示例 |
| --- | --- | --- |
| 1. Latency | 请求需要多快完成？ | P99 < 200ms |
| 2. Availability | 系统需要多高的可用率？ | 99.99% |
| 3. Consistency | 数据需要多强的一致性？ | Strong / Eventual |
| 4. Scalability | 系统需要处理多大规模？ | Peak 100K QPS |

这里有个重要区别：

- Latency、Availability：通常需要提出可量化的目标。
- Consistency：主要是确定一致性语义，不一定是具体数字。
- Scalability：通过 DAU、QPS、读写比例、增长预期等数据来估算。

## 二、System Design — FR / NFR 复习总表

不同题目应该优先考虑不同 NFR。

| 系统设计题目 | Functional Requirements（做什么） | Non-functional Requirements（做得多好） |
| --- | --- | --- |
| 1. URL Shortener | 1. Generate short URL（生成短链接）<br>2. Redirect（重定向）<br>3. Custom alias / Expiration（自定义及过期） | 1. Low latency（低延迟）<br>2. High availability（高可用）<br>3. High read scalability（高读取扩展性） |
| 2. Rate Limiter | 1. Identify clients（识别请求主体）<br>2. Enforce limits（执行限流）<br>3. Return allow/deny（允许或拒绝） | 1. Very low latency（极低延迟）<br>2. High throughput（高吞吐）<br>3. Distributed correctness（分布式计数正确性） |
| 3. Chat System | 1. Send / Receive（发送接收消息）<br>2. Message history（消息历史）<br>3. Offline delivery（离线消息） | 1. Low latency（低延迟）<br>2. Message durability（消息持久性）<br>3. Message ordering（消息顺序） |
| 4. News Feed | 1. Create posts（发布动态）<br>2. Follow users（关注用户）<br>3. Generate feed（生成动态流） | 1. Read scalability（读取扩展性）<br>2. Low feed latency（低延迟）<br>3. Eventual consistency（最终一致性） |
| 5. Ticketmaster | 1. Search events（搜索活动）<br>2. View seat availability（查看座位）<br>3. Reserve / Buy tickets（预订购买） | 1. Strong booking correctness（预订正确性）<br>2. High availability（高可用）<br>3. Handle traffic spikes（应对流量峰值） |
| 6. Payment System | 1. Process payment（处理支付）<br>2. Track payment status（查询状态）<br>3. Refund payment（退款） | 1. No double charge（避免重复扣款）<br>2. Strong correctness（交易正确性）<br>3. High durability（高持久性） |

四、面试时直接使用的英文模板
For functional requirements, I'd like to focus on three core features: [Feature A], [Feature B], and [Feature C].

For non-functional requirements, I'd prioritize [NFR 1] first, followed by [NFR 2] and [NFR 3], based on the business requirements.

I'll also make reasonable assumptions about the expected traffic and performance targets to guide the architecture.

Does this scope sound reasonable?

一、选择和排序 NFR 的 3 个问题
思考问题	判断依据	可能选出的 NFR
什么绝对不能出错？	资金损失、重复操作、数据丢失、业务错误	Correctness、Consistency、Durability
什么最影响用户体验？	响应慢、服务不可用、消息延迟	Latency、Availability
大规模下最大的挑战是什么？	大量并发、数据增长、流量突增	Scalability、Throughput


## 二、使用 6 道题理解为什么这样排序

| 系统 | 第一优先级 | 第二优先级 | 第三优先级 |
| --- | --- | --- | --- |
| URL Shortener | Latency：<br>用户点击链接需要快速跳转 | Availability：<br>链接不能频繁打不开 | Scalability：<br>热点链接可能被大量访问 |
| Rate Limiter | Correctness：<br>不能让请求轻易突破限流约束 | Latency：<br>限流检查不能拖慢每个请求 | Scalability：<br>需要处理大量并发请求 |
| Chat System | Latency：<br>消息需要及时送达 | Durability：<br>已确认的消息不能轻易丢失 | Ordering：<br>会话内消息顺序必须符合约定 |
| News Feed | Scalability：<br>大量用户同时读取内容 | Latency：<br>Feed 加载应该快速 | Availability：<br>用户应能持续浏览内容 |
| Ticketmaster | Correctness：<br>绝不能将同一座位重复出售 | Scalability：<br>热门活动会产生流量高峰 | Availability：<br>开票时系统应持续可用 |
| Payment System | Correctness：<br>避免重复扣款和错误记账 | Durability：<br>支付记录不能丢失 | Availability：<br>支付服务中断会影响交易 |


六、一个 Senior 面试的加分点：主动说明 Trade-off
假设面试官问：

Why did you prioritize correctness over latency for Ticketmaster?

不要只回答：

"Because correctness is more important."

更好的回答是：
"Because double booking can cause financial and operational problems, I'd rather accept a slightly higher booking latency than risk selling the same seat twice. We can optimize read latency separately for event browsing."

这里你不仅解释了优先级，还说明了取舍，并且区分了不同业务操作。

最终记住这个判断口诀：
- Business Risk → Correctness / Durability / Consistency
- User Experience → Latency / Availability
- System Growth → Scalability
先找出最严重的失败后果，再看用户体验，最后看规模挑战。用这三个角度选择 NFR，是你 Day 1 最值得反复练习的能力。



一、推荐的面试需求分析框架
步骤	做什么	时间
1. Clarify Scope	确认用户、业务场景、系统边界	1–2 min
2. Functional Requirements	选出 3 个最重要的功能	1–2 min
3. Non-functional Requirements	选出 3 个最重要的质量目标并排序	1–2 min
4. Validate	询问面试官是否同意范围与假设	30 sec


-------------------------
可以。这个模板最重要的其实是：**NFR 不要只说“我要高可用、高性能”，而是要说明“为什么这个指标重要”，然后把它变成架构取舍依据。**

你系统设计面试时可以准备下面这些高频版本。

### 例子 1：高并发 API / 社交 Feed

> **For non-functional requirements, I'd prioritize three areas.**
>
> **First, low latency**, because users expect the feed to load quickly and delays would directly hurt user engagement.
>
> **Second, high availability**, since the feed is a core user-facing feature and downtime would affect a large number of users.
>
> **Third, scalability**, to ensure the system can handle traffic spikes and continued growth in the number of users.
>
> **I'll use these priorities to guide the architectural trade-offs.**

你脑子里对应：

**Latency → Availability → Scalability**

所以架构上可能想到：

`CDN → Load Balancer → Cache → Stateless Services → DB`

---

### 例子 2：支付系统

这个非常适合体现 **Correctness > Availability**。

> **For non-functional requirements, I'd prioritize three areas.**
>
> **First, correctness**, because we must prevent duplicate charges, incorrect balances, and lost transactions.
>
> **Second, durability**, since once a payment is confirmed, we cannot afford to lose the transaction record.
>
> **Third, availability**, so users can complete payments reliably without unnecessary failures.
>
> **I'll use these priorities to guide the architectural trade-offs.**

这里你要意识到：

**Correctness > Durability > Availability**

所以你不会为了 availability 而简单地接受错误支付。

可能会引出：

- Idempotency
- Unique transaction ID
- ACID transaction
- Strong consistency
- Transaction log
- Retry + idempotency
- Reconciliation

---

### 例子 3：Rate Limiter

你最近正在复习 Rate Limiter，这个非常适合。

> **For non-functional requirements, I'd prioritize three areas.**
>
> **First, correctness**, because the rate limiter must accurately enforce the configured limits and prevent users from exceeding their quotas.
>
> **Second, low latency**, since rate limiting sits directly in the request path and should add minimal overhead.
>
> **Third, scalability**, to ensure the limiter can handle a very large number of requests across multiple servers.
>
> **I'll use these priorities to guide the architectural trade-offs.**

这里就是：

**Correctness → Latency → Scalability**

然后你就可以自然进入：

> “Given these priorities, I would use a distributed counter with Redis…”

---

### 例子 4：聊天系统

比如 WhatsApp / Slack。

> **For non-functional requirements, I'd prioritize three areas.**
>
> **First, low latency**, because users expect messages to be delivered almost immediately.
>
> **Second, availability**, since users should still be able to send and receive messages even if some servers fail.
>
> **Third, scalability**, because the system needs to support a large number of concurrent users and messages.
>
> **I'll use these priorities to guide the architectural trade-offs.**

这里：

**Latency → Availability → Scalability**

然后可以引出：

- WebSocket
- Message Queue
- Kafka
- Connection servers
- Partitioning
- Retry
- Offline messages

---

### 例子 5：文件存储系统

比如 Dropbox / Google Drive。

> **For non-functional requirements, I'd prioritize three areas.**
>
> **First, durability**, because users expect uploaded files to remain available and not be lost.
>
> **Second, availability**, since users should be able to access their files reliably.
>
> **Third, scalability**, to support a growing number of users and potentially petabytes of data.
>
> **I'll use these priorities to guide the architectural trade-offs.**

这里：

**Durability → Availability → Scalability**

所以你自然会想到：

`Object Storage + Replication + Metadata DB`

而不是把文件全部放在普通 relational DB 里面。

---

### 例子 6：搜索系统

比如 Google / e-commerce search。

> **For non-functional requirements, I'd prioritize three areas.**
>
> **First, low latency**, because users expect search results within a fraction of a second.
>
> **Second, scalability**, since the system needs to handle a very large number of search queries and documents.
>
> **Third, availability**, because search is a critical part of the user experience and should remain accessible during partial failures.
>
> **I'll use these priorities to guide the architectural trade-offs.**

这里：

**Latency → Scalability → Availability**

然后自然进入：

`Load Balancer → Search Service → Elasticsearch → Cache`

---

## 例子 7：银行账户余额

这个例子特别适合你理解 **Consistency / Correctness**。

> **For non-functional requirements, I'd prioritize three areas.**
>
> **First, consistency**, because users must see an accurate account balance after a transaction.
>
> **Second, correctness**, because an incorrect balance or duplicated transaction could have direct financial consequences.
>
> **Third, availability**, so customers can access their accounts reliably.
>
> **I'll use these priorities to guide the architectural trade-offs.**

这里最重要的是：

**Consistency / Correctness 比 Availability 更重要。**

所以如果发生：

> “Do you prefer slightly stale data or temporarily rejecting the request?”

你可以回答：

> **For financial transactions, I'd prefer temporary unavailability over returning incorrect financial data.**

这就是 **NFR → Trade-off** 真正连起来了。

---

# 你面试时可以直接套的 5 种组合

| System | Priority 1 | Priority 2 | Priority 3 |
| --- | --- | --- | --- |
| Feed | Latency | Availability | Scalability |
| Payment | Correctness | Durability | Availability |
| Rate Limiter | Correctness | Latency | Scalability |
| Chat | Latency | Availability | Scalability |
| File Storage | Durability | Availability | Scalability |
| Search | Latency | Scalability | Availability |
| Banking | Consistency | Correctness | Availability |
| Notification | Availability | Scalability | Latency |

### 五类 NFR Priority 记忆表

| 类别 | 记忆关键词 | NFR Priority 组合 | 典型系统 |
| --- | --- | --- | --- |
| 1 | 高并发<br>High Traffic | Latency → Availability → Scalability | Feed、Search、Chat、API Gateway |
| 2 | 高精度<br>High Accuracy | Correctness → Latency → Scalability | Rate Limiter、Inventory |
| 3 | 高可靠<br>High Reliability | Correctness → Durability → Availability | Payment、Order |
| 4 | 高持久<br>High Durability | Durability → Availability → Scalability | File Storage、Backup |
| 5 | 强一致<br>Strong Consistency | Consistency → Correctness → Availability | Banking、Account Balance |

### 你真正需要背的不是这些句子，而是这个逻辑：

**NFR → Why → Priority → Architecture → Trade-off**

例如：

> **Correctness is important because duplicate payments have financial consequences.**

↓

所以：

> **We need idempotency.**

↓

所以：

> **Use an idempotency key + durable transaction record.**

↓

Trade-off：

> **We may sacrifice some availability during uncertain transaction states rather than risk charging the customer twice.**

这就比单纯说：

> “The system needs high availability, scalability and low latency.”

**强很多。**


-----------------------
### System Design 四大核心性能指标对比

| 对比维度 | Concurrency | Throughput | Latency | Scalability |
| --- | --- | --- | --- | --- |
| 中文 | 并发量 | 吞吐量 | 延迟 | 可扩展性 |
| 核心问题 | 同时处理多少请求？ | 每秒完成多少请求？ | 每个请求需要多长时间？ | 请求量增长时如何扩展？ |
| 衡量指标 | Concurrent Requests | QPS / RPS | ms / seconds | Capacity / Scaling |
| 关注重点 | 同时处理能力 | 整体处理效率 | 单个请求响应速度 | 系统增长能力 |
| 主要挑战 | 线程<br>连接数<br>内存<br>资源竞争 | CPU<br>IO<br>数据库处理能力 | Network<br>DB Query<br>Cache<br>Processing | Load Balancer<br>Horizontal Scaling<br>Partitioning |
| 常见优化 | Async I/O<br>Thread Pool<br>Connection Pool | Batching<br>Caching<br>Parallel Processing | CDN<br>Caching<br>Indexing<br>优化查询 | Horizontal Scaling<br>Sharding<br>Partitioning<br>Auto Scaling |
| 典型问题 | 大量用户同时发起请求 | 每秒需要处理 10,000 个请求 | p95 latency 必须低于 200ms | 用户从 10 万增长到 1,000 万 |

### 面试时可以直接套用的英文理由库

| NFR | English Reason 1 | English Reason 2 | English Reason 3 |
| --- | --- | --- | --- |
| **Low Latency** | Users expect fast responses, and delays would hurt user experience. | The operation is on the critical request path, so we should minimize additional latency. | Users expect the result to be available almost immediately. |
| **Correctness** | The system must process operations correctly because errors could have serious consequences. | Incorrect results could directly impact users or business operations. | We need to ensure the system behaves according to the business rules and does not produce incorrect results. |
| **Durability** | Once data is saved or a transaction is confirmed, it must not be lost. | We need to preserve the data even after server failures or restarts. | Users expect their confirmed transactions and uploaded data to remain available. |
| **Consistency** | Users must see accurate and consistent data across the system. | After an update, users should not see stale or conflicting information. | The latest state needs to be reflected correctly across relevant services and replicas. |
| **Availability** | Users should still be able to use the system even if some servers fail. | This is a user-facing service, so downtime would directly impact users. | The system should remain accessible during partial failures and maintenance. |
| **Scalability** | The system needs to handle increasing traffic and a growing number of users. | We need to support a large number of concurrent requests as the system grows. | The system should continue to perform well as traffic, users, and data volume increase. |

