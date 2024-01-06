---
layout: essay_single
title: Basic Q & A
date: 2024-01-06
tags:
  - Backend
categories:
- Q&A
- Backend
feature_text: |
  ## Basic Q & A
  Post by ailswan Jan. 06, 2024
feature_image: "https://picsum.photos/2560/600?image=865"
---

### Basic Q & A 

### **1. Networks of Networks**

The network connects hosts, while the internet connects various different networks. Therefore, the internet is a network of networks. The Internet, on the other hand, refers to a global-scale internet.

---

### **2. ISP (Internet Service Provider)**

Internet Service Providers (ISPs) can obtain numerous IP addresses from internet management organizations. They possess communication lines, routers, and other networking equipment. Individuals or organizations can gain access to the internet by paying a certain fee to the ISP.

The current internet structure follows a hierarchical ISP model with multiple layers. ISPs are categorized into Tier-1 ISPs, Regional ISPs, and Access ISPs based on the extent of their coverage. Internet Exchange Points (IXPs) enable direct connections between two ISPs without involving a third ISP.

---

### **3. Communication Methods Between Hosts**

1. **Client-Server (C/S):**
   - In the Client-Server model, the client requests services, and the server provides those services.
   
2. **Peer-to-Peer (P2P):**
   - In Peer-to-Peer communication, there is no distinction between clients and servers. Participants in the network can both request and provide services.

---

### **4. Circuit Switching vs. Packet Switching**

1. **Circuit Switching:**
   - Used in telephone communication systems, circuit switching requires establishing a dedicated physical link before two users can communicate. The entire communication process occupies this link throughout, resulting in low line utilization, often less than 10%.

2. **Packet Switching:**
   - Each packet includes a header and a trailer containing control information such as source and destination addresses. Multiple packets can be transmitted simultaneously on the same transmission line without affecting each other. Packet switching does not require exclusive use of the transmission line.
   
   - In a postal communication system, similar to the store-and-forward process, packets are first stored and then forwarded together to the next destination.

---

### **5. Delay**

**Total Delay = Queuing Delay + Processing Delay + Transmission Delay + Propagation Delay**

1. **Queuing Delay:**
   - Time spent by packets waiting in the input and output queues of routers, depending on the current network traffic.

2. **Processing Delay:**
   - Time required for hosts or routers to process received packets, including analyzing headers, extracting data from packets, performing error checks, or finding appropriate routes.

3. **Transmission Delay:**
   - Time required for hosts or routers to transmit data frames.

   **\[Transmission Delay = \frac{l}{v}\]**
   - Where \(l\) is the length of the data frame, and \(v\) is the transmission rate.

4. **Propagation Delay:**
   - Time taken for electromagnetic waves to propagate through the channel, with the speed of electromagnetic wave propagation being close to the speed of light.

   **\[Propagation Delay = \frac{l}{v}\]**
   - Where \(l\) is the length of the channel, and \(v\) is the propagation speed of electromagnetic waves on the channel.

---

### **6. Computer Network Architectures**

#### **1. Five-Layer Protocol Stack**

1. **Application Layer:**
   - Provides data transfer services for specific applications, such as HTTP, DNS, etc. The data unit is a message.

2. **Transport Layer:**
   - Provides general data transfer services for processes. Due to the variety of application layer protocols, defining a general transport layer protocol can support the increasing number of application layer protocols. The transport layer includes two protocols: Transmission Control Protocol (TCP), providing connection-oriented and reliable data transfer services, with the data unit being a segment; User Datagram Protocol (UDP), providing connectionless and best-effort data transfer services, with the data unit being a datagram. TCP primarily offers integrity services, while UDP mainly provides timeliness services.

3. **Network Layer:**
   - Provides data transfer services for hosts. The transport layer protocols serve processes within hosts. The network layer encapsulates the segments or datagrams passed down by the transport layer into packets.

4. **Data Link Layer:**
   - The network layer addresses data transfer services between hosts. Since there can be multiple links between hosts, the data link layer protocol provides data transfer services for hosts on the same link. The data link layer encapsulates the packets passed down by the network layer into frames.

5. **Physical Layer:**
   - Concerned with transmitting bitstreams over transmission media, not specific transmission media. The role of the physical layer is to shield the differences in transmission media and communication methods as much as possible, making the data link layer unaware of these differences.

#### **2. OSI Model**

- **Presentation Layer:**
   - Handles data compression, encryption, and data description, allowing applications to not worry about differences in data internal formats across different hosts.

- **Session Layer:**
   - Establishes and manages sessions.

Note: The Five-Layer Protocol Stack doesn't have a presentation layer and session layer; these functions are left to application developers.

#### **3. TCP/IP Architecture**

- It consists of four layers, essentially merging the data link layer and physical layer into the network interface layer.

- The TCP/IP architecture does not strictly adhere to the OSI layered concept; the application layer may directly use the IP layer or the network interface layer.

#### **4. Data Transmission Across Layers**

- In the downward process, headers or trailers required by the lower-layer protocol are added. In the upward process, headers and trailers are continuously removed.

#### **5. Router and Protocol Layers**

- Routers only have the following three layers of protocols. As routers are located in the network core, they do not need to provide services for processes or applications. Therefore, they do not require the transport layer and application layer.

---

### **7. Communication Modes**

According to the direction of information transmission on the transmission line, communication modes are classified into the following three types:

#### **1. Simplex Communication:**
   - Unidirectional transmission.

#### **2. Half-Duplex Communication:**
   - Bidirectional alternate transmission.

#### **3. Full-Duplex Communication:**
   - Bidirectional simultaneous transmission.
### **8. Bandpass Modulation**

Analog signals are continuous, while digital signals are discrete. Bandpass modulation converts digital signals into analog signals.

---

### **8. Basic Questions**

#### **1. Frame Encapsulation**
   - Adds headers and trailers to the packets from the network layer to mark the start and end of frames.

#### **2. Transparent Transmission**
   - "Transparent" refers to making something that actually exists appear as if it does not.

   - For frame delineation, headers and trailers are used. If the data portion of a frame contains the same content as the headers and trailers, the start and end positions of the frame may be incorrectly identified. To address this, escape characters are inserted before the occurrence of the same content in the data portion. If the data portion contains escape characters, an additional escape character is added before each escape character. After processing at the receiving end, the original data can be restored. The content of transparent transmission involves the use of escape characters, which users are unaware of.

#### **3. Error Detection**
   - Currently, the data link layer extensively uses Cyclic Redundancy Check (CRC) to check for bit errors.

---

### **9. Channel Classification**

#### **1. Broadcast Channel**
   - One-to-many communication, where data sent by one node can be received by all nodes on the broadcast channel.

   - All nodes send data on the same broadcast channel, requiring specialized control methods to coordinate and avoid collisions. Two main coordination methods are channel multiplexing techniques and the CSMA/CD protocol.

#### **2. Point-to-Point Channel**
   - One-to-one communication.

   - Since collisions do not occur, it is relatively simple, using the PPP protocol for control.

### **10. Channel Multiplexing Techniques**

#### **1. Frequency Division Multiplexing (FDM)**
   - All hosts in FDM occupy different frequency bandwidth resources at the same time.

#### **2. Time Division Multiplexing (TDM)**
   - All hosts in TDM occupy the same frequency bandwidth resources at different times.

   - Communication using FDM and TDM involves hosts continuously occupying a portion of channel resources throughout the communication process. However, due to the bursty nature of computer data, it is unnecessary to continuously occupy channel resources during communication without allowing other users to use them. Therefore, these two methods have relatively low channel utilization rates.

#### **3. Statistical Time Division Multiplexing**
   - An improvement over TDM, where each user's position in the TDM frame is not fixed. Instead, whenever there is data, it is gathered to form a statistical TDM frame and then transmitted.

#### **4. Wavelength Division Multiplexing (WDM)**
   - Multiplexing optical signals using different wavelengths. Since the frequency of light is high, wavelength, not frequency, is conventionally used to represent the light carrier.

#### **5. Code Division Multiplexing (CDM)**
   - Allocates a unique code sequence of length m for each user, where all code sequences are orthogonal. For any two code sequences 𝐚⃗𝑆 and 𝐚⃗𝑇:

\[1 = \frac{1}{m} \cdot \mathbf{a⃗S} \cdot \mathbf{a⃗T}\]

   - Let's take m=8 for illustration. Consider a code sequence 𝐚⃗𝑆 as 00011011. When a user with this code sequence sends bit 1, the original code sequence is transmitted. Conversely, when sending bit 0, the complement of the code sequence (11100100) is transmitted.

   - In mathematical representation, 00011011 can be denoted as (-1, -1, -1, +1, +1, -1, +1, +1). This yields:

\[1 = \frac{1}{m} \cdot \mathbf{a⃗S} \cdot \mathbf{a⃗S} = 1\]

\[−1 = \frac{1}{m} \cdot \mathbf{a⃗S} \cdot \mathbf{a⃗S′} = −1\]

   - Here, 𝐚⃗𝑆′ is the complement of 𝐚⃗𝑆.

   - Applying these formulas, when the receiving end uses the code sequence 𝐚⃗𝑆 to perform dot product calculations on the received data, a result of 0 indicates data sent by other users, a result of 1 indicates the user sent bit 1, and a result of -1 indicates the user sent bit 0.

   - Code Division Multiplexing requires sending m times the amount of data compared to before.

---

### **10. CSMA/CD Protocol**

**CSMA/CD** stands for Carrier Sense Multiple Access with Collision Detection.

- **Multiple Access:** This indicates a bus-type network where numerous hosts connect to the bus in a multiple access fashion.

- **Carrier Sense:** Every host must continuously monitor the channel. Before transmitting, if a host detects that the channel is in use, it must wait.

- **Collision Detection:** During transmission, if a host senses that another host is already transmitting data, a collision is detected. Although each host checks if the channel is idle before sending data, collisions can still occur due to the propagation delay of electromagnetic waves.

The end-to-end propagation delay is denoted as τ. The first transmitting station can determine whether a collision has occurred after a maximum of 2τ, referred to as the **contention period**. Only after this contention period with no detected collision can it be certain that the transmission will not collide.

When a collision occurs, the station must cease transmission and wait for a certain duration before attempting a retransmission. This duration is determined using the **Binary Exponential Backoff Algorithm**. A random number, denoted as r, is selected from the discrete integer set {0, 1, ..., (2^k - 1)}. The retransmission wait time is then set to r times the contention period.

---

### **11. PPP Protocol**

Internet users typically need to connect to an Internet Service Provider (ISP) to access the internet. The **PPP (Point-to-Point Protocol)** is a data link layer protocol used for communication between a user's computer and an ISP.

#### **PPP Frame Format:**

- **F Field:** Marks the beginning and end of the frame.
  
- **A and C Fields:** Currently have no significance.

- **FCS Field:** Carries the Frame Check Sequence, which is a CRC (Cyclic Redundancy Check) verification sequence.

- The length of the information section does not exceed 1500 bytes.

---

### **12. MAC Address**

The MAC (Media Access Control) address is a data link layer address with a length of 6 bytes (48 bits), used to uniquely identify a network adapter (NIC).

A host has as many MAC addresses as it has network adapters. For example, a laptop commonly has both a wireless and a wired network adapter, resulting in two MAC addresses.

---

### **13. Local Area Network (LAN)**

A LAN is a typical broadcast channel, characterized by the network being owned by a single entity with limited geographical range and a finite number of sites.

Various LAN technologies include Ethernet, Token Ring, FDDI, and ATM. Currently, Ethernet dominates the wired LAN market.

LANs can be classified based on network topology:

---

### **14. Ethernet**

Ethernet is a LAN with a star topology.

In the early days, connections were made using hubs, which operate at the physical layer, dealing with bits rather than frames. When a bit reaches an interface, the hub regenerates and amplifies it, extending the network's transmission distance. If a hub receives frames from two different interfaces simultaneously, a collision occurs.

Today, Ethernet uses switches instead of hubs. Switches, operating at the data link layer, eliminate collisions and perform store-and-forward based on MAC addresses.

**Ethernet Frame Format:**

- **Type:** Indicates the protocol used in the upper layer.
  
- **Data:** Ranges in length from 46 to 1500; if too small, it is padded.
  
- **FCS (Frame Check Sequence):** Employs the CRC verification method.

---

### **15. Switch**

A switch possesses self-learning capabilities, focusing on the content of its switching table, which stores the mapping of MAC addresses to interfaces.

Due to this self-learning ability, switches are plug-and-play devices, eliminating the need for network administrators to manually configure switch table contents.

In the diagram below, the switch has four interfaces. When Host A sends a data frame to Host B, the switch adds the mapping of Host A to Interface 1 to its switching table. To send the data frame to B, it first checks the switching table. Since there's no entry for Host B at this point, Host A sends a broadcast frame. Hosts C and D discard this frame, but Host B responds. The switch then looks up the switching table, finding the mapping of Host A to Interface 1, and sends the data frame to Interface 1. Simultaneously, the switch adds the mapping of Host B to Interface 2.

---

### **16. Virtual Local Area Network (VLAN)**

VLANs can establish logical groups independent of physical locations. Only members within the same VLAN receive link-layer broadcast messages.

For example, in the diagram below, (A1, A2, A3, A4) belong to a VLAN. A broadcast sent by A1 is received by A2, A3, and A4, while other stations do not receive it.

VLANs are created using trunk connections, with a specific interface on each switch set as a trunk interface, connecting VLAN switches. IEEE defines an extended Ethernet frame format, 802.1Q, adding a 4-byte header VLAN tag to standard Ethernet frames, indicating the VLAN to which the frame belongs.

---

### **17. Overview**

As the core of the entire internet, the network layer should be as simple as possible. The network layer provides a simple, flexible, connectionless, and best-effort datagram service upwards.

Using the IP protocol, heterogeneous physical networks can be interconnected, creating the appearance of a unified network at the network layer.

Complementary to the IP protocol, three other protocols are commonly used:

- Address Resolution Protocol (ARP)
  
- Internet Control Message Protocol (ICMP)
  
- Internet Group Management Protocol (IGMP)

---

### **18. IP Datagram Format**

- **Version:** There are two values, 4 (IPv4) and 6 (IPv6).
  
- **Header Length:** Occupies 4 bits, with a maximum value of 15. A value of 1 represents the length of 1 32-bit word, i.e., 4 bytes. As the fixed part's length is 20 bytes, this value has a minimum of 5. If the optional field's length is not a multiple of 4 bytes, the trailing padding is used.

- **Differentiated Services:** Used to obtain better services, but generally not used.

- **Total Length:** Includes both header and data part lengths.

- **Time-to-Live (TTL):** It prevents undeliverable datagrams from endlessly circulating on the internet, measured in router hops. When TTL is 0, the datagram is discarded.

- **Protocol:** Indicates which protocol should handle the carried data, e.g., ICMP, TCP, UDP, etc.

- **Header Checksum:** Excludes the data part to reduce computational workload since the checksum is recalculated after each router.

- **Identifier:** In cases of fragmentation due to long datagram lengths, different fragments of the same datagram share the same identifier.

- **Fragment Offset:** Used with the identifier for fragmented datagrams. The offset unit is 8 bytes.

---

### **19. IP Addressing Methods**

IP address addressing has gone through three historical stages:

1. **Classification**
   
   Comprising network and host numbers, with different classes having varying network number lengths and fixed host number lengths.

   `IP Address ::= {<Network Number>, <Host Number>}`

2. **Subnetting**
   
   By using a portion of the host number field as a subnet number, IP addresses are divided into three levels.

   `IP Address ::= {<Network Number>, <Subnet Number>, <Host Number>}`

   To use subnets, a subnet mask must be configured. A default subnet mask for a Class B address is 255.255.0.0. If two bits are used for subnetting, the subnet mask is 255.255.192.0.

   Note: External networks cannot see the presence of subnets.

3. **Classless**
   
   CIDR eliminates the concepts of traditional Class A, B, and C addresses and subnet divisions, using a network prefix and host number for IP address encoding. The network prefix length can vary as needed.

   `IP Address ::= {<Network Prefix>, <Host Number>}`

   CIDR notation appends the network prefix length to the IP address. For example, 128.14.35.7/20 indicates a 20-bit network prefix.

   CIDR addresses are more efficient, aggregating multiple routes into a single route, reducing the number of entries in the routing table. This method of reducing routing table entries using network prefixes is called route aggregation or supernetting.

In the routing table, entries consist of "network prefix" and "next-hop address." During a lookup, multiple matching results may be obtained, and the longest prefix match should be used.

---

### **20. Address Resolution Protocol (ARP)**

The network layer facilitates communication between hosts, and the link layer handles communication between segments. Therefore, during communication, the source and destination addresses of IP datagrams remain constant, while MAC addresses change with the link.

ARP is implemented to obtain the MAC address from an IP address.

Each host has an ARP cache containing mappings of IP addresses to MAC addresses for hosts and routers on the local network.

If Host A knows the IP address of Host B, but the ARP cache lacks the mapping of this IP address to a MAC address, Host A sends an ARP request packet through broadcasting. Upon receiving this request, Host B responds with an ARP reply packet containing its MAC address. Subsequently, Host A writes the mapping of Host B's IP address to its MAC address in its cache.

---

### **21. Internet Control Message Protocol (ICMP)**

ICMP serves to forward IP datagrams more efficiently and enhance the chances of successful delivery. It is encapsulated in IP datagrams but does not belong to any higher-level protocol.

ICMP messages are divided into error reporting messages and query messages.

1. **Ping**

   Ping, a crucial application of ICMP, is primarily used to test the connectivity between two hosts.

   The principle behind Ping involves sending ICMP Echo request messages to the destination host. Upon receiving them, the destination host replies with Echo reply messages. Ping estimates round-trip time and packet loss rate based on time and successful response counts.

2. **Traceroute**

   Traceroute, another ICMP application, traces the path of a packet from the source to the destination.

   Traceroute sends IP datagrams encapsulating undeliverable UDP user datagrams. The destination host responds with an ICMP destination unreachable error message.

   The source host sends a sequence of datagrams. The first datagram, P1, has a Time-to-Live (TTL) set to 1. When it reaches the first router R1, R1 decrements TTL by 1, resulting in TTL equal to 0, and R1 discards P1, sending an ICMP time exceeded error message to the source. The source then sends the second datagram, P2, with TTL set to 2, and the process repeats.

   This continues until the last datagram just reaches the destination host, which does not forward or decrement TTL. As the UDP datagram is undeliverable, the destination host sends an ICMP destination unreachable error message to the source.

   After this, the source host knows the IP addresses of the routers the datagram passed through and the round-trip time to each router.

---

### **22. Virtual Private Network (VPN)**

Due to the scarcity of IP addresses, an organization can often obtain a number of IP addresses far less than the total number of hosts it owns. Moreover, an organization doesn't need to connect all hosts to the external internet. Computers within an organization can use IP addresses (private addresses) that are valid only within that organization.

There are three private address blocks:

- 10.0.0.0 ~ 10.255.255.255
- 172.16.0.0 ~ 172.31.255.255
- 192.168.0.0 ~ 192.168.255.255

*** Using the public internet as the communication medium between various private networks of the organization. "Private" implies that hosts within the organization only communicate with other hosts within the same organization, while "virtual" suggests it appears to be so, but in reality, it traverses the public internet.

In the diagram below, communication between locations A and B occurs over the internet. If host X from location A wants to communicate with another host Y from location B, the IP datagram's source address is 10.1.0.1, and the destination address is 10.2.0.3. The datagram is first sent to the router R1 connected to the internet. R1 encrypts the internal data, then reattaches the datagram's header with the source address as router R1's global address 125.1.2.3 and the destination address as router R2's global address 194.4.5.6. Router R2 receives the datagram, decrypts the data portion, restores the original datagram, and delivers it to Y with the destination address now being 10.2.0.3.

---

### **23. Network Address Translation (NAT)**

When hosts within a private network, using local IP addresses, need to communicate with hosts on the internet, NAT can be used to convert local IP to global IP.

In the past, NAT mapped local IP to global IP on a one-to-one basis, allowing a maximum of n hosts within a private network, which had n global IP addresses, to simultaneously access the internet. To make more efficient use of global IP addresses, modern NAT translation tables also use transport layer port numbers. This allows multiple hosts within different private networks to share a single global IP address. NAT that uses port numbers is also known as Network Address and Port Translation (NAPT).

---

### **24. Router Structure**

Functionally, routers can be divided into two parts: routing selection and packet forwarding.

The packet forwarding structure consists of three components: switching structure, a set of input ports, and a set of output ports.

---

### **25. Router Packet Forwarding Process**

1. Extract the destination host's IP address D from the datagram header to obtain the destination network address N.
2. If N is directly connected to this router, perform direct delivery.
3. If the routing table has a specific host route for destination address D, forward the datagram to the next-hop router specified in the table.
4. If the routing table has a route to reach network N, forward the datagram to the next-hop router specified in the table.
5. If the routing table has a default route, forward the datagram to the default router specified in the table.
6. Report an error if forwarding the packet encounters issues.

---

### **26. Routing Protocols**

Routing protocols are adaptive, adjusting themselves based on changes in network communication volume and topology.

The internet is divided into numerous smaller Autonomous Systems (AS), each using a different routing protocol.

Routing protocols can be categorized into two main types:

- Interior Gateway Protocols (IGP) within an AS: RIP and OSPF
- Exterior Gateway Protocol (EGP) between AS: BGP

#### 1. **Routing Information Protocol (RIP)**

RIP is a distance vector-based routing protocol where distance refers to the number of hops. Directly connected routers have a hop count of 1, with a maximum of 15 hops (indicating unreachable).

Steps in the distance vector algorithm:

- Modify RIP messages received from router X, changing all next-hop addresses to X and incrementing all distance fields by 1.
- For each modified RIP message:
  - If the destination network N is not in the routing table, add the entry.
  - Otherwise:
    - If the next-hop router address is X, replace the corresponding entry in the routing table.
    - If the received distance d is less than the table's distance, update the entry.
  - If no updates are received from adjacent routers within 3 minutes, mark them as unreachable (distance set to 16).

RIP is simple and low-cost but has limitations on network scale and might take a long time to converge after network failures.

#### 2. **Open Shortest Path First (OSPF)**

OSPF, developed to overcome RIP's limitations, is an open-standard, shortest path first protocol based on Dijkstra's algorithm.

Key characteristics of OSPF:

- Floods information about links with all routers within an AS.
- Information includes adjacent router details, link metrics, and is sent only when link state changes.
- All routers have a consistent topology map of the entire network, converging faster than RIP.

#### 3. **Border Gateway Protocol (BGP)**

BGP handles routing between AS and faces difficulties due to the vastness of the internet, varying routing protocols within AS, and the need to consider inter-AS policies.

BGP seeks a good route, not necessarily the best one, and requires each AS to configure a BGP speaker. Routing information is exchanged between neighboring BGP speakers via TCP connections.

---

### **27. Characteristics of UDP and TCP**

**User Datagram Protocol (UDP):**
- Connectionless, aiming for best-effort delivery.
- No congestion control.
- Message-oriented (no merging or splitting of application-layer messages).
- Supports one-to-one, one-to-many, many-to-one, and many-to-many communication.

**Transmission Control Protocol (TCP):**
- Connection-oriented, providing reliable delivery.
- Implements flow control and congestion control.
- Supports full-duplex communication.
- Byte-stream-oriented (application-layer messages treated as a byte stream).
- Each TCP connection is point-to-point (one-to-one).

---

### **28. UDP Header Format**

The UDP header is only 8 bytes, including source port, destination port, length, and checksum. An additional 12-byte pseudo-header is used for checksum calculation.

---

### **29. TCP Header Format**

**Fields:**
1. **Sequence Number:** Identifies the first byte in the TCP data stream. For example, if the sequence number is 301, it means the first byte's number is 301. If the transmitted data is 100 bytes long, the next segment's sequence number should be 401.
2. **Acknowledgment Number:** Expects the sequence number of the next expected data segment. For example, if B correctly receives a segment with a sequence number of 501 and data length of 200 bytes, B expects the next segment's sequence number to be 701. B's acknowledgment segment sent to A would then have an acknowledgment number of 701.
3. **Data Offset:** Represents the offset from the start of the segment to the data part, effectively indicating the header length.
4. **ACK Flag:** When ACK=1, the acknowledgment number is valid; otherwise, it's ignored. TCP mandates that all transmitted segments after connection establishment must have ACK=1.
5. **SYN Flag:** Used for synchronizing sequence numbers during connection establishment. When SYN=1 and ACK=0, it's a connection request. If the other party agrees to establish a connection, its response would have SYN=1 and ACK=1.
6. **FIN Flag:** Initiates the connection termination process. When FIN=1, it indicates the sender has finished sending data and requests the termination of the connection.
7. **Window:** The window value guides the sender in setting its sending window size based on the receiver's buffer space. 

---

### **30. TCP Three-Way Handshake**

Assuming A is the client and B is the server:

1. Initially, B is in the LISTEN state, waiting for a client connection request.
2. A sends a connection request with SYN=1, ACK=0, selecting an initial sequence number x.
3. Upon receiving the connection request, if B agrees to establish a connection, it replies with a connection acknowledgment, SYN=1, ACK=1, acknowledging x+1 and selecting an initial sequence number y.
4. A, after receiving B's acknowledgment, sends its own acknowledgment with acknowledgment number y+1 and sequence number x+1.
5. Upon receiving A's acknowledgment, the connection is established.

**Reason for Three-Way Handshake:**

The third handshake is essential to prevent expired connection requests from reaching the server, avoiding incorrect connection openings. If a client's connection request is delayed in the network, it may take a long time to receive the server's acknowledgment. After waiting for a timeout and retransmission, the client may resend the connection request. Without the third handshake, the server might erroneously open two connections.

---

### **31. TCP Four-Way Handshake**

This description excludes sequence and acknowledgment numbers for simplicity and omits ACK as it is always set to 1 post-connection establishment.

1. A sends a connection release message with FIN=1.
2. B acknowledges, entering a half-close state where B can still send data to A but not receive.
3. When B no longer needs the connection, it sends a connection release with FIN=1.
4. A acknowledges, entering TIME-WAIT, waiting for 2 Maximum Segment Lifetime (MSL) durations before releasing the connection.
5. B acknowledges A's confirmation, releasing the connection.

**Reason for Four-Way Handshake:**

After the client sends a FIN connection release, the server enters CLOSE-WAIT to transmit any remaining data. Upon finishing, the server sends a FIN connection release. TIME-WAIT allows for the processing of delayed segments and ensures all related segments disappear from the network before closing.

---

### **32. TCP Reliable Transmission**

TCP achieves reliable transmission using timeout retransmission. If a sent segment isn't acknowledged within the timeout, it gets retransmitted.

Round-Trip Time (RTT), the time from sending to receiving an acknowledgment, is used for weighted average RTT calculation:

\[ RTTs = (1 - a) \times RTTs + a \times RTT \]

Here, 0 ≤ a < 1. Increasing a makes RTTs more susceptible to RTT variations.

The Retransmission Timeout (RTO) should be slightly greater than RTTs. RTO calculation:

\[ RTO = RTTs + 4 \times RTT \]

Where \( RTT_d \) is the weighted average deviation.

Feel free to include these revised sections in your existing markdown file. If you have any more questions or need further assistance, let me know!

---

### **33. TCP Sliding Window**

The window is part of the buffer, temporarily holding the byte stream. Both the sender and receiver have a window, and the receiver uses the window field in TCP segments to inform the sender of its window size. The sender adjusts its window size based on this value and other information.

Bytes within the sending window are allowed to be sent, and bytes within the receiving window are allowed to be received. If the leftmost byte of the sending window has been sent and acknowledged, the sending window is slid to the right until the leftmost byte is no longer in a sent and acknowledged state. The sliding of the receiving window is similar; if the leftmost byte has been sent, acknowledged, and delivered to the host, the receiving window slides to the right.

The receiving window confirms only the last sequentially arrived byte in the window. For example, if the received bytes in the window are {31, 34, 35}, where {31} arrives sequentially, and {34, 35} do not, only byte 31 is confirmed. Upon receiving acknowledgment for a byte, the sender knows that all preceding bytes have been received.

---

### **34. TCP Flow Control**

Flow control aims to regulate the sender's transmission rate, ensuring the receiver can keep up. The window field in acknowledgment messages sent by the receiver controls the sender's window size, influencing its transmission rate. Setting the window field to 0 prevents the sender from transmitting data.

---

### **35. TCP Congestion Control**

In case of network congestion leading to packet loss, the sender continues retransmission, worsening the congestion. Hence, during congestion, it's crucial to control the sender's rate. Although similar to flow control, the motivation is different. Flow control ensures the receiver can keep up, while congestion control aims to reduce overall network congestion.

TCP employs four algorithms for congestion control: Slow Start, Congestion Avoidance, Fast Retransmit, and Fast Recovery.

The sender maintains a congestion window (cwnd) variable for congestion control. Note that cwnd is distinct from the sender's window; cwnd is a state variable, while the sender's window determines how much data the sender can transmit.

For discussion purposes, assumptions are made:
- The receiver has a sufficiently large receiving buffer, avoiding flow control issues.
- Although TCP's window is byte-based, we assume the window size is in terms of segments.

1. **Slow Start and Congestion Avoidance:**
   - Initially, the sender employs slow start, setting cwnd to 1, allowing the sender to transmit only one segment.
   - Upon receiving an acknowledgment, cwnd is doubled, allowing the sender to transmit 2, 4, 8, ... segments.
   - Slow start rapidly increases cwnd, potentially causing congestion. To address this, a slow start threshold (ssthresh) is introduced. When cwnd >= ssthresh, it enters congestion avoidance, increasing cwnd by 1 per round.

   If a timeout occurs, ssthresh is set to cwnd / 2, and slow start is restarted.

2. **Fast Retransmit and Fast Recovery:**
   - At the receiver, each received segment should acknowledge the last received in-sequence segment. For example, if segments {�1M, �2M} are received and �4M arrives, an acknowledgment for �2M should be sent.
   - At the sender, if three duplicate acknowledgments are received, indicating the loss of the next segment, fast retransmit immediately retransmits the next segment. For example, upon receiving three �2M duplicate acknowledgments, it's inferred that �3M is lost, prompting an immediate retransmission.

   In this scenario, where only a few segments are lost, not due to network congestion, fast recovery is executed. ssthresh = cwnd / 2, and cwnd = ssthresh, directly entering congestion avoidance.

Slow start and fast recovery refer to the set values of cwnd, not their growth rates. Slow start sets cwnd to 1, while fast recovery sets cwnd to ssthresh.

---

### **36. Domain Name System (DNS)**

DNS is a distributed database that provides services for the mutual conversion of hostnames and IP addresses. The distributed nature means that each site retains only its portion of the data.

Domain names have a hierarchical structure from top to bottom: root domain, top-level domain, second-level domain.

DNS can use UDP or TCP for transmission, both using port 53. In most cases, DNS uses UDP, requiring DNS resolvers and servers to handle timeouts and retransmissions for reliability. TCP is used in two situations:
1. If the response exceeds 512 bytes (UDP supports a maximum of 512 bytes).
2. Zone transfers (where the primary server sends changed data to secondary servers).

---

### **37. File Transfer Protocol (FTP)**

FTP uses TCP for connections and requires two connections for file transfer:
1. **Control Connection:** The server opens port 21, awaiting the client's connection. The client actively establishes a connection to send commands to the server and receive responses.
2. **Data Connection:** Used to transfer file data.

FTP has two modes based on whether the data connection is actively established by the server or the client:
- **Active Mode:** The server actively establishes the data connection with its port as 20, while the client's port is random but must be greater than 1024.
- **Passive Mode:** The client actively establishes the data connection, specifying its port, while the server's port is random.

Active mode requires the client to open a port for the server, necessitating firewall configuration. Passive mode only requires the server to open a port, eliminating the need for client firewall configuration. However, passive mode may reduce server security by opening numerous ports.

---

### **38. Dynamic Host Configuration Protocol (DHCP)**

DHCP provides a plug-and-play networking method, eliminating the need for manual configuration of IP addresses, etc.

DHCP configuration includes not only an IP address but also subnet mask and gateway IP address.

DHCP process:
1. Client sends a Discover message, broadcasted to the subnet, seeking DHCP servers. If client and DHCP server are not on the same subnet, a relay agent is used.
2. DHCP server responds with an Offer message, containing the necessary information. The client may receive multiple offers and needs to make a choice.
3. If the client selects a DHCP server, it sends a Request message to that server.
4. DHCP server responds with an Acknowledgment (Ack) message, indicating the client can now use the provided information.

---

### **39. Telnet - Remote Login Protocol**

TELNET is used to log in to remote hosts, and the output from the remote host is also returned.

TELNET can adapt to differences in computers and operating systems, such as varying newline character definitions.

---

### **40. Email Protocols**

An email system consists of three parts: user agent, mail server, and email protocols.

Email protocols include sending protocols and retrieval protocols, with SMTP commonly used for sending, and POP3 and IMAP for retrieval.

1. **SMTP (Simple Mail Transfer Protocol)**
   - SMTP can only send ASCII code, while MIME (Multipurpose Internet Mail Extensions) is often used for sending binary files. MIME does not replace SMTP but enhances the structure of email bodies, defining encoding rules for non-ASCII characters.

2. **POP3 (Post Office Protocol version 3)**
   - POP3 features deleting emails once they are retrieved from the server. However, the latest versions of POP3 allow users not to delete emails.

3. **IMAP (Internet Message Access Protocol)**
   - In IMAP, client and server emails remain synchronized. If emails are not manually deleted, they will persist on the server. IMAP allows users to access server emails anytime, anywhere.

---

### **41. Common Ports**

| Application | Application Layer Protocol | Port Number | Transport Layer Protocol | Remarks |
|-------------|-----------------------------|-------------|---------------------------|---------|
| Domain Name Resolution | DNS | 53 | UDP/TCP | Use TCP when length exceeds 512 bytes |
| Dynamic Host Configuration Protocol | DHCP | 67/68 | UDP | |
| Simple Network Management Protocol | SNMP | 161/162 | UDP | |
| File Transfer Protocol | FTP | 20/21 | TCP | Control connection on 21, data connection on 20 |
| Remote Terminal Protocol | TELNET | 23 | TCP | |
| Hypertext Transfer Protocol | HTTP | 80 | TCP | |
| Simple Mail Transfer Protocol | SMTP | 25 | TCP | |
| Post Office Protocol version 3 | POP3 | 110 | TCP | |
| Internet Message Access Protocol | IMAP | 143 | TCP | |

Feel free to incorporate these revisions into your existing markdown file. If you have additional questions or need further assistance, please let me know!

---

### 42. Web Page Request Process

1. **DHCP Host Configuration**

   Assuming the host initially lacks an IP address and other information, DHCP is utilized for acquisition.

   - The host generates a DHCP request message, placing it in a UDP segment with destination port 67 and source port 68.
   - This segment is then embedded in an IP datagram with a broadcast IP destination address (255.255.255.255) and source IP address (0.0.0.0).
   - The datagram is placed in a MAC frame with a destination address FF:FF:FF:FF:FF:FF, broadcasting to all devices connected to the switch.
   - Upon receiving the broadcast frame, the DHCP server connected to the switch breaks down the frame to obtain IP datagram, UDP segment, and DHCP request message. It then generates a DHCP ACK message containing IP address, DNS server IP, default gateway router IP, and subnet mask. This message is encapsulated in a UDP segment, then in an IP datagram, and finally in a MAC frame.
   - The frame's destination address is the MAC address of the requesting host. The switch, with self-learning capability, knows which interface to forward the frame based on the recorded MAC address from the previous broadcast frame.
   - Upon receiving the frame, the host breaks down the DHCP message and configures its IP address, subnet mask, and DNS server IP. It installs the default gateway in its IP forwarding table.

2. **ARP MAC Address Resolution**

   The host, through a browser, generates a TCP socket and sends an HTTP request to an HTTP server. To create this socket, the host needs to know the IP address corresponding to the website's domain name.

   - The host generates a DNS query message with port 53, as the DNS server's port number is 53.
   - This DNS query message is placed in an IP datagram with the destination address being the DNS server's IP address.
   - The IP datagram is placed in an Ethernet frame, which is then sent to the gateway router.
   - Since the DHCP process only knows the IP address of the gateway router, ARP protocol is used to obtain the MAC address. The host generates an ARP query message with the destination address being the router's IP address. This ARP query message is placed in an Ethernet frame with a broadcast destination address (FF:FF:FF:FF:FF:FF) and sent to the switch, which forwards it to all connected devices, including the gateway router.
   - The gateway router, upon receiving the frame, breaks down the ARP message, finds a match for the IP address, and responds with an ARP reply containing its MAC address. This reply is sent back to the host.

3. **DNS Domain Name Resolution**

   With the MAC address of the gateway router known, the DNS resolution process continues.

   - The gateway router, upon receiving the Ethernet frame containing the DNS query message, extracts the IP datagram and forwards it based on its routing table.
   - Upon reaching the DNS server, the DNS query is extracted and looked up in the DNS database.
   - When a DNS record is found, a DNS reply message is sent, encapsulated in a UDP segment, then in an IP datagram, and routed back through the router to the host.

4. **HTTP Page Request**

   With the IP address of the HTTP server obtained, the host can now generate a TCP socket for sending an HTTP GET message.

   - Before generating the TCP socket, a three-way handshake is performed with the HTTP server to establish a connection. A TCP SYN message is sent to the server.
   - The server responds with a TCP SYN ACK message.
   - Once the connection is established, the browser generates an HTTP GET message, delivering it to the HTTP server.
   - The server reads the HTTP GET message from the TCP socket, generates an HTTP response message, places the webpage content in the message body, and sends it back to the host.
   - Upon receiving the HTTP response message, the browser extracts the webpage content, proceeds with rendering, and displays the webpage.

---

### 43. Processes and Threads

1. **Processes**
   
   A process is the fundamental unit for resource allocation.

   The Process Control Block (PCB) describes the basic information and execution state of a process. The terms "creating a process" and "terminating a process" both refer to operations on the PCB.

   The diagram below illustrates four programs creating four processes, which can execute concurrently.

2. **Threads**

   A thread is an independently scheduled basic unit.

   Within a process, multiple threads can exist, sharing the process's resources.

   For example, QQ and a browser are two processes. Inside the browser process, various threads exist, such as HTTP request thread, event response thread, rendering thread, etc. Thread concurrency allows the browser to respond to user events while initiating an HTTP request by clicking on a new link in the browser.

3. **Differences**
   
   - **Resource Ownership**

     Processes are the basic units for resource allocation, while threads do not own resources. Threads can access the resources belonging to the process.

   - **Scheduling**

     Threads are independently scheduled units. Within the same process, a thread switch does not cause a process switch. However, switching from a thread in one process to a thread in another process does lead to a process switch.

   - **System Overhead**

     The overhead incurred when creating or terminating processes, which involves resource allocation or deallocation (e.g., memory space, I/O devices), is much higher than the overhead when creating or terminating threads. Similarly, during process switching, the system must save the CPU environment of the currently executing process and set up the CPU environment for the newly scheduled process. In contrast, thread switching only requires saving and setting a small number of registers, resulting in minimal overhead.

   - **Communication Aspect**

     Threads can communicate by directly reading and writing data in the same process, while inter-process communication (IPC) is needed for communication between processes.

---

### 44. Process State Transitions

- **Ready State (ready):** Awaits scheduling.
- **Running State (running):** Currently executing.
- **Blocked State (waiting):** Awaits resources.

It's important to note the following:

- Only the ready and running states can transition between each other; the others are unidirectional.
- Processes in the ready state obtain CPU time through scheduling algorithms, transitioning to the running state. Once the CPU time slice allocated to a running process is exhausted, it transitions back to the ready state, awaiting the next schedule.
- The blocked state results from a lack of required resources, causing a transition from the running state. However, this resource does not include CPU time; a shortage of CPU time leads to a transition from the running state to the ready state.

---

### 45. Process Scheduling Algorithms

Different environments necessitate different scheduling algorithm objectives. Let's discuss scheduling algorithms based on specific environments:

1. **Batch Processing System**
   In a batch processing system with minimal user interaction, the scheduling algorithm aims to ensure throughput and turnaround time (time from submission to termination).

   1.1 **First-Come, First-Served (FCFS):**
      Non-preemptive scheduling algorithm that schedules based on the order of requests. Favorable for long jobs but unfavorable for short ones, as short jobs must wait for long jobs to complete before execution.

   1.2 **Shortest Job First (SJF):**
      Non-preemptive scheduling algorithm that schedules based on the estimated shortest running time. May lead to starvation for long jobs waiting for short jobs to complete.

   1.3 **Shortest Remaining Time Next (SRTN):**
      Preemptive version of shortest job first. Schedules based on the remaining running time. When a new job arrives, it compares its entire runtime with the remaining time of the current process. If the new process requires less time, it suspends the current process, allowing the new one to run; otherwise, the new process waits.

2. **Interactive System**
   Interactive systems involve substantial user interactions, with the scheduling algorithm aiming for rapid responsiveness.

   2.1 **Round Robin:**
      All ready processes are arranged in a queue using the FCFS principle. Each time a schedule occurs, the CPU time is allocated to the process at the front of the queue for one time slice. After the time slice, the process is sent to the end of the queue, and the CPU time is allocated to the next process.

   2.2 **Priority Scheduling:**
      Assigns a priority to each process and schedules based on priority. To prevent low-priority processes from waiting indefinitely, waiting processes' priorities may increase over time.

   2.3 **Multilevel Feedback Queue:**
      Designed for processes requiring continuous execution. Multiple queues with different time slice sizes are set up. As a process finishes its time in one queue, it moves to the next. Each queue has a different priority, and only if the previous queue is empty, the current queue's process is scheduled.

3. **Real-Time System**
   Real-time systems demand responses within a specified time. Differentiated into hard real-time (absolute deadline) and soft real-time (tolerates some latency).
