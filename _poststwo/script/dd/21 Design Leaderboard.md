 Below is the **10-page PPT natural English voiceover script** for **Design Leaderboard**, ready to read directly. 

---

Hello everyone.
Today I’d like to walk through how to design a **Leaderboard System**.

A leaderboard may look like a simple ranking table.

But at scale, it is really a real-time ranking system.

The system needs to support score submissions, top rankings, user rank lookup, nearby rankings, global leaderboards, regional leaderboards, friend leaderboards, time-window rankings, anti-cheat validation, and final rewards.

The core question is:

**How do we support high-volume score updates and fast rank queries, while keeping final rankings fair and correct?**

**(PPT 1: Title Slide — Design Leaderboard)**

When I think about Leaderboard design, I usually break it down into five parts.

First, the score update model.
Second, the ranking query model.
Third, global, regional, and friend leaderboards.
Fourth, real-time versus batch leaderboards.
And finally, anti-cheat, rewards, scaling, consistency, and failure handling.

The main trade-off is:

**latency vs accuracy vs scalability.**

Real-time displayed rank can often be eventually consistent.
But final rewards and competition results require stronger correctness.

**(PPT 2: Core Framework)**

Let’s start with the core APIs.

The system needs an API to submit a score.

It also needs an API to get the top rankings, for example the top 100 users.

It needs an API to get a user’s own rank.

And it needs an API to get nearby rankings around a user.

For example, if I am ranked number 500, I may want to see the users ranked from 490 to 510.

The most important read patterns are top-N queries, user-rank queries, and nearby-rank queries.

The key idea is:

**A leaderboard is not only about showing the top users.
It also needs to quickly answer where a specific user ranks.**

**(PPT 3: Main APIs)**

Next is the data model.

I would separate current score, score events, leaderboard configuration, and rewards.

The current score table stores the latest score used for ranking.

The score event table stores every score submission.

This is important for audit, debugging, anti-cheat review, and rebuilding the leaderboard if needed.

The leaderboard configuration defines the game mode, region, time period, and ranking rule.

For example, one leaderboard may be for weekly ranked mode in North America.

Another leaderboard may be for a monthly global event.

The reward table stores reward distribution results after the leaderboard is finalized.

The key idea is:

**Current score supports fast ranking. Score events provide durable history and auditability.**

**(PPT 4: Data Model)**

Now let’s talk about score updates.

Score update logic depends on the ranking rule.

In some games, the highest score wins.

In other systems, the latest score wins.

Sometimes total accumulated score wins.

And for racing or challenge systems, the fastest completion time may win.

For example, if the rule is highest score wins, and the user’s current score is 9,000, a new score of 9,850 should update the leaderboard.

But if the new score is 8,500, we should ignore it because it does not improve the user’s ranking.

Before updating the leaderboard, the system should validate the score.

Then it should write a score event.

Only after that should it update the ranking index if the score changes the ranking.

The key idea is:

**Score update rules must match the competition rule, not every submitted score should change the ranking.**

**(PPT 5: Score Update Flow)**

Next is ranking storage.

A simple SQL database can support small leaderboards.

You can sort by score and return the top users.

But at large scale, this becomes expensive.

It is also hard to efficiently query a user’s rank.

For real-time leaderboards, I would use a sorted ranking structure, such as Redis Sorted Set.

Redis Sorted Set is a natural fit because it stores users ordered by score.

It supports fast score updates, top-N queries, user rank lookup, and nearby-rank queries.

But Redis is memory-based, so we still need durable score events outside Redis.

That way, if Redis fails or needs to be rebuilt, we can replay the score events.

The key idea is:

**Use Redis Sorted Sets for real-time ranking, but keep score events as durable truth.**

**(PPT 6: Ranking Storage)**

Now let’s discuss different leaderboard types.

A global leaderboard includes all users.

It is exciting, but difficult to scale because it can become very large and very hot.

A regional leaderboard partitions users by region.

For example, North America, Europe, and Asia-Pacific can each have their own leaderboard.

This reduces scale pressure and often feels more relevant to users.

A friend leaderboard is different.

Usually, we fetch the user’s friend list, look up each friend’s score, and sort that smaller set.

For very active users, we may precompute friend leaderboards.

The key idea is:

**Global leaderboards are harder to scale. Regional and friend leaderboards are often more practical and more relevant.**

**(PPT 7: Global, Regional, and Friend Leaderboards)**

Next is time-window leaderboards.

Many leaderboards are not permanent.

They may be daily, weekly, monthly, seasonal, or event-based.

I would create separate ranking data for each time window.

For example, today’s leaderboard is separate from this week’s leaderboard.

This makes expiration, finalization, and reward distribution easier.

At the end of a period, the system freezes the leaderboard, validates top scores, calculates final ranks, creates reward records, distributes rewards, and archives the result.

The key idea is:

**Real-time leaderboard state is for engagement. Finalized leaderboard state is for rewards and history.**

**(PPT 8: Time-window Leaderboards and Rewards)**

Now let’s talk about large-scale challenges.

A single huge leaderboard may not fit on one node.

One approach is to partition by region or game mode.

This is usually the simplest and most useful strategy.

Another approach is to shard by user ID.

Each shard stores a partial leaderboard.

To get the global top users, the system gets top results from each shard and merges them.

This distributes writes, but makes exact global rank harder.

For exact global rank, the system needs to know how many users across all shards have a higher score.

That can be expensive.

So in very large systems, we may show approximate real-time rank online, and compute exact final rank offline.

The key idea is:

**Top-N is easy in one sorted set. Exact global rank becomes harder after sharding.**

**(PPT 9: Scaling and Rank Query Challenges)**

Finally, let’s talk about anti-cheat, consistency, failure handling, and observability.

Leaderboard rewards create incentives to cheat.

So the system should not blindly trust client-submitted scores.

It should validate scores using server-side events, game rules, completion time, device signals, replay validation, and anomaly detection.

Suspicious scores can be quarantined and excluded from final rewards until review.

For consistency, real-time displayed ranks can be eventually consistent.

A user seeing their rank update a few seconds late is usually acceptable.

But final rank calculation, reward distribution, anti-cheat decisions, and idempotency records require stronger correctness.

For failure handling, score submission should be idempotent.

Score events should be persisted durably.

If Redis is unavailable, the system can retry updates or rebuild the leaderboard from events later.

For read failures, the system can return cached top rankings.

Reward distribution must also be idempotent so users do not receive duplicate rewards.

For observability, I would monitor score submission rate, score update latency, rank query latency, Redis memory usage, sorted set size, top-N cache hit rate, duplicate submission count, suspicious score count, reward job failures, and leaderboard rebuild time.

**(PPT 10: Anti-cheat, Failure Handling, and Closing Insight)**

To summarize.

A leaderboard system is a real-time ranking system.

It must support high-volume score submissions, fast top-N queries, user-rank lookup, nearby-rank queries, and time-window rankings.

For real-time ranking, Redis Sorted Sets are a strong choice.

But every score submission should also be persisted as an immutable event for audit and rebuild.

Global leaderboards are harder to scale, while regional and friend leaderboards are often more practical.

Real-time ranks can be eventually consistent.

But final rewards require stronger correctness, score validation, and anti-cheat review.

The final insight is:

**A leaderboard is not just sorting users.
It is a real-time ranking system with durable score history, anti-cheat validation, time-window finalization, and reward correctness.**

Thank you.
