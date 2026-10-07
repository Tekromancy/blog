---
title: The Bridge
description: Decouple the spirit of the serpent from its physical manifestation.
type: vyper
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Astral Projection"
formula: |2
  # pragma version ^0.3.7
  
  interface ISerpentBody:
      def slither(distance: uint256): nonpayable
      def attack(power: uint256): nonpayable
  
  # The Abstraction: The Serpent Spirit
  body_contract: public(address)
  spirit_level: public(uint256)
  
  @external
  def __init__(_body: address, _level: uint256):
      self.body_contract = _body
      self.spirit_level = _level
  
  @external
  def hunt(distance: uint256):
      # The spirit dictates the strategy, the body executes
      ISerpentBody(self.body_contract).slither(distance)
      ISerpentBody(self.body_contract).attack(self.spirit_level * 10)
      
  @external
  def possess_new_body(_new_body: address):
      self.body_contract = _new_body
tags: [structural, bridge, vyper, astral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The **Bridge** pattern severs the heavy chains between abstraction (the Serpent's mind/spirit) and implementation (the physical, on-chain mechanics of its body). A Cyber-Mage can hot-swap the underlying body contract without altering the high-level hunting logic of the Spirit, allowing the Serpent to shed its skin and slip into a new, optimized chassis whenever gas prices demand it.
