 

# 🎬 English YouTube Script

## Design RAG Architecture 

---

## 🎯 Opening

Hello everyone.
Today I’d like to walk through how to design a **RAG architecture** in system design.

RAG stands for **Retrieval-Augmented Generation**.

The key idea is simple:

```text
Retrieve relevant knowledge
→ Add it to the prompt
→ Let the LLM generate an answer
```

But in real systems, RAG is not just adding a vector database to an LLM.

It is a full pipeline that prepares data, retrieves the right context, and helps the model generate more accurate and grounded answers.

**(PPT: Title Slide — Design RAG Architecture)**

---

## 🎯 1. Core Framework

When I think about RAG architecture, I usually break it down into four parts.

First, the **offline ingestion pipeline**.
Second, **embedding and indexing**.
Third, the **online retrieval and context construction pipeline**.
And finally, **generation, validation, and evaluation**.

The main trade-off is:

**recall vs precision vs latency vs cost**.

**(PPT: Core Framework — Offline + Online Pipeline)**

---

## 🧱 2. Why RAG?

Why do we need RAG?

Because LLMs alone have limitations.

They may not know private company data.
Their knowledge may be outdated.
They can hallucinate.
And they cannot directly search through a large internal document corpus.

RAG solves this by grounding the model’s answer in external knowledge at runtime.

Instead of asking the model to answer from memory, the system first retrieves relevant documents and gives them to the model as context.

So the key idea is:

**RAG improves factuality by grounding generation in retrieved knowledge.**

**(PPT: Why RAG?)**

---

## 📥 3. Offline Pipeline: Ingestion and Indexing

A RAG system usually starts with an offline pipeline.

The flow looks like this:

```text
Raw documents
→ Cleaning
→ Chunking
→ Metadata extraction
→ Embedding
→ Indexing into vector database
```

**(PPT: Offline Pipeline)**

The most important step here is **chunking**.

Instead of storing one huge document, we split it into smaller chunks, usually a few hundred tokens each.

Chunking matters because retrieval happens at the chunk level.

If chunks are too small, they may lose context.
If chunks are too large, they may add noise and increase token cost.

We also attach metadata, such as document ID, source, section, timestamp, and permission information.

Metadata helps with filtering, freshness, access control, and citations.

Then each chunk is converted into an embedding, which is a vector representation of text.

The vector database stores:

```text
embedding + text chunk + metadata
```

The key idea is:

**Good RAG starts with good data preparation and good chunking.**

---

## 🔍 4. Online Pipeline: Retrieval and Context

At query time, the online pipeline starts.

The flow looks like this:

```text
User query
→ Query embedding
→ Retrieve top-K chunks
→ Re-rank results
→ Build context
→ Send to LLM
```

**(PPT: Online Pipeline)**

First, the user query is converted into an embedding.

Then the system searches the vector database for the most similar chunks.

This is semantic search.

But semantic search alone is not always enough.

For exact terms like error codes, product names, IDs, or policy names, keyword search can work better.

That is why many production systems use **hybrid search**, combining semantic search with keyword search.

After retrieval, we often use **re-ranking**.

For example:

```text
Top 50 candidates
→ Re-rank
→ Top 5 chunks
```

Retrieval focuses on recall.
Re-ranking improves precision.

Then the system builds the final context.

It cannot pass every retrieved chunk to the model because the context window is limited.

So the system must deduplicate, rank, truncate, and format the context into the prompt.

The key idea is:

**Retrieval finds candidates. Context construction decides what the model actually sees.**

---

## 🤖 5. Generation, Validation, and Evaluation

After context construction, the LLM generates the answer.

The prompt should tell the model to answer based only on the provided context.

If the answer is not in the context, the model should say it does not know.

But we should not blindly trust the output.

The system should validate the answer, attach citations, check safety, verify source support, and retry or fallback if needed.

**(PPT: Generation + Validation)**

Evaluation is also important.

For retrieval, we measure things like Recall@K, precision, and context relevance.

For generation, we measure answer accuracy, faithfulness, citation quality, latency, cost, and user satisfaction.

The key idea is:

**RAG quality depends on both retrieval quality and generation quality.**

---

## ⚖️ 6. Trade-offs and Closing

RAG design has several important trade-offs.

Retrieving more documents improves recall, but may add noise and increase latency.

Using larger chunks preserves more context, but increases token cost.

Using re-ranking improves quality, but adds latency and cost.

Common failure modes include irrelevant retrieval, missing key documents, outdated data, context overflow, hallucination, and prompt injection through retrieved documents.

So to summarize:

RAG is not a single step.
It is a full pipeline.

Offline, we prepare and index knowledge.
Online, we retrieve relevant chunks, build context, call the LLM, validate the answer, and return sources.

The final insight is:

**RAG architecture is not about adding a vector database.
It is about designing a reliable retrieval and context pipeline around the LLM.**

In RAG systems, the model can only answer well if the system gives it the right context.

Thank you.

**(PPT: Closing Insight — Retrieval Quality Determines Answer Quality)**
