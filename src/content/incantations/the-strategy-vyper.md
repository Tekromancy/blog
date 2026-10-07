---
title: The Strategy
description: Hot-swap the hunting algorithm of the cyber-serpent based on battlefield conditions.
type: vyper
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Tactical Shifting"
formula: |2
  # pragma version ^0.3.7
  
  interface IHuntingStrategy:
      def calculate_approach(target_defense: uint256) -> uint256: view
  
  current_strategy: public(address)
  
  @external
  def __init__(_strategy: address):
      self.current_strategy = _strategy
  
  @external
  def set_strategy(_new_strategy: address):
      self.current_strategy = _new_strategy
  
  @external
  @view
  def hunt(target_defense: uint256) -> uint256:
      # Delegate the complex calculation to the selected strategy module
      return IHuntingStrategy(self.current_strategy).calculate_approach(target_defense)
tags: [behavioral, strategy, vyper, tactics]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The **Strategy** pattern embraces fluidity. A Cyber-Serpent shouldn't be hardcoded to use only brute-force constrictions or stealth venom-strikes. By isolating the algorithm into separate interchangeable Strategy contracts, the Over-mind can hot-swap the serpent's hunting tactics in real-time. If the enemy deploys heavy shielding, switch the strategy pointer to the Acid-Spit module, bypassing the defense effortlessly.
