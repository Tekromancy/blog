---
title: "The Chain of Responsibility: The Cascading Relays"
description: "Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request."
type: alloy
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Evocation // Cascade-Routing"
formula: |2
  abstract sig RelayNode {
    nextNode: lone RelayNode,
    canProcess: set DataPacket
  }
  
  sig DataPacket {}
  
  fact "Relay Chains Must Not Loop" {
    no r: RelayNode | r in r.^nextNode
  }
  
  pred process_packet[start: RelayNode, p: DataPacket] {
    p in start.canProcess or 
    (some start.nextNode and p in start.nextNode.canProcess) // Simplified cascade
  }
  
  run process_packet for 4
tags: [behavioral, chain of responsibility, routing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Chain of Responsibility: The Cascading Relays

In the cyber-arcane networks, a `DataPacket` bounces through `RelayNode`s until handled. Alloy ensures via the `^` transitive closure that no chain loops back on itself, preventing an infinite storm of unchecked logic. 
