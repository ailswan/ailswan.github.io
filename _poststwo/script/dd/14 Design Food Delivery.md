 
Hello everyone.
Today I’d like to walk through how to design a **Food Delivery System**.

A food delivery system may look like a simple ordering app.

But at scale, it is really a local marketplace that connects three sides: customers, restaurants, and couriers.

The system needs to support restaurant discovery, menu browsing, cart and checkout, payment, restaurant confirmation, courier dispatch, delivery tracking, cancellation, refunds, and notifications.

The core question is:

**How do we coordinate customers, restaurants, and couriers reliably, while keeping checkout fast and delivery tracking accurate?**

**(PPT 1: Title Slide — Design Food Delivery)**

When I think about Food Delivery design, I usually break it down into five parts.

First, the core flows: browse restaurants, place an order, and deliver the order.
Second, restaurant, menu, cart, and order management.
Third, payment, checkout, and order state machine.
Fourth, courier dispatch, real-time tracking, and ETA.
And finally, scaling, failure handling, consistency, and observability.

The main trade-off is:

**consistency vs latency vs marketplace efficiency.**

Restaurant search and menu reads need to be fast.
But order creation, payment, cancellation, and refunds need stronger correctness.

**(PPT 2: Core Framework)**

Let’s start with the core flows.

A user opens the app and searches nearby restaurants.

The system uses the user’s location, restaurant availability, delivery radius, cuisine type, rating, ETA, fees, promotions, and user preferences to return a ranked restaurant list.

Then the user opens a menu, selects items, adds options, and builds a cart.

During checkout, the system validates the restaurant, items, address, promotion, final price, and payment method.

After the order is placed, the restaurant accepts or rejects it.

If accepted, the system dispatches a courier, tracks delivery, updates the user, and completes payment.

The key idea is:

**Food delivery has three major flows: discovery, order placement, and delivery fulfillment.**

**(PPT 3: Core User Flows)**

Now let’s talk about APIs.

I would separate APIs by responsibility.

One API searches nearby restaurants.

One API retrieves a restaurant menu.

One API manages the cart.

One API places the order.

One API updates order state.

And one API tracks delivery.

Restaurant search and menu APIs are read-heavy and should be optimized for low latency.

Order creation and payment APIs are transactional and require stronger validation.

The key idea is:

**Browsing is read-heavy. Checkout is correctness-sensitive.**

**(PPT 4: Main APIs)**

Next is the data model.

I would separate restaurants, menu items, carts, orders, and order events.

The restaurant table stores restaurant location, status, rating, and delivery radius.

The menu item table stores item name, price, options, category, and availability.

The cart stores the user’s selected items before checkout.

The order table stores the final transactional record, including user ID, restaurant ID, courier ID, order state, subtotal, fees, tax, tip, discount, total, and payment status.

The order event table records important state changes.

For example: order created, payment authorized, restaurant accepted, courier assigned, picked up, delivered, cancelled, or refunded.

This is useful for debugging, support, analytics, and reconciliation.

The key idea is:

**Cart is temporary. Order is durable. Order events provide the audit trail.**

**(PPT 5: Data Model)**

Now let’s discuss restaurant search and menu serving.

Restaurant discovery is a geo-search and ranking problem.

The system first finds restaurants near the user.

Then it filters restaurants that are closed, unavailable, outside delivery range, or not eligible for the user’s address.

After filtering, it ranks restaurants by ETA, rating, relevance, delivery fee, promotions, and user preference.

Menus are read-heavy, so they should be cached aggressively.

However, item availability and prices can change.

So I would use shorter TTLs for availability-related data, and I would always revalidate the cart at checkout.

The key idea is:

**Cache menus for speed, but revalidate availability and price before order creation.**

**(PPT 6: Restaurant Search and Menu Serving)**

Next is cart and checkout.

The cart stores selected items, item options, quantities, and price snapshots.

A price snapshot is important because menu prices can change later.

The user should know what price they saw when building the cart, and the order history should preserve the original purchase price.

But before creating the final order, checkout must revalidate everything.

The system should check whether the restaurant is still open, whether items are still available, whether the delivery address is valid, whether the promotion still applies, and whether the final price is correct.

The payment service should also pre-authorize the user’s payment method.

The key idea is:

**Cart can be stale, but checkout must be strongly validated.**

**(PPT 7: Cart and Checkout)**

Now let’s talk about the order state machine.

A food delivery order moves through many states.

It may start as created.

Then payment is authorized.

Then the order is sent to the restaurant.

The restaurant accepts it.

The order moves to preparing.

Then it becomes ready for pickup.

A courier is assigned.

The courier picks it up.

Then it is out for delivery.

Finally, it is delivered.

It may also be cancelled or refunded.

A state machine is important because it prevents invalid transitions.

For example, an order should not move directly from created to delivered.

It also coordinates restaurant preparation, courier dispatch, notifications, cancellation rules, and payment capture.

The key idea is:

**Order lifecycle should be modeled as a state machine because correctness matters.**

**(PPT 8: Order State Machine)**

Next is payment and restaurant handling.

Payment requires strong correctness.

I would pre-authorize payment during checkout.

This validates the payment method and reduces failed orders.

After the restaurant accepts the order, or after delivery depending on business policy, the system captures the payment.

If the restaurant rejects the order, does not respond, or the user cancels within an allowed window, the system should release the authorization or issue a refund.

All payment operations should be idempotent.

That means retrying the same payment operation should not charge the user twice.

Restaurant confirmation is also important.

After checkout, the order is sent to the restaurant tablet, POS system, web dashboard, or fallback channel.

The restaurant can accept, reject, or update preparation time.

If the restaurant does not respond within a timeout, the system should cancel the order, notify the user, and release the payment authorization.

The key idea is:

**Payment and restaurant confirmation must be reliable, idempotent, and auditable.**

**(PPT 9: Payment and Restaurant Handling)**

Finally, let’s discuss courier dispatch, tracking, scaling, and failure handling.

Courier dispatch is similar to ride-sharing, but with one extra challenge: food preparation time.

The best courier is not always the closest courier.

We want the courier to arrive near the time the food is ready.

If the courier arrives too early, they wait.

If the courier arrives too late, the food gets cold.

So dispatch should consider restaurant location, customer location, courier location, courier availability, current workload, estimated prep time, delivery ETA, acceptance probability, and batching opportunities.

Courier assignment should be atomic, so the same courier is not assigned to two conflicting deliveries.

For tracking, the courier app sends location updates every few seconds.

The tracking service streams relevant updates to the customer, usually through WebSocket or server-sent events.

Location tracking and ETA updates can be eventually consistent because small delays are acceptable.

For scaling, I would separate read-heavy browsing from transactional order processing.

Restaurant search and menu serving can be cached.

Order processing, payment, cancellation, and courier assignment need stronger correctness.

Food delivery is naturally local, so I would shard marketplace operations by city, region, or delivery zone.

Order state changes should publish events to trigger notifications, dispatch, payment, analytics, and customer updates.

For failure handling, the system should use idempotent order creation, payment authorization timeouts, restaurant response timeouts, courier dispatch retries, atomic courier assignment, checkout revalidation, and reconciliation jobs.

For observability, I would monitor restaurant search latency, menu load latency, checkout failure rate, payment failure rate, restaurant acceptance rate, courier assignment latency, courier acceptance rate, delivery ETA accuracy, cancellation rate, refund rate, and order state transition errors.

**(PPT 10: Dispatch, Tracking, Scaling, and Closing Insight)**

To summarize.

A food delivery system is a local three-sided marketplace.

It connects customers, restaurants, and couriers.

Restaurant and menu browsing are read-heavy and should be fast.

Checkout must revalidate cart, restaurant status, item availability, promotions, final price, and payment.

Orders should be managed through a clear state machine.

Courier dispatch must consider both geography and food preparation time.

Payment must be correct, idempotent, and auditable.

Tracking and analytics can be eventually consistent.

The final insight is:

**Food delivery is not just ordering food.
It is a local marketplace system that coordinates customers, restaurants, couriers, payments, state transitions, and real-time delivery tracking.**

Thank you.
