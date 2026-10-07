---
title: The Flyweight
description: Conserve mana by sharing intrinsic state across thousands of serpent drones.
type: vyper
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Mana Conservation"
formula: |2
  # pragma version ^0.3.7
  
  # The intrinsic, shared properties of a specific serpent breed
  struct BreedData:
      max_health: uint256
      venom_type: String[32]
      scale_hardness: uint256
  
  # A registry holding the shared Flyweights
  breed_registry: public(HashMap[uint256, BreedData])
  
  # The extrinsic state (unique to each drone)
  struct Drone:
      breed_id: uint256
      current_health: uint256
      x_coord: uint256
      y_coord: uint256
  
  swarm: public(HashMap[uint256, Drone])
  
  @external
  def register_breed(id: uint256, _hp: uint256, _venom: String[32], _hardness: uint256):
      self.breed_registry[id] = BreedData({
          max_health: _hp,
          venom_type: _venom,
          scale_hardness: _hardness
      })
      
  @external
  def spawn_drone(drone_id: uint256, breed_id: uint256, x: uint256, y: uint256):
      # The drone only stores the ID linking it to the heavy data, saving gas
      base_hp: uint256 = self.breed_registry[breed_id].max_health
      self.swarm[drone_id] = Drone({
          breed_id: breed_id,
          current_health: base_hp,
          x_coord: x,
          y_coord: y
      })
tags: [structural, flyweight, vyper, optimization]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The **Flyweight** spell is a masterclass in on-chain optimization. When spawning a swarm of thousands of cyber-serpents, storing their base stats redundantly would drain the caster's ether reserves (gas). By extracting the intrinsic, immutable traits into a shared Breed Registry, each individual drone need only carry a lightweight sigil (ID) and its current, mutable position, achieving a vast legion with minimal footprint.
