 Hello everyone.
Today I’d like to walk through how to design a **Twitter Timeline** system.

At first glance, a timeline looks like a simple list of tweets.
But at large scale, it becomes a fanout, caching, ranking, and consistency problem.

The core question is:
**How do we deliver fresh and relevant tweets with low latency to millions of users?**

**(PPT: Title Slide — Design Twitter Timeline)**

When I think about Twitter Timeline design, I usually break it down into five parts.

First, core user flows: posting tweets, following users, and reading timelines.
Second, the data model: users, tweets, follow graph, and timeline entries.
Third, timeline generation strategy: fanout-on-write, fanout-on-read, or hybrid.
Fourth, ranking and personalization.
And finally, caching, scaling, and failure handling.

The main trade-off is:
**freshness vs latency vs storage cost**.

**(PPT: Core Framework)**

Let’s start with the core flows.

Users can post tweets, follow or unfollow other users, view their home timeline, and view a user’s profile timeline.

The home timeline is the harder part, because it depends on the follow graph.
The profile timeline is simpler, because it only contains tweets from one author.

For APIs, I would expose:

```text
POST /api/tweets
POST /api/follow
GET /api/timeline/home
GET /api/timeline/profile
```

The key idea is:
**posting tweets is important, but reading timelines is the latency-critical path.**

**(PPT: Core APIs)**

Now let’s look at the data model.

I would store tweets separately from timeline entries.

The tweet table is the source of truth.
It stores tweet ID, author ID, content, media IDs, created time, and status.

Then we need a follow table to answer:
**who do I follow?**

We also need a reverse follow table to answer:
**who follows this author?**

That second table is important for timeline fanout.

Finally, we have a home timeline table.
This stores precomputed timeline entries for each user.

So the key idea is:
**tweets are the source of truth, while timeline entries are read-optimized copies.**

**(PPT: Data Model)**

Next is the most important part: timeline generation.

There are two classic strategies.

The first is **fanout-on-write**.

When a user posts a tweet, the system finds all followers and pushes that tweet into each follower’s home timeline.

This makes reads very fast, because the timeline is already precomputed.

But the downside is write amplification.
If a celebrity has millions of followers, one tweet may require millions of timeline writes.

**(PPT: Fanout-on-Write)**

The second strategy is **fanout-on-read**.

When a user opens the timeline, the system gets all followees, fetches their recent tweets, merges the results, and ranks them.

This avoids massive writes when a celebrity posts.
But the read path becomes slower and more expensive.

**(PPT: Fanout-on-Read)**

In production, I would use a **hybrid approach**.

For normal users, use fanout-on-write.
Their follower count is usually manageable, and this keeps reads fast.

For celebrity users, use fanout-on-read.
We do not want to push one tweet into millions of timelines.

At read time, we merge precomputed timeline entries with recent tweets from celebrity accounts.

The key idea is:
**timeline design is about choosing where to pay the cost — at write time or read time.**

**(PPT: Hybrid Fanout)**

Now let’s walk through the home timeline read flow.

When a user opens the timeline, the timeline service first checks cache.
Then it fetches precomputed timeline entries.
Then it pulls recent tweets from celebrity followees.
After that, it merges all candidates, ranks or sorts them, and returns the timeline page.

**(PPT: Home Timeline Read Flow)**

Caching is critical here.

We can cache home timeline entries, tweet objects, user profile metadata, follow graph data, and celebrity recent tweets.

For media, we should use CDN.

For ranking, we can start with chronological order.
Later, we can add ranking signals such as recency, engagement, relationship strength, user interests, and content safety.

The key idea is:
**retrieval gets candidates, ranking decides what the user sees first.**

**(PPT: Caching and Ranking)**

For scaling, I would decouple tweet creation from fanout.

The tweet service stores the tweet first, then publishes a tweet-created event to a queue.

Fanout workers consume the event and update followers’ timeline stores asynchronously.

This improves write latency and makes the system more resilient.

```text
Tweet Service
→ Queue
→ Fanout Workers
→ Timeline Store
→ Cache Update
```

**(PPT: Async Fanout Pipeline)**

For storage, I would shard the timeline store by user ID, because timeline reads are usually per user.

The system should also degrade gracefully.

If ranking fails, fall back to chronological order.
If fanout is delayed, users may see slightly stale timelines, which is usually acceptable.
If timeline entries are missing, we can rebuild them from the tweet store, because tweets are the source of truth.

**(PPT: Failure Handling)**

To summarize.

Twitter Timeline has two main flows: publishing tweets and reading timelines.

The tweet store is the source of truth.
The timeline store is a denormalized, read-optimized view.

For normal users, fanout-on-write keeps timeline reads fast.
For celebrity users, fanout-on-read avoids massive write amplification.
A hybrid approach gives the best balance.

The final insight is:

**Twitter Timeline is not just a feed list.
It is a large-scale fanout, caching, and ranking system.**

Thank you.

**(PPT: Closing Insight — Push, Pull, and Rank at Scale)**
