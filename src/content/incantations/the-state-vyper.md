---
title: The State
description: Morph the serpent's behavior depending on its current lifecycle phase.
type: vyper
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Phase Shifting"
formula: |2
  # pragma version ^0.3.7
  
  enum LifecyclePhase:
      EGG
      HUNTING
      SLUMBER
  
  current_phase: public(LifecyclePhase)
  
  @external
  def __init__():
      self.current_phase = LifecyclePhase.EGG
  
  @external
  def interact():
      if self.current_phase == LifecyclePhase.EGG:
          self._hatch()
      elif self.current_phase == LifecyclePhase.HUNTING:
          self._bite()
      elif self.current_phase == LifecyclePhase.SLUMBER:
          self._dream()
          
  @internal
  def _hatch():
      self.current_phase = LifecyclePhase.HUNTING
      
  @internal
  def _bite():
      # logic for biting
      self.current_phase = LifecyclePhase.SLUMBER
      
  @internal
  def _dream():
      # rest and recover
      self.current_phase = LifecyclePhase.HUNTING
tags: [behavioral, state, vyper, finite-state-machine]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The **State** pattern implements a Finite State Machine within the contract's core logic. The cyber-serpent presents a single interface to the world (`interact`), but its behavior radically shifts depending on its internal phase. It hatches if it is an egg, it bites if it is hunting, and it dreams if it is slumbering—smoothly transitioning between states without tangled conditional nightmares.
