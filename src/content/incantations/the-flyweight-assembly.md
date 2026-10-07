---
title: The Flyweight
description: Sharing spectral intrinsic state to conserve the physical memory limits of the phylactery.
type: assembly
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: Necromancy // Essence Compaction
formula: |
  section .data
      ; Shared intrinsic state: mesh data, texture coords
      shared_skeleton_essence db "SKELETON_MESH_V1", 0
  
  section .bss
      ; Extrinsic state array: x, y coordinates
      horde_positions resq 1000 
  
  section .text
      global _start
  
  _start:
      ; Render horde using shared essence
      mov rsi, shared_skeleton_essence
      mov rdi, horde_positions
      ; ... execution loop ...
      
      mov rax, 60
      syscall
tags: [flyweight, assembly, structural, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Flyweight pattern achieves massive scalability by isolating intrinsic, unchanging essence into a single data segment. The extrinsic, unique properties (like the position of each skeleton in the horde) are kept minimal, allowing the practitioner to summon thousands within tight memory constraints.
