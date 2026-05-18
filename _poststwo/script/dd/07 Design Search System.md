 

Hello everyone.
Today I’d like to walk through how to design a **Search System**.

A search system may look like a simple search box.
But behind the scenes, it is not just querying a database.

The core question is:

**How do we return the most relevant results quickly, while keeping the index fresh and scalable?**

**(PPT 1: Title Slide — Design Search System)**

When I think about Search System design, I usually break it down into five parts.

First, how documents are ingested and indexed.
Second, how we understand the user query.
Third, how we retrieve candidate results.
Fourth, how we rank and personalize results.
And finally, how we scale the system with sharding, caching, replication, and failure handling.

The main trade-off is:

**latency vs relevance vs freshness.**

**(PPT 2: Core Framework)**

Let’s start with the core flow.

A search system has two major paths.

The first path is the **indexing path**.
When a document, product, or post is created or updated, the system needs to process it and make it searchable.

The second path is the **query path**.
When a user searches, the system needs to understand the query, retrieve matching candidates, rank them, and return results.

So the key idea is:

**Search is a pipeline of indexing, retrieval, ranking, and serving.**

**(PPT 3: Core Search Flow)**

Now let’s talk about the data model.

I would store the original documents separately from the search index.

The document store is the source of truth.
It stores the document ID, title, body, author, timestamps, status, and metadata.

The search index is optimized for retrieval.

The most important structure is the **inverted index**.

Instead of storing documents by document ID, an inverted index maps each term to the documents that contain that term.

For example, the word “sharding” points to a list of documents that mention sharding.

This makes keyword search very fast.

The key idea is:

**The document store is the source of truth.
The inverted index is the read-optimized search structure.**

**(PPT 4: Document Store and Inverted Index)**

Next is query understanding.

Raw user input is messy.

Users may type incomplete words, misspellings, synonyms, or natural language questions.

So before retrieval, the system needs to normalize the query.

It may lowercase the text, tokenize it, remove stop words, apply stemming, correct typos, expand synonyms, detect entities, and understand intent.

For example, if the user searches for “best running shoes for winter,” the system may understand that this is a product search, related to running shoes, with seasonal relevance.

The key idea is:

**If query understanding is poor, retrieval will be poor, even if the ranking model is strong.**

**(PPT 5: Query Understanding)**

Now let’s discuss retrieval, also called candidate generation.

The goal of retrieval is not to return the final answer immediately.

The goal is to quickly find a manageable set of candidate documents.

For keyword search, we use the inverted index, with scoring methods like BM25 or TF-IDF.

This works well for exact keyword matching and structured search.

For semantic search, we can use vector search.

That means converting the query and documents into embeddings, then finding documents with similar meaning.

This helps when the user query does not exactly match the document words.

In modern systems, I would often use **hybrid retrieval**.

That means combining keyword search, vector search, and structured filters.

The key idea is:

**Retrieval optimizes for recall and speed. Ranking will refine the final order.**

**(PPT 6: Retrieval / Candidate Generation)**

Now let’s talk about ranking.

Ranking decides what the user sees first.

A simple system may rank by text relevance only.

A more advanced system may use many signals: text match, freshness, popularity, click-through rate, user personalization, location, content quality, safety signals, and business rules.

I would usually use a multi-stage ranking pipeline.

The first stage uses cheap signals to rank many candidates quickly.

The second stage uses a more expensive machine learning model on a smaller set.

The final stage applies re-ranking for diversity, freshness, deduplication, safety, and business constraints.

The key idea is:

**Retrieval finds candidates. Ranking decides the final order.**

**(PPT 7: Ranking Pipeline)**

Next is the indexing pipeline.

I would not update the search index directly in the user request path.

Instead, when a document is created or updated, the source service publishes an event.

Indexing workers consume the event, parse and normalize the document, update the inverted index, update ranking features, and then make the document searchable.

Most production systems use **near-real-time indexing**.

That means new content may appear in search after a small delay, usually seconds.

This is a good balance between freshness, cost, and complexity.

The key idea is:

**Indexing should be asynchronous, but indexing lag must be monitored.**

**(PPT 8: Indexing Pipeline)**

Autocomplete should be optimized separately from full search.

Autocomplete is called on every keystroke, so it must be extremely fast.

I would use a prefix index, trie, N-gram index, and popular query statistics.

For example, if the user types “shar,” the system may suggest “sharding,” “shared database,” or “shard key.”

The key idea is:

**Autocomplete is a separate low-latency search problem.**

**(PPT 9: Autocomplete and Caching)**

Finally, let’s discuss scaling and failure handling.

The search index may be too large for one machine, so we shard it across multiple nodes.

A common strategy is document-based sharding, where documents are distributed evenly across shards.

When a query comes in, the search service fans out the query to multiple shards.

Each shard returns its local top results.

Then a coordinator merges those results, applies global ranking, fetches metadata, and returns the final response.

Replication improves availability and read throughput.

Caching is also important.
We can cache popular query results, hot posting lists, document metadata, ranking features, and autocomplete suggestions.

But caching is tricky because freshness, filters, and personalization can change results.

For failure handling, the system should degrade gracefully.

If one shard fails, return partial results.
If the ranking service is down, fall back to simple BM25 ranking.
If the index is corrupted, rebuild it from the document store.

For sensitive content, such as deleted or private documents, I would apply read-time permission checks before returning results.

**(PPT 10: Scaling, Failure Handling, and Closing Insight)**

To summarize.

A search system is not just a database query.

It is a pipeline of indexing, query understanding, retrieval, ranking, and serving.

The document store is the source of truth.
The search index is optimized for fast retrieval.
Retrieval finds candidates.
Ranking decides the final order.
Caching and sharding help the system scale.

The final insight is:

**A search system is not about simply looking up records.
It is about using indexing, retrieval, and ranking to return the most relevant results quickly at large scale.**

Thank you.
