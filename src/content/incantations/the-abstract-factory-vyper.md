---
title: The Abstract Factory
description: Conjure families of related serpent artifacts through a unified interface.
type: vyper
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Artifact Forging"
formula: |2
  # pragma version ^0.3.7
  
  # Interface for the abstract Serpent Factory
  interface ISerpentFactory:
      def create_venom() -> address: nonpayable
      def create_scales() -> address: nonpayable
  
  # Suppose we have ViperFactory and CobraFactory deployed at specific addresses
  
  factory_address: public(address)
  
  @external
  def __init__(_factory: address):
      self.factory_address = _factory
  
  @external
  def equip_serpent():
      # The client doesn't need to know if it's Viper or Cobra venom,
      # the arcane factory handles the manifestation.
      venom_addr: address = ISerpentFactory(self.factory_address).create_venom()
      scales_addr: address = ISerpentFactory(self.factory_address).create_scales()
      
      # Execute magical bindings here...
tags: [creational, abstract-factory, vyper, serpent-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

In the shadowed cyber-crypts, the **Abstract Factory** allows an adept to summon entire families of related serpentine constructs without binding their spellwork to concrete implementation addresses. Whether forging a stealthy Viper-class assassin drone or a heavily-armored Cobra-class guardian, the Abstract Factory acts as the unified ether-forge.
