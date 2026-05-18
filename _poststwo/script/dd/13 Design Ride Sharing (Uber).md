 

Hello everyone.
Today I’d like to walk through how to design a **Ride Sharing System**, similar to Uber.

A ride-sharing system may look like a map application.

But at large scale, it is really a real-time marketplace system.

It needs to connect riders and drivers, process live locations, find nearby drivers, manage trip state, calculate ETA and price, handle payment, and send notifications.

The core question is:

**How do we match riders with nearby drivers quickly and reliably, while handling real-time location, trip state, pricing, and payment correctly?**

**(PPT 1: Title Slide — Design Ride Sharing)**

When I think about Ride Sharing design, I usually break it down into five parts.

First, the core flows: request ride, match driver, and track trip.
Second, the real-time location system.
Third, driver discovery, geo indexing, and dispatch.
Fourth, trip state, ETA, routing, pricing, and payment.
And finally, scaling, failure handling, consistency, and observability.

The main trade-off is:

**latency vs accuracy vs consistency.**

Location updates can be eventually consistent.
But ride assignment, trip state, and payment need stronger correctness.

**(PPT 2: Core Framework)**

Let’s start with the core flows.

A driver can go online or offline.
When online, the driver app sends location updates every few seconds.

A rider can request a ride by providing pickup location, dropoff location, and ride type.

The system then finds nearby available drivers, ranks them, sends a request to the best driver, and waits for acceptance.

After a driver accepts, the trip moves through states such as driver assigned, arriving, picked up, in progress, completed, or cancelled.

The key idea is:

**Ride sharing has three real-time flows: driver location updates, rider trip requests, and rider-driver matching.**

**(PPT 3: Core Flows)**

Now let’s talk about APIs.

I would separate APIs by responsibility.

One API lets drivers update location.

One API lets riders request a ride.

One API lets drivers accept a ride.

One API updates trip state.

And one API lets the rider or driver fetch ride status.

The important point is that not all APIs need the same consistency.

Location updates are high-volume and short-lived, so eventual consistency is acceptable.

But accepting a ride and completing payment require stronger correctness.

The key idea is:

**Location is high-volume and approximate. Ride state and payment must be durable and correct.**

**(PPT 4: Main APIs)**

Next is the data model.

I would store riders, drivers, driver locations, rides, and ride events separately.

The rider table stores rider profile and payment profile information.

The driver table stores driver profile, vehicle information, and current driver status.

The driver location store keeps the latest location, current availability, and geo index information.

The ride table stores the trip itself: rider ID, driver ID, pickup and dropoff locations, current state, estimated price, final price, and timestamps.

The ride event table records important state changes.

For example, ride requested, driver assigned, picked up, completed, or cancelled.

This event table is useful for audit, debugging, analytics, and reconciliation.

The key idea is:

**Driver location is fast-changing data. Ride state is durable business data.**

**(PPT 5: Data Model)**

Now let’s discuss the real-time location system.

Drivers send location updates every few seconds.

We should not store every location update in the main relational database.

That would create too much write traffic, and most location data is short-lived.

Instead, I would store the latest driver locations in a fast geo-indexed store.

Examples include Redis Geo, geohash, S2 cells, or a custom in-memory geo grid.

The location service updates the geo index, and the matching service uses that index to find nearby drivers.

Driver location should also have a TTL.

If a driver has not sent a location update recently, we should treat that driver as stale and avoid matching them.

The key idea is:

**Real-time driver location should be stored in a fast geo-indexed store, not the main trip database.**

**(PPT 6: Real-time Location System)**

Next is nearby driver search.

When a rider requests a ride, the system converts the pickup location into a geo cell.

Then it searches that cell and neighboring cells for available drivers.

After getting candidate drivers, the system filters them.

It checks driver availability, vehicle type, distance to pickup, ETA to pickup, rating, current assignment status, and regional constraints.

This avoids scanning all drivers in the system.

The key idea is:

**Geo indexing turns a global search problem into a local nearby-driver search problem.**

**(PPT 7: Geo Indexing and Nearby Driver Search)**

Now let’s talk about matching and dispatch.

A simple strategy is to choose the nearest available driver.

But in production, we usually rank drivers by more than distance.

We may consider ETA to pickup, driver acceptance probability, vehicle type, driver rating, fairness, rider preference, surge region, and supply-demand balance.

The dispatch flow works like this:

First, find candidate drivers.
Then rank them.
Then send the request to the top driver.
If the driver accepts, confirm the trip.
If the driver rejects or times out, try the next driver.

One important issue is double assignment.

A driver should not be assigned to two rides at the same time.

So ride acceptance must use an atomic conditional update.

In plain English, the system should only assign the driver if the driver is still available at that exact moment.

The key idea is:

**Matching is ranking nearby drivers, but assignment must be atomic.**

**(PPT 8: Matching and Dispatch)**

Next is the trip state machine.

A ride should move through clear states.

For example: requested, matching, driver assigned, driver arriving, picked up, in progress, completed, or cancelled.

This state machine is important because it prevents invalid transitions.

For example, a trip should not jump directly from requested to completed.

It also makes retries safer, helps with cancellation logic, and gives us a clean audit trail.

Payment should only be captured after the trip reaches the completed state.

Notifications should be triggered by state changes.

The key idea is:

**Trip state should be modeled as a state machine, because ride lifecycle correctness matters.**

**(PPT 9: Trip State Machine)**

Finally, let’s talk about ETA, pricing, payment, tracking, scaling, and failure handling.

ETA is used for both rider experience and matching.

The system should rank drivers by estimated time to pickup, not just straight-line distance.

ETA can be calculated using road network data, traffic conditions, driver location, pickup and dropoff, historical travel time, and real-time speed data.

Pricing uses distance, duration, ride type, fees, and surge multiplier.

Surge pricing is based on regional supply and demand.

The system returns an estimated fare before the ride, and calculates the final fare after completion.

For payment, I would pre-authorize the rider’s payment method before confirming the trip, and capture the final amount after the trip completes.

Payment operations must be idempotent so the rider is not charged twice.

Real-time tracking can use WebSocket or another streaming channel.

The driver app sends location updates, and the tracking service pushes relevant updates to the rider app.

A few seconds of location delay is usually acceptable.

For scaling, I would separate location from trip state.

Location is high-volume and temporary.

Trip state is durable and correctness-sensitive.

I would shard location data by region or geo cell, and run matching regionally, because ride matching is naturally local.

For failure handling, stale driver locations should expire.
Dispatch should retry with the next driver.
Ride state transitions should be idempotent.
Payment should use idempotency keys.
If the routing service is unavailable, the system can temporarily use an approximate ETA.

For observability, I would monitor match latency, match success rate, driver acceptance rate, location update lag, ETA accuracy, cancellation rate, payment failure rate, and trip state transition errors.

**(PPT 10: ETA, Pricing, Payment, Scaling, and Closing Insight)**

To summarize.

A ride-sharing system is a real-time marketplace that connects riders and drivers.

Driver locations are high-volume and short-lived, so they belong in a fast geo-indexed store.

Ride state, assignment, cancellation, and payment require stronger correctness.

Geo indexing helps find nearby drivers.

Matching ranks candidate drivers by ETA, availability, vehicle type, and business constraints.

A trip state machine keeps the ride lifecycle correct.

Payment should be pre-authorized before the ride and captured after completion.

The final insight is:

**Ride sharing is not just a map application.
It is a real-time marketplace platform built from geo indexing, matching, state machines, tracking, pricing, payment, and notifications.**

Thank you.
