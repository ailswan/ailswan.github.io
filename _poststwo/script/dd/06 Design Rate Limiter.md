 
---

Hello everyone.
Today I’d like to walk through how to design a **Rate Limiter**.

A rate limiter controls how many requests a client can make within a certain time window.

It protects backend services from abuse, traffic spikes, client bugs, and unfair resource usage.

The core question is:

**How do we enforce limits accurately, while keeping latency low and availability high?**

**(PPT: Title Slide — Design Rate Limiter)**

When I think about rate limiter design, I usually break it down into five parts.

First, what problem the rate limiter solves.
Second, common rate limiting algorithms.
Third, rate limit key design.
Fourth, storage and distributed rate limiting.
And finally, burst handling, failure behavior, and observability.

The main trade-off is:

**accuracy vs latency vs availability.**

**(PPT: Core Framework)**

Let’s start with where the rate limiter should sit.

In most systems, I would place it at the **API Gateway** layer.

The request flow is simple:

The client sends a request.
The request reaches the API Gateway.
The gateway checks the rate limit.
If the request is allowed, it goes to the backend service.
If the request is not allowed, the gateway rejects it before it reaches the backend.

When a request exceeds the limit, the system should return **HTTP 429: Too Many Requests**, usually with a **Retry-After** header.

The key idea is:

**Rate limiting should protect the backend without adding too much latency to normal requests.**

**(PPT: Gateway Integration)**

Now let’s talk about algorithms.

The simplest algorithm is the **fixed window counter**.

For example, we allow a user to make **100 requests per minute**.

This approach is simple, fast, and memory efficient.

But it has a boundary problem.

A client can send 100 requests at the end of one minute, and another 100 requests at the beginning of the next minute.

So in practice, the client may send 200 requests in just a few seconds.

That creates a burst much larger than the intended limit.

**(PPT: Fixed Window Counter)**

A more accurate algorithm is the **sliding window log**.

This stores the timestamp of every request.

For each new request, the system removes old timestamps, counts the remaining requests inside the window, and decides whether to allow the request.

This is very accurate.

But it uses more memory and compute, especially for high-QPS users.

**(PPT: Sliding Window Log)**

A practical compromise is the **sliding window counter**.

Instead of storing every request timestamp, it estimates the current request count using the current window and part of the previous window.

This avoids most fixed-window burst problems, while using much less memory than sliding window log.

**(PPT: Sliding Window Counter)**

Another very common algorithm is **token bucket**.

Each client has a bucket.

The bucket has a maximum capacity and a refill rate.

Each request consumes one token.

If the bucket has tokens, the request is allowed.
If the bucket is empty, the request is rejected or delayed.

Token bucket is useful because it allows controlled bursts, while still enforcing a long-term average rate.

For most API rate limiters, I would choose **token bucket** or **sliding window counter**.

The key idea is:

**Fixed window is simple.
Sliding window is more accurate.
Token bucket handles bursts better.**

**(PPT: Algorithm Comparison)**

Next, let’s talk about rate limit key design.

A rate limiter needs to know **who or what we are limiting**.

Sometimes we limit by user ID.
Sometimes we limit by API key.
Sometimes we limit by IP address.
Sometimes we limit by tenant.
And sometimes we limit by a specific endpoint.

In real systems, we often combine these dimensions.

For a checkout API, we may limit by **user plus endpoint**.
For a login API, we may limit by **IP address plus username**.
For a paid API, we may limit by **tenant or API key**.
For internal APIs, we may limit by **service name plus endpoint**.

This matters because different APIs need different fairness rules.

A login API is security-sensitive, so IP-based and username-based limits are useful.
A paid API is quota-sensitive, so tenant-level or API-key-level limits make more sense.

The key idea is:

**The rate limit key defines what “fair usage” means.**

**(PPT: Rate Limit Key Design)**

Now let’s discuss storage.

For the hot path, there are two common options.

The first option is **local in-memory counters** on gateway nodes.

This is extremely fast because there is no network call.

But it is not globally accurate, because each gateway only sees part of the traffic.

The second option is **Redis**.

Redis gives us centralized counters, TTL support, and atomic operations.

But it adds network latency and becomes an external dependency.

For Redis, I would use Lua scripts to make the check atomic.

The script reads the current counter, updates it, sets expiration when needed, and returns an allow-or-reject decision in one atomic operation.

This avoids race conditions under high concurrency.

**(PPT: Storage and Redis)**

In distributed systems, the same user’s traffic may hit multiple gateway nodes.

A centralized Redis limiter gives better global accuracy, but adds latency.

A local limiter is faster and more available, but less accurate.

So in production, I would often use a **hybrid approach**.

Use a local limiter for fast protection.
Use a Redis-based global limiter for stronger accuracy.

The key idea is:

**Local limiters optimize latency.
Global limiters improve accuracy.**

**(PPT: Distributed Rate Limiting)**

Burst handling is also important.

Some bursts are legitimate.

For example, a page load may trigger multiple API calls.
A mobile app may reconnect.
A batch job may start.

So I would use token bucket or layered limits.

For example, we can allow a user to make up to **20 requests per second**, but also cap them at **1,000 requests per hour**.

This allows short bursts, but prevents long-term abuse.

**(PPT: Burst Handling)**

Failure handling depends on the API.

If Redis is unavailable, should we allow traffic or reject traffic?

For normal user-facing APIs, I may fail open with a local emergency limit, so legitimate users are not blocked.

For security-sensitive APIs, like login or payment, I may fail closed or use a stricter local fallback.

I would also cache the last known configuration and use circuit breakers around Redis.

**(PPT: Fail Open vs Fail Closed)**

Observability is critical because rate limiters directly affect user traffic.

I would track allowed requests, rejected requests, limit hit rate, Redis latency, Redis errors, hot keys, config update latency, and false positive complaints.

Logs should include request ID, rate limit key, algorithm, limit, remaining quota, decision, and reason.

**(PPT: Observability)**

To summarize.

A rate limiter is not just a counter.

It is a low-latency distributed traffic control system.

I would place it at the API Gateway layer, use token bucket or sliding window counter, design keys carefully, and combine local limiters with Redis-based global limiters.

The final insight is:

**A rate limiter is not just about counting requests.
It is about enforcing fairness, protecting backend systems, and keeping the request path fast.**

Thank you.

**(PPT: Closing Insight — Low-Latency Distributed Traffic Control)**
