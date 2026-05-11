 Scaling in System Design 
Hello everyone. Today I’d like to walk through how to think about scalability in system design.
Scalability is not just about adding more machines. It’s really about understanding where bottlenecks come from, choosing the right scaling strategies, and balancing trade-offs between performance, consistency, and cost.
(scroll to framework)

🎯 1. Core Scaling Framework
When thi。nking about scalability, I usually break it down into four dimensions:
First, horizontal versus vertical scaling. Second, stateless versus stateful components. Third, data layer scaling strategies. And fourth, auto-scaling and traffic spike handling.
Let’s go through them one by one.

🧱 2. Horizontal vs Vertical Scaling
(scroll to horizontal)
     start with horizontal scaling.
Horizontal scaling means adding more machines to distribute load. In most modern distributed systems, this is the preferred approach.
We typically scale out by adding more stateless service instances behind a load balancer. This improves availability, removes single-node bottlenecks, and fits naturally with cloud-native architectures.
(scroll to challenges)
Of course, it also introduces new challenges.
We need effective load balancing, stateless service design, and proper strategies for data distribution and rebalancing.
(scroll to vertical)
Now let’s look at vertical scaling.
Vertical scaling means increasing the CPU or memory of a single machine. It’s simple and doesn’t require distributed coordination.
(scroll to limitation)
However, it has clear limitations.
It’s bounded by hardware capacity, can introduce a single point of failure, and becomes increasingly expensive at higher tiers.
(scroll to takeaway)
So in practice, vertical scaling is often a short-term solution, while horizontal scaling becomes the long-term strategy.

🔄 3. Stateless vs Stateful Scaling
(scroll to stateless)
Next, stateless versus stateful components.
Stateless services are ideal for scaling. They don’t store session data locally, so instances can be added or removed dynamically without impacting correctness.
This makes them a natural fit for auto-scaling.
Typical examples include API layers, gateways, and ingestion services.
(scroll to stateful)
Stateful components are more complex.
They require sharding to distribute write load, replication to scale read traffic, and careful handling of rebalancing and data migration.
Examples include databases, caches, and message queues.
(scroll to insight)
So the key idea here is:
Stateless components scale easily, while stateful components require careful data partitioning and coordination.

🗄️ 4. Data Layer Scaling
(scroll to SQL)
Now let’s look at the data layer.
For traditional SQL databases, we typically scale reads using replicas.
However, writes are often constrained by a single primary node, which can become a bottleneck.
Sharding is possible, but it introduces significant complexity.
(scroll to NoSQL)
In contrast, distributed or NoSQL databases are designed for horizontal scaling from the beginning.
They use partitioning or hash-based distribution to scale out.
(scroll to risk)
But they also introduce new challenges, such as hot partitions and rebalancing overhead.
(scroll to takeaway)
So in practice, it’s important to continuously monitor data distribution and ensure that load stays balanced.

⚡ 5. Auto Scaling & Traffic Spikes
(scroll to autoscaling)
Now let’s talk about auto-scaling.
Scaling policies are usually based on metrics like CPU usage, memory usage, request rate, or latency.
When thresholds are exceeded, new instances are automatically provisioned. And during low traffic, we scale in to reduce cost.
(scroll to spikes)
However, auto-scaling is not instantaneous.
During sudden traffic spikes, we may see cold start delays and temporary overload.
(scroll to mitigation)
To handle this, we typically introduce buffering and protection mechanisms:
message queues to absorb bursts, rate limiting to protect the system, circuit breakers to prevent cascading failures, and gradual traffic shifting.
(scroll to insight)
The key idea is to stabilize the system first, while scaling mechanisms catch up.

🧠 6. Summary
(scroll to summary)
To summarize.
When thinking about scaling, it’s important to distinguish between stateless and stateful components.
Stateless services scale horizontally behind load balancers, while stateful components rely on sharding and replication.
At the same time, we need to monitor for uneven load distribution and proactively handle traffic spikes.
Scaling is not just about adding machines — it’s about maintaining balance, consistency, and efficiency as the system grows.

⭐ 7. Closing Insight
(scroll to closing)
To conclude.
Scaling is fundamentally about removing bottlenecks while preserving correctness.
The real challenge is not just scaling out, but scaling in a way that avoids hot partitions, reduces coordination overhead, and maintains system stability.
Thank you.

 
🎤 中文讲稿（系统设计中的扩展性）
大家好。 今天我想和大家一起聊一聊，在系统设计中如何思考扩展性。
扩展性不仅仅是“加机器”这么简单， 更重要的是理解系统的瓶颈在哪里，选择合适的扩展策略，以及在性能、一致性和成本之间做出合理的权衡。

🎯 1. 核心扩展框架
在思考扩展性时，我通常会从四个维度来分析：
第一，水平扩展和垂直扩展； 第二，无状态和有状态组件； 第三，数据层的扩展策略； 第四，自动扩缩容以及流量突发的处理。
我们可以一个一个来看。

🧱 2. 水平扩展 vs 垂直扩展
首先是水平扩展。
水平扩展指的是通过增加机器数量来分担负载。 在大多数现代分布式系统中，这是一种更常见的做法。
我们通常会在负载均衡器后面增加多个无状态服务实例。 这样不仅可以提升可用性，还可以避免单点瓶颈，同时也非常符合云原生架构的设计理念。
当然，它也会带来一些新的挑战。
比如需要良好的负载均衡机制， 需要服务本身是无状态的， 以及需要解决数据分布和重平衡的问题。
接下来是垂直扩展。
垂直扩展是通过提升单台机器的 CPU 或内存来提升能力。 它实现简单，也不需要分布式协调。
但它的限制也很明显：
受限于硬件上限， 可能成为单点故障， 而且成本会随着规格提升快速增长。
所以在实际中，垂直扩展通常作为短期方案， 而水平扩展更适合作为长期策略。

🔄 3. 无状态 vs 有状态扩展
接下来是无状态和有状态组件。
无状态服务是最容易扩展的。 它们不会在本地保存会话数据， 因此可以非常灵活地增加或减少实例，而不会影响系统正确性。
这类服务也非常适合自动扩缩容。
常见的例子包括 API 层、网关以及数据接入层。
相比之下，有状态组件就复杂得多。
它们通常需要通过分片来分担写入压力， 通过副本来扩展读取能力， 同时在扩容过程中还需要处理数据迁移和重平衡。
例如数据库、缓存和消息队列都属于这一类。
所以一个核心结论是：
无状态组件更容易扩展， 而有状态组件则需要精细的数据分布和协调机制。

🗄️ 4. 数据层扩展
再来看数据层。
对于传统的 SQL 数据库， 通常是通过增加读副本来扩展读取能力。
但写入往往集中在主节点， 这很容易成为瓶颈。
虽然可以通过分片来扩展写入， 但这会带来较高的复杂度。
而分布式数据库或者 NoSQL 系统， 从一开始就是为水平扩展设计的。
它们通常通过分区或者哈希分布来实现扩展。
但与此同时，也会带来新的问题， 比如热点分片，以及数据重分布的成本。
因此，在实际系统中， 我们需要持续监控数据分布情况， 确保负载是均衡的。

⚡ 5. 自动扩缩容与流量突发
接下来是自动扩缩容。
一般来说，我们会根据 CPU 使用率、内存、请求量或者延迟等指标来设置扩缩容策略。
当系统负载超过阈值时，会自动增加实例； 在流量下降时，则减少实例以节约成本。
但需要注意的是，自动扩缩容并不是即时生效的。
在流量突然增长时， 系统可能会经历一段时间的延迟或者过载。
为了解决这个问题，我们通常会引入一些缓冲和保护机制：
比如使用消息队列来缓冲流量， 使用限流来保护系统， 使用熔断器防止级联故障， 以及通过渐进式流量切换来平滑变化。
核心思路是：
在扩容完成之前，先让系统保持稳定。

🧠 6. 总结
总结一下。
在思考扩展性时， 我们需要区分无状态和有状态组件。
无状态服务可以通过负载均衡轻松水平扩展， 而有状态组件则依赖分片和副本机制。
同时，我们还需要关注负载是否均衡， 以及如何应对流量突发。
扩展性并不仅仅是增加机器， 而是在系统不断增长的过程中，保持整体的平衡、稳定和效率。

⭐ 7. 结尾思考
最后总结一句。
扩展性的本质，是在保证系统正确性的前提下，持续消除瓶颈。
真正的挑战，不是简单地扩容， 而是在扩展过程中避免热点问题、降低协调成本， 并始终保持系统的稳定性。
谢谢大家。

