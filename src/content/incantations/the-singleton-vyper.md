---
title: The Singleton
description: A central registry ensuring only one true Serpent Over-mind exists.
type: vyper
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Warding"
formula: |2
  # pragma version ^0.3.7
  
  # While smart contracts are inherently singletons per address,
  # we can enforce logic that no other instances are acknowledged
  # or by keeping a centralized registry.
  
  is_initialized: public(bool)
  over_mind: public(address)
  
  @external
  def __init__():
      self.is_initialized = True
      self.over_mind = msg.sender
  
  @external
  def decree(_command: String[64]):
      assert msg.sender == self.over_mind, "Only the Over-mind speaks"
      # Execute singular global state changes
      pass
tags: [creational, singleton, vyper, over-mind]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The **Singleton** ensures that only a single, unified source of truth reigns over the networked serpent-broods. In the context of Smart Contracts, a specific deployed address naturally acts as a Singleton, yet careful runic locks must be applied to ensure its initialization only occurs once, preventing usurpers from rewriting the primordial state of the Serpent Over-mind.
