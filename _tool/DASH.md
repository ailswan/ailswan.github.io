---
title: DASH
category: technology
feature_text: |
  ## DASH (Dynamic Adaptive Streaming over HTTP)
  Post by ailswan Oct.17, 2024
feature_image: "https://picsum.photos/2560/600?image=1035"
strategies_tools:
- DASH
- Streaming
- Adaptive Bitrate Streaming
- Video Delivery
---
## DASH (Dynamic Adaptive Streaming over HTTP)
DASH (Dynamic Adaptive Streaming over HTTP) is an adaptive streaming technology standard that delivers video content over the internet. Similar to HLS, DASH dynamically adjusts video quality based on the viewer's network conditions to ensure smooth playback. It is a platform-agnostic protocol, making it a widely adopted choice for video streaming across various devices.

### Why Choose DASH?
- **Platform-independent:** Unlike HLS, which is closely associated with Apple, DASH is an open standard that works across multiple platforms and devices.
- **Adaptive bitrate streaming:** DASH supports adaptive bitrate streaming, ensuring that users receive the best possible video quality based on their network bandwidth.
- **Scalability:** DASH streams are delivered using standard HTTP servers, making it easy to scale and distribute content using existing CDN infrastructure.
- **Wide codec support:** DASH supports multiple video and audio codecs, offering flexibility for content providers to choose their desired formats.

### Configuration Tips:
- **MPD file setup:** Configure the Media Presentation Description (MPD) file to define media segments and their corresponding bitrates, enabling adaptive streaming.
- **Segment duration:** Choose appropriate segment durations based on latency requirements. Shorter segments reduce latency but may increase HTTP requests, while longer segments improve efficiency.
- **Multiple resolutions:** Encode videos in different resolutions and bitrates to support a wide range of network conditions. Ensure the MPD file references these versions for adaptive delivery.
- **Encryption:** Implement content protection through DRM (Digital Rights Management) by using Common Encryption (CENC) for secure video streaming.

### Example:
- **OTT platform:** Use DASH to stream movies and TV shows on an Over-The-Top (OTT) platform, providing users with a seamless viewing experience on multiple devices.
- **Corporate training videos:** Deliver corporate training videos through DASH to ensure employees across various locations receive the best video quality based on their internet speeds.
- **Live events:** Implement DASH to stream live events like conferences or concerts, ensuring real-time delivery with adaptive bitrate streaming for global audiences.

