---
title: The Composite
description: Treating a single skeleton and a legion of doom as one entity.
type: assembly
gofPattern: Composite
gofCategory: Structural
arcaneSchool: Necromancy // Legion Command
formula: |
  section .data
      ; Node: [ptr to execute function, ptr to next sibling, ptr to first child]
      legion_root dq execute_legion, 0, skeleton_1
      skeleton_1 dq execute_skel, skeleton_2, 0
      skeleton_2 dq execute_skel, 0, 0
  
  section .text
      global _start
  
  _start:
      mov rdi, legion_root
      call traverse_and_execute
      
      mov rax, 60
      syscall
  
  traverse_and_execute:
      test rdi, rdi
      jz .done
      
      ; Call execute
      mov rax, [rdi]
      push rdi
      call rax
      pop rdi
      
      ; Process child
      mov rsi, [rdi+16]
      push rdi
      mov rdi, rsi
      call traverse_and_execute
      pop rdi
      
      ; Process sibling
      mov rsi, [rdi+8]
      mov rdi, rsi
      call traverse_and_execute
  
  .done:
      ret
  
  execute_legion:
      ret
  execute_skel:
      ret
tags: [composite, assembly, structural, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Composite pattern organizes entities into tree structures, allowing a necromancer to command an entire legion or a lone skeleton with the same recursive invocation. Traverse the pointers, awaken the dead.
