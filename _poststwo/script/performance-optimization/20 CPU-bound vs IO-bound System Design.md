# 🎬 English YouTube Script

## CPU-bound vs IO-bound System Design

---

## 🎯 Opening

Hello everyone.
Today I’d like to walk through **CPU-bound vs IO-bound System Design**.

This is one of the most practical performance topics in system design interviews.

The key idea is simple:

CPU-bound systems spend most of their time computing.
IO-bound systems spend most of their time waiting.

But the design implications are very different.

If we optimize the wrong bottleneck, we can make the system slower, more expensive, or less reliable.

**(PPT 1: Title Slide — CPU-bound vs IO-bound System Design)**

---

## 🎯 1. Core Idea

Let’s start with the core framework.

When I analyze a performance problem, I first ask:

Is the system spending time on computation?
Or is it spending time waiting on network, database, disk, cache, object storage, or downstream services?

That difference decides the optimization strategy.

For CPU-bound workloads, we optimize computation.
For IO-bound workloads, we optimize waiting time and dependency usage.

**(PPT 2: Core Idea)**

The main lesson is:

Do not apply a generic performance trick before identifying the bottleneck.

---

## 🧠 2. What CPU-bound Means

A CPU-bound system is limited by compute.

Examples include image processing, video encoding, encryption, compression, ranking algorithms, ML inference, large transformations, and heavy JSON parsing.

The symptoms are usually clear.

CPU utilization is high.
Worker threads are busy.
Queue depth grows while CPU is saturated.
Flame graphs show hot functions.
Adding more database capacity does not help.

**(PPT 3: CPU-bound Systems)**

In this case, the bottleneck is not waiting.
The bottleneck is computation.

So the right question is:

How do we reduce CPU work per request, or add compute capacity efficiently?

---

## 🌐 3. What IO-bound Means

An IO-bound system is limited by waiting.

The system may wait on database queries, remote RPC calls, disk, object storage, cache misses, queues, or third-party APIs.

The symptoms look different from CPU-bound workloads.

CPU usage may be low or moderate.
Distributed traces show most time spent in downstream calls.
Connection pool wait time is high.
Database p99 dominates request latency.
Adding more CPU does not improve performance.

**(PPT 4: IO-bound Systems)**

In this case, the bottleneck is waiting time.

So the right question is:

How do we reduce round trips, hide waiting safely, and protect downstream dependencies?

---

## 🏗️ 4. Request Path View

A real request often contains both CPU and IO work.

A typical path looks like this:

```text
Client
→ API Gateway
→ Application Service
→ CPU work: validation, parsing, transformation
→ IO work: database, cache, RPC, object storage
→ Response Builder
→ Client
```

**(PPT 5: Request Path)**

This is why we should not label the entire system too quickly.

A service may be CPU-bound during one traffic pattern and IO-bound during another.

After fixing database latency, serialization may become the next bottleneck.
After optimizing CPU, downstream RPC may dominate latency.

Performance bottlenecks move.

---

## 🔍 5. Diagnosis First

Before optimizing, we need evidence.

For CPU-bound issues, I would use CPU profiles, flame graphs, thread pool metrics, allocation rate, GC pauses, and throughput per core.

For IO-bound issues, I would use distributed tracing, database query time, downstream latency, connection pool wait, timeout rate, retry rate, and queue wait.

**(PPT 6: Diagnosis First)**

A good interview answer should say:

I would use traces to see where request time goes across services.
I would use profiles to see what the process is doing internally.

Together, they tell us whether the bottleneck is compute, waiting, memory, locks, database, network, or downstream saturation.

---

## ⚙️ 6. CPU-bound Optimization

For CPU-bound systems, we optimize compute.

Common techniques include:

* improve algorithmic complexity
* remove unnecessary computation
* cache repeated results
* reduce serialization overhead
* use faster data structures
* reduce allocations and GC pressure
* parallelize CPU work carefully
* precompute expensive results
* scale horizontally with more workers

**(PPT 7: CPU-bound Optimization)**

The important warning is this:

More threads do not always help.

If CPU is already saturated, more threads can create context switching, lock contention, and worse p99 latency.

---

## 🌊 7. IO-bound Optimization

For IO-bound systems, we optimize waiting.

Common techniques include:

* reduce network round trips
* batch small calls
* use async IO
* reuse connections
* add database indexes
* cache hot reads
* prefetch predictable data
* use read replicas when safe
* denormalize read paths
* tune concurrency limits
* add backpressure

**(PPT 8: IO-bound Optimization)**

Concurrency can help IO-bound workloads because workers can make progress while other requests are waiting.

But unlimited concurrency is dangerous.

It can overload the database, saturate downstream services, and create retry storms.

---

## ⚖️ 8. Trade-offs

Now let’s talk about trade-offs.

Concurrency helps IO-bound systems, but can hurt CPU-bound systems.

Compression saves network bandwidth, but costs CPU.

Caching saves CPU or IO, but costs memory and introduces staleness.

Indexes speed up reads, but slow down writes and increase storage.

Batching improves throughput, but can increase latency.

**(PPT 9: Trade-offs)**

The staff-level answer is about resource movement.

Every optimization moves cost from one resource to another.

So we should always ask:

What resource am I saving?
And what resource am I spending?

---

## ✅ 9. Final Interview Answer

Here is the interview-ready answer.

> I would first determine whether the system is CPU-bound or IO-bound using profiling, tracing, and metrics.
> If it is CPU-bound, I would optimize algorithms, reduce repeated computation, reduce allocations, cache or precompute results, parallelize carefully, and scale compute when needed.
>
> If it is IO-bound, I would reduce round trips, use async IO, batch calls, reuse connections, add indexes, cache hot reads, tune concurrency limits, and apply backpressure.
>
> At staff level, the key is choosing the optimization that matches the bottleneck.
> The wrong optimization can make the system slower or less reliable.

**(PPT 10: Final Answer)**

---

## ⭐ Closing Insight

To summarize:

CPU-bound means optimize computation.
IO-bound means optimize waiting.

But real systems can be mixed, and bottlenecks can shift.

So the safest strategy is always:

Measure first.
Identify the bottleneck.
Apply the targeted optimization.
Validate p95, p99, throughput, error rate, and cost.

Thank you.

---

# 🎤 中文讲稿

## 开场

大家好。
今天我们来讲 **CPU-bound vs IO-bound System Design**。

这个 topic 在性能优化和系统设计面试里非常实用。

核心区别很简单：

CPU-bound 系统主要时间花在计算上。
IO-bound 系统主要时间花在等待上。

但它们的优化方式完全不同。

**（PPT 1：标题页）**

---

## 1. 核心思路

分析性能问题时，我会先问：

系统是在做计算，还是在等待网络、数据库、磁盘、缓存、对象存储或下游服务？

如果是 CPU-bound，就优化计算。
如果是 IO-bound，就优化等待时间和依赖使用方式。

**（PPT 2：核心思路）**

不要在没判断瓶颈之前就套优化模板。

---

## 2. CPU-bound

CPU-bound 系统受限于计算能力。

常见例子包括图片处理、视频编码、加密、压缩、排序算法、ML inference、大规模数据转换和复杂业务规则。

典型信号是 CPU utilization 很高，worker 很忙，queue depth 上升，flame graph 有明显 hot path。

**（PPT 3：CPU-bound）**

这时瓶颈不是等待，而是计算本身。

---

## 3. IO-bound

IO-bound 系统受限于等待时间。

等待可能来自数据库、RPC、磁盘、对象存储、cache miss、queue 或第三方 API。

典型信号是 CPU 不一定高，但 trace 里大部分时间花在 downstream call、database query 或 connection pool wait 上。

**（PPT 4：IO-bound）**

这时增加 CPU 通常没用，真正要优化的是 round trip、dependency latency 和 concurrency control。

---

## 4. 请求路径

真实系统里，一个请求往往同时包含 CPU 和 IO。

例如 validation、parsing、ranking 是 CPU work。
数据库、cache、RPC、object storage 是 IO work。

**（PPT 5：请求路径）**

所以不能太快把整个系统贴上 CPU-bound 或 IO-bound 标签。
要拆 critical path，看每一段到底耗在哪里。

---

## 5. 先诊断

CPU-bound 我会看 CPU profile、flame graph、thread pool、allocation rate、GC pause 和 throughput per core。

IO-bound 我会看 tracing、database query time、downstream latency、connection pool wait、timeout、retry 和 queue wait。

**（PPT 6：诊断）**

trace 告诉我们请求时间花在哪些服务。
profile 告诉我们进程内部到底在做什么。

---

## 6. CPU-bound 优化

CPU-bound 优化方式包括：

改进算法复杂度，减少重复计算，减少 serialization，使用更快的数据结构，降低 allocation 和 GC，缓存或预计算结果，安全并行，以及水平扩展 compute。

**（PPT 7：CPU 优化）**

注意：更多线程不一定更快。
如果 CPU 已经满了，更多线程可能只会增加 context switching 和 lock contention。

---

## 7. IO-bound 优化

IO-bound 优化方式包括：

减少 round trip，batch 小请求，使用 async IO，连接复用，添加数据库索引，缓存热点读，prefetch，read replica，denormalized read model，concurrency limit 和 backpressure。

**（PPT 8：IO 优化）**

并发对 IO-bound 常常有帮助，但不能无限增加。
否则会压垮数据库或下游服务。

---

## 8. Trade-offs

优化本质上是在资源之间转移成本。

Compression 节省网络，但消耗 CPU。
Cache 节省 CPU 或 IO，但消耗内存并带来一致性问题。
Index 加快读取，但增加写入成本。
Batching 提升吞吐，但可能增加延迟。

**（PPT 9：权衡）**

Staff 级回答要说清楚：我节省了什么资源，又付出了什么资源。

---

## 9. 总结回答

面试中可以这样说：

> 我会先用 profiling、tracing 和 metrics 判断系统是 CPU-bound 还是 IO-bound。
> 如果是 CPU-bound，我会优化算法、减少重复计算、减少 allocation、缓存或预计算结果，并谨慎并行。
> 如果是 IO-bound，我会减少 round trip、使用 async IO、batching、connection pooling、index、cache、concurrency limit 和 backpressure。
>
> Staff 级重点是优化必须匹配瓶颈，错误优化可能让系统更慢或更不稳定。

**（PPT 10：总结）**

谢谢大家。
