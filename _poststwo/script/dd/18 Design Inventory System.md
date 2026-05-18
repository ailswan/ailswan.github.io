 

Hello everyone.
Today I’d like to walk through how to design an **Inventory System**.

An inventory system may look like a simple quantity table.

But in a real production system, it is much more than that.

It needs to track stock by SKU and location, support reservations during checkout, prevent overselling, handle returns and adjustments, and keep a full audit trail.

The core question is:

**How do we show inventory quickly to users, while preventing overselling during checkout?**

**(PPT 1: Title Slide — Design Inventory System)**

When I think about Inventory System design, I usually break it down into five parts.

First, the inventory data model: SKU, location, and quantity.
Second, the core flows: stock in, reserve, commit, and release.
Third, oversell prevention during checkout.
Fourth, multi-location inventory and order integration.
And finally, events, reconciliation, scaling, failure handling, and observability.

The main trade-off is:

**consistency vs availability vs latency.**

Product browsing needs to be fast and highly available.
But reservation and commit need stronger correctness.

**(PPT 2: Core Framework)**

Let’s start with the core concepts.

A SKU represents a sellable item variant.

For example, a T-shirt may have multiple SKUs: red size medium, red size large, blue size medium, and so on.

Inventory is also location-based.

The same SKU may exist in multiple warehouses, stores, fulfillment centers, or seller locations.

So I would model inventory at the **SKU-location level**.

For each SKU and location, we track quantities such as on-hand, reserved, unavailable, sold, damaged, and returned.

Available inventory is usually calculated as:

on-hand quantity minus reserved quantity minus unavailable quantity.

The key idea is:

**Inventory should be tracked by SKU and location, not just by product.**

**(PPT 3: SKU, Location, and Quantity)**

Now let’s talk about APIs.

The system needs APIs to get inventory, reserve inventory, commit inventory, release inventory, and adjust inventory.

Getting inventory is used by product pages, search results, and store availability views.

Reserve inventory is used during checkout.

Commit inventory is used after order or payment success.

Release inventory is used when payment fails, the order is cancelled, or the reservation expires.

Adjust inventory is used for warehouse receiving, manual correction, returns, damaged goods, or cycle count corrections.

The important point is:

**Reservation, commit, and release APIs must be idempotent, because order and payment systems may retry requests.**

**(PPT 4: Main APIs)**

Next is the data model.

I would separate inventory balance, inventory reservation, inventory events, and inventory snapshots.

The inventory balance table stores the authoritative quantity for each SKU and location.

The reservation table stores checkout holds.

For example, order 123 reserves two units of SKU 123 at warehouse 1.

The inventory event table stores every inventory change.

For example: inventory reserved, committed, released, adjusted, received, damaged, or returned.

The snapshot table is a read-optimized view used by product pages and search results.

The key idea is:

**The balance table is the source of truth. The event table gives us auditability. The snapshot table supports fast reads.**

**(PPT 5: Data Model)**

Now let’s discuss the reservation flow.

During checkout, we should not immediately mark inventory as sold.

Why?

Because payment may fail.
The user may cancel.
The checkout may timeout.

So instead, we reserve inventory first.

The flow is simple:

The user checks out.
The order service asks the inventory service to reserve stock.
The inventory service checks whether enough stock is available.
If there is enough stock, it increases the reserved quantity and creates a reservation record with an expiration time.

This reservation protects the stock while payment and order confirmation are still in progress.

The key idea is:

**Reserve first, commit later, release if the order fails or expires.**

**(PPT 6: Reservation Flow)**

Now let’s talk about commit and release.

If payment succeeds and the order is confirmed, the reservation should be committed.

That means the system decreases on-hand inventory and also decreases reserved inventory.

In plain English, the stock is now actually sold.

If payment fails, the order is cancelled, or the user abandons checkout, the reservation should be released.

That means reserved quantity decreases, and the stock becomes available again.

Reservations should also have expiration times.

A background worker can scan expired reservations and release them automatically.

This prevents abandoned checkouts from holding inventory forever.

The key idea is:

**Commit turns reserved stock into sold stock. Release makes reserved stock available again.**

**(PPT 7: Commit and Release Flow)**

Oversell prevention is the most important part of the system.

The main risk is that multiple customers try to buy the same SKU at the same time.

The critical operation is the reservation.

The reservation must atomically check availability and increase reserved quantity.

In practice, we can use conditional updates, optimistic locking, row-level locking, or a single-writer partition for hot SKUs.

For extremely high-demand items, such as flash sales, I would avoid letting every request directly hit the inventory database.

Instead, I would use a queue, token system, or single-writer flow to serialize reservation requests.

The key idea is:

**Oversell prevention depends on atomic reservation.**

**(PPT 8: Oversell Prevention)**

Next is multi-location inventory.

The same SKU may be available in multiple places.

For example, warehouse A may have 100 units, warehouse B may have 50 units, and store C may have 5 units.

When an order is placed, the system should choose the best fulfillment location.

The decision can depend on inventory availability, distance to the customer, shipping cost, delivery speed, warehouse capacity, and business rules.

After selecting the fulfillment location, the reservation should happen at that specific location.

The key idea is:

**Location selection and inventory reservation must work together.**

**(PPT 9: Multi-location Inventory)**

Finally, let’s talk about read models, events, reconciliation, and failure handling.

Product browsing traffic is much higher than checkout traffic.

So product pages and search results should not always query the strongly consistent inventory store.

Instead, they can use a cached inventory snapshot.

This snapshot can be slightly stale.

That is acceptable because checkout will revalidate inventory against the authoritative balance.

Inventory changes should also emit events.

These events update product page caches, search indexes, analytics, low-stock alerts, warehouse systems, and order systems.

Reconciliation is also essential.

Physical inventory may differ from system inventory because of warehouse scanning errors, lost items, damaged items, manual operations, or supplier mismatches.

When that happens, we should not silently overwrite inventory.

Instead, we create an adjustment event with a reason and reference ID.

For failure handling, reservation, commit, and release should all be idempotent.

We should use expiration workers, retries with backoff, outbox patterns for events, and reconciliation jobs to repair mismatches over time.

For observability, I would monitor reservation success rate, oversell count, checkout inventory latency, expired reservations, commit failures, release failures, hot SKU contention, and reconciliation mismatches.

**(PPT 10: Read Model, Reconciliation, and Closing Insight)**

To summarize.

An inventory system is a correctness-critical system.

It tracks available stock by SKU and location.

For browsing, we can use cached or eventually consistent inventory snapshots.

But during checkout, we must reserve inventory against the authoritative inventory balance.

The system should reserve first, commit after order or payment success, and release if the order fails, is cancelled, or expires.

Inventory changes should produce audit events.

Reconciliation is required because physical inventory and system inventory can diverge.

The final insight is:

**An inventory system is not just a quantity table.
It is a correctness-critical reservation and reconciliation system designed to prevent overselling.**

Thank you.
