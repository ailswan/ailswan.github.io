Below is the **10-page PPT natural English voiceover script** for **Design Booking System**, ready to read directly. 

---

Hello everyone.
Today I’d like to walk through how to design a **Booking System**.

A booking system may look like a simple reservation app.

But at scale, it is really a limited-resource allocation system.

The system needs to support availability search, temporary holds, booking confirmation, payment, cancellation, refund, expiration, and double-booking prevention.

The core question is:

**How do we let users search availability quickly, while making sure confirmed bookings never exceed capacity?**

**(PPT 1: Title Slide — Design Booking System)**

When I think about Booking System design, I usually break it down into five parts.

First, the resource and availability model.
Second, availability search.
Third, temporary hold and booking confirmation.
Fourth, payment, cancellation, and refund.
And finally, double-booking prevention, scaling, failure handling, and observability.

The main trade-off is:

**consistency vs availability vs latency.**

Search needs to be fast and highly available.
But final booking confirmation must be strongly correct.

**(PPT 2: Core Framework)**

Let’s start with the core concepts.

A resource can be many things.

It can be a hotel room, a restaurant table, a doctor appointment slot, a flight seat, an event ticket, or a rental car.

Most bookings reserve a resource for a specific time range.

For example, a hotel room may be reserved from check-in time to check-out time.

A restaurant table may be reserved for a dinner time slot.

A doctor appointment may be reserved for a 30-minute window.

Availability means the total capacity, minus confirmed bookings, minus active holds.

The key idea is:

**Booking systems manage limited resources over time.**

**(PPT 3: Resource, Time Slot, and Availability)**

Now let’s talk about APIs.

The core APIs are simple.

One API searches availability.

One API creates a temporary hold.

One API confirms the booking.

One API cancels the booking.

And one API gets booking status.

Search availability can be eventually consistent because users are just browsing.

But creating a hold and confirming a booking must be strongly controlled.

Why?

Because that is where double booking can happen.

The key idea is:

**Search can be approximate, but hold and confirmation must be correct.**

**(PPT 4: Main APIs)**

Next is the data model.

I would keep separate tables for resources, availability slots, holds, bookings, and booking events.

The resource table stores what can be booked.

The availability slot table stores capacity by resource and time slot.

For each slot, it tracks total capacity, confirmed count, held count, and version.

The hold table stores temporary reservations.

A hold has a user, resource, time range, quantity, status, expiration time, and idempotency key.

The booking table stores confirmed bookings.

The booking event table stores the audit trail.

For example, hold created, booking confirmed, payment captured, booking cancelled, or refund issued.

The key idea is:

**Availability tracks capacity. Holds protect checkout. Bookings represent confirmed reservations. Events provide auditability.**

**(PPT 5: Data Model)**

Now let’s discuss availability search.

Availability search is read-heavy.

Many users may search hotels, flights, appointments, or tickets without actually booking.

So I would not always query the strongly consistent booking write store for every search.

Instead, I would use a read-optimized availability index or cache.

The user searches by location, date, resource type, or other filters.

The availability service queries the read model, filters resources with available capacity, ranks the results by price, distance, rating, or relevance, and returns available options.

But the search result is not a final guarantee.

The system must revalidate availability when the user creates a hold or confirms a booking.

The key idea is:

**Availability search is optimized for speed, but final correctness happens during hold and confirmation.**

**(PPT 6: Availability Search)**

Next is the temporary hold flow.

A hold gives the user time to complete checkout.

Without a hold, the user may see an available slot, spend two minutes entering payment details, and then lose the slot because someone else booked it.

So when the user selects a slot, the booking service checks availability and atomically increases the held count.

Then it creates a hold record with an expiration time.

For example, the hold may expire after five or ten minutes.

If the user finishes checkout, the hold becomes a confirmed booking.

If the user abandons checkout, the hold expires and the capacity becomes available again.

The key idea is:

**Temporary holds protect limited resources during checkout.**

**(PPT 7: Temporary Hold Flow)**

Now let’s talk about booking confirmation.

When the user confirms, the system first validates that the hold is still active and not expired.

Then it processes payment.

After payment succeeds, the system creates a confirmed booking.

Then it moves capacity from held to confirmed.

In other words, held count goes down, and confirmed count goes up.

The hold is marked as confirmed, and the system emits a booking confirmed event.

This operation must be idempotent.

If the user retries confirmation because of a timeout, the system must not create two bookings.

The key idea is:

**Booking confirmation converts an active hold into a confirmed booking.**

**(PPT 8: Booking Confirmation Flow)**

Double-booking prevention is the most important part.

The main risk is that multiple users try to book the same resource and time slot at the same time.

To prevent this, hold creation and booking confirmation must use atomic updates.

The system must ensure that confirmed count plus held count never exceeds total capacity.

There are several ways to do this.

We can use conditional writes.

We can use optimistic locking with a version number.

We can use row-level locking for a resource slot.

Or, for extremely hot resources, we can route all writes for the same resource slot through a single-writer queue.

For example, if a concert ticket sale starts and thousands of users want the same seats, a queue-based model can serialize booking attempts and protect correctness.

The key idea is:

**Double-booking prevention depends on atomic capacity updates.**

**(PPT 9: Double-booking Prevention)**

Finally, let’s talk about payment, cancellation, expiration, scaling, and failure handling.

Booking and payment should be coordinated carefully.

A common flow is:

First, create a hold.
Then authorize payment.
Then confirm the booking.
Then capture payment.

If payment fails, release the hold.

If payment succeeds but booking confirmation fails, retry or reconcile.

If the user cancels, check the cancellation policy.

Some bookings may allow free cancellation before 24 hours.

Some may allow partial refund.

Some may not allow refund after the start time.

Cancellation should update booking state, restore availability if needed, and trigger refund based on policy.

Holds must also expire automatically.

A background worker, delayed queue, or scheduler can release expired holds.

For scaling, I would separate the read-heavy search path from the write-critical booking path.

Search can use cached availability snapshots.

Booking writes should use strongly controlled updates.

I would shard by resource, region, or city.

For very hot slots, I would use single-writer or queue-based processing.

For failure handling, hold, confirm, cancel, and refund operations should all be idempotent.

The system should use retries, outbox events, reconciliation jobs, and manual review for unresolved states.

For observability, I would monitor availability search latency, hold creation success rate, booking confirmation success rate, double-booking incidents, payment failures, cancellation rate, refund failures, hot slot contention, stale availability complaints, and reconciliation mismatches.

**(PPT 10: Payment, Cancellation, Scaling, and Closing Insight)**

To summarize.

A booking system is a limited-resource allocation system.

Search can be fast and eventually consistent.

But hold creation and booking confirmation must be strongly correct.

Temporary holds protect resources during checkout.

Booking confirmation converts a hold into a confirmed booking.

Cancellation and refund must follow clear policies.

And double booking must be prevented through atomic updates, idempotency, state machines, and reconciliation.

The final insight is:

**A booking system is not just storing reservations.
It is a correctness-critical system for managing limited resources through hold, confirm, cancel, refund, and reconciliation.**

Thank you.
