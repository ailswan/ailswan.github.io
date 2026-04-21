🎬 🎤 English YouTube Script (Load Balancing)
🎯 Opening
Hello everyone.Today I’d like to walk through how to think about load balancing in system design.
Load balancing is not just about distributing traffic.It’s really about where you place intelligence in your system,and how you balance performance, flexibility, and complexity.
(scroll to framework)

🎯 1. Core Framework
When I think about load balancing,I usually break it down into three dimensions:
First, L4 vs L7 load balancing.Second, server-side vs client-side load balancing.And third, the trade-offs between performance, flexibility, and complexity.
Let’s go through them one by one.

🧱 2. L4 vs L7 Load Balancing
(scroll to L4)
Let’s start with L4 load balancing.
L4 operates at the transport layer —it routes traffic based on IP and port.
This makes it extremely fast.There’s minimal parsing, low latency, and very high throughput.
(scroll to limitation)
But it comes with limitations.It has no understanding of request content,so it cannot route based on URL, headers, or cookies.
(scroll to takeaway)
So the key idea is:L4 is optimized for performance, not intelligence.

(scroll to L7)
Now let’s look at L7 load balancing.
L7 operates at the application layer,typically HTTP or HTTPS.
This allows it to route based on request semantics —things like paths, headers, or user sessions.
(scroll to capability)
For example,you can route /api and /images differently,or enable A/B testing and canary releases.
(scroll to limitation)
But this flexibility comes at a cost.It introduces higher latency and CPU overhead,because every request needs to be parsed.
(scroll to takeaway)
So the key idea here is:L7 provides flexibility and intelligence, but at a higher cost.

(scroll to summary)
So in summary:
L4 is fast but simple.L7 is flexible but heavier.

🔄 3. Server-side vs Client-side Load Balancing
(scroll to server-side)
Next, let’s talk about server-side load balancing.
This is the classic model:
Client → Load Balancer → Service instances.
All routing decisions are centralized.
(scroll to advantage)
This makes the system easier to manage.Clients stay simple, and control is centralized.
(scroll to limitation)
But it introduces an extra network hop,which adds latency and can become a bottleneck.
(scroll to takeaway)
So the key idea is:Server-side load balancing simplifies architecture, but adds overhead.

(scroll to client-side)
Now let’s look at client-side load balancing.
Here, the client queries a service registry,and directly calls a service instance.
(scroll to advantage)
This removes the extra hop,which improves latency and scalability.
(scroll to challenge)
But it increases complexity.
The client now needs to handle:service discovery, retries, and load balancing logic.
(scroll to takeaway)
So the key idea is:Client-side improves performance, but shifts complexity to the client.

⚡ 4. Trade-offs & Real System Design
(scroll to decision)
So how do we choose?
When you need ultra-low latency and high throughput,L4 is usually the right choice.
When you need smart routing or user-level logic,L7 becomes essential.
When you want to optimize service-to-service calls,client-side load balancing can reduce latency significantly.

(scroll to hybrid)
But in reality,most production systems use a hybrid approach.
Client → L7 Gateway → L4 Load Balancer → Services↑client-side (optional)
(scroll to insight)
The key idea is:different layers optimize for different goals.

🧠 5. Summary
(scroll to summary)
To summarize.
L4 solves performance problems.L7 solves routing and flexibility problems.Client-side load balancing solves scalability and latency problems.
In real systems,we usually combine all three approaches.

⭐ 6. Closing Insight
(scroll to closing)
To conclude.
Load balancing is not just about distributing traffic.It’s about where you place intelligence in your architecture.
L7 centralizes intelligence.Client-side distributes it.And L4 removes it for performance.
The real challenge is choosingthe right level of intelligence for each layer.
Thank you.

🎤 中文讲稿（负载均衡）
🎯 开场
大家好。今天我们来聊一聊，在系统设计中如何理解负载均衡。
负载均衡不仅仅是“分发流量”。更本质的问题是：系统的“智能”放在哪里，以及如何在性能、灵活性和复杂度之间做权衡。

🎯 1. 核心框架
在思考负载均衡时，我通常从三个维度来分析：
第一，L4 vs L7第二，Server-side vs Client-side第三，性能、灵活性和复杂度的权衡
我们一个一个来看。

🧱 2. L4 vs L7
先看 L4。
L4 工作在传输层，根据 IP + 端口 做转发。
优点是非常明显的：极致性能、低延迟、高吞吐。
但问题是：它完全不理解请求内容，不能根据 URL、Header、Cookie 做路由。
👉 核心结论：L4 是为性能而生，而不是为智能而生。

再看 L7。
L7 工作在应用层，可以基于 HTTP 请求内容进行路由。
比如：按 path 分流、按用户分流、灰度发布、A/B测试等。
但代价也很明显：需要解析请求 → 延迟更高、CPU开销更大
👉 核心结论：L7 提供灵活性，但需要付出性能成本。

总结一下：
L4 → 快但简单L7 → 灵活但更重

🔄 3. Server-side vs Client-side
先看 Server-side LB。
模式是：
Client → LB → Service
优点是：统一控制、客户端简单、易于管理
缺点是：多了一跳网络，可能带来延迟和瓶颈。
👉 核心结论：Server-side 简化系统，但增加路径成本。

再看 Client-side LB。
客户端直接通过服务发现，调用具体实例。
优点是：少一跳 → 延迟更低，扩展更自然
缺点是：客户端要承担更多逻辑：
服务发现
负载均衡
重试策略
👉 核心结论：Client-side 提升性能，但增加复杂度。

⚡ 4. 设计权衡
那实际怎么选？
超低延迟 / 高QPS → 用 L4
需要智能路由 → 用 L7
服务间调用优化 → 用 Client-side
但现实中，大多数系统都是组合使用：
Client → L7 网关 → L4 → Services↑client-side（可选）
👉 核心思想：不同层负责不同目标。

🧠 5. 总结
总结一下：
L4 解决性能问题L7 解决路由问题Client-side 解决扩展和延迟问题
在真实系统中，通常三者结合使用。

⭐ 6. 结尾思考
最后总结一句：
负载均衡的本质，不是简单分发流量，而是决定系统的“智能分布在哪里”。
L7 是集中式智能Client-side 是分布式智能L4 则是去智能换性能
真正的设计难点在于：在不同层选择合适的智能程度。
谢谢大家。
 
—————-
🧠 Load Balancing — Interview Answer (English)
🎯 30s Version (Concise)
When discussing load balancing, I usually think about it from three dimensions.
First, L4 vs L7 load balancing.L4 operates at the transport layer and is optimized for performance and high throughput,while L7 operates at the application layer and enables flexible routing based on request semantics, at the cost of higher latency.
Second, server-side vs client-side load balancing.Server-side centralizes routing and simplifies clients, but introduces an extra network hop.Client-side removes that hop and improves latency, but pushes complexity to the client and requires service discovery.
In practice, we usually adopt a hybrid approach —L7 at the edge for flexibility, L4 internally for performance,and sometimes client-side load balancing for service-to-service communication.

🔥 60–90s Version (Standard Interview Answer)
When discussing load balancing in system design,I usually break it down into three key dimensions.
First is L4 vs L7 load balancing.L4 operates at the transport layer and routes based on IP and port.It’s extremely fast, with low latency and high throughput,but it doesn’t understand request content.
L7, on the other hand, operates at the application layer and can route based on paths, headers, or cookies.This enables use cases like API routing, canary releases, and A/B testing,but introduces additional latency and CPU overhead.
Second is server-side vs client-side load balancing.Server-side load balancing places a load balancer between clients and services.It centralizes control and simplifies client logic,but adds an extra network hop and can become a bottleneck.
Client-side load balancing moves the routing logic into the client.The client queries a service registry and directly calls service instances.This improves latency and scalability,but increases complexity and requires service discovery.
In real-world systems,we typically use a hybrid approach —L7 load balancers at the edge for flexible routing,L4 internally for high performance,and client-side load balancing for service-to-service calls when needed.

⭐ Staff-Level Closing (加分句，一定要说)
Load balancing is not just about distributing traffic —it’s about where you place intelligence in the system.
L7 centralizes intelligence,client-side distributes it,and L4 removes it for performance.
The key design decision is choosingthe right level of intelligence at each layer of the architecture.

🎤 中文面试版（背诵）
🎯 30秒精简版
在系统设计中谈负载均衡，我一般从三个维度来分析。
第一是 L4 vs L7。L4 在传输层，性能极高，适合高吞吐场景；L7 在应用层，可以基于请求内容做灵活路由，但会增加延迟。
第二是 Server-side vs Client-side。Server-side 简化客户端，但多一跳；Client-side 延迟更低，但复杂度更高，需要服务发现。
在实际系统中，通常采用混合方案：边缘用 L7，内部用 L4，服务间调用可能用 client-side。

🔥 60–90秒标准版
在系统设计中讨论负载均衡时，我通常从三个维度来分析。
第一是 L4 vs L7。L4 工作在传输层，根据 IP 和端口转发，特点是性能极高、延迟低，但不理解请求内容。
L7 工作在应用层，可以基于 path、header、cookie 等做路由，支持 API 路由、灰度发布等能力，但会带来额外的性能开销。
第二是 Server-side vs Client-side。Server-side 在客户端和服务之间增加一层负载均衡器，优点是集中控制、客户端简单，但缺点是多一跳，可能带来延迟和瓶颈。
Client-side 则把路由逻辑放到客户端，客户端通过服务发现直接调用实例，可以降低延迟、提升扩展性，但复杂度更高，需要处理服务发现和负载均衡逻辑。
在实际系统中，通常采用混合架构：边缘使用 L7 做灵活路由，内部使用 L4 提供高性能，服务之间在必要时使用 client-side 负载均衡。

⭐ Staff级加分总结（强烈建议背）
负载均衡不仅仅是分发流量，本质上是系统中“智能”的放置位置问题。
L7 是集中式智能，Client-side 是分布式智能，L4 则是为了性能去掉智能。
真正的设计关键在于：在不同层选择合适的智能程度。
