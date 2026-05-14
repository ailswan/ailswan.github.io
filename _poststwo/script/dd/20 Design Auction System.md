 Below is the **10-page PPT natural English voiceover script** for **Design Auction System**, ready to read directly. 

---

Hello everyone.
Today I’d like to walk through how to design an **Auction System**.

An auction system may look like a simple bidding page.

But at scale, it is really a concurrency-sensitive allocation system.

The system needs to support auction creation, bid submission, real-time bid updates, auction closing, winner selection, payment, fraud prevention, and dispute handling.

The core question is:

**How do we process bids quickly and fairly, while guaranteeing correct winner selection?**

**(PPT 1: Title Slide — Design Auction System)**

When I think about Auction System design, I usually break it down into five parts.

First, the auction and item model.
Second, the bidding flow.
Third, the auction state machine.
Fourth, real-time updates and winner selection.
And finally, payment, fraud prevention, scaling, consistency, and failure handling.

The main trade-off is:

**latency vs correctness vs fairness.**

Auction browsing can be eventually consistent.
But bid acceptance and winner selection must be strongly correct.

**(PPT 2: Core Framework)**

Let’s start with the core concepts.

An auction has an item, a seller, a start time, an end time, a reserve price, a minimum bid increment, a current highest bid, and a status.

A bid has a bidder, an auction ID, a bid amount, a timestamp, and a status.

The reserve price is the minimum price required for the auction to succeed.

The bid increment defines how much higher the next bid must be compared with the current highest bid.

For example, if the current highest bid is 100 dollars and the minimum increment is 5 dollars, the next valid bid must be at least 105 dollars.

The key idea is:

**Every bid must be validated against auction status, end time, current highest bid, reserve price, and increment rules.**

**(PPT 3: Auction and Bid Model)**

Now let’s talk about APIs.

The system needs APIs to create an auction, get auction details, place a bid, view bid history, and close an auction.

The most critical API is **place bid**.

When a user places a bid, the system must validate that the auction is active, the auction has not ended, and the bid amount is high enough.

If the bid is valid, the system updates the current highest bid and records the bid history.

This API must also be idempotent.

Why?

Because the client may retry after a timeout.

If the same bid request is retried, the system should not create duplicate bid records or accidentally process the same bid twice.

The key idea is:

**Bid submission must be atomic, idempotent, and validated against the latest auction state.**

**(PPT 4: Main APIs)**

Next is the data model.

I would separate auction state, bid history, auction events, and payment records.

The auction table stores the current state of the auction.

For example: seller, item, start time, end time, reserve price, minimum increment, current highest bid, current winner, status, and version.

The bid table stores the immutable bid history.

Every accepted, rejected, outbid, or winning bid should be recorded.

The auction event table stores audit events, such as auction created, bid accepted, bid rejected, auction extended, auction closed, and winner selected.

The payment table tracks winner payment and settlement.

The key idea is:

**The auction row gives fast current state. The bid table gives complete audit history.**

**(PPT 5: Data Model)**

Now let’s discuss the auction state machine.

A typical auction starts in a scheduled state.

When the start time arrives, it becomes active.

Near the end, or when the closing process begins, it may move into closing.

After the auction ends, it becomes closed.

Then, if there is a valid winner, it moves to payment pending.

After payment succeeds, it becomes paid.

The auction may also be cancelled or failed.

A state machine is important because it prevents invalid transitions.

For example, the system should not accept bids after the auction is closed.

It should not close the same auction twice.

And it should never create multiple winners.

The key idea is:

**Auction lifecycle should be modeled as a state machine to protect correctness.**

**(PPT 6: Auction State Machine)**

Now let’s talk about bid placement.

The bid flow is simple from the user’s point of view.

The user submits a bid.

The system checks whether the auction is active.

It checks whether the current time is before the auction end time.

It checks whether the bid amount is at least the current highest bid plus the minimum increment.

Then it atomically updates the current highest bid.

If the update succeeds, the bid is accepted.

If the update fails, the bid is rejected because another higher bid may have already arrived.

This atomic update is the most important part.

Many users may bid at almost the same time, especially near the end of the auction.

Only one bid should become the latest highest bid.

The key idea is:

**Bid placement is a concurrency problem. Atomic update protects the highest bid.**

**(PPT 7: Bid Placement Flow)**

Next is concurrency and ordering.

Multiple bids may arrive within milliseconds.

Usually, the higher amount wins.

If two bids have the same amount, the earlier bid wins.

For normal auctions, conditional updates or optimistic locking can handle concurrency well.

But for very hot auctions, such as rare collectibles or popular event tickets, a single database row may become a bottleneck.

In that case, I would route all bids for the same auction to one partition, one actor, or one queue.

That way, bids for the same auction are processed sequentially in a deterministic order.

The key idea is:

**For normal auctions, use atomic writes. For hot auctions, use single-writer processing.**

**(PPT 8: Concurrency and Ordering)**

Now let’s talk about real-time updates and anti-sniping.

Users expect to see bid updates in real time.

When a bid is accepted, the system publishes an event.

Connected clients receive updates through WebSocket or server-sent events.

The UI can show the new highest bid, notify the previous bidder that they were outbid, and update the time remaining.

However, real-time UI updates can be eventually consistent.

The authoritative auction state still lives in the bid processing system.

Anti-sniping is another important feature.

Sniping means someone places a bid at the last second, leaving others no time to respond.

To make the auction fairer, the system can extend the auction if a valid bid arrives near the end.

For example, if a bid arrives in the final two minutes, extend the auction by another two minutes.

This extension should happen atomically with bid acceptance.

The key idea is:

**Real-time updates improve user experience, but authoritative bid processing controls correctness.**

**(PPT 9: Real-time Updates and Anti-sniping)**

Finally, let’s talk about winner selection, payment, scaling, and failure handling.

When the auction end time is reached, a closing worker should close the auction.

The worker validates that the auction is active, checks whether the highest bid meets the reserve price, marks the auction as closed, selects the winner, and starts the payment flow.

Winner selection must be idempotent.

If the closing worker retries, it must not create multiple winners.

Payment comes after winner selection.

For high-value auctions, the system may require a valid payment method before bidding, or even pre-authorize a deposit.

If the winner fails to pay, business rules may offer the item to the next highest bidder or cancel the auction.

Fraud prevention is also important.

The system should detect fake bids, shill bidding, bot bidding, bid shielding, non-paying winners, and account takeover.

Useful signals include suspicious IPs, same device as seller, abnormal bidding patterns, new accounts bidding too high, and repeated non-payment.

For scaling, I would separate read-heavy auction browsing from write-critical bid placement.

Auction pages can use cached read models.

Bid placement must always use authoritative auction state.

I would shard by auction ID and use single-writer processing for hot auctions.

For failure handling, bid APIs should be idempotent.

Accepted bids remain valid even if notification delivery fails.

If WebSocket disconnects, clients can fall back to polling.

If the closing worker is delayed, a reconciliation job can find ended auctions and close them.

For observability, I would monitor bid latency, bid success rate, bid rejection rate, auction close delay, payment failure rate, WebSocket delivery lag, hot auction QPS, fraud detection rate, and any double-winner incidents.

**(PPT 10: Winner Selection, Payment, Scaling, and Closing Insight)**

To summarize.

An auction system is a concurrency-sensitive allocation system.

Auction browsing is read-heavy and can use cached read models.

But bid placement, highest bid update, auction closing, and winner selection require strong correctness.

The system should validate every bid, update the highest bid atomically, keep immutable bid history, push real-time updates, and close auctions through an idempotent worker.

For hot auctions, single-writer processing helps guarantee deterministic bid ordering.

The final insight is:

**An auction system is not just a bidding page.
It is a high-concurrency state machine that must guarantee bid ordering, winner selection, payment correctness, and a full audit trail.**

Thank you.
