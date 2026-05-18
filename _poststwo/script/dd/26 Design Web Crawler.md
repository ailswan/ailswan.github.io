 
Hello everyone.
Today I’d like to walk through how to design a **Web Crawler**.

A web crawler may look like a simple program that downloads web pages.

But at large scale, it is really a distributed pipeline for discovering URLs, scheduling crawl tasks, fetching pages, parsing content, deduplicating data, and building indexes.

The core question is:

**How do we crawl the web efficiently and responsibly, while avoiding duplicate work and respecting website limits?**

**(PPT 1: Title Slide — Design Web Crawler)**

When I think about Web Crawler design, I usually break it down into five parts.

First, URL discovery.
Second, URL frontier and scheduling.
Third, page fetching and parsing.
Fourth, deduplication, storage, and indexing.
And finally, politeness, recrawling, distributed scaling, failure handling, and observability.

The main trade-off is:

**freshness vs coverage vs cost.**

We want to crawl many pages, keep them fresh, and avoid wasting resources on duplicates, broken pages, or low-value content.

**(PPT 2: Core Framework)**

Let’s start with the core flow.

The crawler starts with a set of seed URLs.

These seed URLs enter the URL frontier.

The scheduler selects which URLs should be crawled next.

Crawl workers fetch the pages.

The parser extracts text, metadata, and new links.

The deduplication system filters out duplicate URLs and duplicate content.

Then new URLs go back into the frontier, while crawled content goes into storage and indexing.

The key idea is:

**A web crawler is a loop: discover, schedule, fetch, parse, deduplicate, store, and repeat.**

**(PPT 3: End-to-End Crawl Flow)**

Now let’s talk about URL discovery.

URLs can come from many sources.

They can come from seed URLs, links extracted from pages, sitemaps, RSS feeds, and user submissions.

After fetching a page, the parser extracts hyperlinks from the HTML.

But before adding those URLs into the frontier, we need to normalize them.

For example, we may remove URL fragments, lowercase the hostname, remove duplicate slashes, canonicalize query parameters, and handle HTTP-to-HTTPS normalization.

This is important because the same page can appear under many different URL formats.

The key idea is:

**URL normalization prevents duplicate URLs from exploding in the crawl frontier.**

**(PPT 4: URL Discovery and Normalization)**

Next is the URL frontier.

The URL frontier is the heart of the crawler.

It stores pending URLs and decides crawl order.

A simple strategy is FIFO, which gives us a broad crawl.

A more advanced strategy uses priority.

For example, we may crawl popular pages, frequently updated pages, high-authority pages, or news pages more often.

The frontier also needs host-based scheduling.

We should not send too many requests to the same domain at once.

For example, one website may allow one request every five seconds, while another large news site may handle more frequent crawls.

The key idea is:

**The frontier controls freshness, priority, fairness, and crawl throughput.**

**(PPT 5: URL Frontier and Scheduling)**

Now let’s discuss page fetching.

Crawl workers should be lightweight and mostly stateless.

A worker gets a URL from the scheduler, checks whether the URL is allowed, performs DNS lookup, sends the HTTP request, handles redirects, applies timeouts, and stores the response.

Workers must handle common HTTP issues such as redirects, compression, TLS, rate limits, server errors, and network timeouts.

For retries, I would use exponential backoff and retry only transient failures.

We should not retry forever.

The key idea is:

**Crawl workers should fetch pages asynchronously, handle failures safely, and avoid blocking the whole pipeline.**

**(PPT 6: Fetching Pages)**

Next is robots.txt and politeness.

This is a very important part of crawler design.

A crawler must not behave like an attack.

Before crawling a domain, the system should fetch and cache that domain’s robots.txt rules.

If a page is disallowed, the crawler should not fetch it.

The system should also enforce per-domain rate limits, limit concurrent requests to the same host, add some random delay between requests, and identify itself with a clear User-Agent.

The key idea is:

**A production crawler must be polite. It should respect robots.txt and avoid overwhelming websites.**

**(PPT 7: Robots.txt and Politeness)**

Now let’s talk about deduplication.

Duplicates happen everywhere on the web.

The same page may appear through multiple links.

Tracking parameters may create different URLs for the same content.

Redirects can point to the same final page.

Session IDs and calendar pages can generate endless duplicate URLs.

So I would use multiple layers of deduplication.

First, URL-level deduplication using normalized URLs.

Second, a Bloom filter or distributed hash set to quickly check whether a URL has already been seen.

Third, content-level deduplication using content hashes.

For near-duplicate pages, techniques like SimHash or MinHash can help.

The key idea is:

**Deduplication saves crawl bandwidth, storage, and indexing cost.**

**(PPT 8: Deduplication)**

Next is parsing and storage.

After a page is fetched, the parser extracts useful information.

This may include links, title, metadata, structured data, images, keywords, and main text.

Parsing has challenges.

HTML may be malformed.
Pages may be JavaScript-heavy.
Some sites create infinite calendar URLs.
Some pages have duplicate templates.

For JavaScript-heavy pages, full browser rendering is expensive.

So I would only use headless rendering selectively, for pages where it is really needed.

For storage, I would separate raw HTML, crawl metadata, link graph, and search index.

Raw HTML can go to object storage for replay and reprocessing.

Crawl metadata can go to a database.

Searchable content can go to a search index.

The key idea is:

**Parsing turns raw pages into structured data, and storage should separate raw content, metadata, and indexes.**

**(PPT 9: Parsing and Storage)**

Finally, let’s discuss distributed scaling, freshness, and failure handling.

The web is huge, so a crawler must be distributed.

I would use distributed URL queues, stateless workers, asynchronous fetching, and sharding by host or domain.

Host-based partitioning is useful because it helps enforce politeness rules and improves locality.

Recrawling is also important because web pages change over time.

A news homepage may need to be crawled every minute.

A static archive page may only need to be crawled once a week.

The recrawl frequency should depend on page popularity, historical update frequency, HTTP cache headers, and content importance.

The crawler also needs protection against spider traps.

For example, infinite calendar pages can generate endless URLs.

To handle this, I would use depth limits, URL pattern filters, maximum response size, MIME-type filtering, and per-domain quotas.

For failure handling, the system should use persistent queues, retries, checkpointing, dead-letter queues, and idempotent processing.

If a worker crashes, another worker should be able to continue the crawl.

For observability, I would monitor URLs crawled per second, frontier queue size, fetch latency, success rate, error rate, duplicate rate, robots violations, retry rate, DNS latency, storage growth, and crawl freshness.

**(PPT 10: Scaling, Freshness, Failure Handling, and Closing Insight)**

To summarize.

A web crawler is not just downloading pages.

It is a distributed URL discovery, scheduling, fetching, parsing, deduplication, and indexing system.

The URL frontier decides what to crawl next.

Crawl workers fetch pages asynchronously.

Parsers extract links and metadata.

Deduplication prevents wasted work.

Storage separates raw HTML, metadata, link graph, and search index.

Politeness protects websites.

Recrawling keeps content fresh.

The final insight is:

**A web crawler is a large-scale distributed scheduling system.
Its real challenge is not fetching one page, but crawling billions of pages efficiently, responsibly, and repeatedly.**

Thank you.
