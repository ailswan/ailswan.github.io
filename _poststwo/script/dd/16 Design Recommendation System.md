 Below is the **10-page PPT natural English voiceover script** for **Design Recommendation System**, ready to read directly. 

---

Hello everyone.
Today I’d like to walk through how to design a **Recommendation System**.

A recommendation system may look like a simple list of suggested items.

But at scale, it is really a personalized ranking platform.

It collects user behavior, generates candidate items, ranks them, learns from feedback, and continuously improves over time.

The core question is:

**How do we recommend the right item to the right user at the right time, while balancing relevance, latency, diversity, and freshness?**

**(PPT 1: Title Slide — Design Recommendation System)**

When I think about Recommendation System design, I usually break it down into five parts.

First, user behavior collection.
Second, the offline feature and model pipeline.
Third, candidate generation.
Fourth, ranking and re-ranking.
And finally, online serving, feedback loop, experimentation, cold start, and observability.

The main trade-off is:

**relevance vs latency vs diversity.**

If we only optimize relevance, the feed may become repetitive.
If we only optimize diversity, recommendations may become less accurate.
And if we make the model too complex, serving latency may become too high.

**(PPT 2: Core Framework)**

Let’s start with the core flows.

A user opens a surface, such as a home feed, product page, video page, or “You may also like” section.

The recommendation service receives the request.

It fetches user context, generates candidate items from multiple sources, ranks them, applies business and safety rules, and returns the final list.

At the same time, the system logs what was shown to the user.

Later, user actions like clicks, views, likes, purchases, skips, hides, and reports are collected as feedback events.

The key idea is:

**Recommendations are not a one-time prediction. They are a continuous feedback loop.**

**(PPT 3: Core User Flow)**

Now let’s talk about APIs.

I would separate recommendation serving from event tracking.

The serving API returns recommended items for a user and a surface.

For example, the user may request recommendations for the home feed, product page, or video page.

This API must be low latency.

The event tracking API records user behavior, such as clicks, views, purchases, likes, skips, or hides.

These events do not need to block the user request.

They can be processed asynchronously for feature updates, analytics, and future model training.

The feedback API lets users give explicit feedback, such as “not interested” or “hide this item.”

The key idea is:

**Serving must be fast. Event tracking can be asynchronous.**

**(PPT 4: Main APIs)**

Next is the data model.

I would store user profiles, item metadata, user events, features, and recommendation logs separately.

The user profile stores relatively stable information, such as region, language, and declared interests.

The item table stores item metadata, such as title, category, tags, creator, status, and creation time.

The user event table stores raw behavior signals.

For example, this user clicked this item, watched this video, purchased this product, or skipped this recommendation.

The feature store provides features for both training and online serving.

The recommendation log records what items were shown to the user, which model version was used, and which experiment group the request belonged to.

This is important because, later, we need to connect impressions to user actions.

The key idea is:

**User events are the raw signal. Features power the model. Recommendation logs make learning and debugging possible.**

**(PPT 5: Data Model)**

Now let’s look at the high-level architecture.

A recommendation system usually has two main pipelines.

The first is the offline pipeline.

It processes historical user behavior, builds training data, computes features, trains models, evaluates models, generates embeddings, and stores model versions.

The second is the online pipeline.

It receives a recommendation request, fetches user and context features, generates candidates, ranks them, applies re-ranking rules, returns the results, and logs the response.

The key idea is:

**Offline systems learn from history. Online systems serve recommendations in real time.**

**(PPT 6: Offline and Online Pipelines)**

Next is candidate generation.

In a large system, we may have millions or even billions of items.

We cannot rank every item for every request.

So candidate generation reduces the item universe to a smaller set, maybe a few hundred or a few thousand candidates.

There are multiple candidate sources.

Collaborative filtering recommends items based on similar users.

Content-based recommendation recommends items similar to what the user liked before.

Trending and popular sources recommend what is globally or regionally popular.

Social graph signals recommend items liked or shared by friends.

Recent behavior can recommend items related to what the user just viewed, searched, or purchased.

Sponsored items may also be inserted as a separate source.

The key idea is:

**Candidate generation optimizes for recall. It tries to find enough potentially relevant items for ranking.**

**(PPT 7: Candidate Generation)**

Now let’s talk about embeddings and similarity search.

Embeddings are commonly used for recommendation retrieval.

We can represent users and items as dense vectors.

A user embedding represents the user’s interests.

An item embedding represents the item’s content, category, behavior patterns, or semantic meaning.

Then we can use approximate nearest neighbor search to quickly find items that are close to the user’s interests.

This is very useful when the item catalog is large.

Instead of scanning every item, the system searches in vector space and retrieves similar items efficiently.

The key idea is:

**Embeddings help the system retrieve items based on meaning and behavior similarity, not only exact matching.**

**(PPT 8: Embeddings and Similarity Search)**

Next is ranking and re-ranking.

After candidate generation, we may have hundreds or thousands of candidate items.

The ranking model predicts how valuable each item is for the user.

The target depends on the product.

For a video app, the model may optimize watch time.

For an e-commerce app, it may optimize purchase probability.

For a feed, it may optimize click probability, engagement, retention, or long-term user value.

The model uses user features, item features, context features, and historical interaction signals.

But pure model ranking is not enough.

If we simply sort by model score, the user may see too many similar items, too many items from the same creator, too many old items, or unsafe content.

That is why we need re-ranking.

Re-ranking applies diversity, freshness, safety, deduplication, creator fairness, exploration, and business rules.

For example, we may avoid showing ten videos from the same creator in a row.

The key idea is:

**Ranking predicts value. Re-ranking improves the final user experience.**

**(PPT 9: Ranking and Re-ranking)**

Finally, let’s discuss feedback loop, cold start, scaling, and observability.

The feedback loop is the heart of the system.

User actions are collected as events.

Positive signals include clicks, likes, shares, purchases, and long watch time.

Negative signals include skips, hides, short watch time, reports, and “not interested.”

These events update real-time features, generate training data, and improve future models.

Cold start is another major challenge.

For new users, we do not have behavior history.

So we can use onboarding preferences, location, language, device, demographic-level recommendations, and trending content.

For new items, we do not have engagement data.

So we can use content metadata, item embeddings, creator reputation, and controlled exploration traffic.

A recommendation system also needs exploration and exploitation.

Exploitation shows items the model already believes the user will like.

Exploration shows uncertain or new items to discover new interests and collect training data.

In practice, most of the feed can be high-confidence ranked items, with a small portion reserved for exploration.

For scaling, I would use a multi-stage pipeline.

Precompute user embeddings, item embeddings, similar items, popular lists, and candidate pools.

Cache hot features and popular recommendations.

Separate offline training from online serving.

Use stream processing to update recent behavior and trending signals.

For failure handling, the system should degrade gracefully.

If the ranking model fails, fall back to cached recommendations, trending items, or a simpler ranking model.

If one candidate source times out, use other candidate sources.

For consistency, most features can be eventually consistent.

It is okay if a recent click updates recommendations a few seconds later.

But privacy settings, blocked content, removed items, safety policy decisions, and experiment assignment must be enforced correctly at serving time.

For observability, I would monitor both system health and recommendation quality.

System metrics include recommendation latency, candidate generation latency, feature store latency, ranking latency, error rate, cache hit rate, fallback rate, and model timeout rate.

Quality metrics include click-through rate, conversion rate, watch time, retention, diversity, freshness, negative feedback rate, coverage, and novelty.

**(PPT 10: Feedback, Scaling, Observability, and Closing Insight)**

To summarize.

A recommendation system is a feedback-driven personalized ranking platform.

The offline pipeline collects user events, computes features, trains models, evaluates them, and deploys model versions.

The online pipeline generates candidates, fetches features, ranks items, re-ranks for diversity and safety, returns recommendations, and logs what was served.

Candidate generation optimizes recall.

Ranking optimizes precision.

Re-ranking improves user experience.

Feedback makes the system better over time.

The final insight is:

**A recommendation system is not just a model.
It is a continuous learning platform built from candidate generation, ranking, re-ranking, feedback loops, and experimentation.**

Thank you.
