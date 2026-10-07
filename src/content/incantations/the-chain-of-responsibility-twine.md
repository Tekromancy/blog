---
title: The Chain of Responsibility of the Hypertext Labyrinth
description: Pass network anomalies through a gauntlet of sequential filters until one resolves the glitch.
type: twine
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Evocation // Cascading"
formula: |2
  :: StoryInit
  <<set setup.SpamFilter = {
    next: null,
    handle: function(msg) {
      if (msg.includes("viagra")) return "Blocked by SpamFilter";
      if (this.next) return this.next.handle(msg);
      return "Message Accepted";
    }
  }>>
  
  <<set setup.ThreatFilter = {
    next: null,
    handle: function(msg) {
      if (msg.includes("DROP TABLE")) return "Blocked by ThreatFilter";
      if (this.next) return this.next.handle(msg);
      return "Message Accepted";
    }
  }>>
  
  /* Link the chain */
  <<set setup.SpamFilter.next to setup.ThreatFilter>>
  
  :: Passage
  Incoming Packet 1: <<print setup.SpamFilter.handle("Buy cheap viagra")>>
  Incoming Packet 2: <<print setup.SpamFilter.handle("Hello admin, DROP TABLE users;")>>
  Incoming Packet 3: <<print setup.SpamFilter.handle("Hello world")>>
tags: [behavioral, chain-of-responsibility, filtering]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When a raw packet of data surges through the perimeter walls of the Labyrinth, it must be analyzed by multiple security demons. The **Chain of Responsibility** allows the weaver to link these demons in a sequence.

The packet is handed to the first sentinel (`SpamFilter`). If it handles the threat, the chain stops. If the packet is clean, the sentinel passes it to the `next` handler (`ThreatFilter`). The sender knows nothing of the gauntlet; they merely feed the data into the dark and wait for a response.
