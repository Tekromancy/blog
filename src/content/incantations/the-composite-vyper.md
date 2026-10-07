---
title: The Composite
description: Treat individual serpents and swarms of serpents through the same command interface.
type: vyper
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Swarm Mechanics"
formula: |2
  # pragma version ^0.3.7
  
  # In Vyper, dynamic arrays of contract addresses can act as a composite.
  
  interface ISerpentEntity:
      def get_venom_yield() -> uint256: view
  
  # A composite of many serpents
  brood: public(DynArray[address, 100])
  
  @external
  def add_entity(_entity: address):
      self.brood.append(_entity)
  
  @external
  @view
  def get_venom_yield() -> uint256:
      total_yield: uint256 = 0
      for entity in self.brood:
          total_yield += ISerpentEntity(entity).get_venom_yield()
      return total_yield
tags: [structural, composite, vyper, swarm]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The **Composite** pattern creates a fractal illusion: a single serpent and an entire brood of thousands are addressed using the exact same arcane frequency. When the Over-mind queries the swarm's total power, the composite node iterates through its fractal tree of sub-swarms and individual serpents, aggregating their venom-yield into a single, terrifying metric.
