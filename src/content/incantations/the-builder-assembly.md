---
title: The Builder
description: Assembling an undead abomination piece by piece in memory.
type: assembly
gofPattern: Builder
gofCategory: Creational
arcaneSchool: Necromancy // Fleshweaving
formula: |
  section .bss
      abomination resb 64 ; Buffer for the entity
  
  section .text
      global _start
  
  _start:
      mov rdi, abomination
      call build_skeleton
      call attach_flesh
      call infuse_soul
      
      ; Exit
      mov rax, 60
      xor rdi, rdi
      syscall
  
  build_skeleton:
      ; Write bones to buffer
      mov byte [rdi], 0x01
      ret
  
  attach_flesh:
      ; Append necrotic tissue
      mov byte [rdi+1], 0x02
      ret
  
  infuse_soul:
      ; Bind the spirit
      mov byte [rdi+2], 0xFF
      ret
tags: [builder, assembly, creational, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Builder pattern weaves flesh and bone onto the raw chassis of memory. In Assembly, you explicitly manage the offset and progression of state, crafting the ultimate undead construct step by meticulous step.
