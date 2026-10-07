---
title: The Adapter
description: Translate arcane signals so incompatible serpent breeds can communicate.
type: vyper
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Signal Shifting"
formula: |2
  # pragma version ^0.3.7
  
  # The Target Interface expected by the modern hive
  interface INeoSerpent:
      def digital_strike(target: address) -> bool: nonpayable
  
  # The Adaptee: An ancient, legacy smart contract
  interface ILegacyWyrm:
      def physicalBite(target_id: uint256) -> uint256: nonpayable
  
  legacy_wyrm: public(address)
  
  @external
  def __init__(_wyrm: address):
      self.legacy_wyrm = _wyrm
  
  @external
  def digital_strike(target: address) -> bool:
      # Translate the modern request into the archaic dialect
      target_id: uint256 = convert(target, uint256)
      
      # Invoke the ancient Wyrm
      damage: uint256 = ILegacyWyrm(self.legacy_wyrm).physicalBite(target_id)
      
      return damage > 0
tags: [structural, adapter, vyper, translation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When modern cyber-covens attempt to commune with the ancient wyrms sleeping in the Genesis block, their signal formats clash. The **Adapter** contract acts as a Rosetta Stone, wrapping the archaic `physicalBite` functions in the sleek `digital_strike` interface required by the modern Serpent Swarm, seamlessly bridging the aeons.
