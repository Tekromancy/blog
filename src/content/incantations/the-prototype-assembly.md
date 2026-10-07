---
title: The Prototype
description: Cloning an existing homunculus through direct memory transcription.
type: assembly
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Necromancy // Hemomancy"
formula: |2
  section .data
      prime_homunculus db 0xAA, 0xBB, 0xCC, 0xDD
      size equ $ - prime_homunculus

  section .bss
      clone resb size

  section .text
      global _start

  _start:
      mov rsi, prime_homunculus
      mov rdi, clone
      mov rcx, size
      rep movsb  ; The dark cloning ritual

      mov rax, 60
      xor rdi, rdi
      syscall
tags: [prototype, assembly, creational, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Prototype pattern in Assembly utilizes the raw power of memory manipulation (`rep movsb`). Rather than rebuilding a complex entity, we directly transcribe the silicon soul of a prime homunculus into a fresh vessel.
