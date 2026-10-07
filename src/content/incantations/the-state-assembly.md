---
title: The State
description: Morphing the behavior of a ghoul based on its inner hunger.
type: assembly
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Necromancy // Form Shifting"
formula: |2
  section .data
      current_state dq state_idle

  section .text
      global _start

  _start:
      ; Act based on current state
      mov rax, [current_state]
      call rax

      ; Transition to frenzied
      mov qword [current_state], state_frenzied

      mov rax, 60
      syscall

  state_idle:
      ; Wander aimlessly
      ret

  state_frenzied:
      ; Attack aggressively
      ret
tags: [state, assembly, behavioral, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The State pattern allows an entity to radically alter its behavior when its internal state changes. By simply swapping a function pointer in memory, the underlying chassis seamlessly transitions from a dormant idle to a ravenous frenzy.
