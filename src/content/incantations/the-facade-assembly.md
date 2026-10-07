---
title: The Facade
description: A unified grimimoire interface masking a complex web of dark subsystems.
type: assembly
gofPattern: Facade
gofCategory: Structural
arcaneSchool: Necromancy // Ritual Simplification
formula: |
  section .text
      global raise_undead_army
  
  ; Subsystem routines
  prepare_graveyard:
      ret
  channel_void_energy:
      ret
  animate_corpses:
      ret
  
  ; The Facade
  raise_undead_army:
      push rbp
      mov rbp, rsp
      
      call prepare_graveyard
      call channel_void_energy
      call animate_corpses
      
      pop rbp
      ret
tags: [facade, assembly, structural, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Facade obscures the terrifying complexity of the underlying necrotic subsystems. It exposes a single, clean subroutine (`raise_undead_army`), allowing the adept to unleash catastrophe without memorizing the esoteric preparations.
