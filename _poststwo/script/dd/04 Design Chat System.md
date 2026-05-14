
Hello everyone.
Today I’d like to walk through how to design a **Notification System**.

A notification system may look like a simple message-sending service.
But in production, it is much more than that.

The core question is:

**How do we deliver the right message, to the right user, through the right channel, at the right time?**

**(PPT: Title Slide — Design Notification System)**

When I think about Notification System design, I usually break it down into five parts.

First, the core flow: how an event becomes a notification.
Second, the notification channels, such as push, email, SMS, and in-app.
Third, user preferences and policy rules.
Fourth, delivery pipeline, retries, deduplication, and rate limiting.
And finally, scaling, reliability, observability, and cost control.

The main trade-off is:

**latency vs reliability vs cost.**

**(PPT: Core Framework)**

Let’s start with the core flow.

Most notifications are triggered by business events.

For example, when an order is shipped, the Order Service may emit an order-shipped event.

The Notification Service receives that event.
Then it checks whether the user should receive this notification.
It checks the user’s preferences.
It renders the message using a template.
It decides which channel to use.
Then it creates delivery jobs for workers to send.

So the flow is:

A business event comes in.
The Notification Service checks preferences.
It renders the template.
It chooses the channel.
It sends the job to a queue.
A channel worker sends the notification through an external provider.
Then the system updates the delivery status.

**(PPT: Notification Flow)**

For APIs, I would support three basic operations.

One API to create a notification.
One API to update notification preferences.
And one API to read notification history.

But in real production systems, most notifications are not created directly by users.

They are triggered by internal services through events or queues.

The key idea is:

**A notification system is an event-driven delivery pipeline.**

**(PPT: APIs and Events)**

Now let’s look at the data model.

I would separate the logical notification record from the delivery records.

A notification record represents the intent.

For example, it stores the user, notification type, priority, status, scheduled time, and payload.

A delivery record represents the actual channel-specific delivery attempt.

For example, the same notification may be sent through push, email, and SMS.

Push may succeed.
Email may fail.
SMS may need a retry.

So each channel needs its own status, attempt count, provider message ID, and error information.

We also need tables for user preferences, message templates, and device tokens.

The key idea is:

**A notification is the intent.
A delivery record is the channel-specific execution.**

**(PPT: Data Model)**

Next, let’s talk about notification channels.

Push notifications are fast and low-cost.

They are good for mobile alerts, real-time engagement, and security alerts.
But they require valid device tokens, and delivery is not always guaranteed.

Email is better for receipts, account updates, marketing messages, and longer content.
It is more durable, but slower, and sometimes it may go to spam.

SMS is useful for one-time passwords and critical security alerts.
It has high visibility, but it is expensive and provider limits are strict.

In-app notifications are useful for notification centers and persistent history.
They are durable, but users only see them when they open the app.

The key idea is:

**Different channels have different trade-offs in latency, reliability, visibility, and cost.**

**(PPT: Notification Channels)**

Before sending any notification, the system must check user preferences and policy rules.

For example, a security alert may use push and SMS, and it may ignore quiet hours.

A marketing notification should respect opt-out rules and quiet hours.

An order update may use push and email.

The preference engine should check whether the user opted in or opted out.
It should check the allowed channels.
It should check quiet hours.
It should check notification type, user locale, frequency limits, and compliance rules.

This is important because sending unwanted notifications can damage user trust and may create compliance problems.

The key idea is:

**Preference correctness is critical for trust and compliance.**

**(PPT: Preference and Policy Engine)**

Now let’s talk about deduplication and idempotency.

Business services may retry events.

If the notification system does not deduplicate them, users may receive duplicate push notifications, duplicate emails, or duplicate SMS messages.

That creates a bad user experience and increases cost.

A good deduplication key should include the user, the notification type, and the business entity.

For example, for an order-shipped notification, we can deduplicate by user ID, notification type, and order ID.

The notification creation API should also support an idempotency key.

The key idea is:

**Upstream retries should not create duplicate user-facing notifications.**

**(PPT: Deduplication and Idempotency)**

Delivery failures are also common.

An external provider may time out.
A device token may be invalid.
An email may bounce.
An SMS provider may rate limit us.
A queue may have backlog.
A template may fail to render.

For temporary failures, I would retry with exponential backoff.

For example, retry after one minute, then five minutes, then thirty minutes, and then later again.

But we should not retry forever.

For permanent failures, or after the maximum retry count is exceeded, I would send the job to a dead-letter queue.

For invalid device tokens, I would mark the token as invalid instead of retrying repeatedly.

The key idea is:

**Retry temporary failures, but do not endlessly retry permanent failures.**

**(PPT: Retry and Failure Handling)**

Rate limiting and batching are also important.

We can rate limit by user, notification type, channel, provider, tenant, or business service.

This prevents spam, controls cost, and respects provider limits.

Batching is useful for high-volume notifications.

For example, instead of sending three separate notifications saying Alice liked your post, Bob liked your post, and Charlie liked your post, we can send one notification saying Alice, Bob, and Charlie liked your post.

This improves user experience and reduces delivery cost.

**(PPT: Rate Limiting and Batching)**

For scaling, I would use an event-driven architecture.

Business services publish events to Kafka or another queue.

The Notification Service consumes those events and creates delivery jobs.

Then I would use separate queues for different channels.

Push has its own queue.
Email has its own queue.
SMS has its own queue.
In-app notifications have their own queue.

Each channel can have its own worker pool and provider adapter.

This allows each channel to scale independently and fail independently.

For critical notifications, we can also support fallback providers.
For example, if the primary SMS provider fails, we can switch to a backup provider.

**(PPT: Scaling Architecture)**

Observability is critical because notification failures are often silent.

Users may simply not receive the message.

So I would track delivery success rate, provider error rate, retry count, queue lag, delivery latency, duplicate suppression count, user opt-out rate, and SMS or email cost.

Each notification should have traceable IDs across the whole pipeline.

From event ingestion, to template rendering, to queueing, to provider delivery, to final status update.

**(PPT: Observability)**

To summarize.

A notification system is not just about sending messages.

It is a policy-driven, multi-channel delivery pipeline.

It receives business events.
It deduplicates them.
It checks user preferences.
It renders templates.
It chooses channels.
It queues delivery jobs.
It retries failures.
And it tracks delivery status.

The final insight is:

**A notification system is about reliable, policy-aware, multi-channel delivery at scale.**

Thank you.

**(PPT: Closing Insight — Right Message, Right Channel, Right Time)**
