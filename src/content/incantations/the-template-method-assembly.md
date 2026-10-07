---
title: The Template Method
description: Laying the skeletal framework of a spell while letting subclasses flesh it out.
type: assembly
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Necromancy // Ritual Frameworks"
formula: |2
  section .data
      step_two_ptr dq default_step_two

  section .text
      global ritual_template

  ritual_template:
      call step_one

      ; Subclass hook
      mov rax, [step_two_ptr]
      call rax

      call step_three
      ret

  step_one:
      ; Draw the circle
      ret

  default_step_two:
      ; Default chanting
      ret

  step_three:
      ; Seal the pact
      ret
tags: [template-method, assembly, behavioral, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Template Method establishes the invariant skeleton of an algorithm. Specific steps within the sequence are deferred to dynamically injected pointers, allowing other practitioners to customize the ritual without breaking its foundational circle.
