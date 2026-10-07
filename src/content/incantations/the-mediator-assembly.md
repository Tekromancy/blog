---
title: The Mediator
description: A central psychic nexus through which entities communicate.
type: assembly
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Necromancy // Psychic Nexus"
formula: |2
  section .text
      global notify_nexus

  ; Entities call notify_nexus instead of each other
  notify_nexus:
      ; RDI = Sender ID, RSI = Event Type
      cmp rsi, 1  ; 'Enemy Spotted'
      je .alert_legion
      ret

  .alert_legion:
      ; The nexus coordinates the response
      call awaken_gargoyles
      ret

  awaken_gargoyles:
      ret
tags: [mediator, assembly, behavioral, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Mediator dissolves the chaotic web of direct entity interactions by routing all psychic transmissions through a central nexus. Entities announce their state changes to the mediator, which independently orchestrates the dark reaction.
