 
Hello everyone.
Today I’d like to walk through how to design an **Ad System**.

An ad system may look like a simple service that returns ads.

But at scale, it is really a real-time decision engine.

For every ad request, the system needs to choose the best ad within milliseconds, while considering targeting, relevance, bids, budgets, fraud, tracking, and user experience.

The core question is:

**How do we select the most relevant and valuable ad quickly, while respecting targeting rules, budget constraints, and billing correctness?**

**(PPT 1: Title Slide — Design Ad System)**

When I think about Ad System design, I usually break it down into five parts.

First, the core flow: ad request, candidate selection, ranking, auction, serving, and tracking.
Second, advertiser campaigns, creatives, and targeting rules.
Third, real-time ranking, auction, and budget pacing.
Fourth, tracking, attribution, billing, and analytics.
And finally, fraud detection, scaling, failure handling, consistency, and observability.

The main trade-off is:

**latency vs revenue vs relevance.**

The system must be fast enough to serve ads in real time, but smart enough to maximize advertiser value and maintain user experience.

**(PPT 2: Core Framework)**

Let’s start with the core entities.

The first entity is the advertiser.

An advertiser creates campaigns.

A campaign defines the budget, targeting rules, bid strategy, schedule, and objective.

Each campaign can have multiple ad creatives, such as image ads, text ads, video ads, or sponsored search results.

Targeting rules define who can see the ad.

For example, targeting can include location, device, demographics, interests, keywords, page context, or user behavior.

The system also tracks events.

The most important events are impressions, clicks, and conversions.

The key idea is:

**Campaigns define what advertisers want. Targeting defines who is eligible. Events measure what actually happened.**

**(PPT 3: Core Entities)**

Now let’s talk about APIs.

I would separate campaign management APIs from real-time serving APIs.

Advertisers use campaign APIs to create campaigns, define targeting rules, upload creatives, set bids, and configure budgets.

The most critical runtime API is the ad serving API.

When a user opens a page, searches a keyword, or views a feed, the client or backend sends an ad request.

The request may include the user ID, page context, search query, device type, location, placement, and other signals.

The ad serving API must respond very quickly, often within tens of milliseconds.

Tracking APIs are used to record impressions, clicks, and conversions.

Those APIs can usually be asynchronous because tracking should not block ad serving.

The key idea is:

**Ad serving is latency-critical. Tracking is throughput-critical.**

**(PPT 4: Main APIs)**

Next is the high-level architecture.

The ad request first reaches the ad request service.

Then the system retrieves candidate campaigns.

After that, the targeting filter removes campaigns that are not eligible.

The ranking service scores the remaining candidates.

The auction engine selects the winning ad or ads.

The budget service checks whether the campaign still has available budget.

Then the system returns the ad response.

In parallel, impression, click, and conversion events are sent to the tracking pipeline.

The tracking pipeline processes events for reporting, billing, attribution, fraud detection, and analytics.

The key idea is:

**The serving path must be extremely low latency, while the tracking path can be asynchronous and high-throughput.**

**(PPT 5: High-Level Architecture)**

Now let’s discuss candidate retrieval.

There may be millions of active campaigns, but only a small subset is relevant for a specific request.

We cannot scan every campaign for every ad request.

So candidate retrieval is basically a search problem.

A common approach is to build inverted indexes.

For example, location points to eligible campaigns.
Keywords point to eligible campaigns.
Interests point to eligible campaigns.
Device type points to eligible campaigns.

When a request comes in, the system uses these indexes to quickly retrieve a smaller candidate set.

Then the targeting filter applies more detailed rules.

The key idea is:

**Candidate retrieval reduces millions of campaigns into a small set of possible ads.**

**(PPT 6: Candidate Retrieval and Targeting)**

Next is targeting.

Targeting filters decide whether an ad is eligible for the current request.

Common filters include location, device, time of day, demographics, interests, keywords, frequency capping, campaign status, and budget availability.

To keep latency low, I would apply cheap filters first.

For example, filter by campaign status, location, device, and time before applying more expensive user-interest or behavior-based filters.

We can also precompute campaign eligibility and cache common targeting combinations.

The key idea is:

**Targeting eliminates irrelevant ads early, so ranking only handles meaningful candidates.**

**(PPT 7: Targeting System)**

Now let’s talk about ranking and auction.

After candidate retrieval and targeting, we still may have many eligible ads.

The ranking system decides which ads are most valuable to show.

A common score combines the advertiser’s bid, predicted click-through rate, and ad quality.

In simple terms, the system is not just asking, “Who bids the most?”

It is asking:

**Which ad is most likely to create value while preserving user experience?**

The auction engine then selects the winning ad or ads.

Some systems use first-price auctions, where the winner pays their bid.

Other systems use second-price auctions, where the winner pays based on the next highest bid.

The key idea is:

**Ranking balances bid, relevance, quality, and user experience.**

**(PPT 8: Ranking and Auction)**

Budget pacing is another critical part.

Advertisers have limited budgets.

If we simply serve the highest bidder as often as possible, a campaign may spend its entire daily budget in the morning.

That is usually not ideal.

Budget pacing controls how often a campaign is allowed to participate in auctions.

The goal is to spend the budget smoothly over time.

We can use techniques similar to rate limiting or token bucket.

For example, a campaign receives serving opportunities gradually throughout the day.

If it is underspending, we can increase participation.

If it is overspending, we can slow it down.

The key idea is:

**Budget pacing prevents campaigns from overspending too early and improves delivery control.**

**(PPT 9: Budget and Pacing)**

Finally, let’s talk about tracking, fraud detection, scaling, and failure handling.

Tracking records impressions, clicks, and conversions.

These events should be written to a streaming system, then processed for aggregation, billing, reporting, and attribution.

Attribution answers the question:

**Which ad should get credit for a conversion?**

The simplest model is last-click attribution.
More advanced systems may use first-click or multi-touch attribution.

Fraud detection is essential because ads involve money.

The system should detect click fraud, impression fraud, bot traffic, fake conversions, abnormal click rates, suspicious IP patterns, device anomalies, and conversion mismatches.

To scale, I would precompute as much as possible.

Precompute campaign features, user features, targeting eligibility, and popular candidate sets.

Cache aggressively.

Separate the low-latency serving path from the high-throughput analytics path.

For failure handling, the system should degrade gracefully.

If ranking fails, serve cached or default ads.
If candidate retrieval is slow, use cached candidates.
If tracking is delayed, retry asynchronously.
Tracking failures should not block ad serving.

Consistency is mixed.

Billing, budget, and payments require stronger correctness.
Analytics, reporting, targeting index updates, and campaign performance dashboards can be eventually consistent.

For observability, I would monitor ad request latency, QPS, fill rate, click-through rate, conversion rate, revenue per request, budget utilization, auction latency, tracking lag, and error rate.

**(PPT 10: Tracking, Fraud, Scaling, and Closing Insight)**

To summarize.

An ad system is a real-time decision engine.

For every request, it retrieves candidate campaigns, applies targeting filters, ranks eligible ads, runs an auction, checks budget, returns the winning ad, and logs events asynchronously.

The serving path must be extremely fast.

The tracking path must be reliable and scalable.

Budget and billing require strong correctness.

Analytics and reporting can be eventually consistent.

Fraud prevention is critical because the system directly affects money.

The final insight is:

**An ad system is not just about showing ads.
It is a real-time ranking, auction, budget pacing, and tracking system that makes revenue decisions within milliseconds.**

Thank you.
