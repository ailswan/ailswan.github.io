 
Hello everyone.
Today I’d like to walk through how to design an **Email System**.

An email system may look like a simple send-and-receive message application.

But at scale, it is much more than that.

It needs to support composing emails, sending emails, receiving emails, storing messages, searching mailboxes, managing folders, handling attachments, filtering spam, processing bounces, and protecting sender reputation.

The core question is:

**How do we reliably store and deliver email messages, while supporting mailbox search, spam protection, and good deliverability?**

**(PPT 1: Title Slide — Design Email System)**

When I think about Email System design, I usually break it down into five parts.

First, email composition and submission.
Second, message storage and mailbox metadata.
Third, the outbound sending pipeline and SMTP delivery.
Fourth, inbound email, inbox management, search, and attachments.
And finally, bounce handling, spam prevention, reputation, scaling, failure handling, and observability.

The main trade-off is:

**deliverability vs latency vs reliability.**

Email delivery can be slow, delayed, retried, bounced, or filtered as spam, so the system must be designed around durable storage and asynchronous processing.

**(PPT 2: Core Framework)**

Let’s start with the core concepts.

An email message contains a sender, recipients, subject, body, attachments, headers, timestamp, and message ID.

A mailbox stores messages for a user.

Common mailbox folders include inbox, sent, drafts, trash, spam, and archive.

SMTP is used to send email between mail servers.

IMAP and POP3 are used by email clients to retrieve emails.

One important design point is that message content and mailbox state should be separated.

The actual email body and attachments should be stored durably.

Mailbox metadata should track user-specific state, such as folder, labels, read or unread status, starred status, and thread ID.

The key idea is:

**Message content is shared data. Mailbox state is user-specific data.**

**(PPT 3: Core Concepts)**

Now let’s talk about the main APIs.

The system needs an API to send email.

It needs an API to save drafts.

It needs APIs to get inbox messages, fetch an individual email, search email, and update mailbox state.

For example, a user may mark an email as read, move it to trash, apply a label, star it, archive it, or mark it as spam.

The important point is that sending email should be asynchronous.

When a user clicks send, the system should store the message durably and enqueue a send job.

The API can return after the message is safely stored and queued.

The actual SMTP delivery can happen later in delivery workers.

The key idea is:

**The user request should store and queue the email. Delivery workers should handle slow and unreliable SMTP delivery.**

**(PPT 4: Main APIs)**

Next is the data model.

I would separate message content, recipients, mailbox items, attachments, and delivery events.

The message table stores the core email metadata, such as sender, subject, body location, headers, status, and created time.

The recipient table stores each recipient and their delivery status.

This is important because one message may be delivered successfully to one recipient but bounced for another recipient.

The mailbox item table stores per-user mailbox state.

For example, the same message may appear in Alice’s sent folder and Bob’s inbox, but Alice and Bob have different read states, folders, and labels.

Attachments should be stored separately, usually in object storage, with metadata such as file name, content type, size, checksum, and storage location.

Delivery events record what happened during delivery, such as sent, delivered, bounced, complained, opened, or clicked.

The key idea is:

**One physical message can appear in multiple mailboxes, but each mailbox has its own state.**

**(PPT 5: Data Model)**

Now let’s look at the high-level architecture.

For outbound email, the flow starts from the client.

The client calls the Email API.

The Email API validates the request and stores the message.

The message body and attachments are stored durably.

Then the system creates a sent mailbox item for the sender and enqueues a send job.

Delivery workers consume jobs from the send queue.

They send the email through SMTP or an email provider.

Then they update recipient delivery status and record delivery events.

For inbound email, external senders send email to our mail server.

Our MX server receives the message.

The inbound processor validates the recipient, runs spam and virus checks, stores the message, creates an inbox mailbox item, indexes the message for search, and notifies the user.

The key idea is:

**Outbound and inbound email should be modeled as separate pipelines.**

**(PPT 6: High-Level Architecture)**

Next is SMTP delivery and retry.

SMTP delivery can fail in different ways.

Some failures are temporary.

For example, the recipient mail server may be busy, the mailbox may be temporarily unavailable, the provider may rate limit us, or there may be a network timeout.

Temporary failures should be retried with exponential backoff.

Other failures are permanent.

For example, the recipient address may be invalid, the domain may not exist, or the mailbox may not exist.

Permanent failures should be marked as bounced, and the system should stop retrying.

This is important because repeatedly sending to invalid addresses hurts sender reputation.

The key idea is:

**Retry temporary failures, stop on permanent failures, and record every delivery outcome.**

**(PPT 7: SMTP Delivery and Retry)**

Now let’s talk about bounces and complaints.

A bounce means the email could not be delivered.

A hard bounce usually means the address is invalid or the mailbox does not exist.

A soft bounce may mean the mailbox is full or the server is temporarily unavailable.

A complaint means the recipient marked the email as spam.

Bounce and complaint handling is critical for deliverability.

When a provider sends a bounce or complaint event, the system should verify the event, store it, update recipient delivery status, update suppression lists if needed, and adjust sender reputation.

If an address hard-bounces, we should avoid sending future emails to that address.

If users complain about spam, we should reduce or stop similar sends.

The key idea is:

**Bounce and complaint handling protects deliverability and sender reputation.**

**(PPT 8: Bounce and Complaint Handling)**

Next is mailbox search, threading, and attachments.

Email search should not scan mailbox tables directly.

That would not scale.

Instead, the system should emit indexing events when messages are stored.

A search indexer parses the subject, body, sender, recipients, date, labels, folder, and attachment metadata.

Then it writes to a search engine using an inverted index.

This supports fast keyword search.

Threading groups related messages into conversations.

The system can use email headers such as Message-ID, In-Reply-To, and References.

Subject normalization can be used as a fallback.

Attachments should be stored in object storage, not in the main database.

Before storing attachments, the system should enforce size limits, validate content type, scan for viruses, and optionally deduplicate by checksum.

The key idea is:

**Search, threading, and attachments should be handled as dedicated subsystems, not mixed into the mailbox table.**

**(PPT 9: Search, Threading, and Attachments)**

Finally, let’s discuss templates, bulk email, spam protection, scaling, failure handling, and observability.

For transactional emails, such as password resets, receipts, order confirmations, and system alerts, I would use a template service.

Business services send a template ID and variables.

The template service renders the message and sends it through the normal email delivery pipeline.

For bulk email, the system must be careful.

Bulk sends create high volume, reputation risk, unsubscribe requirements, rate limits, and spam complaints.

I would use batch sending, per-domain throttling, suppression lists, unsubscribe enforcement, campaign pacing, and complaint monitoring.

Spam and abuse prevention are also critical.

The system should monitor sender reputation, domain reputation, IP reputation, content patterns, link reputation, attachment risk, complaint rate, and bounce rate.

It should enforce SPF, DKIM, and DMARC validation where applicable.

For consistency, message storage, access control, unsubscribe enforcement, suppression lists, and sender authentication need stronger correctness.

Search indexing, delivery status updates, open tracking, click tracking, analytics, unread counts, and notifications can be eventually consistent.

For failure handling, messages should be durably stored before sending.

Send jobs should retry temporary failures.

Permanent failures should become bounces.

Duplicate send requests should be handled with idempotency.

Delayed bounce events should still update delivery state later.

For observability, I would monitor send queue depth, delivery success rate, bounce rate, complaint rate, SMTP latency, provider error rate, spam classification rate, search indexing lag, inbox write latency, and attachment scan failures.

**(PPT 10: Templates, Spam, Scaling, and Closing Insight)**

To summarize.

An email system is not just a send button.

It is a durable messaging and delivery platform.

It stores message content and attachments durably.

It keeps mailbox metadata separately for each user.

It sends outbound mail asynchronously through queues and delivery workers.

It receives inbound mail through MX servers and spam filters.

It indexes messages for search.

It handles bounces, complaints, suppression lists, and reputation.

It protects users from spam and abuse.

The final insight is:

**An email system is not just about sending messages.
It is a large-scale messaging platform built around durable storage, SMTP delivery, mailbox indexing, spam control, and sender reputation.**

Thank you.
