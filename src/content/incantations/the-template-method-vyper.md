---
title: The Template Method
description: Define the unyielding skeleton of a ritual, letting subclasses fill in the gory details.
type: vyper
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Ritual Frameworks"
formula: |2
  # pragma version ^0.3.7
  
  # Vyper doesn't have traditional inheritance, so we use a base 
  # orchestrator contract that calls a specialized implementation module.
  
  interface ISerpentSubclass:
      def prepare_venom() -> uint256: nonpayable
      def select_target() -> address: nonpayable
  
  subclass: public(address)
  
  @external
  def __init__(_subclass: address):
      self.subclass = _subclass
  
  @external
  def execute_attack_ritual():
      # The Template Method: The skeleton of the algorithm is fixed here.
      # Step 1: Pre-attack hiss
      self._hiss()
      
      # Step 2: Delegate to the subclass for specific venom prep
      venom_yield: uint256 = ISerpentSubclass(self.subclass).prepare_venom()
      
      # Step 3: Delegate to subclass for target selection
      target: address = ISerpentSubclass(self.subclass).select_target()
      
      # Step 4: Final execution
      self._strike(target, venom_yield)
      
  @internal
  def _hiss():
      pass
      
  @internal
  def _strike(target: address, venom: uint256):
      pass
tags: [behavioral, template-method, vyper, skeleton]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The **Template Method** dictates the unbreakable laws of the ritual. The orchestration contract defines the exact chronological steps of an attack—the hiss, the venom preparation, the targeting, and the strike. However, it leaves the specific implementation of *how* to prepare the venom or *who* to target to interchangeable sub-modules. The skeleton is rigid, but the flesh is malleable.
