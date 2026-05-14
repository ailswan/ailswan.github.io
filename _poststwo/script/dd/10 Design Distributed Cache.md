 下面是 **10 页 PPT 对应的自然英文口播稿**，可以直接念，English-only。内容基于你上传的 Distributed Cache 设计材料整理。

---

Hello everyone.
Today I’d like to walk through how to design a **Distributed Cache**.

A distributed cache stores frequently accessed data in memory.

The goal is to reduce database load and improve read latency.

But a distributed cache is not just faster storage.

At scale, we need to think about partitioning, replication, consistency, invalidation, hot keys, cache stampede, and failure handling.

The core question is:

**How do we serve hot data with very low latency, while keeping the database as the source of truth?**

**(PPT 1: Title Slide — Design Distributed Cache)**

When I think about Distributed Cache design, I usually break it down into five parts.

First, the purpose of cache and where to place it.
Second, caching strategies, such as cache-aside, read-through, and write-through.
Third, data partitioning, replication, TTL, and eviction.
Fourth, consistency, invalidation, hot key, and cache stampede handling.
And finally, scaling, failure handling, observability, and security.

The main trade-off is:

**latency vs consistency vs cost.**

**(PPT 2: Core Framework)**

Let’s start with cache placement.

There are two common places to put cache.

The first is a local in-process cache.

This lives inside the application process.

It is extremely fast because there is no network call.

It works well for small, frequently accessed, mostly static data.

But the downside is that memory is duplicated across application instances, and invalidation becomes harder.

The second option is a server-side distributed cache, such as Redis or Memcached.

This cache cluster is shared by multiple services.

It has centralized capacity and is easier to manage across services, but each access requires a network call.

In many production systems, we use a multi-layer cache.

First, check local cache.
Then check distributed cache.
Then fall back to the database.

The key idea is:

**Local cache gives the lowest latency. Distributed cache gives shared capacity. The database remains the source of truth.**

**(PPT 3: Cache Placement)**

Now let’s talk about caching strategies.

The most common pattern is **cache-aside**, also called lazy loading.

The application first checks the cache.

If the data is found, return it.

If the data is missing, the application reads from the database, writes the result back to cache, and then returns the response.

This pattern is simple and works well for read-heavy systems.

But cache misses are slower, stale data is possible, and hot keys may cause cache stampede.

**(PPT 4: Cache-aside Strategy)**

There are other strategies too.

In a read-through cache, the application talks to the cache, and the cache loads from the database on a miss.

This simplifies application logic, but makes the cache layer more complex.

In a write-through cache, writes go to the cache, and the cache writes synchronously to the database.

This improves consistency, but increases write latency.

In a write-behind cache, writes go to the cache first, and the database is updated asynchronously.

This is fast, but risky if the cache fails before data is persisted.

For most backend systems, I would start with cache-aside.

The key idea is:

**Cache-aside is simple and keeps the database as the source of truth.**

**(PPT 5: Caching Strategies)**

Next is data partitioning.

A single cache node cannot hold all data or serve all traffic.

So we need to distribute keys across multiple nodes.

A simple approach is hash-based partitioning.

But when nodes are added or removed, many keys may move to different nodes.

That causes cache misses and operational pain.

A better approach is consistent hashing or rendezvous hashing.

These strategies reduce key movement when the cluster changes.

They allow the cache cluster to scale horizontally.

The key idea is:

**Consistent hashing helps distribute keys while minimizing disruption during scaling.**

**(PPT 6: Data Partitioning)**

Now let’s discuss replication, TTL, and eviction.

Replication improves availability.

For important cache entries, we can store copies on multiple nodes.

If one cache node fails, the system can read from a replica or fall back to the database.

Because the database is still the source of truth, cache replication can usually be asynchronous.

TTL is also important.

TTL means each cache entry expires automatically after a certain time.

This prevents stale data from living forever.

For example, user profile data may have a short TTL, while product catalog data may have a longer TTL.

When memory is full, the cache needs an eviction policy.

Common options are LRU, which removes the least recently used item, and LFU, which removes the least frequently used item.

I would also add TTL jitter.

That means adding small randomness to expiration times.

This prevents many keys from expiring at exactly the same time.

The key idea is:

**TTL controls freshness. Eviction controls memory. TTL jitter reduces synchronized expiration.**

**(PPT 7: Replication, TTL, and Eviction)**

Next is consistency and invalidation.

The hard problem is this:

The database gets updated, but the cache may still contain the old value.

For cache-aside, a common pattern is:

Update the database first.
Then delete the cache key.

The next read will miss the cache, load the latest value from the database, and refill the cache.

This is simple and keeps the database as the source of truth.

In larger systems, invalidation can be event-driven.

For example, after a database update, the system publishes an invalidation event.

Cache invalidation workers receive the event and delete related cache keys.

The key idea is:

**Cache consistency is usually eventual, but invalidation must be designed carefully.**

**(PPT 8: Consistency and Invalidation)**

Now let’s talk about two common cache problems: cache stampede and hot keys.

Cache stampede happens when a hot key expires.

Suddenly, many requests miss the cache at the same time and hit the database.

This can overload the database.

To prevent this, we can use request coalescing, where only one request rebuilds the cache while others wait.

We can use a distributed lock.

We can serve stale data while refreshing the cache in the background.

And we can use TTL jitter to avoid many keys expiring together.

A hot key is different.

A hot key means one key receives extremely high traffic.

For example, a celebrity profile, a popular product launch page, or homepage configuration.

Even if the cache cluster is large, one hot key can overload a single node.

To handle hot keys, we can replicate hot keys, use local cache, split one logical key into multiple physical copies, or use edge caching for public data.

The key idea is:

**Cache stampede overloads the database. Hot keys overload cache nodes.**

**(PPT 9: Cache Stampede and Hot Keys)**

Finally, let’s discuss failure handling, observability, and security.

A cache is an optimization layer.

Unless we explicitly design it as a durable cache, it should not be the source of truth.

If the cache fails, the system should still work, but with higher latency.

We should use short timeouts, circuit breakers, fallback to database, stale reads when acceptable, and rate limiting to protect the database.

Observability is critical.

I would monitor cache hit rate, miss rate, latency, memory usage, eviction count, expired keys, hot key distribution, replication lag, error rate, and database fallback traffic.

A sudden drop in hit rate or a spike in database fallback traffic may mean the cache is unhealthy or TTL configuration is wrong.

Security also matters.

A distributed cache may contain sensitive data.

I would restrict access by service and key namespace, encrypt traffic, avoid storing secrets unless necessary, support tenant isolation, audit admin operations, and validate keys and values to prevent cache poisoning.

**(PPT 10: Failure Handling, Observability, Security, and Closing Insight)**

To summarize.

A distributed cache is a low-latency key-value layer in front of the database.

The database remains the source of truth.

For most systems, I would start with cache-aside.

I would use consistent hashing to distribute keys, asynchronous replication for availability, TTL and eviction policies for memory control, and event-based invalidation for larger systems.

To handle cache stampede, I would use request coalescing, distributed locks, stale-while-revalidate, and TTL jitter.

To handle hot keys, I would use local cache, hot key replication, key splitting, or edge caching.

The final insight is:

**A distributed cache is not just a faster database.
It is a low-latency, scalable, and failure-tolerant traffic protection layer in front of the source of truth.**

Thank you.
