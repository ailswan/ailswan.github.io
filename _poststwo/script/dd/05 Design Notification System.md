 

Hello everyone.
Today I’d like to walk through how to design a **Notification System**.

A notification system looks like a simple message-sending service.
But in production, it is much more than that.

The core question is:

**How do we deliver the right message, to the right user, through the right channel, at the right time?**

**(PPT: Title Slide — Design Notification System)**

When I think about Notification System design, I usually break it down into five parts.

First, core flows: event trigger, notification creation, and delivery.
Second, notification channels: push, email, SMS, and in-app.
Third, user preferences and policy rules.
Fourth, delivery pipeline, retries, deduplication, and rate limiting.
And finally, scaling, reliability, observability, and cost control.

The main trade-off is:

**latency vs reliability vs cost.**

**(PPT: Core Framework)**

Let’s start with the core flow.

Most notifications are triggered by business events.

For example, an order service may emit an `ORDER_SHIPPED` event.
The notification service receives the event, checks user preferences, renders the template, selects delivery channels, and sends delivery jobs to workers.

The basic flow is:

```text
Business Event
→ Notification Service
→ Preference Check
→ Template Rendering
→ Channel Selection
→ Queue
→ Channel Worker
→ External Provider
→ Delivery Status Update
```

**(PPT: Notification Flow)**

For APIs, I would expose:

```text
POST /api/notifications
PUT /api/notification-preferences
GET /api/notifications
```

But in real systems, the notification service should also consume events from a queue, because many notifications come from internal services.

The key idea is:

**Notification systems are event-driven delivery pipelines.**

**(PPT: APIs and Events)**

Now let’s look at the data model.

I would separate the logical notification record from delivery records.

The notification table represents the intent.

For example: user ID, notification type, priority, status, scheduled time, and payload.

The delivery table tracks each channel-specific attempt.

For example: push, email, SMS, or in-app.

Why separate them?

Because one notification may be delivered through multiple channels.
Push may succeed, email may fail, and SMS may need retry.

So each channel needs its own status and retry tracking.

We also need user preferences, templates, and device tokens.

The key idea is:

**A notification is the intent. A delivery record is the channel-specific execution.**

**(PPT: Data Model)**

Next is channel design.

Push notifications are fast and low-cost.
They are good for mobile alerts, real-time engagement, and security alerts.
But they require valid device tokens and delivery is not always guaranteed.

Email is better for receipts, account updates, marketing, and longer content.
It is more durable, but slower and may go to spam.

SMS is useful for OTPs and critical security alerts.
It has high visibility, but it is expensive and provider limits are strict.

In-app notifications are durable and can be shown in a notification center, but users only see them when they open the app.

The key idea is:

**Different channels have different latency, reliability, visibility, and cost trade-offs.**

**(PPT: Notification Channels)**

Before sending, the system must check preferences and policies.

For example:

```text
SECURITY_ALERT → push + sms, ignore quiet hours
MARKETING → email only, respect quiet hours
ORDER_UPDATE → push + email
```

The preference engine should check opt-in, opt-out, quiet hours, channel preference, notification type, locale, frequency limits, and compliance rules.

Security alerts may bypass quiet hours.
Marketing notifications must respect opt-out rules.

The key idea is:

**User preference correctness is critical for trust and compliance.**

**(PPT: Preference and Policy Engine)**

Now let’s talk about deduplication and idempotency.

Business services may retry events.

Without deduplication, a user may receive duplicate push notifications, duplicate emails, or duplicate SMS messages.

That hurts user experience and increases cost.

A good dedup key is:

```text
user_id + notification_type + business_entity_id
```

For example:

```text
u123 + ORDER_SHIPPED + order_789
```

The notification creation API should also support an idempotency key.

The key idea is:

**Upstream retries should not create duplicate user-facing notifications.**

**(PPT: Deduplication and Idempotency)**

Delivery failures are also common.

External providers may timeout.
Device tokens may be invalid.
Emails may bounce.
SMS providers may rate limit us.
Queues may have backlog.

For transient failures, I would use exponential backoff.

```text
retry after 1 minute
retry after 5 minutes
retry after 30 minutes
retry after 2 hours
```

For permanent failures or max retries, I would use a dead-letter queue.

Invalid device tokens should be marked invalid instead of retried forever.

The key idea is:

**Retry transient failures, but do not endlessly retry permanent failures.**

**(PPT: Retry and Failure Handling)**

Rate limiting and batching are also important.

We can rate limit by user, notification type, channel, provider, tenant, or business service.

This prevents spam, controls cost, and respects provider limits.

For high-volume events, batching improves user experience.

Instead of sending:

```text
Alice liked your post
Bob liked your post
Charlie liked your post
```

We can send:

```text
Alice, Bob, and Charlie liked your post
```

**(PPT: Rate Limiting and Batching)**

For scaling, I would use an event-driven architecture.

Business services publish events to Kafka or a queue.

Then the notification service creates delivery jobs.

I would use channel-specific queues:

```text
Push queue
Email queue
SMS queue
In-app queue
```

Each channel has its own worker pool and provider adapter.

This lets push, email, SMS, and in-app delivery scale independently.

For critical notifications, we can also support multi-provider fallback.

**(PPT: Scaling Architecture)**

Observability is critical because notification failures are often silent.

I would track delivery success rate, provider error rate, retry count, queue lag, delivery latency, duplicate suppression count, user opt-out rate, and SMS or email cost.

Each notification should have traceable IDs across ingestion, rendering, queueing, provider delivery, and status updates.

**(PPT: Observability)**

To summarize.

A notification system is not just about sending messages.

It is a policy-driven, multi-channel delivery pipeline.

It receives business events, deduplicates them, checks user preferences, renders templates, selects channels, queues delivery jobs, retries failures, and tracks delivery status.

The final insight is:

**A notification system is about reliable, policy-aware, multi-channel delivery at scale.**

Thank you.

**(PPT: Closing Insight — Right Message, Right Channel, Right Time)**
