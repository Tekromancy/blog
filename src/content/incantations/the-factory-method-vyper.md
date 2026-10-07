---
title: The Factory Method
description: Defer the exact manifestation of a serpent minion to subclasses or factory contracts.
type: vyper
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Minion Binding"
formula: |2
  # pragma version ^0.3.7
  
  interface ISerpentMinion:
      def strike() -> uint256: nonpayable
  
  # A blueprint for a factory method in Vyper
  # Different factory contracts implement `summon_minion`
  
  @external
  def summon_minion() -> address:
      # In this specific concrete factory (e.g., PythonFactory),
      # we deploy a Python minion and return its address.
      # `create_forwarder_to` is often used in Vyper for factory patterns.
      
      # puppet_address: address = create_forwarder_to(MINION_TEMPLATE)
      # return puppet_address
      return self # Placeholder for actual proxy address
tags: [creational, factory-method, vyper, minion]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The **Factory Method** provides an arcane interface for creating a minion, but allows the exact ether-blueprint (the contract template) to be determined by the specific factory node invoked. In the dark web of Serpent Smart Contracts, it allows the overarching hive-mind to spawn specialized hunters on demand.
