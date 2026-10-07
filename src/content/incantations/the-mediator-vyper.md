---
title: The Mediator
description: A central nexus orchestrating communication between disparate snake cults.
type: vyper
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Nexus Whispers"
formula: |2
  # pragma version ^0.3.7
  
  interface ICultNode:
      def receive_whisper(sender: address, message: bytes32): nonpayable
  
  registered_nodes: public(HashMap[address, bool])
  
  @external
  def register():
      self.registered_nodes[msg.sender] = True
  
  @external
  def broadcast(message: bytes32, target: address):
      assert self.registered_nodes[msg.sender], "Unregistered cultist"
      assert self.registered_nodes[target], "Target not found in nexus"
      
      # The Mediator routes the message, preventing nodes from needing
      # direct connections to one another.
      ICultNode(target).receive_whisper(msg.sender, message)
tags: [behavioral, mediator, vyper, routing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When the number of Serpent Cults grows too large, requiring direct point-to-point connections between them creates an unmanageable web of chaotic transactions. The **Mediator** establishes a central Nexus. Nodes no longer speak directly; instead, they whisper to the Mediator, which enforces registry rules and routes the arcane data safely to its destination, untangling the spaghetti of the cyber-sprawl.
