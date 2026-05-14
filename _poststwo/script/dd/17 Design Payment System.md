 Below is the **10-page PPT natural English voiceover script** for **Design Payment System**, ready to read directly. 

---

Hello everyone.
Today I’d like to walk through how to design a **Payment System**.

A payment system may look like a simple integration with a payment provider.

But in real production systems, it is much more than calling an external payment API.

The system needs to handle payment intent, authorization, capture, refund, chargeback, idempotency, ledger records, webhooks, reconciliation, fraud, security, and compliance.

The core question is:

**How do we move money correctly, prevent duplicate charges, and recover safely from partial failures?**

**(PPT 1: Title Slide — Design Payment System)**

When I think about Payment System design, I usually break it down into five parts.

First, the payment intent and checkout flow.
Second, authorization, capture, refund, and chargeback.
Third, the payment state machine and idempotency.
Fourth, ledger, provider integration, webhooks, and reconciliation.
And finally, security, fraud, compliance, failure handling, and observability.

The main trade-off is:

**correctness vs availability vs latency.**

In payments, correctness is usually more important than raw speed.

**(PPT 2: Core Framework)**

Let’s start with the core concepts.

A **payment intent** represents the user’s intent to pay for an order.

For example, the user wants to pay 50 dollars for order number 123.

Authorization means we ask the payment provider:

**Can this user pay this amount?**

If authorization succeeds, the money is reserved, but not always collected yet.

Capture means we actually collect the money.

Refund means we send money back to the user.

Chargeback is different.

A chargeback is a dispute initiated by the cardholder or bank, often after the payment has already completed.

The key idea is:

**Payment is a stateful financial workflow, not a single API call.**

**(PPT 3: Core Concepts)**

Now let’s talk about APIs.

I would expose APIs to create a payment intent, authorize payment, capture payment, refund payment, and get payment status.

All mutation APIs must support idempotency keys.

Why?

Because clients and internal services may retry requests due to timeouts, network failures, server errors, or provider delays.

Without idempotency, the same retry could accidentally create a duplicate charge or duplicate refund.

So for every mutation request, the system should store the idempotency key, the request hash, and the response.

If the same key is used again with the same request body, return the previous response.

If the same key is used with a different request body, reject it.

The key idea is:

**Every payment mutation must be idempotent.**

**(PPT 4: APIs and Idempotency)**

Next is the data model.

I would separate payment intents, payment transactions, provider events, and ledger entries.

The payment intent tracks the high-level lifecycle of the payment.

The payment transaction table records individual operations, such as authorization, capture, refund, and void.

Each transaction should store the provider, provider transaction ID, status, amount, currency, and idempotency key.

The provider event table stores raw webhook events from external payment providers.

The ledger entry table stores accounting records.

This separation is important because payment state tells us where the workflow is, while the ledger tells us what money movement happened.

The key idea is:

**Payment state tracks workflow. Ledger entries track accounting truth.**

**(PPT 5: Data Model)**

Now let’s look at the high-level architecture.

The client or order service calls the Payment API.

The Payment API validates the request and enforces idempotency.

The Payment Orchestrator manages the payment workflow and drives state transitions.

Before authorization, the Risk or Fraud Service can score the transaction.

Then the Provider Adapter calls an external provider, such as Stripe, Adyen, Braintree, or a bank.

Provider-specific logic should be isolated inside provider adapters.

On the asynchronous side, providers send webhooks.

The Webhook Handler verifies the event, stores it durably, deduplicates it, and updates payment state if needed.

The Ledger Service writes immutable accounting entries.

Reconciliation jobs compare internal state with provider reports.

The key idea is:

**Separate orchestration, provider integration, ledger, webhook processing, and reconciliation.**

**(PPT 6: High-Level Architecture)**

Next is the payment state machine.

A payment may start in a created state.

Then it moves to authorizing.

If authorization succeeds, it becomes authorized.

Then it may move to capturing.

If capture succeeds, it becomes captured.

If authorization or capture fails, it moves to a failure state.

If the user cancels before capture, it may become cancelled.

If money is returned, it moves through refunding and refunded.

If the bank disputes the charge, it may enter chargeback state.

A state machine prevents invalid transitions.

For example, capture should only happen after authorization succeeds.

Refund should only happen after payment is captured.

The key idea is:

**A payment state machine makes retries, failures, and recovery safer.**

**(PPT 7: Payment State Machine)**

Now let’s talk about authorization and capture.

Some businesses use immediate capture.

For example, simple e-commerce or digital goods may authorize and capture at checkout.

Other businesses use delayed capture.

For example, food delivery, ride sharing, hotel booking, and marketplace orders often authorize first and capture later.

Why?

Because the final amount may change.

There may be tips, substitutions, cancellations, delivery adjustments, or final price changes.

So the system first authorizes the payment method.

Later, after the business event is finalized, it captures the correct amount.

The key idea is:

**Use authorization to reserve funds, and capture when the final charge is ready.**

**(PPT 8: Authorization and Capture)**

Now let’s discuss ledger, webhooks, and reconciliation.

Payment status alone is not enough.

We need auditable accounting records.

A common approach is a double-entry ledger.

Every money movement creates at least two entries: one debit and one credit.

Ledger entries should be immutable, append-only, balanced, auditable, and reconcilable.

Webhooks are also critical because payment providers often send final status asynchronously.

A webhook may say payment succeeded, payment failed, refund succeeded, or chargeback was created.

Webhook processing must be careful.

Always verify the provider signature.
Store the raw event durably.
Deduplicate the event.
Process it idempotently.
And validate state transitions because webhooks can arrive late, duplicated, or out of order.

Reconciliation is the safety net.

Even with retries and webhooks, internal state can diverge from provider state.

For example, our API call may time out, but the provider may have successfully charged the user.

A scheduled reconciliation job compares internal records with provider reports, finds mismatches, repairs state, and creates audit reports.

The key idea is:

**Webhooks update state asynchronously. Reconciliation corrects mismatches. Ledger provides accounting truth.**

**(PPT 9: Ledger, Webhooks, and Reconciliation)**

Finally, let’s talk about fraud, security, failure handling, and observability.

Fraud detection should happen before payment authorization.

The risk system can evaluate signals such as unusual purchase amount, new device, suspicious IP, high refund rate, velocity checks, stolen card indicators, and mismatch between billing and shipping location.

Based on risk score, the system can allow the payment, require extra verification, send it to manual review, or block it.

Security and compliance are critical.

We should avoid storing raw card numbers or CVV.

Instead, use tokenized payment methods from payment providers.

Sensitive data should be encrypted in transit and at rest.

Access should be tightly controlled.

Secrets must be managed securely.

All payment operations should be audited.

For failure handling, we should assume partial failures will happen.

A provider call may timeout even though the payment succeeded.

A webhook may be delayed or duplicated.

An internal database update may fail after provider success.

So every operation should be idempotent.

State transitions should be explicit.

Provider transaction IDs should be stored.

Webhooks should be processed safely.

Reconciliation jobs should repair mismatches.

For observability, I would monitor authorization success rate, capture success rate, refund success rate, provider timeout rate, payment latency, webhook processing lag, reconciliation mismatch count, duplicate request count, fraud decline rate, and chargeback rate.

Every transaction should be traceable end to end using payment intent ID, order ID, transaction ID, provider transaction ID, idempotency key, and state transition logs.

**(PPT 10: Fraud, Security, Failure Handling, and Closing Insight)**

To summarize.

A payment system is a correctness-first financial workflow system.

It starts with a payment intent.

It uses authorization and capture to control money movement.

It models payment as a state machine.

It uses idempotency to prevent duplicate charges and refunds.

It uses provider adapters to isolate external payment providers.

It processes webhooks safely.

It uses reconciliation to repair mismatches.

And it uses an append-only ledger as the accounting source of truth.

The final insight is:

**A payment system is not just calling a payment API.
It is a correctness-first financial state machine built around idempotency, ledger, webhooks, reconciliation, security, and auditability.**

Thank you.
