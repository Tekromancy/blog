---
title: The Chain of Responsibility
description: Passing a wandering soul through a sequence of demonic arbiters.
type: assembly
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: Necromancy // Soul Processing
formula: |
  section .data
      handler1 dq process_minor, handler2
      handler2 dq process_major, 0
  
  section .text
      global _start
  
  _start:
      mov rdi, 50 ; Soul value
      mov rsi, handler1
      call traverse_chain
      
      mov rax, 60
      syscall
  
  traverse_chain:
      test rsi, rsi
      jz .done
      
      mov rax, [rsi]
      push rsi
      call rax
      pop rsi
      
      ; If handled (rax=1), stop
      cmp rax, 1
      je .done
      
      ; Move to next handler
      mov rsi, [rsi+8]
      jmp traverse_chain
      
  .done:
      ret
  
  process_minor:
      cmp rdi, 10
      jg .pass
      mov rax, 1
      ret
  .pass:
      xor rax, rax
      ret
  
  process_major:
      mov rax, 1
      ret
tags: [chain-of-responsibility, assembly, behavioral, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Chain of Responsibility strings together a list of evaluation handlers. The incoming data—a wandering soul—is tested against each node. If a node cannot bind the soul, it passes the context down the chain to the next arbiter.
