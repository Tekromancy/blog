---
title: The Prototype
description: Clone existing serpent constructs rather than re-forging them from scratch.
type: vyper
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Cloning"
formula: |2
  # pragma version ^0.3.7
  
  # The Prototype contract acts as a base implementation.
  # Other contracts can clone it using minimal proxy forwarders.
  
  venom_rating: public(uint256)
  owner: public(address)
  
  @external
  def initialize(_owner: address, _venom: uint256):
      assert self.owner == empty(address), "Already initialized by the Over-mind"
      self.owner = _owner
      self.venom_rating = _venom
  
  @external
  def strike() -> uint256:
      return self.venom_rating * 2
  
  # To clone this Prototype, a factory would use:
  # clone_addr: address = create_forwarder_to(prototype_address)
  # Prototype(clone_addr).initialize(msg.sender, 100)
tags: [creational, prototype, vyper, clones]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the on-chain realm, deploying full contract bytes repeatedly is a waste of precious gas and mana. The **Prototype** pattern—often manifested as the EIP-1167 Minimal Proxy—allows a Cyber-Mage to lay down a single, perfect master Serpent. Subsequent summonings merely mirror this Prototype, awakening instantly and drawing upon the master's ancient wisdom at a fraction of the cost.
