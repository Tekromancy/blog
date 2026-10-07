---
title: The Decorator
description: Layering volatile dark auras atop a base summoning ritual.
type: assembly
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Necromancy // Aura Infusion"
formula: |2
  section .text
      global _start

  _start:
      call shadow_decorator

      mov rax, 60
      xor rdi, rdi
      syscall

  base_summon:
      ; The core summoning logic
      ret

  shadow_decorator:
      ; Pre-summoning darkness
      call base_summon
      ; Post-summoning enhancement
      ret
tags: [decorator, assembly, structural, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Decorator pattern layers additional functionality by wrapping the base function calls in atmospheric enchantments. You add new behavior before or after the core execution without directly altering the base spell.
