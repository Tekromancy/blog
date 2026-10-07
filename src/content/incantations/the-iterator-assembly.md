---
title: The Iterator
description: Walking the grim rows of an unmarked burial ground without revealing its geometry.
type: assembly
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: Necromancy // Crypt Traversal
formula: |
  section .data
      graveyard dq 0x11, 0x22, 0x33, 0x0 ; 0 terminated
  
  section .bss
      iterator_ptr resq 1
  
  section .text
      global _start
  
  _start:
      mov qword [iterator_ptr], graveyard
  
  .next:
      mov rsi, [iterator_ptr]
      mov rax, [rsi]
      test rax, rax
      jz .done
      
      ; Process soul in rax
      
      add qword [iterator_ptr], 8
      jmp .next
      
  .done:
      mov rax, 60
      syscall
tags: [iterator, assembly, behavioral, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Iterator extracts the logic of traversal from the underlying collection. Rather than exposing the structure of the crypt, an iterator maintains the internal pointer, safely walking through sequences of memories or entities.
