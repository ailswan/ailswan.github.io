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