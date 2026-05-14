 

# 🎬 English YouTube Script

## Design URL Shortener  

---

## 🎯 Opening

Hello everyone.
Today I’d like to walk through how to design a **URL shortener**.

A URL shortener looks simple on the surface.

The user gives us a long URL, and we return a short URL.

But in system design, the real challenge is not just making the URL shorter.

The real challenge is building a **low-latency, highly available redirect system** with globally unique short codes.

**(PPT: Title Slide — Design URL Shortener)**

---

## 🎯 1. Core Framework

When I think about URL shortener design, I usually break it down into five parts.

First, **API design and core flows**.
Second, **short code generation**.
Third, **storage and data modeling**.
Fourth, **redirect path optimization and caching**.
And finally, **scaling, analytics, and abuse prevention**.

The main trade-off is:

**uniqueness vs latency vs availability**.

For URL creation, we need strong uniqueness.
For redirects, we need very low latency and high availability.

**(PPT: Core Framework — 5 Parts)**

---

## 🧱 2. Core Requirements and APIs

A URL shortener has two main flows.

The first flow is **create short URL**.

```http
POST /api/urls
```

The request includes the long URL, optional custom alias, and optional expiration time.

The response returns the short URL and short code.

**(PPT: Create Short URL API)**

The second flow is **redirect**.

```http
GET /{shortCode}
```

The service extracts the short code, looks up the original URL, checks expiration and status, and returns an HTTP redirect.

We may also support analytics:

```http
GET /api/urls/{shortCode}/stats
```

But the most important path is the redirect path.

It is usually much higher traffic than URL creation, so it must be extremely lightweight.

The key idea is:

**Creation needs correctness. Redirect needs speed and availability.**

---

## 🔢 3. Short Code Generation

Now let’s talk about short code generation.

There are a few common options.

The first option is hashing the long URL.

```text id="hbrcor"
hash(longUrl) → shortCode
```

This is simple, but collisions are possible, and the hash output may be too long.

The second option is a random Base62 code.

```text id="ytqagx"
random base62 string → abc123
```

This is easy to generate, but we need collision checks and retries.

The third option is auto-increment ID plus Base62 encoding.

```text id="p6uh0q"
ID = 125000
Base62(ID) = xY9a
```

This gives us compact and unique codes, but a single centralized ID generator can become a bottleneck.

My recommended approach is:

```text id="hdg9vx"
Distributed ID Generator
→ Base62 Encode
→ shortCode
```

For example, we can use a Snowflake-style ID generator, a dedicated ID service, or database sequence range allocation.

If we support custom aliases, we enforce uniqueness using a database constraint.

The key idea is:

**The hardest part is not Base62 encoding. The hard part is guaranteeing uniqueness at scale.**

**(PPT: Short Code Generation Options)**

---

## 🗄️ 4. Data Model

The core table is the URL mapping table.

```sql
url_mapping (
  short_code VARCHAR PRIMARY KEY,
  long_url TEXT NOT NULL,
  user_id VARCHAR,
  created_at TIMESTAMP,
  expires_at TIMESTAMP,
  status VARCHAR
)
```

**(PPT: URL Mapping Table)**

For analytics, I would use a separate click event table.

```sql
url_click_event (
  event_id VARCHAR PRIMARY KEY,
  short_code VARCHAR,
  clicked_at TIMESTAMP,
  user_agent TEXT,
  ip_hash VARCHAR,
  country VARCHAR,
  referrer TEXT
)
```

Why separate them?

Because the mapping table is latency-sensitive.

It serves the redirect path.

Analytics is write-heavy and can be processed asynchronously.

We do not want analytics writes to slow down redirects.

The key idea is:

**Keep the redirect mapping fast. Move analytics to an async pipeline.**

---

## ⚡ 5. Redirect Flow and Caching

The redirect flow looks like this:

```text id="9znojs"
User visits short URL
→ Redirect service extracts short code
→ Check cache
→ Query database on cache miss
→ Validate expiration and status
→ Return redirect
→ Emit analytics event asynchronously
```

**(PPT: Redirect Flow)**

For redirect type, I would use **302 by default**.

301 means permanent redirect, and browsers may cache it aggressively.

302 gives us more control.

It makes analytics easier, allows destination changes, and avoids permanent client-side caching issues.

Caching is one of the most important optimizations.

We cache:

```text id="cal3de"
shortCode → longUrl
```

Common cache layers include Redis, CDN or edge cache, and local in-memory cache for hot links.

But cache invalidation matters.

We need to handle expired links, updated destinations, deleted links, and abuse blocking.

A good strategy is to cache active mappings, align TTL with expiration time, invalidate cache on update or block, and use negative caching for missing short codes.

The key idea is:

**Redirect is read-heavy, so caching is critical, but TTL and invalidation must be carefully designed.**

---

## 📈 6. Scaling, Analytics, and Abuse Prevention

At scale, redirect traffic is much higher than creation traffic.

So I would optimize reads first using caching, read replicas, CDN, and global routing.

For short code generation, I would avoid a single database bottleneck by using distributed ID generation.

For analytics, I would publish click events asynchronously.

```text id="wudg1g"
Redirect request
→ Return redirect
→ Publish click event async
→ Queue or Kafka
→ Stream processing
→ Analytics database
```

**(PPT: Async Analytics Pipeline)**

For global scale, redirect services can be deployed close to users, with URL mappings replicated across regions.

The redirect path can tolerate eventual consistency, but the creation path needs stronger consistency for short code uniqueness.

Security is also important.

URL shorteners are often abused for phishing, malware, spam, and brute-force scanning.

So I would add rate limiting, safe browsing checks, domain blocklists, reserved aliases, and suspicious traffic monitoring.

The key idea is:

**A production URL shortener must optimize for speed, scale, and abuse prevention.**

---

## ⭐ Closing Insight

To summarize.

A URL shortener has two main flows: creating short URLs and redirecting users.

Creation needs globally unique short codes, usually generated with a distributed ID generator and Base62 encoding.

Redirect is read-heavy, so we optimize it with caching, low-latency storage, and high availability.

Analytics should be asynchronous so it does not slow down the redirect path.

The final insight is:

**A URL shortener is not just about making URLs shorter.
It is about building a highly available redirect system with globally unique identifiers.**

Thank you.

**(PPT: Closing Insight — Fast Redirects + Unique Short Codes)**
