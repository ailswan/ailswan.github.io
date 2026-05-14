下面是 **10 页 PPT 对应的自然英文口播稿**，可以直接念，English-only。内容基于你上传的 **Design Video Streaming** 材料整理。

---

Hello everyone.
Today I’d like to walk through how to design a **Video Streaming System**.

A video streaming system may look like simple video playback.

But at large scale, it is much more than downloading a file.

The system needs to handle video upload, storage, transcoding, chunking, CDN delivery, adaptive bitrate playback, analytics, security, and cost control.

The core question is:

**How do we deliver smooth, low-latency video playback globally, while keeping storage, processing, and bandwidth cost under control?**

**(PPT 1: Title Slide — Design Video Streaming)**

When I think about Video Streaming design, I usually break it down into five parts.

First, video upload and ingestion.
Second, metadata and storage design.
Third, transcoding, chunking, and adaptive bitrate streaming.
Fourth, CDN delivery, playback, caching, and hot video handling.
And finally, security, analytics, failure handling, observability, and cost control.

The main trade-off is:

**latency vs quality vs cost.**

**(PPT 2: Core Framework)**

Let’s start with the two major flows.

The first flow is the **ingestion path**.

This handles video upload, original file storage, transcoding, thumbnail generation, chunking, manifest creation, and making the video ready for playback.

The second flow is the **playback path**.

This handles permission checks, metadata lookup, manifest delivery, CDN caching, chunk download, bitrate switching, and watch analytics.

So the key idea is:

**Video streaming has two major pipelines: ingestion and playback.**

**(PPT 3: Ingestion Path vs Playback Path)**

Now let’s talk about upload.

I would not upload large video files through the application server.

That would put too much load on the backend.

Instead, the upload service creates a video record and returns a signed upload URL.

The client uploads the original video directly to object storage.

After the upload completes, the system emits an upload-complete event.

That event triggers the transcoding pipeline.

This design reduces application server load and supports large file uploads more efficiently.

The key idea is:

**Use signed upload URLs so clients can upload video files directly to object storage.**

**(PPT 4: Upload Flow)**

Next is metadata and storage.

I would store video metadata separately from the actual video files.

The metadata service stores information such as video ID, owner, title, description, status, visibility, duration, original file location, and available variants.

The actual video bytes are stored in object storage.

This includes the original video, transcoded variants, chunks, thumbnails, subtitles, and manifest files.

This separation is important because metadata needs fast reads and updates, while video bytes require durable and cost-efficient storage.

The key idea is:

**Metadata tracks the video state. Object storage holds the actual media files.**

**(PPT 5: Metadata and Storage Design)**

Now let’s discuss transcoding.

Users watch videos on different devices and network conditions.

Some users may be on fast Wi-Fi.
Some may be on slow mobile networks.
Some may watch on small phones.
Others may watch on large TVs.

So we need multiple versions of the same video.

For example, we may generate 240p, 480p, 720p, 1080p, and 4K variants.

Each variant may have a different resolution, bitrate, codec, and storage path.

The transcoding pipeline runs asynchronously because video processing is expensive and slow.

It takes the original uploaded video, creates multiple variants, generates thumbnails and subtitles if needed, splits videos into chunks, creates a manifest file, and finally marks the video as ready.

The key idea is:

**Transcoding converts one uploaded video into multiple playback-ready versions.**

**(PPT 6: Transcoding Pipeline)**

Next is chunking and adaptive bitrate streaming.

Instead of downloading the whole video, the player downloads small chunks.

Each chunk may be only a few seconds long.

This improves startup time, makes seeking easier, reduces retry cost, and enables adaptive bitrate streaming.

With adaptive bitrate streaming, the player can switch video quality based on network conditions.

If the network is good, it may download 1080p chunks.

If the network becomes poor, it may switch to 480p chunks.

If the network improves again, it can switch back to higher quality.

Common protocols include HLS and MPEG-DASH.

The player first downloads a manifest file.

The manifest describes the available video variants and where to fetch each chunk.

The key idea is:

**Chunking enables adaptive bitrate playback and smooth streaming under changing network conditions.**

**(PPT 7: Chunking and Adaptive Bitrate Streaming)**

Now let’s walk through playback.

When a user opens a video, the playback service first checks whether the user has permission to watch it.

Then it returns video metadata and a manifest URL.

The player downloads the manifest from the CDN.

Then it downloads video chunks from the CDN and dynamically adjusts quality based on bandwidth.

Watch events, such as play, pause, seek, buffering, quality switch, and watch duration, are sent asynchronously.

They should not block playback.

To reduce startup latency, the system should return the manifest quickly, cache metadata, use a CDN close to the user, start with a lower bitrate, and preload the first few chunks.

The key idea is:

**Playback should prioritize fast startup and smooth viewing experience.**

**(PPT 8: Playback Flow)**

CDN is essential for video streaming.

Video traffic is extremely bandwidth-heavy.

A CDN caches video chunks, manifests, thumbnails, previews, and sometimes public metadata close to users.

This reduces latency, lowers origin load, improves global performance, and reduces bandwidth cost.

Hot videos are especially important.

A viral video can suddenly receive massive traffic.

If the CDN cache is cold, the origin storage may be overloaded.

To handle this, we can pre-warm the CDN, replicate chunks across regions, cache metadata aggressively, and promote popular content into cache.

If needed, non-critical features like comments or recommendations can degrade, while playback remains available.

The key idea is:

**CDN is the backbone of scalable video delivery.**

**(PPT 9: CDN, Caching, and Hot Videos)**

Finally, let’s talk about security, analytics, failure handling, and cost.

For security, the system should support public videos, private videos, unlisted videos, subscription-only videos, and region-restricted videos.

For private or paid content, I would use signed URLs, signed cookies, and possibly DRM.

The playback service should check permissions before returning the manifest.

CDN access should also be protected so users cannot bypass permissions and download chunks directly.

Analytics should be processed asynchronously.

Watch events feed view counts, watch time, retention curves, recommendation ranking, creator dashboards, and quality-of-experience monitoring.

Failure handling is also important.

Uploads should support retry and resume.
Transcoding jobs should be retryable through a queue.
If high-resolution chunks are unavailable, the player can fall back to lower resolution.
Analytics failures should not block playback.

For cost control, video systems need lifecycle policies.

Original videos can move to cold storage after transcoding.
Old or rarely watched videos can move to cheaper storage.
High-resolution variants can be generated only when needed.
CDN caching helps reduce origin bandwidth.

Observability should track upload success rate, transcoding queue lag, playback startup latency, rebuffering ratio, CDN cache hit rate, origin bandwidth, playback error rate, and watch event ingestion lag.

**(PPT 10: Security, Analytics, Failure Handling, and Closing Insight)**

To summarize.

A video streaming system has two major pipelines: ingestion and playback.

Ingestion handles upload, storage, transcoding, chunking, manifest generation, and making the video ready.

Playback handles permission checks, metadata lookup, manifest delivery, CDN chunk download, adaptive bitrate switching, and asynchronous analytics.

CDN is critical because video delivery is bandwidth-heavy.

Adaptive bitrate streaming is critical because user network conditions change.

The final insight is:

**Video streaming is not just playing a file.
It is a large-scale media delivery system built from upload, transcoding, chunking, CDN delivery, adaptive playback, and analytics.**

Thank you.
