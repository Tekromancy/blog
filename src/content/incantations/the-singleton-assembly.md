---
title: The Singleton
description: Guaranteeing a single Lich King controls the execution flow.
type: assembly
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Necromancy // Phylactery Binding"
formula: |2
  section .bss
      lich_instance resq 1

  section .text
      global get_lich

  get_lich:
      mov rax, [lich_instance]
      test rax, rax
      jnz .done

      ; Initialize the Lich King
      mov qword [lich_instance], 0xDEADBEEF
      mov rax, [lich_instance]

  .done:
      ret
tags: [singleton, assembly, creational, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Singleton pattern binds a singular instance of an entity to a global phylactery (memory address). Any subsequent attempts to summon the Lich King will yield the very same entity, ensuring absolute central dominion over the dark domain.
