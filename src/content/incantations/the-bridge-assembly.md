---
title: The Bridge
description: Decoupling the undead chassis from its behavioral spirit.
type: assembly
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: Necromancy // Ethereal Links
formula: |
  section .data
      behavior_ptr dq wail_behavior
  
  section .text
      global _start
  
  _start:
      ; Chassis invokes whatever spirit is bound
      mov rax, [behavior_ptr]
      call rax
      
      mov rax, 60
      xor rdi, rdi
      syscall
  
  wail_behavior:
      ; Emit a spectral wail
      ret
tags: [bridge, assembly, structural, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Bridge pattern severs the inherent link between a structure and its behavior. In the dark arts of Assembly, this is realized by storing function pointers in data sections, allowing the practitioner to swap a construct's spirit dynamically at runtime.
