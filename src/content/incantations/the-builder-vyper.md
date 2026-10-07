---
title: The Builder
description: Construct complex serpent golems step-by-step.
type: vyper
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Golemancy"
formula: |2
  # pragma version ^0.3.7
  
  struct SerpentGolem:
      head_type: String[32]
      body_length: uint256
      venom_potency: uint256
      is_awakened: bool
  
  current_golem: public(SerpentGolem)
  
  @external
  def start_ritual():
      self.current_golem = SerpentGolem({
          head_type: "",
          body_length: 0,
          venom_potency: 0,
          is_awakened: False
      })
  
  @external
  def attach_head(_head: String[32]):
      self.current_golem.head_type = _head
  
  @external
  def elongate_body(_length: uint256):
      self.current_golem.body_length = _length
  
  @external
  def infuse_venom(_potency: uint256):
      self.current_golem.venom_potency = _potency
  
  @external
  def awaken() -> SerpentGolem:
      self.current_golem.is_awakened = True
      return self.current_golem
tags: [creational, builder, vyper, golemancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The **Builder** ritual isolates the complex process of assembling a Serpent Golem from its final awakening. Instead of passing a multitude of chaotic parameters into a single conjuration function, the Cyber-Mage meticulously weaves the golem's form, step-by-step, until the precise configuration is achieved and the serpent is ready to strike.
