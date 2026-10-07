---
title: The Memento
description: Preserving the soul's state in a phylactery to rewind time upon death.
type: assembly
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Necromancy // Chronomancy"
formula: |2
  section .bss
      phylactery_rax resq 1
      phylactery_rbx resq 1

  section .text
      global save_state
      global restore_state

  save_state:
      mov [phylactery_rax], rax
      mov [phylactery_rbx], rbx
      ret

  restore_state:
      mov rax, [phylactery_rax]
      mov rbx, [phylactery_rbx]
      ret
tags: [memento, assembly, behavioral, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Memento pattern captures a snapshot of the internal state. By saving registers and memory constraints into a secure phylactery, the practitioner can safely revert the execution timeline when an entity incurs fatal corruption.
