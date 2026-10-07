---
title: The Visitor
description: Sending an ethereal auditor to extract logic from a hierarchy of bone structures.
type: assembly
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Necromancy // Ethereal Auditing"
formula: |2
  section .text
      global visit_skeleton
      global visit_zombie

  visit_skeleton:
      ; Extract bone density metrics
      ret

  visit_zombie:
      ; Extract decay rate metrics
      ret

  ; The structure accepts the visitor and dispatches to the right method
  accept_visitor:
      ; Assume structure type in RDI
      cmp rdi, 1 ; Type Skeleton
      je .call_skeleton
      cmp rdi, 2 ; Type Zombie
      je .call_zombie
      ret

  .call_skeleton:
      jmp visit_skeleton

  .call_zombie:
      jmp visit_zombie
tags: [visitor, assembly, behavioral, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Visitor pattern decouples an operation from the object structure it acts upon. An ethereal auditor (the visitor function) sweeps through the hierarchy of undead; rather than forcing the entities to understand the audit, they merely route the visitor to the correct extraction sub-routine.
