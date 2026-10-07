---
title: The Mediator Incantation in Simula
description: Centralizing complex communications between disparate magical entities.
type: simula
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Harmony"
formula: |2
  Begin
      Class Mediator;
      Virtual: Procedure Notify(sender, event); Ref(Colleague) sender; Text event;
      Begin
      End;

      Class Colleague(med); Ref(Mediator) med;
      Begin
      End;
  End;
tags: [simula, gof, behavioral, harmony]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When too many spirits speak at once, chaos ensues. The Mediator steps between them, absorbing their chaotic links and forcing all correspondence to pass through its serene, central conduit.
