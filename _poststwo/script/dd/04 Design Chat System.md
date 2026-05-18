 

# 🎬 English YouTube Script

## 04 Design Chat System

---

## PPT 1 — Title Slide

Hello everyone.
Today I’d like to walk through a classic system design problem: **Design a Chat System**.

A chat system is not just WebSocket.

At a deeper level, it is a durable messaging system with real-time delivery on top.

The basic flow looks like this:

```text
User sends message
→ Store message durably
→ Publish message event
→ Deliver to online users
→ Notify offline users
→ Sync missed messages later
```

The key idea is:

**A chat system must balance low latency, message durability, ordering, and large-scale connection management.**

**(PPT: Title Slide — Design Chat System)**

---

## PPT 2 — Core Requirements

For functional requirements, the system should support one-to-one messages, group messages, real-time message receiving, conversation history, online and offline users, delivery status, read receipts, media messages, and push notifications.

For non-functional requirements, the system needs low-latency delivery, high availability, durable message storage, scalable concurrent connections, and reliable recovery after failures.

Not everything needs the same consistency level.

Message content requires strong durability because users should not lose messages.

But delivery status, read receipts, typing indicators, and presence can usually be eventually consistent.

The key idea is:

**Message persistence is critical; delivery signals can be best effort or eventually consistent.**

**(PPT: Functional + Non-Functional Requirements)**

---

## PPT 3 — Main APIs and Data Model

The main APIs include sending messages, loading conversation history, receiving real-time events through WebSocket, and marking messages as read.

For sending a message, the client sends:

```text
conversationId
senderId
content
messageType
clientMessageId
```

The `clientMessageId` is important for idempotency.

If the client retries the same send request, the server can detect it and avoid storing duplicate messages.

For the data model, I would use tables such as:

```text
user
conversation
conversation_participant
message
message_delivery_status
```

Messages should be partitioned by conversation ID because history is usually queried per conversation.

The key idea is:

**Store messages by conversation, and store read or delivery status separately from message content.**

**(PPT: APIs + Data Model)**

---

## PPT 4 — Communication Model

There are three common communication options.

The first is polling.

The client asks the server for new messages every few seconds.

It is simple, but it creates higher latency and wastes resources when there are no new messages.

The second is long polling.

The client request waits until the server has updates.

This is better than polling, but still has more overhead than WebSocket.

The third is WebSocket.

WebSocket provides a persistent bidirectional connection between client and server.

This is the best fit for online real-time chat delivery.

My recommendation is:

```text
WebSocket for online delivery
Push notification for offline users
HTTP for history and state updates
```

The key idea is:

**Use WebSocket for real-time delivery, but keep HTTP for durable APIs and history.**

**(PPT: Polling vs Long Polling vs WebSocket)**

---

## PPT 5 — Message Send Flow

A typical send-message flow looks like this:

```text
Client sends message with clientMessageId
→ API authenticates user
→ Validate conversation membership
→ Generate server messageId
→ Store message durably
→ Publish message-created event
→ Delivery service pushes to online users
→ Push notification service notifies offline users
→ Return acknowledgement to sender
```

The most important design decision is:

```text
Store before deliver
```

Why?

Because message durability matters.

If we deliver first but fail to store, users may briefly see a message that disappears later.

That is unacceptable for most chat systems.

The key idea is:

**Persist first, then deliver asynchronously.**

**(PPT: Message Send Flow — Store Before Deliver)**

---

## PPT 6 — Message Receive and Offline Sync

For an online user, the flow is:

```text
message event
→ delivery service
→ find active WebSocket connection
→ push message to client
→ client sends ack
→ update delivered status
```

For an offline user, the message is already safely stored.

So the system sends a push notification.

Later, when the user opens the app, the client syncs missed messages from storage.

This offline sync can use a cursor, timestamp, or last seen message ID.

The system should also support reconnect behavior.

If a WebSocket connection drops, the client reconnects and asks for messages after the last seen message.

The key idea is:

**Real-time delivery can fail, but history sync guarantees recovery.**

**(PPT: Online Delivery + Offline Sync)**

---

## PPT 7 — Ordering and Idempotency

Within a conversation, users expect messages to appear in order.

There are a few possible ordering strategies:

```text
server timestamp
Snowflake-style ID
per-conversation sequence number
```

The cleanest option is often a per-conversation sequence number.

It gives clear ordering inside one conversation and avoids client clock skew.

Idempotency is also critical.

Mobile clients may retry when the network is unstable.

So each send request should include:

```text
senderId + clientMessageId
```

If the same client message is retried, the server returns the original result instead of creating a duplicate message.

The key idea is:

**The server should own message ordering, and clientMessageId should handle retries.**

**(PPT: Ordering + Idempotency)**

---

## PPT 8 — Read Receipts, Presence, and Typing Indicators

Chat systems usually track message states.

Common states are:

```text
sent
delivered
read
```

For read receipts, I would store each participant’s `lastReadMessageId` per conversation.

This is more scalable than storing one read row for every message-user pair, especially in group chats.

Presence tracks whether a user is online.

It can be stored as:

```text
userId → active connection IDs
```

This state is usually stored in Redis, an in-memory registry, or a distributed presence service.

Typing indicators are even more temporary.

They should use short TTLs and do not need durable storage.

The key idea is:

**Read state should be compact; presence and typing should be ephemeral.**

**(PPT: Read Receipts + Presence + Typing)**

---

## PPT 9 — Scaling, Caching, and Failure Handling

To scale the system, I would separate the WebSocket gateway layer from message business logic.

The architecture looks like:

```text
Client
→ WebSocket Gateway
→ Delivery Service
→ Message Service
→ Message Store
```

Message delivery should be asynchronous through a queue.

Messages can be sharded by conversation ID because history queries are conversation-based.

Connections can be routed by user ID through a presence service.

For caching, we can cache recent messages, conversation metadata, participant lists, unread counts, and presence.

Media files should be stored separately and served through CDN.

For failure handling, assume WebSocket drops, clients retry, queues back up, push notifications fail, and acknowledgements can be lost.

The system should support retries, idempotency, durable storage, dead-letter queues, and periodic sync for missed messages.

The key idea is:

**A scalable chat system separates connection management, durable storage, and async delivery.**

**(PPT: Scaling + Cache + Failure Handling)**

---

## PPT 10 — Senior-Level Explanation and Closing Insight

At senior level, I would explain a chat system like this.

A chat system is a durable messaging system with real-time delivery on top.

The three core flows are sending messages, receiving messages in real time, and loading conversation history.

I would use WebSocket for online users, push notifications for offline users, and HTTP APIs for sending messages, reading history, and updating read status.

Messages should be stored durably before delivery.

After persistence, the message service publishes a message-created event.

Delivery workers push the message to online users through WebSocket gateways.

Offline users receive push notifications and later sync missed messages from storage.

Messages should be partitioned by conversation ID because history is usually read per conversation.

Ordering should be assigned on the server, preferably with a per-conversation sequence number.

Client retries should be deduplicated using `clientMessageId`.

The final insight is:

**A chat system is not just WebSocket.
It is durable message storage plus real-time delivery, offline synchronization, ordering, idempotency, and multi-device connection management.**

The goal is to provide reliable message storage and low-latency delivery across online, offline, and multi-device users.

Thank you.

**(PPT: Closing Insight — Durable Messaging + Real-Time Delivery)**
