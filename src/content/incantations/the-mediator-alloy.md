---
title: "The Mediator: The Nexus Protocol"
description: "Define an object that encapsulates how a set of objects interact."
type: alloy
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Nexus-Binding"
formula: |2
  sig CyberAgent {
    hub: one NexusHub
  }
  
  sig NexusHub {
    operatives: set CyberAgent
  }
  
  fact "Bidirectional Binding" {
    all a: CyberAgent | a in a.hub.operatives
    all h: NexusHub | all a: h.operatives | a.hub = h
  }
  
  run {} for 3
tags: [behavioral, mediator, coordination]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Mediator: The Nexus Protocol

Agents do not speak directly to agents; they synchronize via the `NexusHub`. In Alloy, we enforce this centralized interaction by verifying the bidirectional integrity of the relations: an agent's hub must recognize the agent as an operative, ensuring total topological consistency.
