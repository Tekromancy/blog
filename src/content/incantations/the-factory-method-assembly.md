---
title: The Factory Method
description: Deferring the creation of spirits to spectral subclasses.
type: assembly
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Necromancy // Spirit Binding"
formula: |2
  section .data
      specter_type db 1

  section .text
      global _start

  _start:
      mov al, [specter_type]
      call factory_method

      mov rax, 60
      xor rdi, rdi
      syscall

  factory_method:
      cmp al, 1
      je create_poltergeist
      jmp create_banshee

  create_poltergeist:
      ; Poltergeist routine
      ret

  create_banshee:
      ; Banshee routine
      ret
tags: [factory-method, assembly, creational, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Through the Factory Method, a generalized subroutine delegates the exact instantiation of spectral entities. By checking an environmental variable or state flag, the ritual dynamically selects the proper summoning sequence.
