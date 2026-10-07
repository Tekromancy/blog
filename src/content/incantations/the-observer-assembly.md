---
title: The Observer
description: Subscribing fiends to broadcasted ripples in the ethereal plane.
type: assembly
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Necromancy // Ethereal Whispers"
formula: |2
  section .data
      observers dq obs_one, obs_two, 0

  section .text
      global notify_all

  notify_all:
      mov rsi, observers
  .loop:
      mov rax, [rsi]
      test rax, rax
      jz .done

      push rsi
      call rax
      pop rsi

      add rsi, 8
      jmp .loop

  .done:
      ret

  obs_one:
      ret
  obs_two:
      ret
tags: [observer, assembly, behavioral, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Observer pattern manages a registry of listeners. When the state of the central artifact shifts, a pulse is broadcast, iterating over function pointers and triggering the reactive awakening of every subscribed fiend.
