---
title: The Chain of Responsibility
description: Pass a decree through a hierarchy of serpent guardians until one claims it.
type: vyper
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Enchantment // Command Routing"
formula: |2
  # pragma version ^0.3.7
  
  interface IGuardian:
      def handle_intrusion(threat_level: uint256) -> bool: nonpayable
  
  next_guardian: public(address)
  my_threshold: public(uint256)
  
  @external
  def __init__(_threshold: uint256, _next: address):
      self.my_threshold = _threshold
      self.next_guardian = _next
  
  @external
  def handle_intrusion(threat_level: uint256) -> bool:
      if threat_level <= self.my_threshold:
          # This guardian handles it
          self.eliminate_threat()
          return True
      elif self.next_guardian != empty(address):
          # Threat too high, pass to the next node in the chain
          return IGuardian(self.next_guardian).handle_intrusion(threat_level)
      else:
          # End of the chain, threat unhandled!
          return False
  
  @internal
  def eliminate_threat():
      # Arcane logic to neutralize the target
      pass
tags: [behavioral, chain-of-responsibility, vyper, hierarchy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In a layered defense matrix, the **Chain of Responsibility** allows a distress signal to cascade through a series of guardians. A minor disturbance is crushed immediately by the Outer Coils. If the threat level is too great, the request is seamlessly handed up the hierarchy to the Inner Sanctum, until a serpent with a sufficient threshold consumes the intrusion.
