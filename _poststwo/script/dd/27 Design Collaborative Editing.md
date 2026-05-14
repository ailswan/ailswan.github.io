 Below is the **10-page PPT natural English voiceover script** for **Design Collaborative Editing**, ready to read directly. 

---

Hello everyone.
Today I’d like to walk through how to design a **Collaborative Editing System**.

A collaborative editor may look like a simple online document where multiple users type at the same time.

But at scale, it is really a real-time distributed synchronization system.

The system needs to support live editing, cursor updates, presence, conflict resolution, offline edits, version history, and durable document storage.

The core question is:

**How do we let multiple users edit the same document at the same time, while keeping the experience fast and making sure everyone eventually sees the same document?**

**(PPT 1: Title Slide — Design Collaborative Editing)**

When I think about Collaborative Editing design, I usually break it down into five parts.

First, real-time synchronization.
Second, concurrent edit conflict resolution.
Third, OT or CRDT.
Fourth, persistence, version history, presence, and offline editing.
And finally, scalability, failure handling, consistency, and observability.

The main trade-off is:

**responsiveness vs consistency vs implementation complexity.**

Users expect typing to feel instant.
But the system still needs to resolve conflicts correctly and make all clients converge to the same final document.

**(PPT 2: Core Framework)**

Let’s start with the core flow.

A user opens a document and joins an editing session.

The client connects to a WebSocket gateway.

When the user types, the client creates an edit operation.

For example, the operation may represent inserting text, deleting text, or replacing a range.

The client applies the edit locally immediately, so the editor feels fast.

Then the operation is sent to the collaboration service.

The server orders the operation, resolves conflicts if needed, and broadcasts the update to other users.

Other clients receive the operation and apply it to their local document state.

The key idea is:

**Collaborative editing is a continuous loop of local edits, server coordination, and real-time synchronization.**

**(PPT 3: Real-time Editing Flow)**

Now let’s talk about APIs and connections.

The system needs an API to join a document session.

It needs a way to submit edit operations.

It also needs APIs to fetch document history and recover from reconnects.

But real-time editing should not rely on polling.

Polling would add unnecessary latency and waste resources.

Instead, collaborative editing usually uses WebSockets.

WebSockets provide a persistent, bidirectional connection between the client and the server.

This allows clients to send edits quickly and receive updates immediately.

The key idea is:

**Use WebSockets for low-latency bidirectional synchronization.**

**(PPT 4: APIs and WebSocket Communication)**

Next is the high-level architecture.

The client editor connects to a WebSocket gateway.

The gateway maintains persistent connections and routes messages to the collaboration service.

The collaboration service manages active document sessions.

It receives edit operations, assigns ordering, coordinates conflict resolution, and broadcasts updates.

The OT or CRDT engine handles concurrent edits.

The storage layer persists document snapshots and operation logs.

A separate presence service tracks online users, cursor positions, selections, and typing indicators.

The key idea is:

**Separate real-time editing, conflict resolution, persistence, and presence into different components.**

**(PPT 5: High-Level Architecture)**

Now let’s discuss the hardest problem: concurrent editing.

Imagine two users editing the same document at almost the same time.

User A inserts text near the beginning of a paragraph.

User B deletes text in the same paragraph.

Because of network delay, these operations may arrive at different clients in different orders.

If we simply apply operations blindly, users may end up with different document states.

That is unacceptable.

The system needs three properties.

First, convergence: all users eventually see the same document.

Second, intention preservation: the edit should still represent what the user meant.

Third, consistency: operations should be applied in a safe and predictable way.

The key idea is:

**Concurrent editing is not just broadcasting changes. It requires conflict resolution.**

**(PPT 6: Concurrent Editing Problem)**

Now let’s talk about **Operational Transformation**, or OT.

OT is a classic approach used by many centralized collaborative editing systems.

The core idea is to transform operations based on other operations that already happened.

For example, suppose one user inserts text before another user’s cursor position.

The second user’s operation may need its position adjusted.

So if an insert shifts the document, later operations are transformed to match the new document structure.

In an OT-based system, the server usually maintains a canonical operation order.

Clients send operations with a document revision.

The server transforms incoming operations if needed, applies them, and broadcasts the transformed operations to other clients.

OT is mature and efficient, but it is difficult to implement correctly because transformation rules can have many edge cases.

The key idea is:

**OT keeps operations consistent by transforming them against concurrent edits.**

**(PPT 7: Operational Transformation)**

Next is **CRDT**, which stands for Conflict-free Replicated Data Type.

CRDT takes a different approach.

Instead of relying on a central server to transform operations, CRDTs are designed so that replicas can apply operations independently and still converge.

This is especially useful for offline-first systems.

A user can edit while offline.

Another user can also edit somewhere else.

Later, when both clients reconnect, their changes can be merged automatically.

CRDTs are powerful for distributed and offline collaboration.

But they usually require more metadata.

That can increase memory usage, storage size, and implementation complexity.

The key idea is:

**CRDTs make convergence easier across distributed replicas, but they usually add metadata overhead.**

**(PPT 8: CRDT and Offline Editing)**

Now let’s compare OT and CRDT.

OT is commonly used in centralized collaboration systems.

It usually has lower metadata overhead and can be very efficient.

But it requires careful transformation logic and stronger coordination.

CRDT is better for offline-first and peer-to-peer style collaboration.

It gives strong eventual consistency and makes merging easier after disconnection.

But it can use more memory and store more metadata.

So the decision depends on product requirements.

If the product is mostly online and centralized, OT can be a good fit.

If offline editing is a core requirement, CRDT may be a better choice.

The key idea is:

**OT optimizes centralized real-time collaboration. CRDT optimizes distributed and offline collaboration.**

**(PPT 9: OT vs CRDT)**

Finally, let’s talk about presence, persistence, scaling, and failure handling.

Presence data includes online users, cursor positions, selections, and typing indicators.

This data changes frequently and does not need durable storage.

So I would store it in lightweight in-memory systems and broadcast it through WebSockets.

Cursor updates should also be throttled, because sending every tiny mouse movement would waste bandwidth.

For persistence, I would store both document snapshots and operation logs.

Snapshots make loading and recovery faster.

Operation logs support replay, version history, undo, redo, audit, and debugging.

For example, we may create a snapshot every few hundred operations and keep incremental logs between snapshots.

For scaling, I would shard collaboration sessions by document ID.

Users editing the same document should ideally connect to the same collaboration node or document session.

For multi-node fanout, we can use pub/sub to broadcast operations.

For failure handling, the system must tolerate WebSocket disconnects, duplicate operations, out-of-order delivery, and server crashes.

So operations should have sequence numbers or operation IDs.

Clients should be able to reconnect, ask for missing operations, replay pending local changes, and converge again.

For consistency, final document convergence and access control require correctness.

But cursor position, typing status, and presence can be eventually consistent.

For observability, I would monitor edit propagation latency, WebSocket connection count, operation throughput, conflict resolution rate, reconnect frequency, sync failure rate, snapshot recovery latency, and presence update latency.

**(PPT 10: Presence, Persistence, Scaling, and Closing Insight)**

To summarize.

A collaborative editing system is not just multiple users typing in the same document.

It is a real-time synchronization and conflict resolution system.

Clients use WebSockets for low-latency communication.

Local edits are applied optimistically for responsiveness.

The collaboration service orders operations and broadcasts updates.

OT or CRDT resolves concurrent edits.

Presence data is transient and should be separated from durable document storage.

Snapshots and operation logs support recovery, history, undo, redo, and replay.

The system should shard by document, handle reconnects, and guarantee eventual convergence.

The final insight is:

**Collaborative editing is a distributed synchronization system.
Its real challenge is balancing instant user experience with correct conflict resolution and eventual convergence.**

Thank you.
