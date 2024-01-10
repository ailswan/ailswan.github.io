---
layout: essay_single
title: Basic Q & A
date: 2024-01-06
tags:
  - Backend
  - Review
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

note:while ISPs are responsible for providing the physical connection to the internet, DNS is responsible for translating human-friendly domain names into machine-readable IP addresses, enabling users to access websites and services using easily memorable names. They are both integral parts of the internet ecosystem, working together to ensure a seamless online experience for users.

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

---

### **8. Bandpass Modulation**

Analog signals are continuous, while digital signals are discrete. Bandpass modulation converts digital signals into analog signals.

---

### **9. Link Layer**

#### **1. Frame Encapsulation**
   - Adds headers and trailers to the packets from the network layer to mark the start and end of frames.

#### **2. Transparent Transmission**
   - "Transparent" refers to making something that actually exists appear as if it does not.

   - For frame delineation, headers and trailers are used. If the data portion of a frame contains the same content as the headers and trailers, the start and end positions of the frame may be incorrectly identified. To address this, escape characters are inserted before the occurrence of the same content in the data portion. If the data portion contains escape characters, an additional escape character is added before each escape character. After processing at the receiving end, the original data can be restored. The content of transparent transmission involves the use of escape characters, which users are unaware of.

#### **3. Error Detection**
   - Currently, the data link layer extensively uses Cyclic Redundancy Check (CRC) to check for bit errors.

---

### **10. Channel Classification**

#### **1. Broadcast Channel**
   - One-to-many communication, where data sent by one node can be received by all nodes on the broadcast channel.

   - All nodes send data on the same broadcast channel, requiring specialized control methods to coordinate and avoid collisions. Two main coordination methods are channel multiplexing techniques and the CSMA/CD protocol.

#### **2. Point-to-Point Channel**
   - One-to-one communication.

   - Since collisions do not occur, it is relatively simple, using the PPP protocol for control.

---

### **11. Channel Multiplexing Techniques**

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

### **12. CSMA/CD Protocol**

**CSMA/CD** stands for Carrier Sense Multiple Access with Collision Detection.

- **Multiple Access:** This indicates a bus-type network where numerous hosts connect to the bus in a multiple access fashion.

- **Carrier Sense:** Every host must continuously monitor the channel. Before transmitting, if a host detects that the channel is in use, it must wait.

- **Collision Detection:** During transmission, if a host senses that another host is already transmitting data, a collision is detected. Although each host checks if the channel is idle before sending data, collisions can still occur due to the propagation delay of electromagnetic waves.

The end-to-end propagation delay is denoted as τ. The first transmitting station can determine whether a collision has occurred after a maximum of 2τ, referred to as the **contention period**. Only after this contention period with no detected collision can it be certain that the transmission will not collide.

When a collision occurs, the station must cease transmission and wait for a certain duration before attempting a retransmission. This duration is determined using the **Binary Exponential Backoff Algorithm**. A random number, denoted as r, is selected from the discrete integer set {0, 1, ..., (2^k - 1)}. The retransmission wait time is then set to r times the contention period.

---

### **13. PPP Protocol**

Internet users typically need to connect to an Internet Service Provider (ISP) to access the internet. The **PPP (Point-to-Point Protocol)** is a data link layer protocol used for communication between a user's computer and an ISP.

#### **PPP Frame Format:**

- **F Field:** Marks the beginning and end of the frame.
  
- **A and C Fields:** Currently have no significance.

- **FCS Field:** Carries the Frame Check Sequence, which is a CRC (Cyclic Redundancy Check) verification sequence.

- The length of the information section does not exceed 1500 bytes.

---

### **14. MAC Address**

The MAC (Media Access Control) address is a data link layer address with a length of 6 bytes (48 bits), used to uniquely identify a network adapter (NIC).

A host has as many MAC addresses as it has network adapters. For example, a laptop commonly has both a wireless and a wired network adapter, resulting in two MAC addresses.

---

### **15. Local Area Network (LAN)**

A LAN is a typical broadcast channel, characterized by the network being owned by a single entity with limited geographical range and a finite number of sites.

Various LAN technologies include Ethernet, Token Ring, FDDI, and ATM. Currently, Ethernet dominates the wired LAN market.

LANs can be classified based on network topology:

---

### **16. Ethernet**

Ethernet is a LAN with a star topology.

In the early days, connections were made using hubs, which operate at the physical layer, dealing with bits rather than frames. When a bit reaches an interface, the hub regenerates and amplifies it, extending the network's transmission distance. If a hub receives frames from two different interfaces simultaneously, a collision occurs.

Today, Ethernet uses switches instead of hubs. Switches, operating at the data link layer, eliminate collisions and perform store-and-forward based on MAC addresses.

**Ethernet Frame Format:**

- **Type:** Indicates the protocol used in the upper layer.
  
- **Data:** Ranges in length from 46 to 1500; if too small, it is padded.
  
- **FCS (Frame Check Sequence):** Employs the CRC verification method.

---

### **17. Switch**

A switch possesses self-learning capabilities, focusing on the content of its switching table, which stores the mapping of MAC addresses to interfaces.

Due to this self-learning ability, switches are plug-and-play devices, eliminating the need for network administrators to manually configure switch table contents.

In the diagram below, the switch has four interfaces. When Host A sends a data frame to Host B, the switch adds the mapping of Host A to Interface 1 to its switching table. To send the data frame to B, it first checks the switching table. Since there's no entry for Host B at this point, Host A sends a broadcast frame. Hosts C and D discard this frame, but Host B responds. The switch then looks up the switching table, finding the mapping of Host A to Interface 1, and sends the data frame to Interface 1. Simultaneously, the switch adds the mapping of Host B to Interface 2.

---

### **18. Virtual Local Area Network (VLAN)**

VLANs can establish logical groups independent of physical locations. Only members within the same VLAN receive link-layer broadcast messages.

For example, in the diagram below, (A1, A2, A3, A4) belong to a VLAN. A broadcast sent by A1 is received by A2, A3, and A4, while other stations do not receive it.

VLANs are created using trunk connections, with a specific interface on each switch set as a trunk interface, connecting VLAN switches. IEEE defines an extended Ethernet frame format, 802.1Q, adding a 4-byte header VLAN tag to standard Ethernet frames, indicating the VLAN to which the frame belongs.

---

### **19. Overview**

As the core of the entire internet, the network layer should be as simple as possible. The network layer provides a simple, flexible, connectionless, and best-effort datagram service upwards.

Using the IP protocol, heterogeneous physical networks can be interconnected, creating the appearance of a unified network at the network layer.

Complementary to the IP protocol, three other protocols are commonly used:

- Address Resolution Protocol (ARP)
  
- Internet Control Message Protocol (ICMP)
  
- Internet Group Management Protocol (IGMP)

---

### **20. IP Datagram Format**

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

### **21. IP Addressing Methods**

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

### **22. Address Resolution Protocol (ARP)**

The network layer facilitates communication between hosts, and the link layer handles communication between segments. Therefore, during communication, the source and destination addresses of IP datagrams remain constant, while MAC addresses change with the link.

ARP is implemented to obtain the MAC address from an IP address.

Each host has an ARP cache containing mappings of IP addresses to MAC addresses for hosts and routers on the local network.

If Host A knows the IP address of Host B, but the ARP cache lacks the mapping of this IP address to a MAC address, Host A sends an ARP request packet through broadcasting. Upon receiving this request, Host B responds with an ARP reply packet containing its MAC address. Subsequently, Host A writes the mapping of Host B's IP address to its MAC address in its cache.

---

### **23. Internet Control Message Protocol (ICMP)**

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

### **24. Virtual Private Network (VPN)**

Due to the scarcity of IP addresses, an organization can often obtain a number of IP addresses far less than the total number of hosts it owns. Moreover, an organization doesn't need to connect all hosts to the external internet. Computers within an organization can use IP addresses (private addresses) that are valid only within that organization.

There are three private address blocks:

- 10.0.0.0 ~ 10.255.255.255
- 172.16.0.0 ~ 172.31.255.255
- 192.168.0.0 ~ 192.168.255.255

*** Using the public internet as the communication medium between various private networks of the organization. "Private" implies that hosts within the organization only communicate with other hosts within the same organization, while "virtual" suggests it appears to be so, but in reality, it traverses the public internet.

In the diagram below, communication between locations A and B occurs over the internet. If host X from location A wants to communicate with another host Y from location B, the IP datagram's source address is 10.1.0.1, and the destination address is 10.2.0.3. The datagram is first sent to the router R1 connected to the internet. R1 encrypts the internal data, then reattaches the datagram's header with the source address as router R1's global address 125.1.2.3 and the destination address as router R2's global address 194.4.5.6. Router R2 receives the datagram, decrypts the data portion, restores the original datagram, and delivers it to Y with the destination address now being 10.2.0.3.

---

### **25. Network Address Translation (NAT)**

When hosts within a private network, using local IP addresses, need to communicate with hosts on the internet, NAT can be used to convert local IP to global IP.

In the past, NAT mapped local IP to global IP on a one-to-one basis, allowing a maximum of n hosts within a private network, which had n global IP addresses, to simultaneously access the internet. To make more efficient use of global IP addresses, modern NAT translation tables also use transport layer port numbers. This allows multiple hosts within different private networks to share a single global IP address. NAT that uses port numbers is also known as Network Address and Port Translation (NAPT).

---

### **26. Router Structure**

Functionally, routers can be divided into two parts: routing selection and packet forwarding.

The packet forwarding structure consists of three components: switching structure, a set of input ports, and a set of output ports.

---

### **27. Router Packet Forwarding Process**

1. Extract the destination host's IP address D from the datagram header to obtain the destination network address N.
2. If N is directly connected to this router, perform direct delivery.
3. If the routing table has a specific host route for destination address D, forward the datagram to the next-hop router specified in the table.
4. If the routing table has a route to reach network N, forward the datagram to the next-hop router specified in the table.
5. If the routing table has a default route, forward the datagram to the default router specified in the table.
6. Report an error if forwarding the packet encounters issues.

---

### **28. Routing Protocols**

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

### **29. Characteristics of UDP and TCP**

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

### **30. UDP Header Format**

The UDP header is only 8 bytes, including source port, destination port, length, and checksum. An additional 12-byte pseudo-header is used for checksum calculation.

---

### **31. TCP Header Format**

**Fields:**
1. **Sequence Number:** Identifies the first byte in the TCP data stream. For example, if the sequence number is 301, it means the first byte's number is 301. If the transmitted data is 100 bytes long, the next segment's sequence number should be 401.
2. **Acknowledgment Number:** Expects the sequence number of the next expected data segment. For example, if B correctly receives a segment with a sequence number of 501 and data length of 200 bytes, B expects the next segment's sequence number to be 701. B's acknowledgment segment sent to A would then have an acknowledgment number of 701.
3. **Data Offset:** Represents the offset from the start of the segment to the data part, effectively indicating the header length.
4. **ACK Flag:** When ACK=1, the acknowledgment number is valid; otherwise, it's ignored. TCP mandates that all transmitted segments after connection establishment must have ACK=1.
5. **SYN Flag:** Used for synchronizing sequence numbers during connection establishment. When SYN=1 and ACK=0, it's a connection request. If the other party agrees to establish a connection, its response would have SYN=1 and ACK=1.
6. **FIN Flag:** Initiates the connection termination process. When FIN=1, it indicates the sender has finished sending data and requests the termination of the connection.
7. **Window:** The window value guides the sender in setting its sending window size based on the receiver's buffer space. 

---

### **32. TCP Three-Way Handshake**

Assuming A is the client and B is the server:

1. Initially, B is in the LISTEN state, waiting for a client connection request.
2. A sends a connection request with SYN=1, ACK=0, selecting an initial sequence number x.
3. Upon receiving the connection request, if B agrees to establish a connection, it replies with a connection acknowledgment, SYN=1, ACK=1, acknowledging x+1 and selecting an initial sequence number y.
4. A, after receiving B's acknowledgment, sends its own acknowledgment with acknowledgment number y+1 and sequence number x+1.
5. Upon receiving A's acknowledgment, the connection is established.

**Reason for Three-Way Handshake:**

The third handshake is essential to prevent expired connection requests from reaching the server, avoiding incorrect connection openings. If a client's connection request is delayed in the network, it may take a long time to receive the server's acknowledgment. After waiting for a timeout and retransmission, the client may resend the connection request. Without the third handshake, the server might erroneously open two connections.

---

### **33. TCP Four-Way Handshake**

This description excludes sequence and acknowledgment numbers for simplicity and omits ACK as it is always set to 1 post-connection establishment.

1. A sends a connection release message with FIN=1.
2. B acknowledges, entering a half-close state where B can still send data to A but not receive.
3. When B no longer needs the connection, it sends a connection release with FIN=1.
4. A acknowledges, entering TIME-WAIT, waiting for 2 Maximum Segment Lifetime (MSL) durations before releasing the connection.
5. B acknowledges A's confirmation, releasing the connection.

**Reason for Four-Way Handshake:**

After the client sends a FIN connection release, the server enters CLOSE-WAIT to transmit any remaining data. Upon finishing, the server sends a FIN connection release. TIME-WAIT allows for the processing of delayed segments and ensures all related segments disappear from the network before closing.

---

### **34. TCP Reliable Transmission**

TCP achieves reliable transmission using timeout retransmission. If a sent segment isn't acknowledged within the timeout, it gets retransmitted.

Round-Trip Time (RTT), the time from sending to receiving an acknowledgment, is used for weighted average RTT calculation:

\[ RTTs = (1 - a) \times RTTs + a \times RTT \]

Here, 0 ≤ a < 1. Increasing a makes RTTs more susceptible to RTT variations.

The Retransmission Timeout (RTO) should be slightly greater than RTTs. RTO calculation:

\[ RTO = RTTs + 4 \times RTT \]

Where \( RTT_d \) is the weighted average deviation.

---

### **35. TCP Sliding Window**

The window is part of the buffer, temporarily holding the byte stream. Both the sender and receiver have a window, and the receiver uses the window field in TCP segments to inform the sender of its window size. The sender adjusts its window size based on this value and other information.

Bytes within the sending window are allowed to be sent, and bytes within the receiving window are allowed to be received. If the leftmost byte of the sending window has been sent and acknowledged, the sending window is slid to the right until the leftmost byte is no longer in a sent and acknowledged state. The sliding of the receiving window is similar; if the leftmost byte has been sent, acknowledged, and delivered to the host, the receiving window slides to the right.

The receiving window confirms only the last sequentially arrived byte in the window. For example, if the received bytes in the window are {31, 34, 35}, where {31} arrives sequentially, and {34, 35} do not, only byte 31 is confirmed. Upon receiving acknowledgment for a byte, the sender knows that all preceding bytes have been received.

---

### **36. TCP Flow Control**

Flow control aims to regulate the sender's transmission rate, ensuring the receiver can keep up. The window field in acknowledgment messages sent by the receiver controls the sender's window size, influencing its transmission rate. Setting the window field to 0 prevents the sender from transmitting data.

---

### **37. TCP Congestion Control**

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

### **38. Domain Name System (DNS)**

DNS is a distributed database that provides services for the mutual conversion of hostnames and IP addresses. The distributed nature means that each site retains only its portion of the data.

Domain names have a hierarchical structure from top to bottom: root domain, top-level domain, second-level domain.

DNS can use UDP or TCP for transmission, both using port 53. In most cases, DNS uses UDP, requiring DNS resolvers and servers to handle timeouts and retransmissions for reliability. TCP is used in two situations:
1. If the response exceeds 512 bytes (UDP supports a maximum of 512 bytes).
2. Zone transfers (where the primary server sends changed data to secondary servers).

---

### **39. File Transfer Protocol (FTP)**

FTP uses TCP for connections and requires two connections for file transfer:
1. **Control Connection:** The server opens port 21, awaiting the client's connection. The client actively establishes a connection to send commands to the server and receive responses.
2. **Data Connection:** Used to transfer file data.

FTP has two modes based on whether the data connection is actively established by the server or the client:
- **Active Mode:** The server actively establishes the data connection with its port as 20, while the client's port is random but must be greater than 1024.
- **Passive Mode:** The client actively establishes the data connection, specifying its port, while the server's port is random.

Active mode requires the client to open a port for the server, necessitating firewall configuration. Passive mode only requires the server to open a port, eliminating the need for client firewall configuration. However, passive mode may reduce server security by opening numerous ports.

---

### **40. Dynamic Host Configuration Protocol (DHCP)**

DHCP provides a plug-and-play networking method, eliminating the need for manual configuration of IP addresses, etc.

DHCP configuration includes not only an IP address but also subnet mask and gateway IP address.

DHCP process:
1. Client sends a Discover message, broadcasted to the subnet, seeking DHCP servers. If client and DHCP server are not on the same subnet, a relay agent is used.
2. DHCP server responds with an Offer message, containing the necessary information. The client may receive multiple offers and needs to make a choice.
3. If the client selects a DHCP server, it sends a Request message to that server.
4. DHCP server responds with an Acknowledgment (Ack) message, indicating the client can now use the provided information.

---

### **41. Telnet - Remote Login Protocol**

TELNET is used to log in to remote hosts, and the output from the remote host is also returned.

TELNET can adapt to differences in computers and operating systems, such as varying newline character definitions.

---

### **42. Email Protocols**

An email system consists of three parts: user agent, mail server, and email protocols.

Email protocols include sending protocols and retrieval protocols, with SMTP commonly used for sending, and POP3 and IMAP for retrieval.

1. **SMTP (Simple Mail Transfer Protocol)**
   - SMTP can only send ASCII code, while MIME (Multipurpose Internet Mail Extensions) is often used for sending binary files. MIME does not replace SMTP but enhances the structure of email bodies, defining encoding rules for non-ASCII characters.

2. **POP3 (Post Office Protocol version 3)**
   - POP3 features deleting emails once they are retrieved from the server. However, the latest versions of POP3 allow users not to delete emails.

3. **IMAP (Internet Message Access Protocol)**
   - In IMAP, client and server emails remain synchronized. If emails are not manually deleted, they will persist on the server. IMAP allows users to access server emails anytime, anywhere.

---

### **43. Common Ports**

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

---

### **44. Web Page Request Process**

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

### **45. Processes and Threads**

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

### **46. Process State Transitions**

- **Ready State (ready):** Awaits scheduling.
- **Running State (running):** Currently executing.
- **Blocked State (waiting):** Awaits resources.

It's important to note the following:

- Only the ready and running states can transition between each other; the others are unidirectional.
- Processes in the ready state obtain CPU time through scheduling algorithms, transitioning to the running state. Once the CPU time slice allocated to a running process is exhausted, it transitions back to the ready state, awaiting the next schedule.
- The blocked state results from a lack of required resources, causing a transition from the running state. However, this resource does not include CPU time; a shortage of CPU time leads to a transition from the running state to the ready state.

---

### **47. Process Scheduling Algorithms**

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

---

### **48. Process Synchronization**

1. **Critical Section**
- **Critical Section:**
  The code segment that accesses a critical resource is referred to as the critical section.
- **Mutual Exclusion:**
  To mutually exclude access to the critical resource, each process needs to perform a check before entering the critical section.

   The code segment that accesses a critical resource is termed the critical section.

    ```html
    // entry section
    // critical section;
    // exit section
    ```
2. **Synchronization and Mutual Exclusion**

- **Synchronization:** A direct restrictive relationship resulting from the cooperation of multiple processes, creating a certain order of execution.
- **Mutual Exclusion:** At any given moment, only one process can enter the critical section.

3. **Semaphore**

A semaphore is an integer variable on which down and up operations (commonly denoted as P and V operations) can be performed.

- **down:** If the semaphore is greater than 0, perform a -1 operation. If the semaphore is equal to 0, the process sleeps, waiting for the semaphore to be greater than 0.
- **up:** Perform a +1 operation on the semaphore, awakening sleeping processes to complete the down operation.

The down and up operations need to be designed as atomic, indivisible operations. Typically, interrupts are masked during the execution of these operations.

If the semaphore's value can only be 0 or 1, it becomes a Mutex (Mutual Exclusion). 0 indicates the critical section is locked, and 1 indicates the critical section is unlocked.
``` c
typedef int semaphore;
semaphore mutex = 1;
void P1() {
    down(&mutex);
    up(&mutex);
}

void P2() {
    down(&mutex);
    up(&mutex);
}
```

**Using Semaphores to Implement the Producer-Consumer Problem**

Problem Description:Utilizing a buffer to store items, the producer can only place an item into the buffer when it is not full. Similarly, the consumer can only take an item from the buffer when it is not empty.

As the buffer is considered a critical resource, a mutex (mutual exclusion) is required to control mutual access to the buffer.

To synchronize the behavior of producers and consumers, it is necessary to keep track of the quantity of items in the buffer. This is achieved using two semaphores: `empty`, which records the number of empty slots in the buffer, and `full`, which records the number of filled slots in the buffer. In the producer process, the `empty` semaphore is used to ensure that the producer can only place items when `empty` is not zero. In the consumer process, the `full` semaphore is used to ensure that the consumer can only take items when `full` is not zero.

It is crucial not to lock the buffer before testing the semaphores. In other words, the sequence of operations should not be to execute `down(mutex)` before `down(empty)`. If this is done, there is a possibility of encountering a situation where the producer locks the buffer, performs `down(empty)` operation, discovers that `empty = 0`, and subsequently sleeps. The consumer cannot enter the critical section because the producer has locked the buffer, preventing the execution of `up(empty)`. As a result, `empty` remains perpetually zero, causing the producer to wait indefinitely without releasing the lock. Consequently, the consumer also waits indefinitely.
```c
#define N 100
typedef int semaphore;
semaphore mutex = 1;
semaphore empty = N;
semaphore full = 0;

void producer() {
    while(TRUE) {
        int item = produce_item();
        down(&empty);
        down(&mutex);
        insert_item(item);
        up(&mutex);
        up(&full);
    }
}

void consumer() {
    while(TRUE) {
        down(&full);
        down(&mutex);
        int item = remove_item();
        consume_item(item);
        up(&mutex);
        up(&empty);
    }
}
```

4. **Monitor**

Using semaphore mechanisms to solve the producer-consumer problem requires a lot of control in client code. A monitor separates control code, making it less error-prone and easier to call for client code.

C language does not support monitors. The following pseudo-Pascal code describes a monitor. A significant feature of monitors is that only one process can use the monitor at a time. A process should not indefinitely occupy the monitor when unable to proceed.
``` c
    monitor ProducerConsumer
        integer i;
        condition c;

        procedure insert();
        begin
            // ...
        end;

        procedure remove();
        begin
            // ...
        end;
    end monitor;
 ```
A crucial characteristic of a monitor is that at any given moment, only one process can utilize the monitor. A process should not indefinitely occupy the monitor when unable to proceed; otherwise, other processes will never be able to use the monitor.

The monitor introduces condition variables and related operations, namely `wait()` and `signal()`, to achieve synchronization. Executing `wait()` on a condition variable causes the calling process to block, relinquishing the monitor to another process. The `signal()` operation is used to awaken a blocked process.

**Implementing the Producer-Consumer Problem Using a Monitor**
```C
monitor ProducerConsumer
    condition full, empty;
    integer count := 0;
    condition c;

    procedure insert(item: integer);
    begin
        if count = N then wait(full);
        insert_item(item);
        count := count + 1;
        if count = 1 then signal(empty);
    end;

    function remove: integer;
    begin
        if count = 0 then wait(empty);
        remove = remove_item;
        count := count - 1;
        if count = N -1 then signal(full);
    end;
end monitor;

procedure producer
begin
    while true do
    begin
        item = produce_item;
        ProducerConsumer.insert(item);
    end
end;

procedure consumer
begin
    while true do
    begin
        item = ProducerConsumer.remove;
        consume_item(item);
    end
end;
```

---

### **49. Classic Synchronization Problems**

### 1. The Dining Philosophers Problem

The Dining Philosophers Problem involves five philosophers seated around a circular table, each with a plate of food. Philosophers alternate between two activities: eating and thinking. When a philosopher decides to eat, they must pick up the two chopsticks on their left and right sides, taking only one chopstick at a time.

The following is an incorrect solution: if all philosophers simultaneously pick up the chopstick on their left, they end up waiting for others to finish eating and release their chopsticks, leading to a deadlock.

```C
#define N 5

void philosopher(int i) {
    while(TRUE) {
        think();
        take(i);     
        take((i+1)%N); 
        eat();
        put(i);
        put((i+1)%N);
    }
}

```

To prevent deadlock, two conditions can be set:

1. Philosophers must pick up both left and right chopsticks simultaneously.
2. Eating is only allowed when neither neighboring philosopher is currently eating.
```C
#define N 5
#define LEFT (i + N - 1) % N 
#define RIGHT (i + 1) % N 
#define THINKING 0
#define HUNGRY   1
#define EATING   2
typedef int semaphore;
int state[N];        
semaphore mutex = 1;   
semaphore s[N];       

void philosopher(int i) {
    while(TRUE) {
        think(i);
        take_two(i);
        eat(i);
        put_two(i);
    }
}

void take_two(int i) {
    down(&mutex);
    state[i] = HUNGRY;
    check(i);
    up(&mutex);
    down(&s[i]);
}

void put_two(i) {
    down(&mutex);
    state[i] = THINKING;
    check(LEFT); 
    check(RIGHT);
    up(&mutex);
}

void eat(int i) {
    down(&mutex);
    state[i] = EATING;
    up(&mutex);
}

void check(i) {         
    if(state[i] == HUNGRY && state[LEFT] != EATING && state[RIGHT] !=EATING) {
        state[i] = EATING;
        up(&s[i]);
    }
}

```
### 2. The Reader-Writer Problem

This problem allows multiple processes to read data simultaneously but restricts the occurrence of simultaneous read-write and write-write operations.

An integer variable, `count`, keeps track of the number of processes currently reading the data. A mutex, `count_mutex`, is used to lock the access to `count`, and another mutex, `data_mutex`, is used to lock the reading and writing of data.

```C
typedef int semaphore;
semaphore count_mutex = 1;
semaphore data_mutex = 1;
int count = 0;

void reader() {
    while(TRUE) {
        down(&count_mutex);
        count++;
        if(count == 1) down(&data_mutex); // 第一个读者需要对数据进行加锁，防止写进程访问
        up(&count_mutex);
        read();
        down(&count_mutex);
        count--;
        if(count == 0) up(&data_mutex);
        up(&count_mutex);
    }
}

void writer() {
    while(TRUE) {
        down(&data_mutex);
        write();
        up(&data_mutex);
    }
}
```

---

### **50. Inter-Process Communication (IPC)**

The concepts of process synchronization and process communication are easy to confuse. The difference lies in:

- Process Synchronization: Controlling the execution order of multiple processes.
- Process Communication: Transmitting information between processes.

Process communication is a means, while process synchronization is a goal. In other words, to achieve process synchronization, processes need to communicate and transmit the necessary information for synchronization.

### 1. Pipes

Pipes are created using the `pipe` function, where `fd[0]` is used for reading, and `fd[1]` is used for writing.

```c
#include <unistd.h>
int pipe(int fd[2]);
```
It has the following limitations:

- Supports only half-duplex communication (one-way alternating transmission).
- Can only be used in parent-child or sibling processes.
### 2. FIFO

Also known as named pipes, it removes the restriction that pipes can only be used in parent-child processes.

```c
#include <sys/stat.h>
int mkfifo(const char *path, mode_t mode);
int mkfifoat(int fd, const char *path, mode_t mode);
```

FIFO is commonly used in client-server applications, serving as a gathering point for passing data between client and server processes.

### 3. Message Queues
Compared to FIFO, message queues have the following advantages:

- Message queues can exist independently of reading and writing processes, avoiding synchronization difficulties during FIFO's open and close operations.
- Avoids FIFO's synchronization blocking issue, as processes do not need to provide their synchronization methods.
- Reading processes can selectively receive messages based on message types, unlike FIFO, which defaults to receiving messages.
### 4. Semaphores

It is a counter used to provide access to a shared data object for multiple processes.

### 5. Shared Memory

Allows multiple processes to share a given storage area. Since data does not need to be copied between processes, this is the fastest form of IPC.

Semaphore usage is required to synchronize access to shared storage.

Multiple processes can map the same file into their address space, thereby achieving shared memory. Additionally, XSI shared memory does not use a file but rather utilizes an anonymous segment of memory.

### 6. Sockets

Different from other communication mechanisms, sockets can be used for communication between processes on different machines.

---

### **51. Basic Characteristics**

### 1. Concurrency

Concurrency refers to the macroscopic ability to run multiple programs simultaneously over a period of time, while parallelism indicates the ability to execute multiple instructions at the same moment.

Parallelism requires hardware support, such as multiple pipelines, multi-core processors, or distributed computing systems.

The operating system introduces processes and threads to enable program concurrency.

### 2. Sharing

Sharing means that resources in the system can be used jointly by multiple concurrent processes.

There are two sharing modes: mutual exclusion sharing and simultaneous sharing.

Resources in mutual exclusion sharing are termed critical resources (e.g., printers), allowing only one process to access at any given moment, requiring synchronization mechanisms to achieve mutual exclusion.

### 3. Virtualization

Virtualization transforms a physical entity into multiple logical entities.

There are mainly two virtualization techniques: time-multiplexing and space-multiplexing.

Processes can concurrently execute on the same processor using time-multiplexing, allowing each process to occupy the processor in turns, executing for a small time slice and quickly switching.

Virtual memory uses space-multiplexing, abstracting physical memory into address spaces. Each process has its address space, and the pages of the address space are mapped to physical memory. Not all pages of the address space need to be in physical memory. When a page that is not in physical memory is accessed, a page replacement algorithm is executed to swap the page into memory.

### 4. Asynchrony

Asynchrony indicates that a process does not complete all at once but progresses intermittently at an unknown pace.

---
### **52. Basic Functions**

### 1. Process Management
Process control, process synchronization, process communication, deadlock handling, CPU scheduling, etc.

### 2. Memory Management
Memory allocation, address mapping, memory protection and sharing, virtual memory, etc.

### 3. File Management
Management of file storage space, directory management, file read/write management, and protection.

### 4. Device Management
Handling user I/O requests, facilitating the use of various devices, and improving device utilization.

Includes buffer management, device allocation, device handling, virtual devices, etc.

---

### **53. System Calls**

If a process in user mode needs to use kernel mode functionality, it makes a system call to enter the kernel, and the operating system performs the task on behalf of the process.

Linux system calls mainly include:

- **Process Control:** `fork()`, `exit()`, `wait()`
- **Inter-Process Communication:** `pipe()`, `shmget()`, `mmap()`
- **File Operations:** `open()`, `read()`, `write()`
- **Device Operations:** `ioctl()`, `read()`, `write()`
- **Information Maintenance:** `getpid()`, `alarm()`, `sleep()`
- **Security:** `chmod()`, `umask()`, `chown()`

---

### **54. Monolithic Kernel and Microkernel**

### 1. Monolithic Kernel
A monolithic kernel places the entire operating system functionality as a tightly integrated whole within the kernel.

Due to shared information between modules, it achieves high performance.

### 2. Microkernel
As the operating system becomes more complex, a portion of the operating system's functionality is moved out of the kernel to reduce kernel complexity. The extracted part is divided into several services based on a layered principle, each functioning independently.

In the microkernel structure, the operating system is divided into small, well-defined modules. Only the microkernel module runs in kernel mode, while the other modules run in user mode.

Due to frequent switching between user mode and kernel mode, there is some performance loss.

---
### **55. Classification of Interrupts**

### 1. External Interrupts
Generated by events other than the CPU executing instructions, such as I/O completion interrupts, indicating that the device input/output processing is complete, and the processor can send the next input/output request. Additionally, there are clock interrupts, console interrupts, etc.

### 2. Exception Interrupts
Caused by internal events of the CPU executing instructions, such as illegal opcodes, address out of bounds, arithmetic overflow, etc.

### 3. Trap Interrupts
Used in user programs through system calls.

---

### **56. Necessary Conditions for Deadlocks**

- Mutual Exclusion: Each resource is either allocated to a process or available.
- Hold and Wait: A process holding resources may request new resources.
- No Preemption: Resources allocated to a process cannot be forcefully preempted; they can only be released explicitly by the owning process.
- Circular Wait: Two or more processes form a circular chain, with each process waiting for the next process to release resources.

---

### **57. Handling Methods for Deadlocks**

There are mainly four methods:

1. Ostrich Algorithm
2. Deadlock Detection and Recovery
3. Deadlock Prevention
4. Deadlock Avoidance

---

### **58. Ostrich Algorithm**

This strategy involves burying one's head in the sand and pretending that there is no problem.

Because solving deadlock problems comes at a high cost, the ostrich algorithm, which involves taking no action, can achieve higher performance.

It is suitable when a deadlock occurrence has minimal impact on users or when the probability of a deadlock is low.

Most operating systems, including Unix, Linux, and Windows, simply ignore the deadlock problem.

---

### **59. Deadlock Detection and Recovery**

Instead of attempting to prevent deadlocks, this approach detects deadlocks and takes measures to recover when detected.

1. Deadlock detection with one resource of each type.

   The graph below represents a resource allocation graph, where rectangles represent resources, and circles represent processes. Arrows indicate resource allocation, with processes pointing to resources indicating the allocation.

   - Figure a can be extracted into a cycle, as shown in figure b. It satisfies the condition of circular waiting, indicating a deadlock.

   The deadlock detection algorithm for one resource of each type is implemented by checking whether there is a cycle in the directed graph. Starting from a node, a depth-first search is performed, marking visited nodes, and if a visited node is encountered again, a cycle is present, indicating deadlock detection.

2. Deadlock detection with multiple resources of each type

   In the image below, there are three processes and four resources, with each data representing the following:

   E vector: Total resources
   A vector: Remaining resources
   C matrix: The quantity of resources each process owns, with each row representing the quantity of resources a process has.
   R matrix: The quantity of resources each process requests.

   Processes P1 and P2 cannot execute, but process P3 can. Letting P3 execute and releasing the resources it owns results in A = (2 2 2 0).

   P2 can now execute, followed by P1. All processes can execute smoothly, with no deadlock.

   The algorithm for deadlock detection with multiple resources of each type involves:

   - Each process is initially unmarked, and the execution process may be marked. When the algorithm finishes, any unmarked processes are considered deadlock processes.
   - Find an unmarked process Pᵢ whose requested resources are less than or equal to A.
   - If such a process is found, add the ith row vector of the C matrix to A, mark the process, and return to step 1.
   - If no such process is found, the algorithm terminates.

3. Deadlock Recovery

   - Utilizing preemption
   - Utilizing rollback
   - Recovery by killing processes

---

### **60. Deadlock Prevention**

Preventing deadlocks before the program runs.

1. **Breaking Mutual Exclusion**
   - For example, using spooling printer technology allows several processes to output simultaneously. The only process that truly requests the physical printer is the printer daemon process.

2. **Breaking Hold and Wait**
   - One implementation is to specify that all processes must request all the resources they need before starting execution.

3. **Breaking No Preemption**
4. **Breaking Circular Wait**
   - Assign a unified number to resources, and processes can only request resources in numerical order.

---

### **61. Deadlock Avoidance**

Avoiding deadlocks during program execution.

1. **Safe State**
   - In the graph (a), the second column 'Has' represents the number of resources already owned, the third column 'Max' represents the total number of resources needed, and 'Free' represents the number of resources that can still be used. Starting from graph (a), first let B have all the needed resources (graph b), release B after execution, and Free becomes 5 (graph c). Then run C and A in the same way, ensuring that all processes can run successfully. Therefore, the state shown in graph (a) is considered safe.

   **Definition:** If no deadlock occurs, and even if all processes suddenly request their maximum demand for resources, there still exists a scheduling sequence that allows each process to complete, then the state is considered safe.

   Safety state detection is similar to deadlock detection because a safe state must ensure that deadlocks do not occur. The following Banker's algorithm is similar to deadlock detection algorithms and can be referenced and compared.

2. **Banker's Algorithm for a Single Resource**
   - The algorithm involves a banker in a small town who has promised certain loan amounts to a group of customers. The algorithm determines whether satisfying a request will lead to an unsafe state. If it does, the request is denied; otherwise, it is granted.
   
   - In the example, graph (c) represents an unsafe state. The algorithm rejects the previous requests to avoid entering the state shown in graph (c).

3. **Banker's Algorithm for Multiple Resources**
   - The image below has five processes and four resources. The left side represents allocated resources, and the right side represents resources still to be allocated. The rightmost E, P, and A represent: total resources, allocated resources, and available resources, respectively (these are vectors, not specific values, e.g., A=(1 0 2 0) means 1 unit of resource 1, 0 of resource 2, 2 of resource 3, and 0 of resource 4 are available).

   The algorithm to check if a state is safe involves:
   - Check if there is a row in the right matrix that is less than or equal to vector A. If no such row exists, the system is in an unsafe state, and the request is denied to avoid entering the state.
   - If such a row is found, mark the process as terminated and add its allocated resources to vector A.
   - Repeat the above two steps until all processes are marked as terminated. If a state is not safe, requests entering that state are rejected.

---

### **62. Virtual Memory**

The purpose of virtual memory is to extend physical memory into larger logical memory, allowing programs to access more available memory.

To better manage memory, the operating system abstracts memory into an address space. Each program has its own address space, divided into multiple blocks, each called a page. These pages are mapped to physical memory but do not need to be mapped to contiguous physical memory, and not all pages must be in physical memory. When a program references a page not in physical memory, the hardware performs necessary mapping, loads the missing part into physical memory, and re-executes the failed instruction.

From the description above, virtual memory allows programs to not map every page in the address space to physical memory. This means a program doesn't need to be entirely loaded into memory to run, making it possible to run large programs with limited memory. For example, a computer with a 16-bit address can generate a range of 0 to 64K for a program's address space. If the computer has only 32KB of physical memory, virtual memory allows it to run a program of size 64K.

### **63. Paging System Address Mapping**

The Memory Management Unit (MMU) manages the translation between the address space and physical memory, with the Page table storing the mapping of pages (program address space) and page frames (physical memory space).

A virtual address is split into two parts: one part stores the page number, and the other part stores the offset.

In the page table below, there are 16 pages, and these 16 pages need 4 bits for indexing. For example, for the virtual address (0010 000000000100), the first 4 bits store the page number 2. Reading the table entry gives (110 1), where the last bit of the page table entry indicates whether it exists in memory, with 1 indicating existence. The next 12 bits store the offset. The address of the page corresponding to this page frame is (110 000000000100).

---

### **64. Page Replacement Algorithms**

During program execution, if the page to be accessed is not in memory, a page fault occurs, and the page is brought into memory. If there's no free space in memory, the system must swap out a page to the disk swap area to free up space.

Page replacement algorithms are similar to cache eviction policies, considering memory as a cache for the disk. In a cache system, when new data arrives, some existing cache needs to be evicted to make space for new data.

The main goal of page replacement algorithms is to minimize the page replacement frequency (or minimize the page fault rate).

1. **Optimal Replacement Algorithm (OPT)**
   - The selected page to be replaced is the one that will not be accessed for the longest time. It typically ensures the lowest page fault rate. It's a theoretical algorithm because it's impossible to know how long a page won't be accessed.

   **Example:** A system allocates three physical blocks for a process with the following page reference sequence: 7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1. Initially, pages 7, 0, 1 are loaded into memory. When the process wants to access page 2, a page fault occurs, and page 7 is swapped out because it has the longest time until it will be accessed again.

2. **Least Recently Used (LRU)**
   - Although we can't predict future page usage, we can know past page usage. LRU replaces the page that has been least recently used.

   To implement LRU, a list of all pages needs to be maintained in memory. When a page is accessed, it is moved to the head of the list. This ensures that the page at the tail of the list is the least recently accessed.

   **Example:** Page reference sequence: 4, 7, 0, 7, 1, 0, 1, 2, 1, 2, 6

3. **Not Recently Used (NRU)**
   - Each page has two status bits: R (Referenced) and M (Modified). When a page is accessed, R is set to 1. R bits are cleared periodically. Pages are categorized based on R and M bits into four classes:

      R=0, M=0
      R=0, M=1
      R=1, M=0
      R=1, M=1

   When a page fault occurs, NRU randomly selects a page from the smallest non-empty class to be replaced. NRU prioritizes replacing dirty pages (R=0, M=1) over frequently used clean pages (R=1, M=0).

4. **First In First Out (FIFO)**
   - FIFO replaces the page that entered memory first. This algorithm may replace frequently accessed pages, leading to an increased page fault rate.

5. **Clock Algorithm**
   - The FIFO algorithm may replace frequently used pages. To avoid this, a simple modification to FIFO is made:

      - When a page is accessed (read or write), set its R bit to 1.
      - When a replacement is needed, check the R bit of the oldest page. If the R bit is 0, immediately replace that page. If it is 1, clear the R bit, move the page to the end of the list, update its load time to make it appear freshly loaded, and continue searching from the head of the list.

These are common page replacement algorithms, each with its advantages and disadvantages. The choice of which algorithm to use depends on the specific requirements and characteristics of the system.

---

### **65. Segmentation**

While virtual memory utilizes paging, which involves dividing the address space into fixed-sized pages mapped to memory, segmentation is another approach. In segmentation, the address space is divided into segments, each representing an independent address space. Unlike paging, the size of each segment can vary, and segments can dynamically grow.

The diagram below illustrates multiple tables created by a compiler during the compilation process. Four of these tables dynamically grow. If a one-dimensional address space of a paging system were used, the dynamic growth could lead to overlay issues.

[Diagram: Compiler Tables with Segmentation]

Segmentation addresses this by dividing each table into segments, with each segment forming an independent address space. Segments can have different lengths and dynamically grow as needed.

Segmentation provides a more flexible memory management approach, accommodating varying sizes and dynamic growth requirements for different segments.

---
### **66. Segmentation with Paging**

The address space of a program is divided into segments, each having an independent address space. The address space within each segment is further divided into pages of equal size. This approach combines the benefits of segmentation, providing shared and protected segments, with the virtual memory capabilities of paging.

---

### **67. Comparison between Paging and Segmentation**

1. **Transparency to Programmers:**
   - Paging: Transparent; programmers don't need to explicitly divide segments.
   - Segmentation: Requires explicit segmentation by programmers.

2. **Address Space Dimension:**
   - Paging: One-dimensional address space.
   - Segmentation: Two-dimensional address space.

3. **Changeability of Size:**
   - Paging: Page size is fixed and cannot be changed.
   - Segmentation: Segment size can dynamically change.

4. **Purpose:**
   - Paging: Primarily for implementing virtual memory, providing a larger address space.
   - Segmentation: Enables logical separation of programs and data for sharing and protection.

---

### **68. Disk Structure**

- **Platter:** A disk has multiple platters.
- **Track:** Circular bands on a platter; a platter can have multiple tracks.
- **Track Sector (or Sector):** A portion of a track; a track can have multiple sectors. It is the smallest physical storage unit, typically 512 bytes or 4 K.
- **Head:** Positioned close to the platter, converts magnetic fields to electrical signals (read) or vice versa (write).
- **Actuator Arm:** Moves the head between tracks.
- **Spindle:** Rotates the entire platter.

---

### **69. Disk Scheduling Algorithms**

Factors affecting the time to read or write a disk block include:
- Rotation time (spinning the spindle to position the head over the appropriate sector)
- Seek time (moving the actuator arm to position the head over the appropriate track)
- Actual data transfer time

Among these, seek time is usually the longest, so disk scheduling aims to minimize the average seek time.

1. **First Come First Served (FCFS):**
   - Schedule requests in the order they arrive.

2. **Shortest Seek Time First (SSTF):**
   - Prioritize scheduling the track closest to the current head position.

   While SSTF reduces the average seek time, it may lead to starvation for requests at the extremes of the disk if newer requests are consistently closer.
3. **Elevator Algorithm (SCAN):**
   - The elevator always maintains a direction of movement until there are no requests in that direction, then it changes direction.
   - The disk scheduling algorithm (SCAN algorithm) operates similarly to the elevator's process. It performs disk scheduling in one direction until there are no pending disk requests in that direction, then changes the direction.

   This algorithm considers the direction of movement, ensuring that all disk requests are satisfied and addressing the starvation issue observed in SSTF.

---

### **70. Compilation System**

In a compilation system, the process of transforming a source file into an executable involves several stages. Let's take the example of a simple `hello.c` program compiled on a Unix system:

**hello.c:**
```c
    #include <stdio.h>

    int main()
    {
        printf("hello, world\n");
        return 0;
    }
```
Compilation Process:
    gcc -o hello hello.c

The compilation process can be summarized as:

- **Preprocessing Stage:**
  - Handle `#` directives.
  - Expand macros and include header files.
  - Generate preprocessed source code.

- **Compilation Stage:**
  - Translate source code to assembly code.
  - Produce an intermediate assembly file.

- **Assembly Stage:**
  - Translate assembly code to relocatable object code.
  - Generate a relocatable object file (e.g., `hello.o`).

- **Linking Stage:**
  - Combine object files (e.g., `hello.o`) with external libraries.
  - Resolve external symbol references.
  - Produce the final executable file (e.g., `hello`).

This process transforms high-level source code into machine-executable instructions, involving preprocessing, compilation, assembly, and linking stages.

---

### **71. Static Linking**
A static linker takes a set of relocatable object files as input and produces a fully linked executable object file as output. The linker primarily performs the following two tasks:

1. Symbol Resolution: Each symbol corresponds to a function, a global variable, or a static variable. The purpose of symbol resolution is to associate each symbol reference with a symbol definition.

2. Relocation: The linker associates each symbol definition with a memory location by modifying all references to these symbols to point to this memory location.

---
### **72. Object Files**
- **Executable Object File:** Can be directly executed in memory.
- **Relocatable Object File:** Can be merged with other relocatable object files during the linking stage to create an executable object file.
- **Shared Object File:** A special type of relocatable object file that can be dynamically loaded into memory and linked during runtime.

---

### **73. Dynamic Linking**
Static libraries have two main issues:
1. When a static library is updated, the entire program needs to be relinked.
2. For standard function libraries like `printf`, if each program has its own code, it would lead to significant resource wastage.

Shared libraries are designed to address these issues. In Linux systems, they are usually indicated by the `.so` extension, while on Windows systems, they are known as DLLs. They have the following characteristics:
- In a given file system, a library exists as a single file shared by all executable object files referencing it. It is not duplicated into each executable file.
- In memory, a copy of the `.text` section (compiled machine code) of a shared library can be shared by different running processes.

---

### **74. Basic Concepts**
1. **Message Format**
   - **Request Message:**
     - The first line includes the request method, URL, and protocol version.
     - The following lines are request headers, each with a header name and corresponding value.
     - An empty line separates headers from the message body.
     - The last part is the request's content body.

   - **Response Message:**
     - The first line contains the protocol version, status code, and description. The most common is `200 OK` indicating a successful request.
     - The following lines are headers.
     - An empty line separates headers from the message body.
     - The last part is the response's content body.

2. **URL (Uniform Resource Locator)**
   - HTTP uses URLs to locate resources. URLs are a subset of URIs (Uniform Resource Identifiers) with added locating capabilities. URIs also include URNs (Uniform Resource Names), which define a resource's name without the ability to locate it. For example, `urn:isbn:0451450523` defines a book's name but doesn't specify how to find the book.

---

### **75. HTTP Methods**
When a client sends a [request message](#message-format), the first line of the request is the request line, which includes the method field.

1. **GET**
   - Retrieves a resource.
   - The most commonly used method in current network requests.

2. **HEAD**
   - Retrieves only the message headers.
   - Similar to GET but does not return the entity body.
   - Primarily used to confirm the validity of a URL and obtain information like the last modification date.

3. **POST**
   - Transfers the entity body.
   - Mainly used for data transmission, in contrast to GET that is primarily used for resource retrieval.

4. **PUT**
   - Uploads a file.
   - Due to the lack of inherent authentication, anyone can upload a file, posing security concerns. Generally not used extensively.

5. **PATCH**
   - Partially modifies a resource.
   - While PUT can also be used for modification, it completely replaces the original resource, whereas PATCH allows partial modifications.

6. **DELETE**
   - Deletes a file.
   - Opposite functionality to PUT and also lacks inherent authentication.

   Example:
   ```html
   DELETE /file.html HTTP/1.1

7. **OPTIONS**
   - Queries supported methods for a resource.
   - Retrieves the methods supported by the specified URL.
   - Returns something like `Allow: GET, POST, HEAD, OPTIONS`.

8. **CONNECT**
   - Requests the establishment of a tunnel when communicating through a proxy.
   - Uses SSL (Secure Sockets Layer) and TLS (Transport Layer Security) protocols to encrypt communication content before transmission through a network tunnel.

   Example:
   ```html
   CONNECT www.example.com:443 HTTP/1.1

9. **TRACE**
   - Traces the communication path.
   - The server returns the communication path to the client.
   - When sending a request, a numeric value is placed in the Max-Forwards header field. It decreases by 1 for each server it passes through, and when the value is 0, the transmission stops.
   - TRACE is generally not used extensively and is susceptible to Cross-Site Tracing (XST) attacks.

---

### **76. HTTP Status Codes**

When a server returns a [response message](#message-format), the first line of the response is the status line, which includes the status code and the reason phrase to inform the client about the result of the request.

**Status Codes by Categories:**
- **1XX Informational:** Indicates that the received request is being processed.
- **2XX Success:** Indicates that the request was successfully processed.
- **3XX Redirection:** Indicates additional action is needed to complete the request.
- **4XX Client Error:** Indicates that the server cannot process the request.
- **5XX Server Error:** Indicates that the server encountered an error while processing the request.

1. **1XX Informational**
   - **100 Continue:** Indicates that everything is normal so far, and the client can continue to send the request or ignore this response.

2. **2XX Success**
   - **200 OK:** Indicates that the request was successful.
   - **204 No Content:** Indicates that the request was successful, but the response message does not contain a body. Typically used when only sending information from the client to the server without expecting data in return.
   - **206 Partial Content:** Indicates that the client has made a range request, and the response contains the content in the specified range.

3. **3XX Redirection**
   - **301 Moved Permanently:** Indicates permanent redirection.
   - **302 Found:** Indicates temporary redirection.
   - **303 See Other:** Similar to 302 but explicitly instructs the client to use the GET method to retrieve the resource.

   Note: Although HTTP protocol states that in 301, 302 redirects, the POST method should not be changed to GET, most browsers will change POST to GET in these cases.

   - **304 Not Modified:** If the request headers contain certain conditions (e.g., If-Match, If-Modified-Since, If-None-Match, If-Range, If-Unmodified-Since), and the conditions are not met, the server returns 304.
   - **307 Temporary Redirect:** Temporary redirection, similar to 302, but 307 instructs the browser not to change the POST method to GET during redirection.

4. **4XX Client Error**
   - **400 Bad Request:** Indicates a syntax error in the request message.
   - **401 Unauthorized:** Requires authentication information. If a previous request has been made, it indicates authentication failure.
   - **403 Forbidden:** The request is refused.
   - **404 Not Found:** The requested resource is not found.

5. **5XX Server Error**
   - **500 Internal Server Error:** Indicates an error occurred on the server while processing the request.
   - **503 Service Unavailable:** The server is temporarily overloaded or undergoing maintenance and cannot handle the request at the moment.

---

### **77. HTTP Headers**

There are four types of header fields in HTTP: general headers, request headers, response headers, and entity headers. Below are various header fields and their meanings (you don't need to memorize all of them, just for reference):

### 1. General Headers

| Header Field        | Description                                |
|---------------------|--------------------------------------------|
| Cache-Control       | Control caching behavior                   |
| Connection          | Control forwarding of headers, manage persistent connections |
| Date                | Creation date and time of the message      |
| Pragma              | Message directives                         |
| Trailer             | A list of header fields at the message's end |
| Transfer-Encoding   | Specify the transfer encoding of the message body |
| Upgrade             | Upgrade to another protocol                |
| Via                 | Information about proxies involved in the request/response chain |
| Warning             | Warning messages about potential issues    |

### 2. Request Headers

| Header Field         | Description                                |
|----------------------|--------------------------------------------|
| Accept               | Media types that the user agent can handle |
| Accept-Charset       | Preferred character set                    |
| Accept-Encoding      | Preferred content encoding                |
| Accept-Language      | Preferred language (natural language)      |
| Authorization        | Web authentication information             |
| Expect               | Specific behaviors expected from the server |
| From                 | User's email address                       |
| Host                 | Server hosting the resource                |
| If-Match             | Comparison of entity tags (ETags)         |
| If-Modified-Since    | Comparison of resource modification times |
| If-None-Match        | Comparison of entity tags (opposite of If-Match) |
| If-Range             | Range request if resource has been updated |
| If-Unmodified-Since  | Comparison of resource modification times (opposite of If-Modified-Since) |
| Max-Forwards         | Maximum number of hops                      |
| Proxy-Authorization | Authentication information for the proxy  |
| Range                | Byte range request for a partial entity   |
| Referer              | Original referring URI in the request     |
| TE                   | Priority of transfer encodings             |
| User-Agent           | Information about the HTTP client program |

### 3. Response Headers

| Header Field          | Description                                |
|-----------------------|--------------------------------------------|
| Accept-Ranges         | Whether the server supports byte range requests |
| Age                   | Time elapsed since the resource was created |
| ETag                  | Matching information for the resource      |
| Location              | URI to redirect the client to              |
| Proxy-Authenticate    | Proxy server authentication information    |
| Retry-After           | When to retry the request                  |
| Server                | Information about the server installation  |
| Vary                  | Cache management information for proxies  |
| WWW-Authenticate      | Server authentication information for the client |

### 4. Entity Headers

| Header Field           | Description                                |
|------------------------|--------------------------------------------|
| Allow                  | Supported HTTP methods by the resource     |
| Content-Encoding      | Encoding of the message body               |
| Content-Language      | Natural language of the message body       |
| Content-Length        | Size of the message body                   |
| Content-Location      | Alternate URI for the resource             |
| Content-MD5           | MD5 digest of the message body             |
| Content-Range         | Byte range of the message body             |
| Content-Type          | Media type of the message body             |
| Expires               | Expiry date and time of the message        |
| Last-Modified         | Last modification date and time of the resource |

---

### **78. Cookie Usage**

Cookies are small pieces of data sent by a server to a user's browser, stored locally. They are carried with subsequent requests to the same server, informing the server whether the requests are from the same browser. As each request needs to carry Cookie data, it introduces additional performance overhead, especially in mobile environments.

Cookies were once used as the primary means for client-side data storage due to the absence of suitable alternatives. However, with modern browsers supporting various storage methods, Cookies have gradually become obsolete. New browser APIs allow developers to store data directly locally, using Web Storage API (local storage and session storage) or IndexedDB.

Cookies are commonly used for various purposes, including:

- Session state management (e.g., user login status, shopping carts, game scores, or any information that needs to be recorded).
- Personalized settings (e.g., user-customized preferences, themes, etc.).
- Browser behavior tracking (e.g., analyzing user behavior).

---

### **79. Cookie Creation Process**

The creation process involves the server sending a response containing the Set-Cookie header field. Upon receiving the response, the client stores the cookie information in the browser.

**Example:**
```http
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry
```

Subsequently, when the client sends another request to the same server, it retrieves the stored cookie information from the browser and includes it in the Cookie request header field.

**Example:**
```http
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
```
---
### **80. Cookie Classification**

Cookies can be classified into:

- **Session Cookies:** Automatically deleted when the browser is closed, i.e., they are only valid during the session.
  
- **Persistent Cookies:** Have a specified expiration time (Expires) or validity period (max-age) and become persistent cookies after that.

---

### **81. Cookie Scope**

- **Domain:** Identifies which hosts can accept the cookie. If not specified, it defaults to the current document's host (excluding subdomains). If specified, it generally includes subdomains. For example, if set to Domain=mozilla.org, the cookie is included in subdomains (e.g., developer.mozilla.org).

- **Path:** Specifies which paths on the host can accept the cookie (the URL path must be present in the request URL). Subpaths are also matched. For instance, setting Path=/docs would match paths like /docs, /docs/Web/, and /docs/Web/HTTP.

---
### **82. JavaScript and Cookies**

Browsers can create new cookies and access non-HttpOnly cookies using the `document.cookie` property in JavaScript.

**Example:**

```javascript
document.cookie = "yummy_cookie=choco";
document.cookie = "tasty_cookie=strawberry";
console.log(document.cookie);
```
---
### **83. HttpOnly**

Cookies marked as HttpOnly cannot be accessed by JavaScript scripts. Cross-Site Scripting (XSS) attacks often exploit JavaScript's `document.cookie` API to steal user cookie information. Therefore, using the HttpOnly flag can help mitigate XSS attacks to some extent.

**Example:**

```http
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
```
---

### **84. Secure**

Cookies marked as `Secure` can only be sent to the server over an HTTPS-encrypted connection. However, even with the `Secure` flag, sensitive information should not be transmitted through cookies as cookies inherently have security vulnerabilities. The `Secure` flag cannot guarantee absolute security.

---

### **85. Session**

Apart from storing user information in cookies on the user's browser, session data can also be stored on the server-side for increased security.

Session data can be stored on the server in files, databases, or memory. It can also be stored in memory databases like Redis for higher efficiency.

The process of maintaining user login status using sessions is as follows:

1. When a user logs in, the user submits a form containing the username and password, included in the HTTP request.
2. The server verifies the username and password. If correct, the user information is stored in Redis, and its key in Redis is known as the Session ID.
3. The Set-Cookie header in the server's response contains this Session ID. The client stores this cookie value in the browser.
4. Subsequent requests to the same server from the client will include this cookie value. The server extracts the Session ID, retrieves user information from Redis, and continues with business operations.

Ensure Session ID security to prevent easy access by malicious attackers. It should not be easily guessable, and it's crucial to frequently regenerate Session IDs. In scenarios demanding high security, such as financial transactions, user revalidation is necessary, like re-entering a password or using methods like SMS verification.

---

### **86. Browser Disable Cookie**

In scenarios where cookies are disabled, and Cookie cannot be used to store user information, only sessions can be utilized. In such cases, Session ID should not be stored in a cookie. Instead, URL rewriting is employed, passing the Session ID as a parameter in the URL.

---

### **87. Browser Disable Cookie (Duplicate Entry)**

When cookies are disabled, preventing the use of cookies to store user information, only sessions are available. In addition, Session ID should not be stored in a cookie. Instead, URL rewriting is used to pass the Session ID as a parameter in the URL.

Feel free to use or modify this content. If you have more questions or need further assistance, let me know!

---

### **88. Advantages**

- **Alleviates Server Load:**
  - Helps ease the pressure on servers.

- **Reduces Client Resource Retrieval Latency:**
  - Caches are often located in memory, providing faster read access.
  - Cache servers may also be geographically closer to clients than the source server, reducing latency (e.g., browser cache).

### **89. Implementation Methods**

- **Proxy Server Caching:**
  - Delegate caching responsibilities to a proxy server.

- **Client Browser Caching:**
  - Utilize caching mechanisms within the client's browser.

### **90. Cache-Control**

HTTP/1.1 controls caching through the Cache-Control header.

1. Disable caching
   - The `no-store` directive specifies that no part of the request or response should be cached.

   Cache-Control: no-store

2. Force revalidation of the cache
   - The `no-cache` directive specifies that the caching server must validate the cache resource with the origin server before responding to the client's request. The cache can only be used if the resource is valid.

   Cache-Control: no-cache

3. Private and public caching
   - The `private` directive designates the resource as a private cache, accessible only to a single user and usually stored in the user's browser.
   - The `public` directive designates the resource as a public cache, accessible to multiple users and typically stored on a proxy server.

   Cache-Control: private

   Cache-Control: public

4. Cache expiration mechanism
   - The `max-age` directive appears in the request message, allowing acceptance of the cache if the cache resource's caching time is less than the specified time.
   - The `max-age` directive in the response message indicates the time the cache resource is saved in the caching server.

   Cache-Control: max-age=31536000

   - The `Expires` header can also be used to inform the caching server when the resource will expire. In HTTP/1.1, the `max-age` directive takes precedence; in HTTP/1.0, the `max-age` directive is ignored.

   Expires: Wed, 04 Jul 2012 08:26:05 GMT

---
### **91. Cache Validation**

To understand cache validation, it is necessary to grasp the meaning of the ETag header field, which serves as a unique identifier for a resource. URLs cannot uniquely represent resources; for example, http://www.google.com/ may have both Chinese and English versions of a resource, and only the ETag can uniquely identify these two resources.

ETag: "82e22293907ce725faf67773957acd12"

The ETag value of a cached resource can be placed in the If-None-Match header. Upon receiving this request, the server compares the ETag value of the cached resource with the latest ETag value of the resource. If they match, it indicates the cached resource is valid, and the server responds with a 304 Not Modified status.

If-None-Match: "82e22293907ce725faf67773957acd12"

The Last-Modified header field can also be used for cache validation. It is included in the response message sent by the origin server, indicating the last modification time of the resource. However, it is a weak validator as it only provides accuracy up to one second. Therefore, it is often considered as a backup to the ETag. If this information is present in the response header, the client can include If-Modified-Since in subsequent requests to validate the cache. The server will only return the resource if it has been modified since the specified date and time, with a status code of 200 OK. If the requested resource has not been modified since then, a 304 Not Modified response message without an entity body is returned.

Last-Modified: Wed, 21 Oct 2015 07:28:00 GMT

---

### **92. Concepts**

HTTP faces the following security issues:

1. Communication in plaintext, making the content susceptible to eavesdropping.
2. Lack of authentication for communication parties, making them susceptible to impersonation.
3. Inability to prove the integrity of messages, making them susceptible to tampering.

HTTPS is not a new protocol but rather allows HTTP to communicate with SSL (Secure Sockets Layer). HTTPS involves communication through a tunnel where HTTP communicates with SSL, which, in turn, communicates with TCP. In other words, HTTPS uses a tunnel for communication.

By utilizing SSL, HTTPS gains encryption (preventing eavesdropping), authentication (preventing impersonation), and integrity protection (preventing tampering).

---

### **93. Encryption**

1. **Symmetric-Key Encryption**
   - Symmetric-Key Encryption uses the same key for both encryption and decryption.
   - Pros: Fast computation.
   - Cons: Unable to securely transmit the key to communication parties.

2. **Asymmetric-Key Encryption**
   - Asymmetric-Key Encryption, also known as Public-Key Encryption, uses different keys for encryption and decryption.
   - Anyone can obtain the public key. The sender encrypts the message using the recipient's public key, and the recipient decrypts it using their private key.
   - Asymmetric keys can also be used for signatures. The sender signs the message with their private key, and the recipient uses the sender's public key to verify the signature.
   - Pros: Secure transmission of public keys; however, slower computation.
   - Cons: Slow computation.

3. **Encryption Methods Used by HTTPS**
   - While symmetric-key encryption is more efficient for transmission, securely transmitting the secret key (Secret Key) is a challenge. Asymmetric-key encryption ensures the security of transmission. Hence, HTTPS employs a hybrid encryption mechanism:

     - Utilizes asymmetric-key encryption to transmit the Secret Key required for symmetric-key encryption securely.
     - After obtaining the Secret Key, communication occurs using symmetric-key encryption for efficiency. (The "Session Key" in the diagram below is the Secret Key.)

---

### **94. Authentication**

Authentication of communication parties is achieved through the use of certificates.

A Certificate Authority (CA) is a trusted third-party entity for both the client and server.

When server operators apply for a public key from the CA, the CA, after verifying the applicant's identity, digitally signs the applied public key. The signed public key is then assigned and bound to a public key certificate.

During HTTPS communication, the server sends the certificate to the client. Upon obtaining the public key from it, the client verifies the digital signature first. If the verification is successful, communication can proceed.

---

### **95. Integrity Protection**

SSL provides a message digest feature to ensure integrity protection.

While HTTP also offers MD5 message digest functionality, it is not secure. For instance, if the message content is tampered with and the MD5 value is recalculated, the communication recipient cannot detect the tampering.

The security of HTTPS's message digest functionality stems from its combination of encryption and authentication operations. Consider encrypted messages that, if tampered with, are challenging to recalculate the message digest since obtaining the plaintext is not straightforward.

---

### **96. Drawbacks**

1. Slower Speed:
   - Due to the need for encryption and decryption processes, the speed is relatively slower.

2. High Certificate Authorization Costs:
   - There is a requirement to pay high fees for certificate authorization.

---
### **97. Comparison of GET and POST**

1. **Purpose**
   - GET is used to retrieve resources, while POST is used to transmit entity bodies.

2. **Parameters**
   - Both GET and POST requests can use additional parameters. However, GET parameters appear in the URL as a query string, whereas POST parameters are stored in the entity body. Storing POST parameters in the entity body doesn't necessarily make it more secure, as they can still be viewed using packet capture tools (such as Fiddler).

   - Because URLs only support ASCII characters, Chinese characters in GET parameters need to be encoded. For example, "中文" would be converted to "%E4%B8%AD%E6%96%87," and spaces would be converted to "%20." POST parameters support standard character sets.

3. **Security**
   - Secure HTTP methods do not alter the server's state, meaning they are read-only.

   - GET is a secure method, while POST is not, as the purpose of POST is to transmit the content of the entity body. After a successful upload, the server may store this data in the database, resulting in a change of state.

   - Other secure methods besides GET include HEAD and OPTIONS.

   - Other insecure methods besides POST include PUT and DELETE.

4. **Idempotence**
   - Idempotent HTTP methods produce the same result whether executed once or multiple times. In other words, idempotent methods should not have side effects (except for statistical purposes).

   - All secure methods are idempotent.

   - Under correct implementation conditions, GET, HEAD, PUT, and DELETE methods are idempotent, while POST is not.
   GET /test/demo_form.asp?name1=value1&name2=value2 HTTP/1.1

    POST /test/demo_form.asp HTTP/1.1
    Host: w3schools.com
    name1=value1&name2=value2

   - `GET /pageX HTTP/1.1` is idempotent; multiple consecutive calls yield the same result.
    
    GET /pageX HTTP/1.1
    GET /pageX HTTP/1.1
    GET /pageX HTTP/1.1
    GET /pageX HTTP/1.1

   - `POST /add_row HTTP/1.1` is not idempotent; multiple calls may add multiple rows.

    POST /add_row HTTP/1.1   -> Adds a 1nd row
    POST /add_row HTTP/1.1   -> Adds a 2nd row
    POST /add_row HTTP/1.1   -> Adds a 3rd row

 
   - `DELETE /idX/delete HTTP/1.1` is idempotent, even if different requests receive     different status codes.

    DELETE /idX/delete HTTP/1.1   -> Returns 200 if idX exists
    DELETE /idX/delete HTTP/1.1   -> Returns 404 as it just got deleted
    DELETE /idX/delete HTTP/1.1   -> Returns 404

 
5. **Cacheability**
   - To cache a response, the following conditions must be met:
     - The HTTP method of the request message itself is cacheable, including GET and HEAD, but not PUT and DELETE. POST is typically not cacheable.
     - The status code of the response message is cacheable, including 200, 203, 204, 206, 300, 301, 404, 405, 410, 414, and 501.
     - The Cache-Control header field in the response message does not specify no caching.

6. **XMLHttpRequest**
   - To illustrate another difference between POST and GET, let's understand XMLHttpRequest:
     - XMLHttpRequest is an API that provides clients with the ability to transfer data between the client and server. It offers a simple way to retrieve data via URL without refreshing the entire page. This allows updating a portion of the webpage without disturbing the user. XMLHttpRequest is extensively used in AJAX.
     - When using the POST method with XMLHttpRequest, the browser sends the header first and then the data. However, not all browsers follow this approach; for example, Firefox does not.
     - For the GET method, the header and data are sent together.

---

### **98. HTTP/2.0**

1. **Deficiencies of HTTP/1.x**
   - The simplicity of HTTP/1.x comes at the cost of performance:
     - Clients need multiple connections to achieve concurrency and reduce latency.
     - Lack of compression for request and response headers leads to unnecessary network traffic.
     - Ineffective resource prioritization results in low utilization of underlying TCP connections.

2. **Binary Framing Layer**
   - HTTP/2.0 divides messages into HEADERS frames and DATA frames, both in binary format.
   - During communication, there is only one TCP connection, carrying any number of bidirectional data streams (Streams).
   - Each data stream has a unique identifier and optional priority information for handling bidirectional information.
   - A message is a complete sequence of frames corresponding to a logical request or response.
   - A frame is the smallest unit of communication. Frames from different data streams can be interleaved and then reassembled based on the data stream identifier in each frame header.

3. **Server Push**
   - In HTTP/2.0, when a client requests a resource, the server sends related resources to the client, eliminating the need for additional client requests. For example, when a client requests the page.html page, the server sends script.js, style.css, and other related resources together.

4. **Header Compression**
   - HTTP/1.1 headers contain a significant amount of information, and this information is repeatedly sent each time.
   - HTTP/2.0 requires clients and servers to maintain and update a header field table containing previously seen headers, avoiding redundant transmissions.
   - Moreover, HTTP/2.0 uses Huffman coding to compress header fields.

--- 

### **99. New Features in HTTP/1.1**

Detailed information can be found in the preceding text.

- Default is persistent connection.
- Supports pipelining.
- Supports opening multiple TCP connections simultaneously.
- Supports virtual hosting.
- Introduces the status code 100.
- Supports chunked transfer encoding.
- Introduces cache control directive max-age.

---

### **100. Connection Management**

1. **Short Connection vs. Persistent Connection**
   - When a browser accesses an HTML page containing multiple images, in addition to requesting the HTML page, it also requests image resources. If a new TCP connection is established for each HTTP communication, it incurs significant overhead.
   - Persistent connections require establishing a TCP connection once and enable multiple HTTP communications.
   - From HTTP/1.1 onwards, persistent connections are the default. To terminate the connection, it needs to be initiated by the client or server using `Connection: close`.
   - In HTTP/1.0, short connections were the default, and for persistent connections, `Connection: Keep-Alive` was used.

2. **Pipelining**
   - By default, HTTP requests are sent sequentially, with the next request being sent only after receiving a response to the current request. Due to network latency and bandwidth limitations, there could be a significant wait time before the next request is sent to the server.
   - Pipelining involves sending consecutive requests on the same persistent connection without waiting for responses. This reduces latency.

---

### **101. Content Negotiation**

Content negotiation helps return the most suitable content based on factors such as the browser's default language.

1. **Types**
   1. **Server-Driven**
      - Clients set specific HTTP header fields such as Accept, Accept-Charset, Accept-Encoding, Accept-Language. Servers return specific resources based on these fields.
      - Challenges:
         - Servers find it challenging to know all information about the client's browser.
         - Client-provided information is quite verbose (addressed by HTTP/2's header compression mechanism), and there's a privacy risk (HTTP fingerprinting technology).
         - Resources need to be returned in different representations, reducing the efficiency of shared caching, and server-side implementation becomes more complex.

   2. **Agent-Driven**
      - Servers return 300 Multiple Choices or 406 Not Acceptable. Clients choose the most suitable resource.
      
2. **Vary**
    Vary: Accept-Language
   - In content negotiation scenarios, a cached response in a caching server can only be used if it satisfies the content negotiation conditions; otherwise, the resource should be requested from the origin server.
   - For example, if a client sends a request with the Accept-Language header, and the server's response contains Vary: Accept-Language, the caching server will only use the cache if the next client request for the same URL has the matching Accept-Language value.
---

### **102. Content Encoding**

Content encoding compresses the entity body to reduce the amount of transmitted data.

Common content encodings include gzip, compress, deflate, and identity.

When a browser sends the Accept-Encoding header, it includes supported compression algorithms and their respective priorities. The server then selects one algorithm, compresses the response message body using that algorithm, and sends the Content-Encoding header to inform the browser of the chosen algorithm. Since this content negotiation process is based on the encoding type to select the representation form of the resource, the Vary header field in the response message must include at least Content-Encoding.

--- 

### **103. Range Requests**

If there is a network interruption and the server has only sent a portion of the data, range requests allow the client to request only the portion of data that the server hasn't sent, thus avoiding the need for the server to resend all the data.

1. **Range Request Addition**
   Add the `Range` header field in the request message to specify the requested range.
    ```html
    GET /z4d4kWk.jpg HTTP/1.1
    Host: i.imgur.com
    Range: bytes=0-1023
    ```
   If the request is successful, the server's response includes the `206 Partial Content` status code.
    ```html
    HTTP/1.1 206 Partial Content
    Content-Range: bytes 0-1023/146515
    Content-Length: 1024
    ...
    (binary content)
    ```
2. **Accept-Ranges**
   The response header field `Accept-Ranges` informs the client whether it can handle range requests. If the server can handle them, it uses `bytes`; otherwise, it uses `none`.

    Accept-Ranges: bytes
  
3. **Response Status Codes**
   - In the case of a successful request, the server returns the `206 Partial Content` status code.
   - If the requested range is out of bounds, the server returns the `416 Requested Range Not Satisfiable` status code.
   - If range requests are not supported, the server returns the `200 OK` status code.
---
### **104. Chunked Transfer Encoding**
Chunked Transfer Encoding divides data into multiple chunks, allowing the browser to progressively display the page.

---

### **105. Multipart Content**
Within a message body, multiple types of entities can be sent simultaneously. Each part is separated by a boundary defined by the `boundary` field, and each part can have its own set of header fields.

For example, when uploading multiple forms, you can use the following format:
```html
Content-Type: multipart/form-data; boundary=AaB03x

--AaB03x
Content-Disposition: form-data; name="submit-name"

Larry
--AaB03x
Content-Disposition: form-data; name="files"; filename="file1.txt"
Content-Type: text/plain

... contents of file1.txt ...
--AaB03x--
```

---

### **106. Communication Data Forwarding**

1. **Proxy**
   A proxy server receives requests from clients and forwards them to other servers.

   The main purposes of using a proxy are:
   - Caching
   - Load balancing
   - Network access control
   - Access log recording

   Proxies are divided into two types: forward proxy and reverse proxy:
   - Users are aware of the existence of a forward proxy.
   - A reverse proxy is typically located within the internal network, and users are not aware of its presence.

2. **Gateway**
   Unlike a proxy server, a gateway server translates HTTP into other protocols for communication, enabling it to request services from non-HTTP servers.

3. **Tunnel**
   Using encryption methods like SSL, a secure communication channel is established between the client and the server.

---
### **107. Basics**

A schema defines how data is stored, what type of data is stored, and how data is decomposed. Both databases and tables have schemas.

The values of primary keys are not allowed to be modified, and they cannot be reused (the primary key values of deleted rows cannot be assigned to new data rows).

SQL (Structured Query Language), standardized by the ANSI committee, is known as ANSI SQL. Each DBMS has its own implementation, such as PL/SQL, Transact-SQL, etc.

SQL statements are case-insensitive, but whether database table names, column names, and values are case-sensitive depends on the specific DBMS and its configuration.

- SQL supports the following three types of comments:
    SELECT *
    FROM mytable; -
- Database creation and usage:
    CREATE DATABASE test;
    USE test;

---
### **108. Creating Tables**
```sql
  CREATE TABLE mytable (
  # int
  id INT NOT NULL AUTO_INCREMENT,
  # int 
  col1 INT NOT NULL DEFAULT 1,
  col2 VARCHAR(45) NULL,
  col3 DATE NULL,
  PRIMARY KEY (`id`));
```
---
## 109. Modify Table
Add Column
```sql
ALTER TABLE mytable
ADD col CHAR(20);
```
Drop Column
```sql
ALTER TABLE mytable
DROP COLUMN col;
```
Drop Table
```sql
DROP TABLE mytable;
```
---
## 108. Inserting Data
Regular Insertion
```sql
INSERT INTO mytable(col1, col2)
VALUES(val1, val2);
```
Inserting Retrieved Data
```sql
INSERT INTO mytable1(col1, col2)
SELECT col1, col2
FROM mytable2;
```
Copying Contents of One Table to a New Table
```sql
CREATE TABLE newtable AS
SELECT * FROM mytable;
```
---
### **111. Updating Data**
Update Specific Row
```sql
UPDATE mytable
SET col = val
WHERE id = 1;
```
---
### **112. Deleting Data**
Delete Specific Row
```sql
DELETE FROM mytable
WHERE id = 1;
```
Truncate Table
```sql
TRUNCATE TABLE mytable;
```
When using UPDATE and DELETE operations, it's crucial to use the WHERE clause to avoid damaging the entire table. You can perform a test using SELECT statements first to prevent accidental data deletion.

---

### **113. Querying Data**
Distinct Values
```sql
SELECT DISTINCT col1, col2
FROM mytable;
```
Limiting Rows Returned
Return the first 5 rows:
```sql
SELECT *
FROM mytable
LIMIT 5;
```
Return rows 3 to 5:
```sql
SELECT *
FROM mytable
LIMIT 2, 3;
```
---

### **114. Sorting Data**
Ascending and Descending Order
```sql
SELECT *
FROM mytable
ORDER BY col1 DESC, col2 ASC;
```
ASC: Ascending (Default)
DESC: Descending

You can sort by multiple columns and specify different sorting orders for each column.

---

### **115. Filtering Data**
Filtering data directly in SQL is preferable to transferring unnecessary data over the network, which can lead to wasted bandwidth. Utilize SQL statements to filter data, avoiding the transmission of all data to the client for filtering.
Filtering by NULL Values
```sql
SELECT *
FROM mytable
WHERE col IS NULL;
```
The following table shows the operators available in the WHERE clause:

Operator	Description
=	Equal
<	Less than
>	Greater than
<> !=	Not equal
<= !>	Less than or equal
>= !<	Greater than or equal
BETWEEN	Between two values
IS NULL	NULL value
Note that NULL is distinct from 0 and an empty string.

Use AND and OR to connect multiple filtering conditions. AND is processed with higher priority. When dealing with multiple AND and OR in a filtering expression, parentheses () can be used to determine priority and clarify the relationship.

The IN operator is used to match a set of values, and it can also take a SELECT clause to match a set of values from a subquery.

The NOT operator is used to negate a condition.

---
### **116. Wildcards**
Wildcards are used in filtering statements and are specifically applicable to text fields.

`%` matches zero or more arbitrary characters.
`_` matches exactly one arbitrary character.
`[ ]` can match characters within a set, e.g., `[ab]` matches either 'a' or 'b'. The caret (^) inside negates the set, meaning it doesn't match characters in the set.
Use the `LIKE` keyword for wildcard matching.

```sql
SELECT *
FROM mytable
WHERE col LIKE '[^AB]%'; -- Any text not starting with A or B
```
Avoid overusing wildcards, as matching at the beginning can be slow.

---

### **117. Calculating Fields**
Performing data transformation and formatting on the database server is often much faster than on the client side. Additionally, reducing the amount of data through conversion and formatting can minimize network communication.

Calculation fields typically require the use of AS to provide an alias; otherwise, the output will use the calculation expression as the field name.

Basic Calculation

```sql
SELECT col1 * col2 AS alias
FROM mytable;
```
Concatenating Fields
The CONCAT() function is used to concatenate two fields. Many databases use spaces to pad a value to the column width, so unnecessary spaces may appear in the concatenated result. Using TRIM() can remove leading and trailing spaces.
```sql
SELECT CONCAT(TRIM(col1), '(', TRIM(col2), ')') AS concat_col
FROM mytable;
```
---
### **118. Functions in MySQL**

## Aggregation
| Function | Description                   |
|----------|-------------------------------|
| AVG()    | Returns the average value of a column |
| COUNT()  | Returns the number of rows in a column |
| MAX()    | Returns the maximum value in a column |
| MIN()    | Returns the minimum value in a column |
| SUM()    | Returns the sum of values in a column |

*Note: AVG() ignores NULL rows. Use DISTINCT to aggregate distinct values.*

## Text Processing
| Function | Description                   |
|----------|-------------------------------|
| LEFT()   | Returns the leftmost characters of a string |
| RIGHT()  | Returns the rightmost characters of a string |
| LOWER()  | Converts a string to lowercase |
| UPPER()  | Converts a string to uppercase |
| LTRIM()  | Removes leading spaces from a string |
| RTRIM()  | Removes trailing spaces from a string |
| LENGTH() | Returns the length of a string |
| SOUNDEX()| Converts a string to a phonetic representation |

*Note: SOUNDEX() can convert a string into an alphanumeric pattern describing its phonetic representation.*

## Date and Time Processing
- Date Format: YYYY-MM-DD
- Time Format: HH:MM:SS

| Function     | Description                   |
|--------------|-------------------------------|
| ADDDATE()    | Adds a specified period to a date (days, weeks, etc.) |
| ADDTIME()    | Adds a specified period to a time (hours, minutes, etc.) |
| CURDATE()    | Returns the current date       |
| CURTIME()    | Returns the current time       |
| DATE()       | Returns the date part of a datetime value |
| DATEDIFF()   | Calculates the difference between two dates |
| DATE_ADD()   | Highly flexible date operation function |
| DATE_FORMAT()| Returns a formatted date or time string |
| DAY()        | Returns the day part of a date  |
| DAYOFWEEK()  | Returns the day of the week for a date |
| HOUR()       | Returns the hour part of a time |
| MINUTE()     | Returns the minute part of a time |
| MONTH()      | Returns the month part of a date |
| NOW()        | Returns the current date and time |
| SECOND()     | Returns the second part of a time |
| TIME()       | Returns the time part of a datetime value |
| YEAR()       | Returns the year part of a date |

## Numeric Processing
| Function | Description                   |
|----------|-------------------------------|
| SIN()    | Sine                          |
| COS()    | Cosine                        |
| TAN()    | Tangent                       |
| ABS()    | Absolute value                |
| SQRT()   | Square root                   |
| MOD()    | Remainder                     |
| EXP()    | Exponential                   |
| PI()     | Pi                            |
| RAND()   | Random number                 |

---

### **119. Grouping**
Grouping involves placing rows with the same data values into the same group.

Summary functions can be applied to grouped data, such as calculating the average of grouped data.

The specified grouping fields not only determine the groups but also automatically sort the data based on those fields.
```sql
    SELECT col, COUNT(*) AS num
    FROM mytable
    GROUP BY col;
```
- GROUP BY automatically sorts based on the grouping fields.
- ORDER BY can also be used to sort based on aggregated fields.
 ```sql
    SELECT col, COUNT(*) AS num
    FROM mytable
    GROUP BY col
    ORDER BY num;
```
Filtering rows is done with WHERE, and filtering groups is done with HAVING. Row filtering should precede group filtering.

```sql
    SELECT col, COUNT(*) AS num
    FROM mytable
    WHERE col > 2
    GROUP BY col
    HAVING num >= 2;
```

**Grouping Rules:**
- The GROUP BY clause appears after the WHERE clause and before the ORDER BY clause.

- Every field in the SELECT statement, except for aggregated fields, must be included in the GROUP BY clause.
- Rows with NULL values are treated as a separate group.
- Most SQL implementations do not support GROUP BY columns with variable-length data types.

---

### **120. Subqueries**
A subquery is a query embedded within another query. It can only return a single field of data.

Subquery results can be used as filtering conditions in the WHERE statement:

```sql
    SELECT *
    FROM mytable1
    WHERE col1 IN (SELECT col2
                FROM mytable2);
```
In the following example, the query retrieves the customer name along with the number of orders for each customer. The subquery is executed once for each customer retrieved in the outer query:
```sql
    SELECT cust_name, (SELECT COUNT(*)
                    FROM Orders
                    WHERE Orders.cust_id = Customers.cust_id)
                    AS orders_num
    FROM Customers
    ORDER BY cust_name;
```
Subqueries are powerful tools for combining and extracting information from multiple tables within a single query. They provide a way to perform operations on the results of another query seamlessly.

---

### **121. Joins**
Joins are used to combine data from multiple tables using the JOIN keyword, and the join conditions are specified using ON instead of WHERE.

Joins can replace subqueries and are often more efficient than subqueries.

Aliases using AS can be assigned to column names, computed fields, and table names. Table aliases are particularly useful for simplifying SQL statements and when joining the same table.

**Inner Join**
Inner join, also known as an equijoin, uses the INNER JOIN keyword.

```sql
    SELECT A.value, B.value
    FROM tablea AS A INNER JOIN tableb AS B
    ON A.key = B.key;
```
Alternatively, you can use a regular query and connect the columns from both tables in the WHERE clause using equality:

```sql
    SELECT A.value, B.value
    FROM tablea AS A, tableb AS B
    WHERE A.key = B.key;
```
**Self Join**
A self-join is a variation of an inner join where the table is joined with itself.

For example, finding all employees in the same department as Jim:

Subquery version:
```sql
    SELECT name
    FROM employee
    WHERE department = (
        SELECT department
        FROM employee
        WHERE name = "Jim");
```
Self-join version:
```sql
    SELECT e1.name
    FROM employee AS e1 INNER JOIN employee AS e2
    ON e1.department = e2.department
        AND e2.name = "Jim";
```
**Natural Join**
A natural join connects columns with the same name through an equality test. Multiple columns with the same name are allowed.

The difference between inner join and natural join: Inner join specifies the columns for joining, while natural join automatically joins all columns with the same name.
```sql
    SELECT A.value, B.value
    FROM tablea AS A NATURAL JOIN tableb AS B;
```
**Outer Join**
Outer joins retain the rows without associations. They are categorized into left outer join, right outer join, and full outer join. Left outer join retains rows from the left table without associations.

For example, retrieving all customer order information, including customers with no orders:
```sql
SELECT Customers.cust_id, Customer.cust_name, Orders.order_id
FROM Customers LEFT OUTER JOIN Orders
ON Customers.cust_id = Orders.cust_id;
```
**Customers Table:**

| cust_id | cust_name |
| ------- | --------- |
| 1       | a         |
| 2       | b         |
| 3       | c         |

**Orders Table:**

| order_id | cust_id |
| -------- | ------- |
| 1        | 1       |
| 2        | 1       |
| 3        | 3       |
| 4        | 3       |

The result of a LEFT OUTER JOIN to retrieve all customer order information, including customers with no orders:

| cust_id | cust_name | order_id |
| ------- | --------- | -------- |
| 1       | a         | 1        |
| 1       | a         | 2        |
| 3       | c         | 3        |
| 3       | c         | 4        |
| 2       | b         | Null     |

---

### **122. Combining Queries**
Use UNION to combine the results of two queries. If the first query returns M rows and the second query returns N rows, the combined query result will generally have M + N rows.

Each query in the UNION must have the same columns, expressions, and aggregate functions.

By default, duplicate rows are removed. If you want to retain duplicate rows, use UNION ALL.

Only one ORDER BY clause is allowed, and it must be placed at the end of the statement.
```sql
    SELECT col
    FROM mytable
    WHERE col = 1
    UNION
    SELECT col
    FROM mytable
    WHERE col =2;
```
---
### **123. Views**
A view is a virtual table that does not contain data itself and cannot be indexed.

Operations on views are similar to operations on regular tables.

Views offer the following advantages:

1. **Simplifies Complex SQL Operations:**
   Views simplify complex SQL operations, such as intricate joins.

2. **Uses a Subset of Data:**
   Views allow the use of only a subset of data from actual tables.

3. **Enhances Data Security:**
   By granting users access only to the view, data security is ensured.

4. **Changes Data Format and Representation:**
   Views facilitate changes in data format and representation.

Views provide a layer of abstraction, allowing users to interact with data in a more convenient and controlled manner.
 
 ```sql
    CREATE VIEW myview AS
    SELECT Concat(col1, col2) AS concat_col, col3*col4 AS compute_col
    FROM mytable
    WHERE col5 = val;
 ```
 ---
### **124. Stored Procedures**
A stored procedure can be viewed as a batch of SQL operations.

Benefits of using stored procedures:

1. **Code Encapsulation for Security:**
   Stored procedures encapsulate code, ensuring a certain level of security.

2. **Code Reusability:**
   Stored procedures facilitate code reusability.

3. **High Performance:**
   Due to precompilation, stored procedures exhibit high performance.

Creating a stored procedure in the command line requires custom delimiters since the command line uses ';' as an ending symbol. However, stored procedures themselves also contain semicolons, leading to syntax errors if not handled correctly.

Stored procedures can have three types of parameters: in, out, and inout.

Assigning values to variables is done using the `SELECT INTO` statement.

Only one variable can be assigned a value at a time, and operations with collections are not supported.

Stored procedures enhance code organization and execution efficiency, making them a powerful tool in database management.
```sql
    delimiter //
    create procedure myprocedure( out ret int )
        begin
            declare y int;
            select sum(col1)
            from mytable
            into y;
            select y*y into ret;
        end //
    delimiter ;
```
---
### **125. Cursors

In a stored procedure, a cursor can be used to navigate and traverse through a result set.

Cursors are primarily employed in interactive applications where users need to browse and modify arbitrary rows within a dataset.

The four steps of using a cursor are as follows:

1. **Declare Cursor:**
   - Declare the cursor; this process does not actually retrieve data.

2. **Open Cursor:**
   - Open the cursor.

3. **Fetch Data:**
   - Retrieve data from the cursor.

4. **Close Cursor:**
   - Close the cursor.
```sql
    delimiter //
    create procedure myprocedure(out ret int)
        begin
            declare done boolean default 0;

            declare mycursor cursor for
            select col1 from mytable;
            # 定义了一个 continue handler，当 sqlstate '02000' 这个条件出现时，会执行 set done = 1
            declare continue handler for sqlstate '02000' set done = 1;

            open mycursor;

            repeat
                fetch mycursor into ret;
                select ret;
            until done end repeat;

            close mycursor;
        end //
    delimiter ;
 
```

---

### **126. Triggers**

Triggers automatically execute when certain statements are performed on a table: DELETE, INSERT, UPDATE.

Triggers must specify whether to execute automatically before or after the statement, using the BEFORE keyword for pre-execution and AFTER for post-execution. BEFORE is used for data validation and purification, while AFTER is used for audit tracking, logging modifications to another table.

- **INSERT Trigger:**
  - Includes a virtual table named NEW.
  ```sql
    CREATE TRIGGER mytrigger AFTER INSERT ON mytable
    FOR EACH ROW SELECT NEW.col into @result;

    SELECT @result;
  ```
- **DELETE Trigger:**
  - Includes a read-only virtual table named OLD.

- **UPDATE Trigger:**
  - Includes two virtual tables named NEW (modifiable) and OLD (read-only).

MySQL does not allow the use of CALL statements in triggers, meaning stored procedures cannot be called within triggers.

---

### **127. Transaction Management**

## Basic Terms:

- **Transaction:**
  - Refers to a group of SQL statements.

- **Rollback:**
  - The process of undoing specified SQL statements.

- **Commit:**
  - Involves writing the uncommitted results of SQL statements to the database table.

- **Savepoint:**
  - A temporary placeholder set during transaction processing. You can roll back to it (different from rolling back the entire transaction).

- Cannot roll back SELECT statements; rolling back SELECT statements is meaningless. Also, CREATE and DROP statements cannot be rolled back.

MySQL's transaction commitment is implicit by default, treating each executed statement as a separate transaction and committing it. When a START TRANSACTION statement is encountered, implicit commitment is disabled. After executing COMMIT or ROLLBACK statements, the transaction automatically closes, reverting to implicit commitment.

Setting autocommit to 0 can disable automatic commitment, and the autocommit flag is specific to each connection rather than the server.

If no savepoint is set, ROLLBACK will revert to the START TRANSACTION statement. If a savepoint is established and specified in the ROLLBACK, it will roll back to that savepoint.

**SQL:**
```sql
    START TRANSACTION
    // ...
    SAVEPOINT delete1
    // ...
    ROLLBACK TO delete1
    // ...
    COMMIT
```

---

### **128. Character Sets**

## Basic Terms:

- **Character Set:**
  - A collection of letters and symbols.

- **Encoding:**
  - The internal representation of a member of a character set.

- **Collation:**
  - Specifies how to compare characters, primarily used for sorting and grouping.

In addition to specifying character set and collation for a table, it can also be specified for columns:
```sql
    CREATE TABLE mytable
    (col VARCHAR(10) CHARACTER SET latin COLLATE latin1_general_ci )
    DEFAULT CHARACTER SET hebrew COLLATE hebrew_general_ci;
    
```

- Collation can be specified during sorting and grouping:
```sql
    SELECT *
    FROM mytable
    ORDER BY col COLLATE latin1_general_ci;
```

---

### **129. Permission Management**

MySQL account information is stored in the 'mysql' database. 
```sql
    USE mysql;
    SELECT user FROM user;
```
### Creating an Account:

Newly created accounts have no permissions by default.
```sql
    CREATE USER myuser IDENTIFIED BY 'mypassword';
```

### Modifying Account Name:

The account name can be modified.
```sql
    RENAME USER myuser TO newuser;
```

### Deleting an Account:

An account can be deleted.
```sql
    DROP USER myuser;
```

### Viewing Permissions:

View the permissions of an account.
```sql
    SHOW GRANTS FOR myuser;
```

### Granting Permissions:

Accounts are defined in the form username@host; username@% uses the default hostname.
```sql
    GRANT SELECT, INSERT ON mydatabase.* TO myuser;
```

### Revoking Permissions:

GRANT and REVOKE control access permissions at various levels:

- Entire server using GRANT ALL and REVOKE ALL.
- Entire database using ON database.*.
- Specific table using ON database.table.
- Specific columns.
- Specific stored procedures.
```sql
    REVOKE SELECT, INSERT ON mydatabase.* FROM myuser;
```
### Changing Password

To change a password, you must use the Password() function for encryption.
```sql
    SET PASSWROD FOR myuser = Password('new_password');
```
---
### **130. Transaction**

**Concept:**
A transaction refers to a set of operations that satisfy the ACID properties. It can be committed using `COMMIT` or rolled back using `ROLLBACK`.

**ACID:**
1. **Atomicity:**
   A transaction is considered as the smallest indivisible unit. All operations within a transaction must either be committed successfully or rolled back entirely.

   Rollback is implemented using an undo log, which records the modification operations performed by the transaction. During rollback, these operations are reversed.

2. **Consistency:**
   The database maintains a consistent state before and after a transaction is executed. In a consistent state, the results of all transactions reading the same data are identical.

3. **Isolation:**
   Modifications made by a transaction are not visible to other transactions until the transaction is committed.

4. **Durability:**
   Once a transaction is committed, its modifications are permanently stored in the database. Even in the event of a system crash, the results of a committed transaction should not be lost.

   Durability is achieved using a redo log for recovery in case of a system crash. Unlike the undo log, which records logical modifications, the redo log records physical modifications to data pages.

**Understanding ACID Properties:**
- Consistency is essential for correct transaction results.
- In a non-concurrent scenario with transactions executed serially, isolation is guaranteed as long as atomicity is satisfied. In this case, as long as atomicity is met, consistency is ensured.
- In a concurrent scenario with multiple transactions running in parallel, transactions must satisfy both atomicity and isolation to ensure consistency.
- Durability ensures data persistence to handle system crashes.

**AUTOCOMMIT:**
MySQL defaults to automatic commit mode. This means that if you don't explicitly use the `START TRANSACTION` statement to begin a transaction, each query operation is treated as a transaction and automatically committed.

---

### **131. Concurrent Consistency Issues**

In a concurrent environment, ensuring the isolation of transactions is challenging, leading to various concurrency consistency issues.

#### **Lost Update**
Lost update refers to the scenario where the update operation of one transaction is replaced by the update operation of another transaction. This commonly occurs in real-life situations, for example:
  
   - Transaction T1 and T2 both modify the same data.
   - T1 modifies and commits first.
   - T2 modifies afterward, and its changes overwrite the changes made by T1.

#### **Dirty Read**
Dirty read occurs when, in different transactions, the current transaction can read data that another transaction has not yet committed. For example:
  
   - T1 modifies data but does not commit.
   - T2 reads this data.
   - If T1 rolls back the modification, T2's read is based on dirty data.

#### **Non-Repeatable Read**
Non-repeatable read happens when a transaction reads the same data set multiple times, and another transaction accesses and modifies the data set before the first transaction completes. This can lead to inconsistent data between the two reads. For example:
   
   - T2 reads a piece of data.
   - T1 modifies the data.
   - If T2 reads the same data again, the result may differ from the first read.

#### **Phantom Read**
Phantom read is essentially a case of non-repeatable read.
  
   - T1 reads a range of data.
   - T2 inserts new data within that range.
   - T1 reads the same range again, resulting in different data from the initial read.

The main reason for concurrency inconsistency problems is the violation of transaction isolation. The solution is to ensure isolation through concurrency control. Concurrency control can be achieved through locking, but manual lock management can be complex. Database management systems provide transaction isolation levels to simplify handling concurrency consistency issues.

---

### **132. Locking**

#### **Lock Granularity**
MySQL offers two lock granularities: row-level locking and table-level locking.

It is advisable to lock only the necessary data to be modified rather than all resources. The smaller the locked data, the lower the likelihood of lock contention, leading to higher system concurrency.

However, locking consumes resources, and various lock operations (including acquiring, releasing, and checking lock status) add to system overhead. Therefore, a balance must be struck between lock overhead and system concurrency when choosing lock granularity.

#### **Types of Locks**
1. **Read-Write Locks**
   - Exclusive lock (X lock), also known as a write lock.
   - Shared lock (S lock), also known as a read lock.
   
   Rules:
   - A transaction holding an X lock can read and update the data object.
   - A transaction holding an S lock can read the data object but cannot perform updates. During the S lock period, other transactions can acquire S locks but not X locks.
 
2. **Intention Locks**
   Intention locks (IX/IS) facilitate multi-granularity locking.

   Rules:
   - Before obtaining an S lock on a data row, a transaction must first acquire an IS lock or a stronger lock on the table.
   - Before obtaining an X lock on a data row, a transaction must first acquire an IX lock on the table.

#### **Locking Protocols**
1. **Three-Level Locking Protocol**
   - First Level: A transaction must obtain an X lock to modify data (no other transactions can acquire any locks).
   - Second Level: A transaction must obtain an S lock to read data (no other transactions can obtain X locks but can obtain S locks).
   - Third Level: A transaction must hold an S lock until it finishes (no other transactions can obtain X or S locks).

2. **Two-Phase Locking Protocol**
   Locking and unlocking occur in two distinct phases.
   - Locks are acquired but not released until the end of the transaction.
   - Guarantees serializability, a condition for a schedule to be conflict-serializable.
  
   Example of a schedule satisfying two-phase locking:
    lock-x(A)...lock-s(B)...lock-s(C)...unlock(A)...unlock(C)...unlock(B)

   Example of a schedule violating two-phase locking:
    lock-x(A)...unlock(A)...lock-s(B)...unlock(B)...lock-s(C)...unlock(C)


### **MySQL Implicit and Explicit Locking**
InnoDB, MySQL's storage engine, follows the two-phase locking protocol. It automatically acquires locks as needed based on the isolation level. All locks are released at the same time, known as implicit locking.

InnoDB also allows for explicit locking using specific statements:

- `SELECT ... FOR UPDATE`: Acquires a shared or exclusive lock on selected rows.
- `SELECT ... FOR SHARE`: Acquires a shared lock on selected rows.
- `UPDATE ... LOCK IN SHARE MODE`: Acquires a shared lock on the affected rows.

These statements provide users with more control over locking behavior in MySQL.
```sql
    SELECT ... LOCK In SHARE MODE;
    SELECT ... FOR UPDATE;
```

---
### **133. Isolation Levels**

Isolation levels in database systems determine the degree to which transactions are isolated from each other. Each isolation level offers a balance between data consistency and system performance.

#### **Read Uncommitted (READ UNCOMMITTED)**
In this isolation level, modifications made within a transaction are visible to other transactions, even if the changes have not been committed.

#### **Read Committed (READ COMMITTED)**
A transaction can only read modifications made by other transactions after they have been committed. In other words, changes made by a transaction are not visible to other transactions until the modifying transaction is committed.

#### **Repeatable Read (REPEATABLE READ)**
This level ensures that multiple reads of the same data within the same transaction yield consistent results. Other transactions cannot modify the data being read by a transaction until it completes. While it addresses non-repeatable reads, it may still allow phantom reads.

#### **Serializable (SERIALIZABLE)**
Transactions are forced to execute serially, ensuring that multiple transactions do not interfere with each other. This level provides the highest isolation, preventing issues such as dirty reads, non-repeatable reads, and phantom reads. However, it may lead to reduced concurrency due to strict serialization.

This isolation level requires locking mechanisms to guarantee that only one transaction executes at a time, ensuring serial execution.

---

### **134. Multi-Version Concurrency Control (MVCC)**

MVCC is a specific way InnoDB, MySQL's storage engine, implements isolation levels, particularly focusing on achieving the READ COMMITTED and REPEATABLE READ isolation levels. The READ UNCOMMITTED isolation level, where transactions can see uncommitted modifications, has low requirements and does not need MVCC. Serializable isolation level requires locking, as MVCC alone cannot achieve it.

#### Basic Idea

As mentioned in the locking section, locks can address concurrency consistency issues during simultaneous transactions. Since read operations often outnumber write operations, read-write locks were introduced to avoid unnecessary locking for operations like reading, where there is no mutual exclusion. In MVCC, the system utilizes the idea of multiple versions, updating the latest snapshot for write operations and allowing read operations to access older snapshots without mutual exclusion, similar to CopyOnWrite.

In MVCC, modifications (DELETE, INSERT, UPDATE) in a transaction create a new snapshot for the data row.

#### Versioning

- System Version (SYS_ID): An incrementing number that increases each time a new transaction starts.
- Transaction Version (TRX_ID): The system version at the beginning of a transaction.

#### Undo Log

The multiple versions in MVCC refer to multiple snapshots stored in the Undo Log. This log connects all snapshots of a data row using a rollback pointer (ROLL_PTR).

For instance, in MySQL, if a table 't' is created with primary key 'id' and a field 'x', and an insert and two subsequent update operations are performed:

```sql
INSERT INTO t(id, x) VALUES(1, "a");
UPDATE t SET x="b" WHERE id=1;
UPDATE t SET x="c" WHERE id=1;
```
Since we did not use START TRANSACTION to treat the operations as one transaction, each operation becomes a separate transaction due to MySQL's AUTOCOMMIT mechanism. Thus, three transactions are involved in the operations. The snapshot includes the transaction version (TRX_ID) and a DEL bit to mark deletions.

INSERT, UPDATE, DELETE operations create a log and write the transaction version (TRX_ID). DELETE, being a special case of UPDATE, also sets the DEL bit to 1.

### **ReadView**

MVCC maintains a ReadView structure containing the list of currently uncommitted transactions (TRX_IDs {TRX_ID_1, TRX_ID_2, ...}), along with the minimum (TRX_ID_MIN) and maximum (TRX_ID_MAX) values from that list.

During a SELECT operation, the usability of a data row snapshot is determined by comparing the snapshot's TRX_ID with TRX_ID_MIN and TRX_ID_MAX:

- TRX_ID < TRX_ID_MIN: The snapshot was changed before all current uncommitted transactions, making it usable.
- TRX_ID > TRX_ID_MAX: The snapshot was changed after the transaction started, making it unusable.
- TRX_ID_MIN <= TRX_ID <= TRX_ID_MAX: Further judgment depends on the isolation level:
  - **READ COMMITTED:** If TRX_ID is in the TRX_IDs list, the snapshot corresponds to an uncommitted transaction, making it unusable. Otherwise, it is usable.
  - **REPEATABLE READ:** Not usable because allowing it would enable other transactions to read and modify the data row, causing a non-repeatable read issue.

If the data row snapshot is not usable, the next snapshot is found using the rollback pointer ROLL_PTR in the Undo Log, and the above judgment is repeated.

### **Snapshot Read vs. Current Read**

**Snapshot Read:**

SELECT operations in MVCC retrieve data from snapshots without requiring locks.
```sql
SELECT * FROM table ...;
```
**Current Read:**

Other operations (INSERT, UPDATE, DELETE) that modify the database need locks for reading the latest data. It is noteworthy that MVCC does not completely eliminate locking; it only avoids locks for SELECT operations.
```sql
INSERT;
UPDATE;
DELETE;
```

During a SELECT operation, locks can be forced, requiring an S lock for the first statement and an X lock for the second.
```sql
SELECT * FROM table WHERE ? lock in share mode;
SELECT * FROM table WHERE ? for update;

```
---
### **135. Next-Key Locks**

Next-Key Locks is a locking mechanism implemented by MySQL's InnoDB storage engine.

MVCC alone cannot resolve the phantom read problem, and Next-Key Locks exist specifically to address this issue. When using MVCC + Next-Key Locks under the REPEATABLE READ isolation level, it becomes possible to solve phantom read problems.

#### **Record Locks**

Locks an index on a specific record rather than the record itself.

If a table does not have an index set, InnoDB will automatically create a hidden clustered index on the primary key. Therefore, Record Locks can still be utilized.

#### **Gap Locks**

Locks the gap between index values but does not include the index itself. For example, if one transaction executes the following statement, other transactions cannot insert into t.c between 10 and 15.

#### **Next-Key Locks**

It combines Record Locks and Gap Locks, locking both an index on a specific record and the gap between index values. It locks a half-open interval; for instance, if an index contains the values 10, 11, 13, and 20, the following interval needs to be locked:

---
### **136. Relational Database Design Theory

### Functional Dependency
Let A->B indicate that A functionally determines B, or in other words, B depends on A.

If {A1, A2, ..., An} is a set of attributes in a relation, and this set determines all other attributes in the relation and is minimal, it is referred to as the key.

For A->B, if there exists a proper subset A' of A such that A'->B, then A->B is a partial functional dependency; otherwise, it is a complete functional dependency.

For A->B and B->C, A->C is a transitive functional dependency.

### Anomalies
The functional dependencies for the student-course relationship are {Sno, Cname} -> {Sname, Sdept, Mname, Grade}, and the key is {Sno, Cname}. This implies that once the student and course are determined, all other information can be derived.

| Sno | Sname    | Sdept        | Mname   | Cname     | Grade |
| --- | -------- | ------------ | ------- | --------- | ----- |
| 1   | Student-1 | Department-1 | Dean-1  | Course-1  | 90    |
| 2   | Student-2 | Department-2 | Dean-2  | Course-2  | 80    |
| 2   | Student-2 | Department-2 | Dean-2  | Course-1  | 100   |
| 3   | Student-3 | Department-2 | Dean-2  | Course-2  | 95    |

Failure to adhere to normalization principles can lead to various anomalies:

- Redundancy: e.g., Student-2 appearing twice.
- Modification anomaly: Changing information in one record without updating others.
- Deletion anomaly: Deleting one piece of information may result in the loss of other information.
- Insertion anomaly: Unable to insert information, for instance, if a student hasn't chosen a course.

### Normalization
The normalization theory addresses these anomalies.

Higher-level normal forms depend on lower-level ones, with 1NF being the lowest.

1. **First Normal Form (1NF):**
   - Attributes are indivisible.

2. **Second Normal Form (2NF):**
   - Every non-prime attribute is fully functionally dependent on the key.
   - Achieved through decomposition.

3. **Third Normal Form (3NF):**
   - Non-prime attributes do not transitively depend on the key.

---

## **137. Entity-Relationship (ER) Diagram**

Entity-Relationship diagrams consist of three components: entities, attributes, and relationships. They are used for conceptual design in relational database systems.

### Three Types of Entity Relationships

Three types of relationships exist: one-to-one, one-to-many, and many-to-many.

- For a one-to-many relationship from A to B, draw an arrow pointing to B.
- For a one-to-one relationship, draw two arrows.
- For a many-to-many relationship, draw two lines without arrows.

In the following diagram, Course and Student have a one-to-many relationship.

### Representing Repeated Relationships

If an entity appears multiple times in a relationship, connect it with as many lines as needed.

In the example below, a course's prerequisite relationship involves two Course entities: the first is the prerequisite, and the second is the subsequent course. Therefore, two lines represent this relationship.

### Multi-Directional Relationships

While a teacher can offer multiple courses and teach multiple students, for a specific student and course, only one teacher is involved, forming a ternary relationship.

### Representing Subclasses

Use a triangle and two lines to connect a class with its subclasses. Connect attributes and relationships related to the subclass to the subclass itself. Attributes and relationships related to both the superclass and subclass are connected to the superclass.

---
## **138. B+ Tree Principles**
### 1. Data Structure
B Tree refers to a Balanced Tree, which is a balanced search tree with all leaf nodes at the same level.

B+ Tree is implemented based on B Tree and sequential access pointers to leaf nodes. It inherits the balance property of B Tree and enhances the performance of range queries through sequential access pointers.

In B+ Tree, the keys in a node are non-decreasing from left to right. If a pointer has left and right adjacent keys, keyi and keyi+1, respectively, and is not null, then the pointer points to a node where all keys are greater than or equal to keyi and less than or equal to keyi+1.

### 2. Operations
During a search operation, start with the root node, perform a binary search to find a pointer containing the key, and recursively search in the node pointed to by that pointer. Continue this process until a leaf node is reached, then perform a binary search on the leaf node to find the corresponding data for the key.

Insert and delete operations may disrupt the balance of the tree, so after performing these operations, the tree needs to undergo split, merge, rotation, etc., to maintain balance.

### 3. Comparison with Red-Black Tree
Balanced trees like Red-Black Tree can also be used for indexing, but file systems and database systems commonly choose B+ Tree as the index structure because accessing disk data using B+ Tree is more efficient.

#### (i) Lower Tree Height of B+ Tree
The height h of a balanced tree (h) = O(h) = O(logdN), where d is the outdegree of each node. The outdegree of Red-Black Tree is 2, while B+ Tree typically has a much larger outdegree, making the height h of Red-Black Tree significantly larger than that of B+ Tree.

#### (ii) Disk Access Principles
Operating systems usually divide memory and disk into fixed-size blocks, each called a page. Data exchange between memory and disk occurs in units of pages. The size of an index node is set to the size of a page in the database system, ensuring that a single I/O operation can completely load a node.

If data is not in the same disk block, it usually requires moving the arm for seeking. The efficiency of arm movement is low due to its physical structure, increasing disk data retrieval time. B+ Tree has a lower tree height than Red-Black Tree, and the number of seeks is proportional to the tree height. Accessing data on the same disk block requires a short disk rotation time, making B+ Tree more suitable for disk data retrieval.

#### (iii) Disk Prefetching Feature
To reduce disk I/O operations, disks often do not strictly read on demand but prefetch during each read. During prefetching, the disk reads sequentially without seeking, requiring only a short disk rotation time. Utilizing the prefetching feature, adjacent nodes can also be preloaded.

## MySQL Index
Indexes are implemented at the storage engine level, not at the server level. Therefore, different storage engines have different types of indexes and implementations.

### 1. B+Tree Index
It is the default index type for most MySQL storage engines.

As it eliminates the need for full table scans, searching is much faster by only traversing the tree.

Due to the ordered nature of B+ Tree, it can be used not only for searching but also for sorting and grouping.

Multiple columns can be specified as index columns, collectively forming a key.

Applicable for full key-value, key-value range, and key-prefix searches. Key-prefix searches are only applicable for leftmost prefix searches. If the search is not performed in the order of the index columns, the index cannot be used.

InnoDB's B+Tree index is divided into the primary index and secondary index. The leaf node's data field of the primary index records complete data records, known as a clustered index. Since data rows cannot be stored in two different locations, a table can only have one clustered index.

The leaf node's data field of the secondary index records the primary key's values. Therefore, when using a secondary index for searching, it is necessary to first find the primary key value and then perform the search in the primary index.

### 2. Hash Index
A hash index allows O(1) time for searching but loses ordering:

- Cannot be used for sorting and grouping.
- Only supports exact searches and cannot be used for partial searches and range searches.

InnoDB storage engine has a special feature called "adaptive hash index." When a particular index value is used very frequently, it creates a hash index on top of the B+Tree index, giving B+Tree index some advantages of hash index, such as fast hash searches.

### 3. Full-Text Index
The MyISAM storage engine supports a full-text index for finding keywords in text rather than direct equality comparison.

The search condition uses MATCH AGAINST instead of the regular WHERE.

The full-text index is implemented using an inverted index, which maps keywords to their location in documents.

InnoDB storage engine started supporting full-text index from MySQL version 5.6.4.

### 4. Spatial Data Index
The MyISAM storage engine supports a spatial data index (R-Tree), used for storing geographic data. Spatial data indexing indexes data from all dimensions, enabling effective combination queries using any dimension.

GIS-related functions must be used to maintain data.

## Index Optimization
### 1. Independent Columns
During queries, indexed columns cannot be part of an expression or a function parameter; otherwise, the index cannot be used.

For example, the following query cannot use the index on the actor_id column:

```sql
SELECT actor_id FROM sakila.actor WHERE actor_id + 1 = 5;
```

### 2. Multi-column Index

When multiple columns are required as conditions for a query, using a multi-column index performs better than using multiple single-column indexes. For example, in the following statement, it is preferable to set `actor_id` and `film_id` as a multi-column index.
```sql
SELECT film_id, actor_ id FROM sakila.film_actor
WHERE actor_id = 1 AND film_id = 1;
```

### 3. Order of Index Columns

Place the most selective index column at the beginning.

Index selectivity refers to the ratio of the number of unique index values to the total number of records. The maximum value is 1, where each record has a unique corresponding index. The higher the selectivity, the higher the distinctiveness of each record, leading to improved query efficiency.

In the example below, the selectivity of `customer_id` is higher than that of `staff_id`, so it's better to place the `customer_id` column at the front of the multi-column index.
```sql
SELECT COUNT(DISTINCT staff_id)/COUNT(*) AS staff_id_selectivity,
COUNT(DISTINCT customer_id)/COUNT(*) AS customer_id_selectivity,
COUNT(*)
FROM payment;
```
```sql
   staff_id_selectivity: 0.0001
customer_id_selectivity: 0.0373
               COUNT(*): 16049
```

### 4. Prefix Index

For columns of types BLOB, TEXT, and VARCHAR, it is necessary to use a prefix index, indexing only the starting part of the characters.

The choice of prefix length depends on the index selectivity.

### 5. Covering Index

An index that includes values for all fields needed for a query.

It has the following advantages:

- Indexes are usually much smaller than the size of data rows, reducing data access significantly.
- Some storage engines (such as MyISAM) only cache indexes in memory, while data relies on the operating system for caching. Therefore, accessing only the index can avoid system calls (which are usually time-consuming).
- For the InnoDB engine, if auxiliary indexes can cover the query, there is no need to access the primary index.

### Advantages of Indexing

- Greatly reduces the number of data rows the server needs to scan.
- Helps the server avoid sorting and grouping, as well as avoiding the creation of temporary tables (B+Tree indexes are ordered and can be used for ORDER BY and GROUP BY operations. Temporary tables are mainly created during sorting and grouping, which is not required if there is no need for sorting and grouping).
- Converts random I/O to sequential I/O (B+Tree indexes are ordered, storing adjacent data together).

### Conditions for Using Indexes

- For very small tables, in most cases, a simple full table scan is more efficient than creating an index.
- For medium to large tables, indexes are very effective.
- However, for very large tables, the cost of creating and maintaining indexes will increase. In such cases, a technology that can directly distinguish a set of data needed for a query, rather than matching record by record, should be used, such as partitioning techniques.

---

### **139.Query Performance Optimization**

### Analyzing with Explain
Explain is used to analyze SELECT queries, and developers can optimize queries by analyzing the Explain results.

Key fields to consider:

- `select_type`: Query type, including simple queries, union queries, subqueries, etc.
- `key`: Index used
- `rows`: Number of rows scanned

### Optimizing Data Access
1. Reduce the amount of requested data
   - Return only necessary columns: Avoid using `SELECT *` statements.
   - Return only necessary rows: Use the LIMIT statement to restrict the returned data.
   - Cache duplicate query data: Caching can prevent queries in the database, especially when the data to be queried is frequently repeated.

2. Reduce the number of rows scanned on the server side
   - The most effective way is to use indexes to cover the query.

### Refactoring Query Methods
1. Splitting large queries
   - If a large query is executed all at once, it may lock a lot of data, fill up the entire transaction log, deplete system resources, and block many small but important queries.
   ```sql
   DELETE FROM messages WHERE created_at < DATE_SUB(NOW(), INTERVAL 3 MONTH);

### Decomposing Large Join Queries

Decompose a large join query into single-table queries for each table and then associate them in the application. The benefits include:

- **More Efficient Caching**: For join queries, if one table changes, the entire query cache cannot be used. However, after decomposition, the caches of single-table queries can still be utilized, even if one table changes.

- **Reduced Redundancy in Record Queries**.

- **Reduced Lock Contention**.

- **Easier Database Splitting in the Application Layer for Better Performance and Scalability**.

- **Potential Improvement in Query Efficiency**: For example, using `IN()` instead of join queries allows MySQL to query in ID order, which might be more efficient than random joins.

```sql
SELECT * FROM tag
JOIN tag_post ON tag_post.tag_id=tag.id
JOIN post ON tag_post.post_id=post.id
WHERE tag.tag='mysql';
```
---
### **140. Storage Engines**

### InnoDB

InnoDB is MySQL's default transactional storage engine. It should be considered only when features not supported by InnoDB are needed.

- Implements four standard isolation levels, with the default level being Repeatable Read.
- Uses Multi-Version Concurrency Control (MVCC) + Next-Key Locking to prevent phantom reads under Repeatable Read isolation.
- The primary index is a clustered index, saving data in the index and significantly improving query performance by avoiding direct disk reads.
- Internal optimizations include predictable reads when fetching data from the disk, automatically created adaptive hash indexes for faster reads, and an insert buffer to speed up insert operations.
- Supports true online hot backup. Other storage engines don't support online hot backups, requiring a halt to write operations on all tables to achieve a consistent view, which may also mean stopping reads in mixed read-write scenarios.

### MyISAM

MyISAM is designed for simplicity, storing data in a compact format. It can still be used for read-only data, small tables, or situations where repair operations are acceptable.

- Provides various features, including compressed tables and spatial data indexing.
- Does not support transactions.
- Lacks row-level locking; it only supports table-level locking. Reads impose shared locks on all tables that need to be read, while writes impose exclusive locks on the entire table. Concurrent inserts (CONCURRENT INSERT) are allowed even during table reads.
- Can perform manual or automatic checks and repair operations. Unlike transaction recovery and crash recovery, repair operations may result in some data loss and are slow.
- If the DELAY_KEY_WRITE option is specified, modifications to index data are not immediately written to disk after each modification. Instead, changes are written to an in-memory key buffer and are only flushed to disk when clearing the key buffer or closing the table. While this can significantly improve write performance, it may lead to index corruption in the event of a database or host crash, requiring repair operations.

### Comparison

- **Transaction Support**: InnoDB supports transactions with Commit and Rollback statements, while MyISAM does not.
  
- **Concurrency**: MyISAM supports table-level locking, whereas InnoDB supports both table-level and row-level locking.

- **Foreign Keys**: InnoDB supports foreign keys; MyISAM does not.

- **Backup**: InnoDB supports online hot backups, whereas MyISAM does not.

- **Crash Recovery**: MyISAM has a higher probability of corruption after a crash compared to InnoDB.

---

### **141. Data Types**

### Integer Types
- **TINYINT, SMALLINT, MEDIUMINT, INT, BIGINT:** These use 8, 16, 24, 32, and 64 bits of storage space, and generally, smaller columns are preferred.
- The number in `INT(11)` only specifies the number of characters to display in the interactive tool and has no significance for storage and computation.

### Floating-Point Types
- **FLOAT and DOUBLE:** These are floating-point types.
- **DECIMAL:** This is a high-precision decimal type. CPUs natively support floating-point operations but do not support DECIMAL type calculations, making DECIMAL calculations more costly than floating-point types.
- All three types, FLOAT, DOUBLE, and DECIMAL, can specify column width. For example, `DECIMAL(18, 9)` means a total of 18 digits, with 9 digits for the decimal part and the remaining 9 digits for the integer part.

### String Types
- Two main types: **CHAR** and **VARCHAR**, one fixed-length and the other variable-length.
- VARCHAR can save space as it only stores necessary content. However, during UPDATE operations, rows may become longer than the original, requiring additional operations. MyISAM stores rows in different fragments, while InnoDB may need to split pages to fit rows within a page.
- When storing and retrieving, VARCHAR retains trailing spaces, while CHAR removes trailing spaces.

### Time and Date Types
MySQL provides two similar date-time types: **DATETIME** and **TIMESTAMP**.

1. **DATETIME**
   - Can store dates and times from the year 1000 to 9999 with second precision, using 8 bytes of storage.
   - Timezone-independent.
   - By default, MySQL displays DATETIME values in a sortable, unambiguous format, such as "2008-01-16 22:37:08".

2. **TIMESTAMP**
   - Similar to UNIX timestamps, saving seconds since January 1, 1970 (Greenwich Mean Time), using 4 bytes. It can represent times from 1970 to 2038.
   - Timezone-dependent; the same timestamp represents different times in different time zones.
   - MySQL provides `FROM_UNIXTIME()` to convert UNIX timestamps to dates and `UNIX_TIMESTAMP()` to convert dates to UNIX timestamps.
   - By default, if no value is specified for a TIMESTAMP column during insertion, it is set to the current time.
   - TIMESTAMP is preferable as it is more space-efficient than DATETIME.

---

### **142. Data Splitting**

### Horizontal Splitting (Sharding)
Horizontal splitting, also known as Sharding, involves dividing records from the same table into multiple tables with identical structures.

As data in a table continues to grow, Sharding becomes a necessary choice. It distributes data across different nodes in a cluster, alleviating the pressure on a single database.

### Vertical Splitting
Vertical splitting involves dividing a table into multiple tables based on columns. It is usually done based on the intensity of relationships between columns. Vertical splitting can also segregate frequently used columns from rarely used ones into different tables.

At the database level, vertical splitting can deploy tables with varying density levels into different databases. For example, an e-commerce database could be vertically split into product and user databases.

### Sharding Strategies
1. **Hash Modulo:** hash(key) % N
2. **Range:** Can be ID ranges or time ranges.
3. **Mapping Table:** Use a separate database to store mapping relationships.

### Issues with Sharding
1. **Transaction Issues:**
   - Resolve using distributed transaction mechanisms, such as the XA interface.

2. **Joins:**
   - Decompose original joins into multiple single-table queries and perform joins in the user's program.

3. **ID Uniqueness:**
   - Use globally unique IDs (GUID).
   - Assign an ID range for each shard.
   - Implement a distributed ID generator (e.g., Twitter's Snowflake algorithm).

---
### **143. Replication**

### Master-Slave Replication
Master-Slave replication involves three main threads: the binlog thread, I/O thread, and SQL thread.

- **Binlog Thread:** Responsible for writing data changes from the master server to the binary log.
- **I/O Thread:** Responsible for reading the binary log from the master server and writing it to the slave server's relay log.
- **SQL Thread:** Responsible for reading the relay log, parsing executed data changes from the master server, and replaying them on the slave server.

### Read-Write Separation

Read-write separation involves the master server handling write operations and high real-time requirement reads, while the slave server handles read operations.

The performance benefits of read-write separation are:

- Separate handling of reads and writes by master and slave servers greatly alleviates lock contention.
- The slave server can use MyISAM, improving query performance and saving system overhead.
- Increased redundancy enhances availability.

Read-write separation is commonly implemented using proxy servers. The proxy server receives read and write requests from the application layer and decides which server to forward them to.

---

# Extra questions

### **144. Basic Features**

## 1. Concurrency
Concurrency refers to the ability of multiple programs to run simultaneously within a certain period, while parallelism implies the execution of multiple instructions at the same moment.

Parallelism requires hardware support, such as multiple pipelines, multi-core processors, or distributed computing systems.

Operating systems enable concurrent execution of programs by introducing processes and threads.

## 2. Sharing
Sharing implies that resources in the system can be utilized by multiple concurrent processes.

There are two sharing modes: mutual exclusion and simultaneous sharing.

Mutual exclusion involves critical resources, like printers, where only one process is allowed access at any given time. Synchronization mechanisms are employed to achieve mutually exclusive access.

## 3. Virtualization
Virtualization technology transforms a physical entity into multiple logical entities.

There are mainly two virtualization techniques: time-multiplexing (time-sharing) and space-multiplexing (space-sharing).

Time-multiplexing allows multiple processes to concurrently execute on the same processor by giving each process a time slice. This enables quick switching between processes.

Virtual memory utilizes space-multiplexing, abstracting physical memory into address spaces. Each process has its own address space, and pages of the address space are mapped to physical memory. Not all pages need to reside in physical memory, and when a page not in physical memory is accessed, a page replacement algorithm is executed to bring that page into memory.

## 4. Asynchrony
Asynchrony means that a process does not complete all at once but progresses intermittently at an unpredictable pace.

---

### **145. Deadlock Necessary Conditions**

1. **Mutual Exclusion**
   - Each resource is either already allocated to a process or available.

2. **Hold and Wait**
   - A process holding resources can request additional resources.

3. **No Preemption**
   - Resources allocated to a process cannot be forcefully taken away; they can only be released explicitly by the process holding them.

4. **Circular Wait**
   - Two or more processes form a circular chain, with each process waiting for the next one to release resources.

### **146. Deadlock Avoidance**

Preventing deadlock during program execution.

1. **Safe State**
   - Example: Consider the state shown in figure 'a' with columns representing 'Has' (resources held), 'Max' (maximum resources needed), and 'Free' (available resources). Starting from figure 'a', allocate all resources needed by process B (figure 'b'), release B, making 'Free' 5 (figure 'c'). Repeat for processes C and A, ensuring each process can complete successfully. Thus, the state shown in figure 'a' is considered safe.

   **Definition:** A state is safe if no deadlock occurs, and even if all processes suddenly request their maximum resources, there exists a scheduling sequence that allows each process to finish.

   Safety state detection is similar to deadlock detection, as a safe state must not lead to a deadlock. The Banker's algorithm, presented next, is similar to deadlock detection and serves as a reference.

2. **Banker's Algorithm for a Single Resource**
   - An algorithm used by a small-town banker who promised loan amounts to clients. The goal is to determine if fulfilling a request would lead to an unsafe state; if yes, the request is denied.

3. **Banker's Algorithm for Multiple Resources**
   - The figure displays five processes and four resources. Left matrix indicates allocated resources, right matrix indicates needed resources. 'E', 'P', and 'A' on the right represent total, allocated, and available resources, respectively (as vectors).

   Safety state check algorithm:
   - Look for a row in the right matrix less than or equal to vector 'A'. If none is found, the system is entering a deadlock; the state is unsafe.
   - If found, mark the process as terminated, and add its allocated resources to 'A'.
   - Repeat the above steps until all processes are marked as terminated; the state is then considered safe.

   If a state is not safe, requests leading to that state should be rejected.

---

### **147. MySQL Storage Engines**

### InnoDB

InnoDB is the default transactional storage engine for MySQL. Other storage engines are considered only when features unsupported by InnoDB are required.

- Implements four standard isolation levels, with the default being Repeatable Read. Under Repeatable Read, it uses Multi-Version Concurrency Control (MVCC) and Next-Key Locking to prevent phantom reads.
  
- The primary index is a clustered index, storing data in the index, avoiding direct disk reads, thereby significantly improving query performance.

- InnoDB incorporates various optimizations, including predictable reads when fetching data from disk, automatically created adaptive hash indexes for faster reads, and an insert buffer to speed up insertion operations.

- Supports true online hot backups. Unlike other storage engines that do not support online hot backups, achieving a consistent view requires stopping write operations on all tables, which, in a mixed read-write scenario, may mean stopping reads as well.

### MyISAM

MyISAM is known for its simplicity, storing data in a compact format. It is suitable for read-only data, small tables, or scenarios tolerant of repair operations.

- Offers a range of features, including compressed tables and spatial data indexes.

- Lacks transaction support.

- Does not support row-level locks; only table-level locks are available. Reads acquire shared locks on all required tables, and writes acquire exclusive locks on tables. However, concurrent inserts (CONCURRENT INSERT) are allowed while reading is in progress.

- Allows manual or automatic execution of check and repair operations. Unlike transaction recovery or crash recovery, these operations may result in some data loss and are notably slow.

- When the DELAY_KEY_WRITE option is specified, index modifications are buffered in memory rather than immediately written to disk after each modification. While this significantly improves write performance, it may lead to index corruption in the event of a database or host crash, requiring repair operations.

### Comparison

- **Transaction Support:**
  - InnoDB is transactional, supporting Commit and Rollback statements.
  - MyISAM lacks transaction support.

- **Concurrency:**
  - MyISAM supports only table-level locks.
  - InnoDB supports both table-level and row-level locks.

- **Foreign Key Support:**
  - InnoDB supports foreign keys.
  - MyISAM does not support foreign keys.

- **Backup:**
  - InnoDB supports online hot backups.
  - MyISAM does not have built-in support for online hot backups.

- **Crash Recovery:**
  - MyISAM has a higher probability of data corruption and slower recovery after a crash compared to InnoDB.

- **Other Features:**
  - MyISAM supports compressed tables and spatial data indexes.

