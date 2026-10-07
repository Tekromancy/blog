---
title: The Iterator
description: Traverse a captured array of enemy souls seamlessly.
type: vyper
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Necromancy // Soul Traversal"
formula: |2
  # pragma version ^0.3.7
  
  soul_cache: public(DynArray[address, 100])
  
  @external
  def capture_soul(target: address):
      self.soul_cache.append(target)
  
  # Vyper natively supports iteration over arrays using `for item in list`,
  # effectively integrating the Iterator pattern at a language level.
  
  @external
  def drain_all_souls() -> uint256:
      total_mana: uint256 = 0
      
      # The Iterator in action: seamlessly fetching the next item
      for soul in self.soul_cache:
          total_mana += self._drain(soul)
          
      return total_mana
      
  @internal
  def _drain(target: address) -> uint256:
      # simulated drain logic
      return 10
tags: [behavioral, iterator, vyper, loop]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The **Iterator** pattern abstracts the underlying complexities of data structures, allowing an adept to traverse collections sequentially without knowing their inner topology. In Vyper, this arcane concept is woven directly into the syntax via the `for ... in` construct, making the sequential draining of trapped souls as natural as drawing breath.
