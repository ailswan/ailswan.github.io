 下面是 **直接可以念的 3 分钟左右英文稿子**，对应你做 **10 页 PPT** 的节奏。内容基于你上传的 News Feed 设计材料整理。

---

Hello everyone.
Today I’d like to walk through how to design a **News Feed** system.

A news feed is not just a list of recent posts.
At large scale, it becomes a personalized content delivery system.

The core question is:

**How do we deliver fresh, relevant, and safe content with low latency?**

**(PPT: Title Slide — Design News Feed)**

When I think about News Feed design, I usually break it down into five parts.

First, core user flows: creating posts, following users, and reading the feed.
Second, the data model: users, posts, relationships, and feed entries.
Third, feed generation strategy: push, pull, or hybrid.
Fourth, candidate generation, ranking, and personalization.
And finally, caching, privacy, scaling, and failure handling.

The main trade-off is:

**freshness vs relevance vs latency.**

**(PPT: Core Framework)**

Let’s start with the core flows.

Users can create posts, follow or friend other users, view a personalized feed, and interact with posts through likes, comments, shares, hides, or reports.

For APIs, I would expose:

```text
POST /api/posts
POST /api/relationships
GET /api/feed
POST /api/posts/{postId}/actions
```

Feed reads are the critical path because users open the feed frequently, and the response must be fast.

Likes, comments, shares, and analytics can often be processed asynchronously.

**(PPT: Core APIs)**

Now let’s look at the data model.

I would store posts separately from feed entries.

The post table is the source of truth.
It stores post ID, author ID, content, media IDs, visibility, created time, and status.

Then we need a relationship table to answer:

**Who does this user follow?**

We also need a reverse relationship table to answer:

**Who follows this author?**

That reverse relationship table is important for fanout.

Finally, we have a feed entry table.
This table stores posts that may appear in a user’s feed.

So the key idea is:

**posts are the source of truth, while feed entries are read-optimized copies.**

**(PPT: Data Model)**

Next is the most important part: feed generation.

There are two classic strategies.

The first is the **push model**, also called fanout-on-write.

When a user creates a post, the system finds eligible followers or friends and inserts the post into each follower’s feed.

This makes feed reads very fast because the feed is already precomputed.

But the downside is write amplification.
If a user has millions of followers, one post may require millions of feed writes.

**(PPT: Push Model)**

The second strategy is the **pull model**, or fanout-on-read.

When a user opens the feed, the system gets the users they follow, fetches recent posts, merges them, filters them, and ranks them.

This reduces write cost, but the read path becomes slower and more expensive.

**(PPT: Pull Model)**

In production, I would use a **hybrid model**.

For normal users, use push.
Their audience size is usually manageable, and this keeps feed reads fast.

For high-follower users, recommendations, and ads, use pull at read time.

This balances low-latency reads with manageable write cost.

The key idea is:

**News Feed design is about deciding what to precompute, what to fetch live, and what to rank dynamically.**

**(PPT: Hybrid Feed Generation)**

Now let’s talk about candidate generation and ranking.

A modern feed is not only from followees.

Candidates may come from friends, followed users, reposts, groups, recommendations, ads, and trending topics.

The pipeline looks like this:

```text
Candidate Generation
→ Filtering
→ Lightweight Ranking
→ ML Ranking
→ Re-ranking
→ Feed Assembly
```

Ranking signals may include recency, relationship strength, user interests, engagement probability, content quality, negative feedback, and safety signals.

The key idea is:

**candidate generation controls recall, and ranking controls what the user sees first.**

**(PPT: Candidate Generation and Ranking)**

Privacy is also critical.

A feed system must enforce visibility rules correctly.

For example: public posts, friends-only posts, group-only posts, blocked users, muted users, deleted posts, and region restrictions.

Even if we precompute feed entries at write time, I would still check privacy at read time.

Why?

Because relationships can change.
A user may block someone.
A post may be deleted.
Visibility may be updated.

So the key idea is:

**read-time privacy filtering prevents stale feed entries from leaking restricted content.**

**(PPT: Privacy Filtering)**

Caching is another important part.

We can cache feed entries, post objects, user metadata, relationship graph data, ranking features, and hot posts.

Media should be served through CDN.

But cache invalidation is hard because posts can be deleted, privacy can change, users can unfollow, and ranking features can update.

**(PPT: Caching Strategy)**

For the write path, I would decouple post creation from fanout.

The post service stores the post first, then publishes a post-created event.

Fanout workers consume the event and update feed stores asynchronously.

```text
Post Service
→ Queue
→ Fanout Workers
→ Feed Store
→ Cache Update
```

This keeps post creation fast and resilient.

**(PPT: Async Fanout Pipeline)**

For failure handling, the system should degrade gracefully.

If ranking fails, fall back to chronological order.
If recommendations fail, still show social posts.
If fanout is delayed, users may see a slightly stale feed, which is usually acceptable.

But delete, block, mute, and privacy changes need stronger correctness because they affect safety and privacy.

**(PPT: Failure Handling and Consistency)**

To summarize.

News Feed has two main flows: creating posts and reading feeds.

Posts are the source of truth.
Feed entries are denormalized read-optimized views.

A hybrid push-pull model works best at scale.
Push normal social posts.
Pull high-follower content, recommendations, and ads at read time.

Then apply privacy filtering, ranking, caching, and graceful degradation.

The final insight is:

**News Feed is not just a list of recent posts.
It is a low-latency personalized content delivery system combining social graph, ranking, caching, and privacy.**

Thank you.

**(PPT: Closing Insight — Personalized Feed at Scale)**
