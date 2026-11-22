---
layout: page
title: "Day 02 · 容量估算"
permalink: /systemdesign-review/day-02/
---

[← 返回每日笔记目录]({{ "/systemdesign-review/" | relative_url }})

第 1 周 · 基础框架

## 学习笔记

确定 FR 和 NFR 后，接下来按以下顺序推进：
确认需求范围 → Capacity Estimation（容量估算）→ API Design → Data Model → High-Level Design。

## 一、设计流程与阶段衔接

| 阶段 | 面试时的英文连接句 | 接下来做什么 |
| --- | --- | --- |
| FR + NFR → Estimation | "Now that we've aligned on the requirements, let me estimate the expected scale to guide our design." | 估算 DAU、Read/Write QPS、Peak QPS、Storage |
| Estimation → API | "With the expected traffic in mind, let's define the core APIs." | 定义 2–4 个主要接口 |
| API → Data Model | "Based on these APIs and access patterns, I'll identify the core data entities." | 确定主键、字段、关系和查询需求 |
| Data Model → HLD | "Now I'll put these components together into a high-level architecture." | 画 Client、Services、Storage、Cache 等 |
| HLD → Deep Dive | "Let's examine the critical paths and see how the design meets our non-functional requirements." | 分析延迟、扩容、故障、一致性 |
| Deep Dive → Trade-offs | "Finally, let's discuss the main trade-offs and potential bottlenecks." | 解释为什么选择或不选择某个方案 |

这些连接句不需要背得非常正式。你只要能自然说出下一步的目的就可以。

## 二、45 分钟面试时间安排

| 阶段 | 时间 |
| --- | --- |
| Requirements | 5 min |
| Capacity Estimation | 3 min |
| API + Data Model | 7 min |
| High-Level Design | 12 min |
| Deep Dive + Trade-offs | 15 min |
| 总结与缓冲 | 3 min |

## 三、Capacity Estimation 需要掌握什么？

| 估算类型 | 主要输入 | 计算结果 | 对架构有什么用？ |
| --- | --- | --- | --- |
| 1. Traffic / QPS | DAU、每日请求次数 | Average / Peak QPS | LB、水平扩容、吞吐能力 |
| 2. Read / Write Ratio | 用户操作模式 | Read QPS / Write QPS | Cache、数据库读写扩容 |
| 3. Storage | 数据量、单条记录大小、保留时间 | GB / TB / PB | DB、Object Storage、分片 |
| 4. Bandwidth | QPS、平均响应大小 | MB/s、Gbps | 网络容量、CDN、数据传输 |

> Now that we've clarified the requirements, I'd like to do a quick back-of-the-envelope estimation to understand the expected system scale.
>
> I'll estimate the average and peak QPS, the read-to-write ratio, storage growth, and bandwidth if relevant.
>
> These numbers will help us make informed decisions about caching, database capacity, and horizontal scaling.

## 四、推荐的 Capacity Estimation 流程（3–5 分钟）

| 步骤 | 做什么 | 对架构的影响 |
| --- | --- | --- |
| 1. DAU | 确定活跃用户规模 | 了解整体业务规模 |
| 2. Requests | 估算每人每天的读写操作 | 判断读多写少还是写多读少 |
| 3. QPS | 计算平均 Read / Write QPS | 评估服务和数据库吞吐需求 |
| 4. Peak QPS | 估算峰值流量 | 水平扩容、容量余量 |
| 5. Storage | 估算数据量与增长速度 | 数据库容量、存储类型、分片需求 |
| 6. Bandwidth | 估算网络吞吐量（相关时） | 网络容量、CDN、传输优化 |

注意，不是所有题目都必须从 DAU 开始。如果面试官直接给出了 QPS，就可以跳过 DAU 计算。

## 五、用 URL Shortener 举例

假设我们算出：

| 指标 | 估算结果 | 简单说一句 |
| --- | --- | --- |
| Daily Writes | 10M | "This is a high-volume write workload." |
| Average Write QPS | ≈ 116 | "The average write throughput is relatively modest." |
| Average Read QPS | ≈ 11.6K | "This is a read-heavy system." |
| Peak Read QPS | ≈ 35K | "We should plan for traffic spikes and horizontal scaling." |
| Storage (5 years) | ≈ 9.1 TB | "We need to consider long-term storage growth." |
| Peak Bandwidth | ≈ 35 MB/s | "Network capacity should support peak redirects." |

这些数字都是基于我们前面使用的示例假设。

### 算完以后的统一总结

> Based on these estimates, we have a read-heavy system with roughly 35K peak read QPS and about 9 TB of raw data over five years. This suggests we should focus on efficient read access, horizontal scalability, and long-term storage growth. I'll use these findings to guide the high-level design.

这样就非常自然地将 Capacity Estimation 连接到 Architecture。

## 六、从估算数字推导设计方向

记住下面这些对应关系：

| 如果估算发现…… | 你应该考虑…… |
| --- | --- |
| Read QPS 很高 | Cache、Read Replicas、优化查询 |
| Write QPS 很高 | 写入吞吐、分区、批处理或异步处理 |
| Peak QPS 远高于 Average | Autoscaling、预留容量、限流 |
| Storage 很大 | 存储分层、分区、数据库增长规划 |
| Bandwidth 很高 | CDN、压缩、网络容量 |
| 单实例无法处理峰值负载 | Load Balancer、Horizontal Scaling |

这里的关键词是 Consider，而不是 Must Use。

例如 High Read QPS 并不意味着一定需要 Redis，9 TB 数据也不意味着必须 Sharding。你需要在后面的设计阶段根据访问模式、延迟目标和实际容量进一步判断。

## 七、可以直接背的英文话术

### Capacity Estimation → Architecture Transition

> I'll quickly estimate the traffic, peak QPS, storage, and bandwidth requirements.
>
> Based on these estimates, I'll identify the main capacity challenges, such as read or write throughput, traffic spikes, and data growth.
>
> These estimates will guide my architecture decisions, including caching, database scaling, and infrastructure capacity.

## 八、按题目选择最关键的估算项

Capacity Estimation 不需要每次完整计算六项。

例如：

- URL Shortener：Read/Write QPS + Storage。
- Chat System：Message QPS + Concurrent Connections + Storage。
- News Feed：Read QPS + Fan-out + Cache Capacity。
- Search System：Query QPS + Index Size + Query Cost。
- File Storage：Storage + Upload/Download Bandwidth。

对每道题，找出最影响架构的 2–3 个数字即可。

### 一句话总结

> Estimate the scale, identify the bottlenecks, and use the numbers to guide the architecture.

这样你就完成了从 FR/NFR → Capacity Estimation → Architecture Design 的关键过渡。

在 System Design 面试的 Capacity Estimation 阶段，先问面试官是否有规模数据。如果没有，就主动提出合理假设，然后快速计算。

## 九、最值得问面试官的 3 个问题

| 优先级 | 英文问题（可以直接背） | 目的 |
| --- | --- | --- |
| 1 | "What's the expected scale in terms of DAU or daily requests?" | 确定用户规模或请求量 |
| 2 | "What's the expected read-to-write ratio?" | 判断读写负载 |
| 3 | "Are there significant traffic spikes or growth expectations?" | 确定峰值流量和扩展需求 |

如果是数据量很大的系统，再补充：

> What's the expected data size and retention period?

如果是 Chat，还可以问并发在线人数；如果是 File Storage，问平均文件大小和每天的上传数量。

## 十、最重要的面试原则

**Ask → Assume → Calculate → Explain → Validate**

你可以把它理解为：

- Ask：向面试官询问现有业务数据。
- Assume：缺少数据时，主动提出合理假设。
- Calculate：快速估算 QPS、Storage、Bandwidth。
- Explain：说明估算结果对架构的影响。
- Validate：确认这些假设和设计方向是否合理。

## 十一、面试中的完整英文话术

> Before estimating capacity, I'd like to clarify a few assumptions.
>
> Do we have an expected number of daily active users or daily requests?
>
> What's the approximate read-to-write ratio, and should we expect significant traffic spikes?
>
> If these numbers aren't available, I'll make reasonable assumptions based on the use case, estimate the average and peak QPS, and calculate storage and bandwidth where relevant.
>
> I'll use these estimates to guide the architecture decisions.
>

## 十二、面试官没有数据时，怎么合理估算？

下面这张表可以直接作为你的 Capacity Estimation 速记模板。

| 指标 | 没有数据时如何假设 | 依据 |
| --- | --- | --- |
| DAU | 先假设 1M 或 10M | 根据产品规模：中型、大型 |
| Requests/User/Day | 根据用户行为估算，如 10–20 次 | 核心功能的使用频率 |
| Read/Write Ratio | 10:1、100:1 等情景假设 | 系统是否读多写少 |
| Peak Factor | 初始假设平均的 3–5 倍 | 日常流量波动 |
| Record Size | 根据字段粗略估算 | 文本、元数据、文件大小 |
| Retention | 1 年、5 年等 | 数据是否过期、业务要求 |
| Bandwidth | QPS × Payload Size | 请求或响应的平均大小 |
| Concurrent Users | DAU × 同时在线比例 | Chat、直播、WebSocket 系统 |

这些不是行业统一数值，而是面试中可用于推理的假设。如果业务模式不同，要随之调整。比如 Ticketmaster 的抢票流量就可能远超普通的 3–5 倍峰值假设。

## 十三、实战例子：服务器数据与架构决策

```text
Traffic:
Web      ~3.7M req/day  ≈ 43 QPS avg
Mobile   ~4–4.5M/day    ≈ 46–52 QPS avg
Total    ~8M/day        ≈ 95 QPS avg

Latency:
p50  ~0.45–0.48 sec
p95  ~0.89–0.97 sec
p99  ~1.9–2.1 sec

Availability / Success:
Web     ~99.94%
Mobile  ~99.45%
```

### 1. Traffic：8M requests/day 是什么水平？

| 指标 | 每日请求 | Average QPS |
| --- | --- | --- |
| Web | 3.7M | 42.8 |
| Mobile | 4–4.5M | 46.3–52.1 |
| Total | 7.7–8.2M | 89.1–94.9 |

> The system processes approximately eight million requests per day, averaging around 90 to 95 requests per second. While this is a moderate throughput for a single backend service, its design complexity comes from reliability requirements, downstream dependencies, latency targets, and data correctness rather than raw traffic volume alone.

真正需要关注的不是平均 QPS，而是 Peak QPS。
即使按 5 倍估算，也只有约 465 QPS。但不能因此直接认为系统没有容量问题，因为真正的瓶颈可能在于下游 API、连接池、数据库查询、线程池、Lambda 并发、ECS 资源或外部服务响应时间。

> Although the system handles approximately eight million requests per day, the average throughput is only around 93 QPS. Therefore, I'd focus on peak traffic patterns, downstream dependencies, and tail latency rather than assuming throughput is the primary bottleneck.

### 2. 如果目标是 Four-Nines（99.99%）

这部分可以和你的可靠性工作直接联系起来。

| 指标 | 当前值 | 如果目标是 99.99% 请求成功率 |
| --- | --- | --- |
| Web | 99.94% | 需要减少失败请求 |
| Mobile | 99.45% | 存在更大改进空间 |
| Overall | 约 99.68% | 尚有明显差距 |

在每天 8M 请求的规模下：

- 99.99% 请求成功率允许约 800 次失败请求/天。
- 99.9% 请求成功率允许约 8,000 次失败请求/天。
- 当前估算约 24,000–27,000 次失败请求/天。

### 3. 这些数据对架构决策有什么意义？

| 观察 | 对应 NFR | 我的建议 |
| --- | --- | --- |
| 8M requests/day | Scalability | 测量真实 Peak QPS 和单实例容量 |
| P50 ≈ 450ms | Latency | 分析正常请求的关键路径 |
| P99 ≈ 2s | Tail Latency | 使用 Trace 找到慢请求原因 |
| Mobile 99.45% | Reliability | 优先分析错误来源与调用路径 |
| Web 99.94% | Reliability | 识别剩余主要失败类型 |
| Web/Mobile 存在差异 | Operability | 分渠道建立 Dashboard 和告警 |

这些数据本身还不足以证明需要 Redis、Kafka、更多 ECS Tasks 或提高 Lambda Memory。

应该先通过压测和可观测性数据确定瓶颈，再选择技术方案。


1. QPS — 每秒请求量
\[
Average\ QPS=\frac{Daily\ Requests}{86400}
\]

\[
Peak\ QPS=Average\ QPS\times Peak\ Factor
\]

如果系统读写模式不同，最好分别计算 Read QPS 和 Write QPS。
2. Storage — 存储量
\[
Storage=Daily\ Records\times Record\ Size\times Retention\ Days
\]

但需要区分三类指标：
类别	核心问题	典型指标
Capacity / Load 容量与负载	系统需要承受多少工作量？	QPS、Storage、Bandwidth、Concurrency
SLI / SLO 服务质量	用户实际体验如何？目标是什么？	P95/P99、Success Rate、Availability、Error Budget
Resilience 故障恢复能力	出现故障后能否保持服务或及时恢复？	RTO、RPO、MTTR、Failover Time、Recovery Success

最重要的关系是：

Capacity 决定你需要设计多大规模的系统；SLO 决定系统要达到什么服务质量；Resilience 决定故障发生时系统要如何应对。
一、QPS、Storage、Bandwidth 影响哪些指标？
这是我建议你加入 System Design 学习笔记的核心表格。
容量估算	直接影响的运行指标	关联的 SLI / SLO	关联的 Resilience 指标
QPS / Peak QPS	CPU、Memory、Concurrency、Queue Depth、Resource Saturation	P95/P99 Latency、Error Rate、Availability	Failover Capacity、Overload Recovery Time
Storage	Disk Utilization、Storage Growth、IOPS、Disk Throughput	Read/Write Latency、Durability、Successful Writes	RPO、RTO、Backup/Restore Time
Bandwidth	Network Utilization、Throughput、Packet Loss、Network Saturation	Network Latency、Timeout Rate、Transfer Success Rate	Replication Lag、Cross-Region Failover Capacity

这里的“影响”不是简单的数学对应关系，而是通过资源瓶颈和系统故障间接影响用户体验。

例如 QPS 增长不一定导致 P99 增长。如果系统有足够的容量，P99 可以保持稳定；但当资源接近饱和时，排队时间可能快速增加。 

六、最后如何记忆？
指标	记忆公式	架构关注点
QPS	Daily Requests ÷ 86,400	Server / Scaling
Storage	Records × Size × Time	Database / Storage
Bandwidth	QPS × Payload Size	Network / CDN


3. 如果面试官没有给数字，应该怎么推算？
不要直接背数字，最好掌握这三个步骤。
Step 1：先判断数据类型
类型	估算方法
Structured data	根据字段数量和类型
Text	根据平均字符数
JSON	字段内容 + JSON overhead
Image	根据图片分辨率、格式、压缩
Video	根据码率 × 视频时长
Audio	根据音频码率 × 时长

Step 2：判断一条还是多条
例如：
- User Profile：1 个 User
- Feed：20 个 Posts
- Search：20 个 Results
- Chat History：50 条 Messages
计算：
Payload Size
= Number of Objects × Average Object Size


Step 3：考虑压缩
例如：
Uncompressed JSON = 100 KB
Gzip compression = 30 KB


那么实际网络传输可能是：
Payload ≈ 30 KB


但要注意：估算时最好先使用未压缩大小，再说明压缩可以降低网络带宽。

4. 特殊情况：Image / Video 怎么估算？
这个在 System Design 非常重要，因为媒体文件通常远远大于普通 JSON。
类型	面试估算参考
Thumbnail	10–50 KB
Compressed image	100–500 KB
High-resolution image	1–5 MB
Short audio clip	100 KB–1 MB
1-minute audio	1 MB 左右（取决于码率）
1-minute video	5–20 MB（取决于分辨率和码率）

例如 Instagram-like System：
1 user uploads 2 images/day

Average image = 500 KB

10M DAU × 2 × 500 KB
= 10 TB/day


这里还要进一步考虑：
- Original image
- Thumbnail
- Multiple resolutions
- Replication
- CDN caching
注意：图片上传和下载还需要分别估算 Ingress 和 Egress Bandwidth。

5. 面试最实用的速记表
下面这张表建议你保存下来，作为 Capacity Estimation 的参考。
System Design — Size Cheat Sheet
Storage Data Size
Object	Estimate
User	1 KB
Post	1 KB
Comment	0.5 KB
Message	1 KB
Metadata	1 KB



API Payload Size
API	Estimate
Login	1 KB
Profile	2 KB
Single Post	2 KB
Feed (20 posts)	25 KB
Search (20 results)	50 KB
Chat batch (20 messages)	20 KB



Media Size
Media	Estimate
Thumbnail	20 KB
Image	500 KB
High-res image	2 MB
1-min video	10 MB


以上是便于面试心算的初始假设，不是行业统一标准。实际大小取决于 schema、内容长度、编码、压缩和媒体质量。

6. 面试时如何表达你的假设？
假设面试官让你设计一个 Social Media Feed，没有提供数据大小。

你可以这样说：
Since the exact payload size is not specified, I'll make some reasonable assumptions.

I'll assume an average post record is around 1 KB, including its text and metadata.

For a feed API, I'll assume each response returns 20 posts, resulting in approximately 20–25 KB per response, excluding images.

I'll estimate image storage and bandwidth separately because media files are significantly larger than structured data.

这段话很重要，因为它体现了你具备合理假设和拆解问题的能力，而不是单纯背公式。