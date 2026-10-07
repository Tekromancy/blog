---
title: The Adapter
description: Translating ancient curses into modern systemic shocks.
type: assembly
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Necromancy // Soul Splicing"
formula: |2
  section .text
      global modern_curse
      extern ancient_curse

  modern_curse:
      ; Modern systems pass args in RDI, RSI
      ; Ancient curse expects them in RAX, RBX
      push rbp
      mov rbp, rsp

      mov rax, rdi
      mov rbx, rsi
      call ancient_curse

      pop rbp
      ret
tags: [adapter, assembly, structural, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Adapter pattern acts as a soul splicer, translating the register expectations of modern calling conventions to the archaic demands of ancient, forbidden functions. It wraps the old magic seamlessly, preventing a rupture in the execution flow.
