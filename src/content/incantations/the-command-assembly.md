---
title: The Command
description: Encapsulating a sinister order into a discrete executable token.
type: assembly
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: Necromancy // Imperative Runes
formula: |
  section .data
      ; Command struct: [func_ptr, arg1]
      cmd_raise dq raise_dead, 0x100
  
  section .text
      global _start
  
  _start:
      ; Queue and execute the command
      mov rsi, cmd_raise
      call execute_command
      
      mov rax, 60
      syscall
  
  execute_command:
      mov rax, [rsi]
      mov rdi, [rsi+8]
      call rax
      ret
  
  raise_dead:
      ; RDI contains the number of dead to raise
      ret
tags: [command, assembly, behavioral, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Command pattern reifies a method call into an object or structure. In the dark arts, an imperative rune encapsulates a function pointer and its arguments, allowing the spell to be queued, delayed, or logged before execution.
